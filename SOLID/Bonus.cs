// SOLID full refactor example

namespace OrderSystem.Bonus_FullRefactor;

// Entities
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

// Interfaces
public interface IOrderStorage
{
    void Save(Order order);
}

public interface IOrderReader
{
    IEnumerable<Order> GetAll();
}

public interface IOrderEmailSender
{
    void Send(string to, string subject, string body);
}

public interface IOrderLogger
{
    void Log(string message);
}

public interface IDiscountStrategy
{
    decimal GetDiscount(Order order);
}

public interface IOrderProcessor
{
    void ProcessOrder(Order order);
}

public interface IOrderNotifier
{
    void SendConfirmationEmail(Order order);
}

public interface IOrderReporter
{
    string GenerateReport(IEnumerable<Order> orders);
    string ExportToCsv(IEnumerable<Order> orders);
}

// Discount strategies

public class StandardDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order) => 0.00m;
}

public class PremiumDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order) => 0.10m;
}

public class BulkDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order) => 0.20m;
}

// VIP discount strategy
public class VipDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order) => 0.30m;
}

public static class DiscountStrategyFactory
{
    public static IDiscountStrategy GetStrategy(string orderType)
        => orderType switch
        {
            "Premium"  => new PremiumDiscountStrategy(),
            "Bulk"     => new BulkDiscountStrategy(),
            "VIP"      => new VipDiscountStrategy(),
            _          => new StandardDiscountStrategy()
        };
}

// Infrastructure
public class SqlOrderStorage : IOrderStorage, IOrderReader
{
    public void Save(Order order)
        => Console.WriteLine($"[SQL] Saved order {order.Id}");

    public IEnumerable<Order> GetAll()
        => Enumerable.Empty<Order>();
}

public class ArchiveOrderStorage : IOrderReader
{
    public IEnumerable<Order> GetAll()
    {
        Console.WriteLine("[ARCHIVE] Fetching archived orders...");
        return Enumerable.Empty<Order>();
    }
}

public class InMemoryOrderStorage : IOrderStorage, IOrderReader
{
    private readonly List<Order> _store = new();

    public void Save(Order order)
    {
        _store.Add(order);
        Console.WriteLine($"[MEMORY] Order {order.Id} stored. Count: {_store.Count}");
    }

    public IEnumerable<Order> GetAll() => _store;
}

public class SmtpEmailSender : IOrderEmailSender
{
    public void Send(string to, string subject, string body)
        => Console.WriteLine($"[SMTP] To: {to} | Subject: {subject}");
}

public class ConsoleOrderLogger : IOrderLogger
{
    public void Log(string message)
        => Console.WriteLine($"[LOG] {message}");
}

// Focused services

// Validator, notifier and reporter services
public class OrderValidator : IOrderProcessor
{
    private readonly IOrderLogger _logger;

    public OrderValidator(IOrderLogger logger)
        => _logger = logger;

    public void ProcessOrder(Order order)
    {
        if (order.Items.Count == 0)
            _logger.Log($"Order {order.Id}: no items — invalid.");
        else if (string.IsNullOrWhiteSpace(order.CustomerEmail))
            _logger.Log($"Order {order.Id}: missing email — invalid.");
        else
            _logger.Log($"Order {order.Id}: valid.");
    }

    public bool IsValid(Order order)
        => order.Items.Count > 0 && !string.IsNullOrWhiteSpace(order.CustomerEmail);
}

public class OrderEmailService : IOrderNotifier
{
    private readonly IOrderEmailSender _sender;

    public OrderEmailService(IOrderEmailSender sender)
        => _sender = sender;

    public void SendConfirmationEmail(Order order)
        => _sender.Send(order.CustomerEmail,
                        $"Order {order.Id} Confirmed",
                        "Your order is on its way!");
}

public class OrderReportingService : IOrderReporter
{
    public string GenerateReport(IEnumerable<Order> orders)
        => $"Orders: {orders.Count()} │ Revenue: {orders.Sum(o => o.TotalAmount):C}";

    public string ExportToCsv(IEnumerable<Order> orders)
        => string.Join("\n", orders.Select(o => $"{o.Id},{o.CustomerEmail},{o.TotalAmount}"));
}

// Order processor

public class OrderProcessor
{
    private readonly OrderValidator    _validator;
    private readonly IOrderStorage     _storage;
    private readonly IOrderNotifier    _notifier;
    private readonly IOrderLogger      _logger;
    private readonly IDiscountStrategy _discountStrategy;

    // DIP + Constructor Injection: all tools come from outside
    public OrderProcessor(
        OrderValidator    validator,
        IOrderStorage     storage,
        IOrderNotifier    notifier,
        IOrderLogger      logger,
        IDiscountStrategy discountStrategy)
    {
        _validator        = validator;
        _storage          = storage;
        _notifier         = notifier;
        _logger           = logger;
        _discountStrategy = discountStrategy;
    }

