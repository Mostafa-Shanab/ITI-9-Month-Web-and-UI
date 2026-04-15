"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function logger(con) {
    console.log("decorator executed", con.name);
}
function ReadOnly(target, key) {
    console.log(target);
    console.log(key);
    Object.defineProperty(target, key, {
        writable: false,
    });
}
let Animal = class Animal {
    //   @ReadOnly
    //   newName: string;
    constructor(name) {
        this.name = name;
        // this.newName = n;
    }
};
__decorate([
    ReadOnly
], Animal.prototype, "name", void 0);
Animal = __decorate([
    logger
], Animal);
const a = new Animal("cat");
a.name = "dog";
console.log(a.name);
//# sourceMappingURL=test.js.map