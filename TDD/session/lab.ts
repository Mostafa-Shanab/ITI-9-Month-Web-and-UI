/*
Create a StringCalculator with the following requirements:

1) method Add(string numbers) that returns an integer.
	Start with the simplest test case of an empty string, then 1 number, then 2.
	An empty string should return a sum of 0.
	String of numbers can include 0, 1, or 2 integers (e.g. "", "1", "1,2").
	Add returns the sum of the integers provided in the string numbers.
	Remember to refactor after each test.

2) Allow the Add method to handle an unknown number of numbers (in the string).

3) Allow the Add method to handle new lines between numbers (instead of commas).
	The following input is ok: “1\n2,3” (will equal 6)

4) Calling Add with a negative number will throw an exception “negatives not allowed” - and the negative that was passed. 
	If there are multiple negatives, show all of them in the exception message.
*/

// V1
/*
export function add(numbers: string): number {
  return 0;
}
*/

// V2
/*
export function add(numbers: string): number {
  if (!numbers) return 0;
  return Number(numbers);
}
*/

// V3
/*
export function add(numbers: string): number {
  if (!numbers) return 0;
  const parts = numbers.split(",");
  return parts.reduce((sum, part) => sum + Number(part), 0);
}
*/

// V4
/*
export function add(numbers: string): number {
  if (!numbers) return 0;
  const parts = numbers.split(/[,\n]/);
  return parts.reduce((sum, part) => sum + Number(part), 0);
}
*/

// V5 (Refactor and handle negatives)
export function add(numbers: string): number {
  if (!numbers) return 0;
  const values = splitNumbers(numbers);
  validateNegatives(values);
  return sum(values);
}

function splitNumbers(numbers: string): number[] {
  return numbers
    .split(/[,\n]/)
    .filter((part) => part !== "")
    .map((part) => Number(part));
}

function validateNegatives(values: number[]) {
  const negatives = values.filter((value) => value < 0);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(",")}`);
  }
}

function sum(values: number[]): number {
  return values.reduce((total, next) => total + next, 0);
}
