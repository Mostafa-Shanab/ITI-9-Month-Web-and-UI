function Order(items, restaurant, Status, paymentStatus, discount, notes){
    this.items = items;
    this.restaurant = restaurant;
    this.Status = Status;
    this.paymentStatus = paymentStatus;
    this.discount = discount;
    this.notes = notes;
}

//prototype
function OrderPrototype(proto){
    this.proto = proto;
    this.clone = function(){

        let order = new Order([...this.proto.items], this.proto.restaurant, this.proto.Status, this.proto.paymentStatus, this.proto.discount, this.proto.notes);
        return order;   //[{}, {}]

     
    }
}

let featuredOrder = new Order([{ name: "burger" }, { name: "fries" }], "McDonald's", "preparing", "paid", 20, "");
// let order = new Order(["burger", "fries", "peppsi"], "McDonald's", "preparing", "paid", 20, "no onions");

let orderProto = new OrderPrototype(featuredOrder);
order1 = orderProto.clone();
oreder1.items.push("peppsi");
order1.notes = null;
order1.arrivalTime = "20 mins";


