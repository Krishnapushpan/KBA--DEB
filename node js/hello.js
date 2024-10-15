const lodash = require('lodash');
console.log("hello ")

const newname ="node.js";
console.log("hello "+ newname);


if(newname==="node.js"){
    console.log("running on node.js environment");

}
for(let i=0; i<5;i++){
    console.log(i+1);
}
let array =[1,2,3,4,5];
console.log(lodash.reverse(array));