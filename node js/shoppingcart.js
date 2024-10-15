const { result } = require('lodash');
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
    rl.question("enter product id: ",function(id){
        rl.question("enter product name: ",function(name){
            rl.question("enter product price: ", function(price){
                rl.question("enter product Quantity: ", function(quantity){
                    additem(id,name ,parseFloat(price), parseInt(quantity));
                    askcommand();
                })
            })
        })
    })
 }
 function additem(id, name,price,quantity){
    if(shoppingcart.has(id)){
        console.log(`error prouct with id ${id} already exist`)
    }else{
        shoppingcart.set(id,{name,price, quantity})
        console.log(`error product with id ${id} is added `)
    }
 }
 //function for remove item
 function removeitemprompt(){
    rl.question("enter the product name want to delete" , function(id){
        removeitem(id);
        askcommand();
    })
 }
 function removeitem(id){
    if (shoppingcart.has(id)){
        shoppingcart.delete(id);
        console.log(`no product with name ${id} found!`)
    }
 }
 //function for search item
 function searchitemprompt(){
    rl.question('enter the search term:', function(searchterm){
        searchitem(searchterm);
        askcommand();
    })
 }
 function searchitem(searchterm){
   const  result=[];
    for (const[id,item] of shoppingcart){
    if(id.includes(searchterm)||item.name.includes(searchterm)||item.price.includes(searchterm)||item.quantity.includes(searchterm))
    {
        result.push({id,...item});
    }
    }
    if(result.length>0){
        console.log("search result: " ,result);
    }else{
        console.log("No result is founded");
    }
 }
 //function for update items
 function updateitemprompt(){
    rl.question("enter product id",function(id){
        rl.question("enter product name:",function(newname){
            rl.question("enter product price:", function(newprice){
                rl.question("enter product Quantity:", function(newquantity){
                    updateitem(id,newname, newprice ? parseFloat(newprice):undefined, newquantity ? parseInt(newquantity) :undefined);
                    askcommand()
                })
            })
        })
    })
 }
 function updateitem(id,newname, newprice, newquantity){
if(shoppingcart.has(id)){
    const item = shoppingcart.get(id);
    item.name = newname;
    item.price = newprice !== undefined ? newprice: item.price;
    item.quantity = newquantity !== undefined ? newquantity: item.quantity;
    shoppingcart.set(id,item)
    console.log('product is updated ')    
    
}else{
    console.log("product not found")
}
 }
 //summary
 function printsummary(){
    if(shoppingcart.size>0){
        console.log('shoppingcart summary:')
        let total=0;
        for(const[id,item] of shoppingcart){
            const subtotal= item.price * item.quantity;
            total += subtotal;
            console.log(`total amount ${total.toFixed(2)}`)
                }
               
    }
    else{
        console.log( 'not founded')
    }
 }
 askcommand();