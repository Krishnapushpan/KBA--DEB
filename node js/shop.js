const { result } = require('lodash');
const { findSourceMap } = require('module');
const readline = require('readline');
const rl =readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const shoppingcart =new Map();
 function askcommand (){
    console.log("welcome to shopping Cart");
    console.log("avaliable Commands : add, remove, Search, update,summary, checkout, exit");
    rl.question("enter a command : ", function(command){
        switch(command.trim().toLowerCase()){
            case 'add':
                additemprompt();
                break;
            case 'remove':
                removeitemprompt();
                break;
            case 'update':
                updateitemprompt();
                break;
            case 'search':
                searchitemprompt();
                break;
            case 'summary':
                printsummary();
                askcommand();
                break;
            case 'checkout':
                checkout();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log("invalid command")
                askcommand();
                break;
        }
    })
 }
 //function for add item
 function additemprompt(){
    rl.question("enter id : ",function(id){
        rl.question("enter name : ",function(name){
            rl.question("enter price : ",function(price){
                rl.question("enter quantity : ", function(quantity){
                    additem(id,name, parseFloat(price),parseInt(quantity));
                    askcommand();
                })
            })
        })
    })
 }
 function additem(id,name,price,quantity){
    if(shoppingcart.has(id)){
        console.log("the id already exist");
    }
    else{
        shoppingcart.set(id,{name,price,quantity})
        console.log("item added")
    }
 }
 //function for remove
 function removeitemprompt(){
    rl.question("enter the id want to delete : ",function(id){
        removeitem(id);
        askcommand();
    })
 }
 function removeitem(id){
    if(shoppingcart.has(id)){
        shoppingcart.delete(id)
        console.log("item is removed")
    }
 }
 //function for search
 function searchitemprompt(){
    rl.question("enter search term : ",function(searchterm){
        searchitem(searchterm);
        askcommand();
    })
 }
 function searchitem(searchterm){
    const result =[];
    for(const[id, item] of shoppingcart){
        if(id.includes(searchterm)||item.name.includes(searchterm)||item.price.includes(searchterm)||item.quantity.includes(searchterm) )
            result.push({id,...item});
    }
  if(result.length>0){
    console.log("search result: ",result)
  }
  else{
    console.log("term is not find")
  }
 }
//  function for summary
function printsummary(){
    if(shoppingcart.size>0){
        console.log("summary")
        let total=0;
        for(const[id,item] of shoppingcart){
            const subtotal=item.price* item.quantity;
            total += subtotal;
            console.log(`id: ${id},name: ${item.name},price: ${item.price},quantity: ${item.quantity}`)
        }
        console.log(`total amount : `, total)
    }
    }
