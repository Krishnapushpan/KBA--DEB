const readline = require('readline');
const rl =readline.createInterface
({
input:process.stdin,
output:process.stdout
});
function askname(){
    rl.question("what is your name?",function(name){
        console.log(`hello, ${name}!`);
        askfavouritelanguage();
    })
};
function askfavouritelanguage(){
    rl.question("what is your favourit programming language?"+ function(language){
        console.log(`${language} is a great choice!`);
        rl.close();
    })
};
console.log('welcome to simple interface using readline!');
askname();