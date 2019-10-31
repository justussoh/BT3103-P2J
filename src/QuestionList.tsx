import { QuestionIface, QuestionType } from "./components/Form/Question";

export const questions: QuestionIface[] =
    [
        {
            questionTitle: "",
            questionTutorial: "",
            questionText: "/*\n Welcome to From Python to JS. \n\n This quick and easy online module will teach you JavaScript, the popular programming language used for the Web. \n\n JavaScript is a scripting or programming language that allows you to implement complex things on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. — you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, along with HTML and CSS .\n*/",
            answer: "",
            hint: "",
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: ``,
            exportCode: '',
            pastAnswers: [],
        },
        {
            questionTitle: "Comments",
            questionTutorial: "In JavaScipt, commenting can be done by using: \n // For single line code \n /* For multiline code */",
            questionText: "Please convert the following to JavaScript syntax!",
            hint: "Replace # with // and ''' with /*",
            answer: "# a one line comment\n" +
                "\n" +
                "'''\n" +
                "this is a longer,\n" +
                "multi-line comment\n" +
                "'''",
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("default", () => {
    expect(1).toBe(1);
});`,
            exportCode: '',
            pastAnswers: [],
        },
        {
            questionTitle: "Declarations",
            questionTutorial: "In JavaScipt, there are three kinds of variable declarations in JS.\n" +
                "let: Declares a block-scoped, local variable, optionally initializing it to a value\n" +
                "const: Declares a block-scoped, read-only named constant.\n",
            questionText: "Please convert the following to JavaScript syntax!",
            hint: "Declare your variables with const when needed",
            answer: `x = 42
y = 13
x = "forty-two"
z = "The answer is " + 42
coffees = ['French Roast', 'Colombian', 'Kona']
`,
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("task2", () => {
    expect(app.x).toBe("forty-two");
    expect(app.y).toBe(13);
    expect(app.z).toBe("The answer is 42");
    expect(app.coffees).toEqual(['French Roast', 'Colombian', 'Kona']);
});`,
            exportCode: `
exports.x = x;
exports.y = y;
exports.z = z;
exports.coffees = coffees;`,
            pastAnswers: [],
        },
        {
            questionTitle: "Basic Functions",
            questionTutorial: "In JavaScipt, we first have to declare functions as functions.\n Also, replace the : with curly braces {}",
            questionText: "Please convert the following to JavaScript syntax!",
            hint: "Look up how to write a simple Javascript function on MDN",
            answer: "def square(num):\n      return num * num",
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("square", () => {
    expect(app.square(3)).toBe(9);
    expect(app.square(-3)).toBe(9);
});`,
            exportCode: "\nexports.square = square;",
            pastAnswers: [],
        },
        {
            questionTitle: "Arrow functions",
            questionTutorial: `An arrow function has a shorter syntax compared to function expressions. Arrow functions are always anonymous.
Convert square to an arrow function.
            `,
            questionText: "Please convert 'square' into an arrow function",
            hint: "Look up how to write a arrow functions on MDN",
            answer: `function square(num) {
    return num * num;
}`,
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("square", () => {
    expect(app.square(3)).toBe(9);
    expect(app.square(-3)).toBe(9);
});`,
            exportCode: "\nexports.square = square;",
            pastAnswers: [],
        },
        {
            questionTitle: "Rest Parameters",
            questionTutorial: "The rest parameter syntax allows us to represent an indefinite number of arguments as an array.\n In the example, we use the rest parameters to collect arguments from the second one to the end. We then multiply them by the first one.",
            questionText: "Please convert the following to JavaScript syntax!",
            hint: "The equivalent of '*args' in Python is '...args' in Javascript",
            answer: "def multiply(multiplier, *args):\n" +
                "    return map(lambda x: multiplier * x, args) \n" +
                "\n" +
                "var arr = multiply(2, 1, 2, 3);\n" +
                "console.log(arr); // [2, 4, 6]",
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("default", () => {
    expect(app.multiply(2,1,2,3)).toBe([2,4,6]);
});`,
            exportCode: "\nexports.multiply = multiply;",
            pastAnswers: [],
        },
        {
            questionTitle: "Control Flow: if-else",
            questionTutorial: "Using if-else, define a function odd(x) that returns True when its integer argument is an odd number and False otherwise\n",
            questionText: "Define a function odd(x)",
            hint: "if-else statements are surrounded by curly braces",
            answer: `function odd(x) {

}`,
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("default", () => {
    expect(app.odd(1)).toBeTruthy();
    expect(app.odd(2)).not.toBeTruthy();
    expect(app.odd(3)).toBeTruthy();
});`,
            exportCode: '\nexports.odd = odd;',
            pastAnswers: [],
        },
        {
            questionTitle: "Control Flow: switch",
            questionTutorial: `Using switch, write a function getPrice that takes in the name of a fruit and returns the price of the fruit. Oranges are $1, apples are $2, and bananas are $3. If the fruit is none of the 3, return an apology. Sample execution below:`,
            questionText: "Write the function 'getPrice()'",
            hint: "",
            answer: `
function getPrice(fruits) {
}
getPrice('oranges') // returns "$1"
getPrice('apples') // returns "$2"
getPrice('pears') // returns "Sorry, we are out of pears."
`,
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("default", () => {
    expect(app.getPrice("oranges")).toBe("$1");
    expect(app.getPrice("apples")).toBe("$2");
    expect(app.getPrice("bananas")).toBe("$3");
    expect(app.getPrice("other")).toBe("Sorry, we are out of other.");
});`,
            exportCode: '\nexports.getPrice = getPrice;',
            pastAnswers: [],
        },
        {
            questionTitle: "Loops and Iterations: for loop",
            questionTutorial: "The for statement creates a loop that is executed as long as a condition is true.",
            questionText: "Please convert the following to JavaScript syntax!",
            hint: "",
            answer: `
// A for-loop
for step in range(5):
    print("i am at step: " + step)
    
// A while-loop
n = 0
x = 0
while n < 3:
    n += 1
    x += n

// A for-of loop
arr = [3,5,7]
for element in arr:
    print(arr)`,
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("while loop", () => {
    expect(app.x).toBe(6);
    expect(app.n).toBe(3);
});`,
            exportCode: `
exports.x = x;
exports.n = n;`,
            pastAnswers: [],
        },
        {
            questionTitle: "Working with Objects",
            questionTutorial: "Objects are similar to Python dictionaries, they hold a key:value pairing. An example of initialising a object is as shown below:\n",
            questionText: "Using a for..in loop, print all the available properties of myCar",
            hint: "Convert the Python for loop to a Javascript for-in loop",
            answer: `
const myCar = {};
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;

for k in myCar.keys():
   print (k, myCar[k]) 
            `,
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("default", () => {
    expect(1).toBe(1);
});`,
            exportCode: '',
            pastAnswers: [],
        },
        {
            questionTitle: "Promises",
            questionTutorial: "What is the output of the following code?",
            questionText: "Please convert the following to JavaScript syntax!",
            hint: "",
            answer: "Haven complete",
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("default", () => {
    expect(1).toBe(1);
});`,
            exportCode: '',
            pastAnswers: [],
        },
        {
            questionTitle: "sample mcq question",
            questionTutorial: "answer the following sample mcq question",
            questionText: [`what is the capital of china?`, `hong kong`, `taipei`, `beijing`],
            answer: 3,
            hint: "",
            feedbackText: "",
            completed: false,
            type: QuestionType.MultipleChoice,
            testCode: ``,
            exportCode: '',
            pastAnswers: [],
        },
        {
            questionTitle: "sample checkboxes question",
            questionTutorial: "answer this checkboxes question",
            questionText: [`Prof Chris is...?`, `handsome`, `smart`, `charming`],
            answer: [1, 2, 3],
            hint: "",
            feedbackText: "",
            completed: false,
            type: QuestionType.Checkboxes,
            testCode: ``,
            exportCode: '',
            pastAnswers: [],
        },
    ]