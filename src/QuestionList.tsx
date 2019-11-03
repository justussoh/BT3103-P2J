import { QuestionIface, QuestionType } from "./components/Form/Question";

export const questions: QuestionIface[] =
    [
        {
            questionTitle: "",
            questionTutorial: "",
            questionText: "/*\n Welcome to From Python to JS. \n\n This quick and easy online module will teach you JavaScript, the popular programming language used for the Web. \n\n JavaScript is a scripting or programming language that allows you to implement complex things on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. — you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, along with HTML and CSS .\n*/",
            answer: "",
            defaultAnswer: "",
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
            defaultAnswer: "# a one line comment\n" +
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
            defaultAnswer: `x = 42
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
            defaultAnswer: "def square(num):\n      return num * num",
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
            defaultAnswer: `function square(num) {
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
    expect(app.square.toString().includes("=>")).toBeTruthy();
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
            defaultAnswer: "def multiply(multiplier, *args):\n" +
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
    expect(app.multiply(2,1,2,3)).toEqual([2,4,6]);
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
            defaultAnswer: `function odd(x) {

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
            defaultAnswer: `
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
            defaultAnswer: `
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
            questionText: "Using a for..in loop, add all available properties of myCar into an array",
            hint: "Convert the Python for loop to a Javascript for-in loop",
            answer: `
const myCar = {};
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;

const res = []

for k in myCar.keys():
   res.append(myCar[k]) 
            `,
            defaultAnswer: `
const myCar = {};
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;

const res = []

for k in myCar.keys():
   res.append(myCar[k]) 
            `,
            feedbackText: "",
            completed: false,
            type: QuestionType.EditableCode,
            testCode: `
const app = require("./main");
test("task 8", () => {
    expect(app.res.length).toBe(3);
});`,
            exportCode: `
exports.res = res;`,
            pastAnswers: [],
        },
        {
            questionTitle: "Promises",
            questionTutorial: "Please answer the following MCQ qns.",
            questionText: [`The Promise concept is not available to Python and is native to JavaScript. The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
By using .then function, a promise can be can be resolved.
The .catch function will run if there are errors in the code.
The .finally function will always run at the end of the stream.

What will the following code log?
         
new Promise((resolve, reject) => {
        console.log('Initial');
        resolve();
    })
    .then(() => {
        throw new Error('Something failed');
        console.log('Do this');
    })
    .catch(() => {
        console.error('Do that');
    })
    .then(() => {
        console.log('Do this, no matter what');
    });`,
                `Initial
 Do this`,
                `Initial
 Do this
 Do that`,
                `Initial
 Do that
 Do this, no matter what`,
                `Initial
 Something failed
 Do this
 Do that`
            ],
            answer: 3,
            defaultAnswer: '',
            hint: "",
            feedbackText: "",
            completed: false,
            type: QuestionType.MultipleChoice,
            testCode: '',
            exportCode: '',
            pastAnswers: [],
        },
        {
            questionTitle: "Display Dynamic List",
            questionTutorial: "Please look for the comments and edit the code as deem fit.",
            questionText: "Using what you have learned previously, complete the 2 following functions.\n 1. Write a function to add item into an array\n 2. Write a function to map array to following functions in place of where the comment should be at\n\nThen add 4 items into the list.",
            answer: "",
            defaultAnswer:
                "class List extends React.Component {\n" +
                "  constructor() {\n" +
                "    super()\n" +
                "    this.state = { \n" +
                "      input: '',\n" +
                "      inputList:[],\n" +
                "     }\n" +
                "     \n" +
                "     this.inputListExport = []\n" +
                "     this.insertElement=this.insertElement.bind(this)\n" +
                "     this.handleInputChange = this.handleInputChange.bind(this)\n" +
                "  }\n" +
                "  \n" +
                "  handleInputChange(e){\n" +
                "    this.setState({input:e.target.value})\n" +
                "  }\n" +
                "  \n" +
                "  insertElement(){\n" +
                "    let text = this.state.input\n" +
                "    let inputList = this.state.inputList\n" +
                "    //Please add text to the following inputList\n" +
                "    \n" +
                "    this.inputListExport = inputList\n" +
                "    this.setState({inputList:inputList})\n" +
                "  }\n" +
                "  \n" +
                "  renderList(){\n" +
                "    let res=[]\n" +
                "    let inputList = this.state.inputList\n" +
                "    // Add All object in inputList into res\n" +
                "    \n" +
                "      res.push(<li>{\n" +
                "       i\n" +
                "      }</li>)\n" +
                "    \n" +
                "    return res\n" +
                "  }\n" +
                "  \n" +
                "  render(){\n" +
                "    return(\n" +
                "    <div>\n" +
                "    <ol id=\"listDisplay\">{this.renderList()}</ol>\n" +
                "    <input type=\"text\" onChange={this.handleInputChange}/>\n" +
                "    <button onClick={this.insertElement}>Insert</button>\n" +
                "   </div>\n" +
                "    )\n" +
                "  }\n" +
                "}",
            hint: "",
            feedbackText: "",
            completed: false,
            type: QuestionType.HTMLCode,
            testCode: `
            const app = require("./main");
            test("task 10", () => {
                expect(1).toBe(1);
            });`,
            exportCode: '',
            pastAnswers: [],
        },
    ]