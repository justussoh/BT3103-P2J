*Tentative Lesson Plan - Questions may change!*

## Some overviews
- Lesson plan is split into “Tasks” instead of “Questions”... this way the user can do more things in one task and tasks are conceptually defined.
- There may be multiple questions per task
- Questions marked [OPT] are optional


## Intro - Why JS? [idk if this should be here maybe can put this in Prototype 2 #bestimprovementaward] 
- Should you learn JS? Ans: Yes! 
    - Reason 1: You can get started with JS right now
    - Reason 2: JS can be used to make sites pretty. AJAX. Node.js, 
    - Reason 3: Tonnes of job growth and high pay for those who know JS.

## Basic syntax and comments
- Hello world, Basic syntax and comments, Declarations
- [OPT] variable scope, variable hoisting

Convert the following from python to javascript
- Comments
    ```python
    # a one line comment

    '''
    this is a longer,
    multi-line comment
    '''
    ```
- Expressions
    ```python
    x = 42
    y = 13
    x = "forty-two"
    z = "The answer is" + 42
    coffees = ['French Roast', 'Colombian', 'Kona']
    ```


## Functions
- Basic function
    ```python
    def square(num):
        return num * num
    ```
- Default parameters
    ```python
    def multiply(a, b=5):
        b = b if type(b)==int else 1
        return a * b
    ```
- Rest parameters
    ```python
    def multiply(multiplier, *args):
        return map(lambda x: multiplier * x, args)
    ```
    ```javascript
    function multiply(multiplier, ...theArgs) {
        return theArgs.map(x => multiplier * x);
    }

    var arr = multiply(2, 1, 2, 3);
    console.log(arr); // [2, 4, 6]
    ```
## Control Flow
- if-else

Using if-else, define a function `odd(x)` that returns True when its integer argument is an odd number and False otherwise

```javascript
function odd(x){
    return x%2 === 1
}
```
- switch
Using `switch`, write a function `getPrice` that takes in the name of a fruit and logs the price of the fruit. Oranges are $1, apples are $2, and bananas are $3. If the fruit is none of the 3, log an apology. Sample execution below:

```javascript
getPrice('oranges') // logs "$1"
getPrice('pears') // logs "Sorry, we are out of pears."
```
```javascript
function getPrice(fruits) {
    // sorry i know this qn v lame
    switch (fruittype) {
        case 'oranges':
            console.log('$1')
            break;
        case 'apples':
            console.log('$2')
        case 'bananas':
            console.log('$3')
        default:
            console.log('Sorry, we are out of ' + fruittype + '.');
    }
}
```


## Task 4: Error handling
- try/catch/throw
- [OPT]: error objects

Convert the following from python to javascript
```python
try:
    monthName = getMonthName(month) # function could throw exception
except Exception as e:
    monthName = 'unknown'
    logMyErrors(e)
```

```python
openMyFile()
try:
    writeMyFile(data)
except Exception as e:
    handleError(e)
finally:
    closeMyFile()
```

## Loops and Iteration
- For:
    ```python
    for step in range(5):
        print("i am at step: " + step)
    ```
- While
    ```python
    n = 0
    x = 0
    while n < 3:
        n += 1
        x += n
    ```
Do...while
- break/continue
    ```python
    for i in range(len(A)):
        if A[i] == theValue:
            break
    ```
- For...of
    ```python
    arr = [3,5,7]
    for element in arr:
        print(arr)
    ```


## Expressions

- Destructuring
    ```python
    arr = ['one', 'two', 'three']
    a,b,c = arr
    ```
    ```javascript
    var foo = ['one', 'two', 'three'];
    // without destructuring
    var a   = foo[0];
    var b   = foo[1];
    var c = foo[2];
    // with destructuring
    var [a, b, c] = foo;
    ```
- Comparison operators (===, ==, )
- Unary operators (x++, ++x, +x)
    - What is the result of this code snippet?
    ```javascript
    x = 1;
    console.log(x++); // 1
    console.log(x); // 2
    console.log(++x); // 3
    console.log(x); // 3
    ```

## Task 7: Working with objects
- Objects and properties
    - Say a car was created like so:
    ```javascript
    var myCar = new Object();
    myCar.make = 'Ford';
    myCar.model = 'Mustang';
    myCar.year = 1969;
    ```
    Using a `for..in` loop, print all the available properties of `myCar`
    ```javascript
      for (var i in obj) {
        // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
        if (obj.hasOwnProperty(i)) {
            console.log(`${i}: ${obj[i]}`)
        }
    }
    ```


## Promises

The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
By using .then function, a promise can be can be resolved.
The .catch function will run if there are errors in the code.
The .finally function will always run at the end of the stream.

- What is the output of the following code? (Ans: iii)
    ```javascript
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
        });
    ```
    1. ```
        Initial
        Do this
        ```
    2. ```
        Initial
        Do this
        Do that
        ```
    3. ```
        Initial
        Do that
        Do this, no matter what
        ```
    4. ```
        Initial
        Something failed
        Do this
        Do that
        ```
        
## Application Question
-Javascript has some advantages over python in that it is able to be used to create web applications. Fill in the following commented areas to make a todo list based on the past questions you have answered

```
class List extends React.Component {
  constructor() {
    super()
    this.state = { 
      input: '',
      inputList:[],
     }
     
     this.inputListExport = []
     this.insertElement=this.insertElement.bind(this)
     this.handleInputChange = this.handleInputChange.bind(this)
  }
  
  handleInputChange(e){
    this.setState({input:e.target.value})
  }
  
  insertElement(){
    let text = this.state.input
    let inputList = this.state.inputList
    //Please add text to the following inputList
    
    this.inputListExport = inputList
    this.setState({inputList:inputList})
  }
  
  renderList(){
    let res=[]
    let inputList = this.state.inputList
    // Add All object in inputList into res
    
      res.push(<li>{
       i
      }</li>)
    
    return res
  }
  
  render(){
    return(
    <div>
    <ol id="listDisplay">{this.renderList()}</ol>
    <input type="text" onChange={this.handleInputChange}/>
    <button onClick={this.insertElement}>Insert</button>
   </div>
    )
  }
}
```

## Putting it all together [not in Prototype 1!]




## Refs
- https://skillcrush.com/2014/04/10/learn-javascript/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide


