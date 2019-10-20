import { QuestionType } from "./components/Form/Question";

export const questions: QuestionType[] =
    [
        {
            questionName: "",
            questionTitle: "",
            questionTutorial: "",
            questionText: "/*\n Welcome to From Python to JS. \n\n This quick and easy online module will teach you JavaScript, the popular programming language used for the Web. \n\n JavaScript is a scripting or programming language that allows you to implement complex things on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. — you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, along with HTML and CSS .\n*/",
            answer: "",
            hint:"",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 1",
            questionTitle: "Comments",
            questionTutorial: "In JavaScipt, commenting can be done by using: \n // For single line code \n /* For multiline code */",
            questionText: "Please convert the following to JavaScript syntax!",
            hint:"Replace # with // and ''' with /*",
            answer: "# a one line comment\n" +
                "\n" +
                "'''\n" +
                "this is a longer,\n" +
                "multi-line comment\n" +
                "'''",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 2",
            questionTitle: "Declarations",
            questionTutorial: "In JavaScipt, there are three kinds of variable declarations in JS.\n" +
                "var: Declares a variable, optionally initializing it to a value\n" +
                "let: Declares a block-scoped, local variable, optionally initializing it to a value\n" +
                "const: Declares a block-scoped, read-only named constant.\n",
            questionText: "Please convert the following to JavaScript syntax!",
            hint:"",
            answer: "x = 42\n" +
                "y = 13\n" +
                "x = \"forty-two\"\n" +
                "z = \"The answer is\" + 42\n" +
                "coffees = ['French Roast', 'Colombian', 'Kona']",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 3",
            questionTitle: "Basic Functions",
            questionTutorial: "In JavaScipt, we first have to declare functions as functions.\n Also, replace the : with curly braces {}",
            questionText: "Please convert the following to JavaScript syntax!",
            hint:"",
            answer: "def square(num):\n      return num * num",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 4",
            questionTitle: "Default Parameters",
            questionTutorial: "In JavaScipt, default parameters allow us to initialize functions with default values.\n",
            questionText: "Please convert the following to JavaScript syntax!",
            hint:"",
            answer: "def multiply(a, b=5):\n" +
                "    b = b if type(b)==int else 1\n" +
                "    return a * b",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 5",
            questionTitle: "Rest Parameters",
            questionTutorial: "The rest parameter syntax allows us to represent an indefinite number of arguments as an array.\n",
            questionText: "Please convert the following to JavaScript syntax!",
            hint:"",
            answer: "def multiply(multiplier, *args):\n" +
                "    return map(lambda x: multiplier * x, args) \n" +
                "\n" +
                "var arr = multiply(2, 1, 2, 3);\n" +
                "console.log(arr); // [2, 4, 6]",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 6",
            questionTitle: "Control Flow",
            questionTutorial: "Using if-else, define a function odd(x) that returns True when its integer argument is an odd number and False otherwise\n" +
                "\n" +
                "function odd(x){\n" +
                "    return x%2 === 1\n" +
                "}\n" +
                "Using switch, write a function getPrice that takes in the name of a fruit and logs the price of the fruit. Oranges are $1, apples are $2, and bananas are $3. If the fruit is none of the 3, log an apology. Sample execution below:",
            questionText: "Please write a switch statement",
            hint:"",
            answer: "getPrice('oranges') // logs \"$1\"\n" +
                "getPrice('pears') // logs \"Sorry, we are out of pears.\"\n" +
                "function getPrice(fruits) {\n" +
                "}",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 7",
            questionTitle: "Error Handling",
            questionTutorial: "",
            questionText: "Please convert the following to JavaScript syntax!",
            hint:"",
            answer: "try:\n" +
                "    monthName = getMonthName(month) # function could throw exception\n" +
                "except Exception as e:\n" +
                "    monthName = 'unknown'\n" +
                "    logMyErrors(e)",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 8",
            questionTitle: "Loops and Iterations",
            questionTutorial: "The for statement creates a loop that is executed as long as a condition is true.",
            questionText: "Please convert the following to JavaScript syntax!",
            hint:"",
            answer: "for step in range(5):\n" +
                "    print(\"i am at step: \" + step)",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 9",
            questionTitle: "Working with Objects",
            questionTutorial: "Objects are similar to Python dictionaries, they hold a key:value pairing. An example of initialising a object is as shown below:\n" +
                "var myCar = new Object();\n" +
                "myCar.make = 'Ford';\n" +
                "myCar.model = 'Mustang';\n" +
                "myCar.year = 1969;",
            questionText: "Using a for..in loop, print all the available properties of",
            hint:"",
            answer: "for k in myCar.keys():\n" +
                "   print (k, myCar[k]) ",
            feedbackText: "",
            completed: false,
        },
        {
            questionName: "Task 10",
            questionTitle: "Promises",
            questionTutorial: "Testing",
            questionText: "Please convert the following to JavaScript syntax!",
            hint:"",
            answer: "Haven complete",
            feedbackText: "",
            completed: false,
        },
    ]