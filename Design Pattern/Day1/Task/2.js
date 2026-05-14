function Document(header, footer, pages, text) {
  this.header = header;
  this.footer = footer;
  this.pages = pages;
  this.text = text;
}

function cloneDocument(doc) {
  this.clone = () => new Document(doc.header, doc.footer, doc.pages, doc.text);
}

const originalDoc = new Document("Header", "Footer", 10, "Original Text");

const DocProto = new cloneDocument(originalDoc);

const copiedDoc1 = DocProto.clone();
const copiedDoc2 = DocProto.clone();

copiedDoc1.text = "Modified Text";
console.log(copiedDoc1);
console.log("--------------------");
console.log(copiedDoc2);
