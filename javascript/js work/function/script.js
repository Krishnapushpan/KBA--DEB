//typr conversion or coercion
console.log("20" + 5);  //205  string concatenation
console.log("20" - 5)   //15   converted into integer
console.log("20" * 5)
console.log("20" / 5)
console.log(true + 1)  //true + 1 = 2
console.log(Number("42"))  //42
console.log(Number("hello"))   //NaN

console.log(String(123))  //"123"  to convert a number into string
console.log(typeof String(123)) 

console.log(String(true))  //true

console.log(Boolean(0))   //false
console.log(Boolean(""))   //false
console.log(Boolean("hello"))   //true

console.log(parseInt("13.99"))  //13
console.log(parseFloat("13.99"))  //13.99
