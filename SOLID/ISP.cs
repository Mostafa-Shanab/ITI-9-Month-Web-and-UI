// ============================================================
// TASK 4 — Interface Segregation Principle (ISP)
// ============================================================
//
// 🔴 THE PROBLEM (Before):
//   IOrderService had 4 methods crammed into one interface:
//
//     public interface IOrderService {
//         void   ProcessOrder(Order order);
//         void   SendConfirmationEmail(Order order);
//         string GenerateReport(IEnumerable<Order>);
//         string ExportToCsv(IEnumerable<Order>);
//     }
//
//   Imagine you hire a person just to send emails.
//   But the contract (interface) says they MUST also process orders,
//   generate reports, and export CSV — even though they'll never do that.
//   They're forced to sign a contract with responsibilities they don't have.
//   That's an ISP violation.
//
// ✅ THE FIX:
//   ISP says: "Don't force clients to implement methods they don't use."
//   Split the fat interface into 3 small, focused interfaces.
//   Each class ONLY implements the interface it actually needs.
//
//   IOrderProcessor  → for classes that process orders
//   IOrderNotifier   → for classes that send notifications
//   IOrderReporter   → for classes that generate reports/exports
// ============================================================

namespace OrderSystem.Task4_ISP;

public class Order
{
    public Guid    Id            { get; set; } = Guid.NewGuid();
    public string  CustomerEmail { get; set; } = "";
    public string  OrderType     { get; set; } = "";
    public decimal TotalAmount   { get; set; }
    public List<OrderItem> Items { get; set; } = new();
}

public class OrderItem
{
    public string  ProductName { get; set; } = "";
    public int     Quantity    { get; set; }
    public decimal UnitPrice   { get; set; }
}

// ============================================================
// 👇 THREE SMALL, FOCUSED INTERFACES (instead of one fat one)
// ============================================================

// Interface 1: Processing concern
// Only classes that process orders implement this.
public interface IOrderProcessor
{
    void ProcessOrder(Order order);
}

// Interface 2: Notification concern
// Only classes that send emails implement this.
public interface IOrderNotifier
{
    void SendConfirmationEmail(Order order);
}

// Interface 3: Reporting concern
// Only classes that generate reports/exports implement this.
public interface IOrderReporter
{
    string GenerateReport(IEnumerable<Order> orders);
    string ExportToCsv(IEnumerable<Order> orders);
}

// ============================================================
// 👇 IMPLEMENTATIONS — each class only implements what it needs
// ============================================================

// ── OrderProcessingService — ONLY implements IOrderProcessor ─
// It has ONE job: process the order. That's it.
// It does NOT need to know about emails or reports.
public class OrderProcessingService : IOrderProcessor
{
    public void ProcessOrder(Order order)
    {
        Console.WriteLine($"[Processor] Processing order {order.Id}...");

        if (order.Items.Count == 0)
        {
            Console.WriteLine("[Processor] Rejected: no items.");
            return;
        }
        if (string.IsNullOrWhiteSpace(order.CustomerEmail))
        {
            Console.WriteLine("[Processor] Rejected: missing email.");
            return;
        }

        Console.WriteLine($"[Processor] Order {order.Id} accepted. Amount: {order.TotalAmount:C}");
    }
}

// ── EmailNotificationService — ONLY implements IOrderNotifier ─
// It only knows about sending emails.
// It does NOT implement ProcessOrder or GenerateReport — not its job.
public class EmailNotificationService : IOrderNotifier
{
    public void SendConfirmationEmail(Order order)
    {
        Console.WriteLine($"[Email] Sending confirmation to {order.CustomerEmail} for order {order.Id}");
        // Real code would call SMTP here
    }
}

// ── OrderReportingService — ONLY implements IOrderReporter ───
// It only knows about generating reports and CSV exports.
// Completely independent — can be tested without a database or email server.
public class OrderReportingService : IOrderReporter
{
    public string GenerateReport(IEnumerable<Order> orders)
    {
        var count   = orders.Count();
        var revenue = orders.Sum(o => o.TotalAmount);
        return $"Orders: {count} │ Total Revenue: {revenue:C}";
    }

    public string ExportToCsv(IEnumerable<Order> orders)
        => string.Join("\n", orders.Select(o => $"{o.Id},{o.CustomerEmail},{o.TotalAmount}"));
}

// ── OrderCoordinator — uses ALL three interfaces ─────────────
// This coordinator depends only on abstractions (interfaces).
// Inject any implementation you like. Easy to test and swap.
public class OrderCoordinator
{
    private readonly IOrderProcessor _processor;
    private readonly IOrderNotifier  _notifier;

    public OrderCoordinator(IOrderProcessor processor, IOrderNotifier notifier)
    {
        _processor = processor;
        _notifier  = notifier;
    }

    public void HandleOrder(Order order)
    {
        _processor.ProcessOrder(order);
        _notifier.SendConfirmationEmail(order);
    }
}

// ── Demo ─────────────────────────────────────────────────────
public class Program_ISP
{
    public static void Main()
    {
        var order = new Order
        {
            CustomerEmail = "customer@example.com",
            OrderType     = "Bulk",
            TotalAmount   = 750m,
            Items         = new() { new() { ProductName = "Cables", Quantity = 50, UnitPrice = 15m } }
        };

        // Each service only implements what it needs — no forced methods
        var processor  = new OrderProcessingService();
        var notifier   = new EmailNotificationService();
        var reporter   = new OrderReportingService();

        // Coordinator uses just processor + notifier
        var coordinator = new OrderCoordinator(processor, notifier);
        coordinator.HandleOrder(order);

        // Reporter is used separately — only when reporting is needed
        Console.WriteLine("\n--- Report ---");
        Console.WriteLine(reporter.GenerateReport(new[] { order }));
        Console.WriteLine("\n--- CSV Export ---");
        Console.WriteLine(reporter.ExportToCsv(new[] { order }));
    }
}