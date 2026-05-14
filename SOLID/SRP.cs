// ============================================================
// TASK 1 — Single Responsibility Principle (SRP)
// ============================================================
//
// THE PROBLEM (Before):
//   OrderProcessor did EVERYTHING:
//     1. Validate the order
//     2. Calculate discount
//     3. Save to database
//     4. Send email
//     5. Generate report
//     6. Export to CSV
//     7. Log messages
//
//   Think of it like one person doing the job of 7 employees.
//   If anything changes (e.g. email format), you touch the same
//   class as saving to DB — risky and confusing.
//
// THE FIX (After):
//   Split into small classes. Each class has ONE job.
//   "One reason to change" = if email logic changes, only
//   OrderEmailSender changes. Nothing else is touched.
// ============================================================

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string CustomerEmail { get; set; } = "";
    public string OrderType { get; set; } = "";   // "Standard", "Premium", "Bulk"
    public decimal TotalAmount { get; set; }
    public List<OrderItem> Items { get; set; } = new();
}

public class OrderItem
{
    public string ProductName { get; set; } = "";
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

// ── Infrastructure (concrete helpers) ───────────────────────
public class SmtpEmailSender
{
    public void Send(string to, string subject, string body)
        => Console.WriteLine($"[SMTP] Sending to {to} | Subject: {subject}");
}

public class SqlOrderStorage
{
    public void Save(Order order)
        => Console.WriteLine($"[SQL] Saved order {order.Id}");
}

public class FileOrderLogger
{
    public void Log(string message)
        => Console.WriteLine($"[LOG] {message}");
}

// ============================================================
//  NEW CLASSES — Each has ONE job
// ============================================================

// ── 1. OrderValidator — ONLY validates ──────────────────────
// WHY a separate class? Validation rules change independently.
// Tomorrow you might add "email must contain @" — only this class changes.
public class OrderValidator
{
    private readonly FileOrderLogger _logger;

    public OrderValidator(FileOrderLogger logger)
        => _logger = logger;

    public bool Validate(Order order)
    {
        if (order.Items.Count == 0)
        {
            _logger.Log("Validation failed: No items in order.");
            return false;
        }
        if (string.IsNullOrWhiteSpace(order.CustomerEmail))
        {
            _logger.Log("Validation failed: Customer email is missing.");
            return false;
        }
        return true;
    }
}

// ── 2. OrderDiscountCalculator — ONLY calculates discount ───
// WHY a separate class? Discount rules are business logic that
// changes often (sales, seasons, new tiers). Isolated here.
public class OrderDiscountCalculator
{
    public decimal GetDiscount(Order order)
    {
        if (order.OrderType == "Standard") return 0.00m;
        if (order.OrderType == "Premium") return 0.10m;
        if (order.OrderType == "Bulk") return 0.20m;
        return 0.00m;
    }
}

// ── 3. OrderPersistence — ONLY saves to storage ─────────────
// WHY a separate class? Saving to DB is infrastructure.
// Swapping SQL for NoSQL only affects this class.
public class OrderPersistence
{
    private readonly SqlOrderStorage _storage;
    private readonly FileOrderLogger _logger;

    public OrderPersistence(SqlOrderStorage storage, FileOrderLogger logger)
    {
        _storage = storage;
        _logger = logger;
    }

    public void Save(Order order)
    {
        _storage.Save(order);
        _logger.Log($"Order {order.Id} persisted.");
    }
}

// ── 4. OrderEmailSender — ONLY sends emails ─────────────────
// WHY a separate class? Email template, provider (SMTP/SendGrid)
// can change without touching any other part of the system.
public class OrderEmailSender
{
    private readonly SmtpEmailSender _emailer;

    public OrderEmailSender(SmtpEmailSender emailer)
        => _emailer = emailer;

    public void SendConfirmationEmail(Order order)
        => _emailer.Send(order.CustomerEmail,
                         $"Order {order.Id} Confirmed",
                         "Thank you for your order!");
}

// ── 5. OrderReportService — ONLY handles reporting/export ───
// WHY a separate class? Reporting format (HTML, PDF, CSV) can
// evolve separately from core order processing.
public class OrderReportService
{
    public string GenerateReport(IEnumerable<Order> orders)
        => $"Orders: {orders.Count()} │ Revenue: {orders.Sum(o => o.TotalAmount):C}";

    public string ExportToCsv(IEnumerable<Order> orders)
        => string.Join("\n", orders.Select(o => $"{o.Id},{o.CustomerEmail},{o.TotalAmount}"));
}

// ── 6. OrderProcessor — ONLY orchestrates the steps ─────────
// WHY keep it? Someone must coordinate the workflow.
// But now it DELEGATES — it doesn't DO any of the work itself.
// Think of it as a manager who assigns tasks, not does them.
public class OrderProcessor
{
    private readonly OrderValidator _validator;
    private readonly OrderDiscountCalculator _discountCalc;
    private readonly OrderPersistence _persistence;
    private readonly OrderEmailSender _emailSender;
    private readonly FileOrderLogger _logger;

    public OrderProcessor(
        OrderValidator validator,
        OrderDiscountCalculator discountCalc,
        OrderPersistence persistence,
        OrderEmailSender emailSender,
        FileOrderLogger logger)
    {
        _validator = validator;
        _discountCalc = discountCalc;
        _persistence = persistence;
        _emailSender = emailSender;
        _logger = logger;
    }

    public void ProcessOrder(Order order)
    {
        _logger.Log($"Processing order {order.Id}");

        if (!_validator.Validate(order))
            return;

        var discount = _discountCalc.GetDiscount(order);
        var finalAmount = order.TotalAmount - (order.TotalAmount * discount);
        order.TotalAmount = finalAmount; // apply the discount

        _persistence.Save(order);
        _emailSender.SendConfirmationEmail(order);

        _logger.Log($"Order {order.Id} processed successfully. Final amount: {finalAmount:C}");
    }
}

// ── Demo / quick smoke-test ──────────────────────────────────
public class Program_SRP
{
    public static void Main()
    {
        var logger = new FileOrderLogger();
        var storage = new SqlOrderStorage();
        var emailer = new SmtpEmailSender();

        var validator = new OrderValidator(logger);
        var discountCalc = new OrderDiscountCalculator();
        var persistence = new OrderPersistence(storage, logger);
        var emailSender = new OrderEmailSender(emailer);

        var processor = new OrderProcessor(validator, discountCalc, persistence, emailSender, logger);

        var order = new Order
        {
            CustomerEmail = "customer@example.com",
            OrderType = "Premium",
            TotalAmount = 200m,
            Items = new List<OrderItem> { new() { ProductName = "Widget", Quantity = 2, UnitPrice = 100m } }
        };

        processor.ProcessOrder(order);

        // Test reporting separately — it's its own concern now
        var reportService = new OrderReportService();
        Console.WriteLine(reportService.GenerateReport(new[] { order }));
        Console.WriteLine(reportService.ExportToCsv(new[] { order }));
    }
}