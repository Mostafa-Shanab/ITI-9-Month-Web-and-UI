// ============================================================
// TASK 2 — Open/Closed Principle (OCP)
// ============================================================
//
//  THE PROBLEM (Before):
//   GetDiscount() looked like this:
//
//     if (order.OrderType == "Standard")  return 0.00m;
//     else if (order.OrderType == "Premium") return 0.10m;
//     else if (order.OrderType == "Bulk")    return 0.20m;
//     else return 0.00m;
//
//   Every time a new order type arrives ("VIP", "Staff", etc.),
//   you EDIT this method. Editing = risk of breaking what already works.
//
//  THE FIX (After): Strategy Pattern
//   OCP says: "Open for EXTENSION, Closed for MODIFICATION"
//   Translation: Adding new behavior = adding a NEW class,
//   never touching OLD classes.
//
//   How? Create an interface IDiscountStrategy.
//   Each order type gets its OWN class that implements it.
//   Want "VIP"? Add VipDiscountStrategy. Done. Zero edits elsewhere.
// ============================================================

namespace OrderSystem.Task2_OCP;

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
//  THE KEY INTERFACE — the "contract" that never changes
// ============================================================
// Think of this as a job description: "anyone who wants to
// calculate discounts MUST have a GetDiscount(order) method."
public interface IDiscountStrategy
{
    decimal GetDiscount(Order order);
}

// ── Concrete Strategy 1: Standard orders — no discount ──────
// WHY a class? Because if Standard rules change (e.g. 5% loyalty
// discount), ONLY this file changes. Premium is untouched.
public class StandardDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order) => 0.00m;
}

// ── Concrete Strategy 2: Premium orders — 10% off ───────────
public class PremiumDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order) => 0.10m;
}

// ── Concrete Strategy 3: Bulk orders — 20% off ──────────────
public class BulkDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order) => 0.20m;
}

// ── NEW TYPE EXAMPLE: Adding VIP without touching anything ───
//  This is OCP in action: we EXTENDED by adding a new class.
// We did NOT modify StandardDiscountStrategy, Premium, or Bulk.
public class VipDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order) => 0.30m;  // 30% for VIP
}

// ── A factory to pick the right strategy by order type ───────
// This is the ONLY place the "if/else" logic lives now.
// But notice: adding "VIP" only means adding ONE line here,
// not duplicating if/else logic scattered around the codebase.
public class DiscountStrategyFactory
{
    public static IDiscountStrategy GetStrategy(string orderType)
        => orderType switch
        {
            "Standard" => new StandardDiscountStrategy(),
            "Premium"  => new PremiumDiscountStrategy(),
            "Bulk"     => new BulkDiscountStrategy(),
            "VIP"      => new VipDiscountStrategy(),       // one new line, nothing else touched
            _          => new StandardDiscountStrategy()   // safe default
        };
}

// ── OrderProcessor — receives the strategy, never changes ────
// Notice: this class has NO if/else for order types.
// It just asks the strategy: "what discount applies?"
// You can swap strategies without opening this file at all.
public class OrderProcessor
{
    private readonly IDiscountStrategy _discountStrategy;

    public OrderProcessor(IDiscountStrategy discountStrategy)
        => _discountStrategy = discountStrategy;

    public void ProcessOrder(Order order)
    {
        Console.WriteLine($"Processing order {order.Id} (Type: {order.OrderType})");

        var discount    = _discountStrategy.GetDiscount(order);
        var finalAmount = order.TotalAmount - (order.TotalAmount * discount);

        Console.WriteLine($"  Discount applied: {discount:P0}");
        Console.WriteLine($"  Final amount:     {finalAmount:C}");

        // (save + email would go here, separated by SRP)
    }
}

// ── Demo ─────────────────────────────────────────────────────
public class Program_OCP
{
    public static void Main()
    {
        var orders = new[]
        {
            new Order { CustomerEmail = "a@test.com", OrderType = "Standard", TotalAmount = 100m,
                Items = new() { new() { ProductName = "Book", Quantity = 1, UnitPrice = 100m } } },
            new Order { CustomerEmail = "b@test.com", OrderType = "Premium",  TotalAmount = 200m,
                Items = new() { new() { ProductName = "Laptop", Quantity = 1, UnitPrice = 200m } } },
            new Order { CustomerEmail = "c@test.com", OrderType = "VIP",      TotalAmount = 500m,
                Items = new() { new() { ProductName = "Server", Quantity = 1, UnitPrice = 500m } } },
        };

        foreach (var order in orders)
        {
            // Factory picks the right strategy automatically
            var strategy  = DiscountStrategyFactory.GetStrategy(order.OrderType);
            var processor = new OrderProcessor(strategy);
            processor.ProcessOrder(order);
        }
    }
}