const fs = require("fs");

function readProducts() {
  const data = fs.readFileSync("products.json", "utf-8");
  return JSON.parse(data);
}

function writeProducts(products) {
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
}

function addProduct(name, price) {
  const products = readProducts();

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
  };

  products.push(newProduct);
  writeProducts(products);

  console.log("Product added");
}

function listProducts() {
  const products = readProducts();
  console.table(products);
}

function updateProduct(id, newName, newPrice) {
  const products = readProducts();

  const product = products.find((p) => p.id == id);

  if (!product) {
    console.log("Product not found");
    return;
  }

  if (newName) product.name = newName;
  if (newPrice) product.price = Number(newPrice);

  writeProducts(products);

  console.log("Product updated");
}

function deleteProduct(id) {
  const products = readProducts();

  const filtered = products.filter((p) => p.id != id);

  writeProducts(filtered);

  console.log("Product deleted");
}

const command = process.argv[2];

if (command === "add") {
  const name = process.argv[3];
  const price = process.argv[4];
  addProduct(name, price);
} else if (command === "list") {
  listProducts();
} else if (command === "update") {
  const id = process.argv[3];
  const nameIndex = process.argv.indexOf("--name");
  const priceIndex = process.argv.indexOf("--price");

  let newName, newPrice;

  if (nameIndex !== -1) {
    newName = process.argv[nameIndex + 1];
  } else {
    newName = process.argv[4];
  }

  if (priceIndex !== -1) {
    newPrice = process.argv[priceIndex + 1];
  }

  updateProduct(id, newName, newPrice);
} else if (command === "delete") {
  const id = process.argv[3];
  deleteProduct(id);
} else {
  console.log("Unknown command");
}
