// ============================================================
// TASK 3 — Liskov Substitution Principle (LSP)
// ============================================================
//
//  THE PROBLEM (Before):
//   ArchiveOrderStorage extended SqlOrderStorage BUT threw an
//   exception when Save() was called:
//
//     public override void Save(Order order)
//         => throw new NotSupportedException("Read-only archive!");
//
//   LSP says: "If I give you a subclass instead of the parent,
//   your program must still work correctly."
//
//   Imagine you order a drink at a café. The waiter brings you
//   a glass — but it has a hole in it. It LOOKS like a glass
//   (it's a subclass of "glass"), but it doesn't DO what a glass
//   promises to do (hold liquid). That's an LSP violation.
//
//   Here: SqlOrderStorage promises "I can Save()". ArchiveOrderStorage
//   lies — it says "I can Save()" but then crashes you.
//
//  THE FIX:
//   Split the ONE big class into TWO focused interfaces:
//     IOrderWriter  — for things that CAN save
//     IOrderReader  — for things that CAN read
//
//   SqlOrderStorage can both read AND write → implements both.
//   ArchiveOrderStorage can ONLY read → implements IOrderReader only.
//   Now it's IMPOSSIBLE to call Save() on an archive by mistake —
//   the compiler won't even allow it!
// ============================================================

namespace OrderSystem.Task3_LSP;

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
// 👇 THE FIX: Two separate, focused interfaces
// ============================================================

// Contract for writing (saving) orders
// Only classes that CAN save should implement this.
public interface IOrderWriter
{
    void Save(Order order);
}

// Contract for reading orders
// Any storage that can retrieve orders implements this.
public interface IOrderReader
{
    IEnumerable<Order> GetAll();
}

// ── SqlOrderStorage — can BOTH read AND write ───────────────
// A live database can do both, so it implements BOTH interfaces.
// This is perfectly fine — it's honest about its capabilities.
public class SqlOrderStorage : IOrderWriter, IOrderReader
{
    public void Save(Order order)
        => Console.WriteLine($"[SQL] Saved order {order.Id}");

    public IEnumerable<Order> GetAll()
    {
        Console.WriteLine("[SQL] Fetching all orders...");
        return Enumerable.Empty<Order>(); // simplified
    }
}

// ── ArchiveOrderStorage — can ONLY read ─────────────────────
// An archive is read-only. It ONLY implements IOrderReader.
// There is NO Save() method here — it doesn't pretend to have one.
// The compiler will stop anyone from trying to call Save() on this.
// No more surprise NotSupportedException at runtime! 🎉
public class ArchiveOrderStorage : IOrderReader
{
    public IEnumerable<Order> GetAll()
    {
        Console.WriteLine("[ARCHIVE] Fetching archived orders...");
        return Enumerable.Empty<Order>(); // simulates archive retrieval
    }
    // ✅ No Save() method — it was never needed, so it's not here.
    // Honest, safe, and substitutable wherever IOrderReader is expected.
}

// ── OrderProcessor — uses IOrderWriter (depends on abstraction) ─
// It only needs to WRITE, so it depends on IOrderWriter.
// Pass it SqlOrderStorage or any future WriteableStorage — it works.
// Try to pass ArchiveOrderStorage — compiler error! Safe by design.
public class OrderProcessor
{
    private readonly IOrderWriter _storage;

    public OrderProcessor(IOrderWriter storage)
        => _storage = storage;

    public void ProcessOrder(Order order)
    {
        Console.WriteLine($"Processing order {order.Id}");
        _storage.Save(order);  // safe — only IOrderWriter can get here
        Console.WriteLine("Order processed successfully.");
    }
}

// ── OrderQueryService — uses IOrderReader ───────────────────
// This service only needs to READ. Pass it SQL or Archive — both work.
// LSP is satisfied: both implementations honor IOrderReader's contract.
public class OrderQueryService
{
    private readonly IOrderReader _reader;

    public OrderQueryService(IOrderReader reader)
        => _reader = reader;

    public void PrintAllOrders()
    {
        var orders = _reader.GetAll();
        Console.WriteLine($"Found {orders.Count()} orders.");
    }
}

// ── Demo ─────────────────────────────────────────────────────
public class Program_LSP
{
    public static void Main()
    {
        var order = new Order
        {
            CustomerEmail = "customer@example.com",
            OrderType     = "Standard",
            TotalAmount   = 100m,
            Items         = new() { new() { ProductName = "Widget", Quantity = 1, UnitPrice = 100m } }
        };

        // SqlOrderStorage works everywhere (reads AND writes)
        var sqlStorage = new SqlOrderStorage();

        var processor   = new OrderProcessor(sqlStorage);       // uses it as IOrderWriter
        var queryService = new OrderQueryService(sqlStorage);   // uses it as IOrderReader

        processor.ProcessOrder(order);
        queryService.PrintAllOrders();

        Console.WriteLine("\n--- Using Archive for reading (safe substitution) ---");

        // ArchiveOrderStorage substituted where IOrderReader is expected — works perfectly
        var archive      = new ArchiveOrderStorage();
        var archiveQuery = new OrderQueryService(archive);  // ✅ LSP satisfied
        archiveQuery.PrintAllOrders();

        // This would be a COMPILE ERROR — Archive doesn't implement IOrderWriter:
        // var badProcessor = new OrderProcessor(archive); // ❌ Won't compile
        Console.WriteLine("LSP satisfied: Archive safely used as a reader only.");
    }
}