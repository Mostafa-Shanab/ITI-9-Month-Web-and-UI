// 1- Create an interface User with properties name (string) and age (number). and it is required not optional
//    required create an object with only the name property.
interface IUser {
  name: string;
  age: number;
}
const user1: Pick<IUser, "name"> = {
  name: "Shanab",
};
console.log(user1);

// 2- Create an interface Profile with optional properties username (string) and email (string).
//    required create an object with both properties.
interface IProfile {
  username?: string;
  email?: string;
}
const profile1: Required<IProfile> = {
  username: "shanab",
  email: "shanab@shanab.shanab",
};
console.log(profile1);

// 3- Use Record to create an object where keys are "red", "green", and "blue", and values are their corresponding hex color codes (strings).
//    Test by accessing the red key.
type typeColors = Record<"red" | "green" | "blue", string>;
const colors: typeColors = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
};
console.log(colors.red);
console.log(colors["green"]);

// 4- Create an interface Person with properties name (string), age (number), and email (string).
//    create a new type with only the name and email properties.
//    Test by creating an object with these properties.
interface IPerson {
  name: string;
  age: number;
  email: string;
}
type NameAndEmail = Pick<IPerson, "name" | "email">;
const person1: NameAndEmail = {
  name: "Shanab",
  email: "shanab@shanab.shanab",
  // age: 11,
};
console.log(person1);

// 5- Use the same Person interface from the previous question.
//    create a new type without the age property.
//    Test by creating an object with only name and email.
type PersonWithoutAge = Omit<IPerson, "age">;
const person2: PersonWithoutAge = {
  name: "Shanab",
  email: "shanab@shanab.shanab",
  // age: 11,
};
console.log(person2);

// 6- Create a union type Colors = "red" | "green" | "blue" | "yellow".
//   create a new type without "yellow".
//   Test by assigning a value of the new type.
type Colors = "red" | "green" | "blue" | "yellow";
type ColorsWithoutYellow = Exclude<Colors, "yellow">;
const myColor: ColorsWithoutYellow = "red";
// const myColor2: ColorsWithoutYellow = "yellow";
console.log(myColor);
// console.log(myColor2);

// 7- Use the same Colors union type from the previous question.
//    create a new type with only "red" and "blue".
//    Test by assigning a value of the new type.
type RedOrBlue = Extract<Colors, "red" | "blue">;
const favoriteColor: RedOrBlue = "blue";
// const wrong: RedOrBlue = "green";
console.log(favoriteColor);
// console.log(wrong);

// 8- Create a union type MaybeString = string | null | undefined.
//    create a new type without null or undefined.
//    Test by assigning a value of the new type.
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
// type DefinitelyString = Exclude<MaybeString, null | undefined>;
const s1: DefinitelyString = "Hello Shanab!";
// const s2: DefinitelyString = null;
// const s3: DefinitelyString = undefined;
console.log(s1);
// console.log(s2);
// console.log(s3);
