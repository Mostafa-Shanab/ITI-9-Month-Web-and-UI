// ============================================================
// TASK 5 — Dependency Inversion Principle (DIP)
// ============================================================
//
// 🔴 THE PROBLEM (Before):
//   OrderProcessor created its own dependencies using new():
//
//     private readonly SqlOrderStorage  _storage = new SqlOrderStorage();
//     private readonly SmtpEmailSender  _emailer = new SmtpEmailSender();
//     private readonly FileOrderLogger  _logger  = new FileOrderLogger();
//
//   Imagine you're a chef (OrderProcessor). You BUILT your own oven
//   (SqlOrderStorage) inside your kitchen. Now you can NEVER use a
//   different oven. Want a gas oven? Tear down the kitchen first.
//   Want to test without an actual oven? Impossible.
//
//   That's the problem: OrderProcessor is TIGHTLY COUPLED to
//   concrete implementations. You can't swap them, can't test them.
//
// ✅ THE FIX (3 Parts):
//
//   Part A — Create interfaces (abstractions):
//     IOrderStorage, IOrderEmailSender, IOrderLogger
//
//   Part B — Constructor Injection:
//     Someone OUTSIDE gives OrderProcessor its tools.
//     The chef says: "bring me AN oven" — not "I'll build my own."
//
//   Part C — Manual Wiring (IoC simulation):
//     A Setup() method assembles all pieces together,
//     like snapping Lego bricks. This is what IoC containers do.
//
// KEY REMINDER:
//   DIP  = the RULE:   depend on interfaces, not concrete classes.
//   DI   = the TECHNIQUE: inject dependencies from outside.
//   Both are required here.
// ============================================================

namespace OrderSystem.Task5_DIP;

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
// PART A — INTERFACES (the abstractions / contracts)
// ============================================================
// These are the "job descriptions". OrderProcessor only knows
// these job descriptions — NOT who fills the roles.

// "I need something that can save an order."
public interface IOrderStorage
{
    void Save(Order order);
}

// "I need something that can send an email."
public interface IOrderEmailSender
{
    void Send(string to, string subject, string body);
}

// "I need something that can log messages."
public interface IOrderLogger
{
    void Log(string message);
}

// ============================================================
// CONCRETE IMPLEMENTATIONS (the actual workers)
// ============================================================
// These exist, but OrderProcessor will NEVER know their names.

// ── Real SQL storage ─────────────────────────────────────────
public class SqlOrderStorage : IOrderStorage
{
    public void Save(Order order)
        => Console.WriteLine($"[SQL] Order {order.Id} saved to database.");
}

// ── Real SMTP email sender ───────────────────────────────────
public class SmtpEmailSender : IOrderEmailSender
{
    public void Send(string to, string subject, string body)
        => Console.WriteLine($"[SMTP] Email sent to {to} | Subject: {subject}");
}

// ── Console logger (replaces FileOrderLogger) ────────────────
// Notice: we renamed FileOrderLogger → ConsoleOrderLogger.
// DIP made it easy to swap — just a different class implementing
// the same IOrderLogger interface.
public class ConsoleOrderLogger : IOrderLogger
{
    public void Log(string message)
        => Console.WriteLine($"[LOG] {message}");
}

// ── In-memory storage (useful for tests!) ───────────────────
// This is the payoff of DIP: for unit tests you can use THIS
// instead of SqlOrderStorage — no real database needed.
public class InMemoryOrderStorage : IOrderStorage
{
    private readonly List<Order> _orders = new();

    public void Save(Order order)
    {
        _orders.Add(order);
        Console.WriteLine($"[MEMORY] Order {order.Id} saved in memory. Total stored: {_orders.Count}");
    }

    public IEnumerable<Order> GetAll() => _orders;
}

// ============================================================
// PART B — OrderProcessor with CONSTRUCTOR INJECTION
// ============================================================
// ZERO new() calls for dependencies.
// The dependencies are GIVEN to OrderProcessor, not created by it.
// Like a chef who receives their tools — not builds them.

public class OrderProcessor
{
    // ✅ These fields hold INTERFACES, not concrete classes.
    // OrderProcessor has NO IDEA whether storage is SQL, NoSQL, or in-memory.
    private readonly IOrderStorage     _storage;
    private readonly IOrderEmailSender _emailSender;
    private readonly IOrderLogger      _logger;

    // ✅ CONSTRUCTOR INJECTION: tools come from outside via the constructor.
    // No new() — the caller decides what implementations to use.
    public OrderProcessor(
        IOrderStorage     storage,
        IOrderEmailSender emailSender,
        IOrderLogger      logger)
    {
        _storage     = storage;
        _emailSender = emailSender;
        _logger      = logger;
    }

    public void ProcessOrder(Order order)
    {
        _logger.Log($"Starting to process order {order.Id}");

        // Validate
        if (order.Items.Count == 0)
        {
            _logger.Log("Rejected: no items.");
            return;
        }
        if (string.IsNullOrWhiteSpace(order.CustomerEmail))
        {
            _logger.Log("Rejected: missing email.");
            return;
        }

        // Save
        _storage.Save(order);

        // Notify
        _emailSender.Send(
            order.CustomerEmail,
            $"Order {order.Id} Confirmed",
            "Thank you for your order!");

        _logger.Log($"Order {order.Id} processed successfully.");
    }
}

// ============================================================
// PART C — MANUAL WIRING (IoC Container simulation)
// ============================================================
// In real apps, a framework (ASP.NET DI, Autofac, etc.) does this.
// Here we do it by hand to understand what happens under the hood.
// This is the "wiring room" — only ONE place decides which concrete
// classes are used. Everything else only knows interfaces.

public static class AppSetup
{
    // 🔧 WIRING ROOM: assemble all the pieces here.
    // Change SQL to InMemory? Change ONE line here. Nothing else moves.
    public static OrderProcessor BuildOrderProcessor()
    {
        // Choose your implementations:
        IOrderStorage     storage     = new SqlOrderStorage();       // swap to InMemoryOrderStorage for tests
        IOrderEmailSender emailSender = new SmtpEmailSender();
        IOrderLogger      logger      = new ConsoleOrderLogger();

        // Inject them into OrderProcessor
        return new OrderProcessor(storage, emailSender, logger);
    }

    // Test wiring — uses in-memory storage, no DB or email needed
    public static OrderProcessor BuildTestOrderProcessor()
    {
        IOrderStorage     storage     = new InMemoryOrderStorage();  // ← swap here for tests
        IOrderEmailSender emailSender = new SmtpEmailSender();       // could swap to a fake too
        IOrderLogger      logger      = new ConsoleOrderLogger();

        return new OrderProcessor(storage, emailSender, logger);
    }
}

// ── Demo ─────────────────────────────────────────────────────
public class Program_DIP
{
    public static void Main()
    {
        var order = new Order
        {
            CustomerEmail = "customer@example.com",
            OrderType     = "Standard",
            TotalAmount   = 150m,
            Items         = new() { new() { ProductName = "Book", Quantity = 3, UnitPrice = 50m } }
        };

        Console.WriteLine("=== PRODUCTION RUN (SQL + SMTP) ===");
        var productionProcessor = AppSetup.BuildOrderProcessor();
        productionProcessor.ProcessOrder(order);

        Console.WriteLine("\n=== TEST RUN (In-Memory, no real DB) ===");
        var testProcessor = AppSetup.BuildTestOrderProcessor();
        testProcessor.ProcessOrder(order);

        // 🎉 OrderProcessor code was NOT changed between runs.
        // We only swapped implementations in AppSetup.
        // That's DIP + DI working together.
    }
}