    public void ProcessOrder(Order order)
    {
        _logger.Log($"▶ Starting order {order.Id} [{order.OrderType}]");

        // Step 1: Validate
        if (!_validator.IsValid(order))
        {
            _logger.Log($"✗ Order {order.Id} rejected.");
            return;
        }

        // Step 2: Apply discount (OCP — never edits this method for new types)
        var discount    = _discountStrategy.GetDiscount(order);
        var finalAmount = order.TotalAmount - (order.TotalAmount * discount);
        order.TotalAmount = finalAmount;
        _logger.Log($"  Discount: {discount:P0} → Final: {finalAmount:C}");

        // Step 3: Persist (DIP — doesn't care if it's SQL or in-memory)
        _storage.Save(order);

        // Step 4: Notify (DIP — doesn't care if it's SMTP or another service)
        _notifier.SendConfirmationEmail(order);

        _logger.Log($"✓ Order {order.Id} complete.");
    }
}

// Manual wiring for the app setup

public static class AppSetup
{
    // Production: real SQL, real SMTP
    public static OrderProcessor BuildProduction()
    {
        IOrderLogger      logger   = new ConsoleOrderLogger();
        IOrderStorage     storage  = new SqlOrderStorage();
        IOrderEmailSender sender   = new SmtpEmailSender();

        var validator = new OrderValidator(logger);
        var notifier  = new OrderEmailService(sender);
        var strategy  = DiscountStrategyFactory.GetStrategy("Standard");

        return new OrderProcessor(validator, storage, notifier, logger, strategy);
    }

    // Test: in-memory storage, still real logger/email (could fake those too)
    public static OrderProcessor BuildForTesting(string orderType = "Standard")
    {
        IOrderLogger      logger   = new ConsoleOrderLogger();
        IOrderStorage     storage  = new InMemoryOrderStorage();
        IOrderEmailSender sender   = new SmtpEmailSender();

        var validator = new OrderValidator(logger);
        var notifier  = new OrderEmailService(sender);
        var strategy  = DiscountStrategyFactory.GetStrategy(orderType);

        return new OrderProcessor(validator, storage, notifier, logger, strategy);
    }
}

public class Program_Bonus
{
    public static void Main()
    {
        Console.WriteLine("╔══════════════════════════════════════╗");
        Console.WriteLine("║  SOLID Full Refactor — Bonus Demo    ║");
        Console.WriteLine("╚══════════════════════════════════════╝\n");

        var orders = new[]
        {
            new Order { CustomerEmail = "alice@example.com", OrderType = "Premium", TotalAmount = 200m,
                Items = new() { new() { ProductName = "Laptop", Quantity = 1, UnitPrice = 200m } } },
            new Order { CustomerEmail = "bob@example.com",   OrderType = "Bulk",    TotalAmount = 500m,
                Items = new() { new() { ProductName = "Cables", Quantity = 50, UnitPrice = 10m } } },
            new Order { CustomerEmail = "carol@example.com", OrderType = "VIP",     TotalAmount = 1000m,
                Items = new() { new() { ProductName = "Server", Quantity = 1, UnitPrice = 1000m } } },
            // This one should be rejected (no items)
            new Order { CustomerEmail = "bad@example.com",   OrderType = "Standard", TotalAmount = 50m,
                Items = new() },
        };

        Console.WriteLine("--- TEST RUN (in-memory, no real DB needed) ---\n");

        foreach (var order in orders)
        {
            // Build a processor with the right discount strategy per order
            var processor = AppSetup.BuildForTesting(order.OrderType);
            processor.ProcessOrder(order);
            Console.WriteLine();
        }

        Console.WriteLine("--- REPORTING (separate concern, independent class) ---\n");
        var reporter = new OrderReportingService();
        var validOrders = orders.Where(o => o.Items.Count > 0).ToList();
        Console.WriteLine(reporter.GenerateReport(validOrders));
        Console.WriteLine("\nCSV Export:");
        Console.WriteLine(reporter.ExportToCsv(validOrders));

        Console.WriteLine("\n--- LSP CHECK: Archive read-only, no crashes ---\n");
        // ArchiveOrderStorage can be used anywhere IOrderReader is expected
        IOrderReader archive = new ArchiveOrderStorage();
        var archivedOrders = archive.GetAll();
        Console.WriteLine($"Archive returned {archivedOrders.Count()} orders (safe — no Save() was ever called).");

        Console.WriteLine("\n✅ All 5 SOLID principles applied. Design is testable and extensible.");
    }
}