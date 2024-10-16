const readline = require("readline");
const rl= readline.createInterface({
    input :process.stdin,
    output: process.stdout
})
const shoppingcart= new Map();
 function askcommand(){
    console.log("avaliable command : add , update ,remove , search , summary , checkout, exit")
    rl.question("enter the command: ",function (command){
        switch(command.trim().toLowerCase()){
            case 'add': additemprompt();
            break;
            case 'update': updateitemprompt();
            break;
            case 'remove': removeitemprompt();
            break;
            case 'search': searchitemprompt();
            break;
            case 'summary': printsummary();
            askcommand();
            break;
            case 'checkout': checkout();
            askcommand();
            break;
            case 'exit': rl.close();
            askcommand();
            break;
            default : console.log("entered invalid command")
            askcommand();
            break;
        }
    })
 }
 function additemprompt(){
    rl.question("enter product id : ",function(id){
        rl.question("enter product name : ", function(name){
            rl.question("enter product price :",function(price){
                rl.question("enter product Quantity : ",function(quantity){
                    additem(id,name,parseFloat(price),parseInt(quantity));
                    askcommand();
                })
            })
        })
    })
 }
 function additem(id,name,price,quantity){
    if(shoppingcart.has(id)){
        console.log(`this id ${id} already exist`)
    }
    else {
        shoppingcart.set(id,{name,price,quantity})
        console.log(` this product details added`)
    }
 }
 function removeitemprompt(){
    rl.question("enter id want to remove :",function(id){
        removeitem(id);
        askcommand();
    })
 }
 function removeitem(id){
    if(shoppingcart.has(id)){
        shoppingcart.delete(id)
        console.log("product deleted")
    }
 }
 function searchitemprompt(){
    rl.question("enter search term : ", function(term){
        searchitem(term);
        askcommand();
    })
 }
 function searchitem(term){
   const result =[];
  for(const [id, item] of shoppingcart){
    if(id.includes(term)|| item.name.includes(term)||item.price.includes(price)||item.quantity.includes(quantity)){
        result.push({id,...item});
    }
  }
  if(result.length>0){
    console.log("search result : ",result);
  }
  else{
    console.log("search not found")
  }
 }
 function updateitemprompt(){
    rl.question("enter product id : ",function(id){
        rl.question("enter product name : ", function(newname){
            rl.question("enter product price :",function(newprice){
                rl.question("enter product Quantity : ",function(newquantity){
                    updateitem(id,newname,newprice ?parseFloat(newprice) : undefined , newquantity ? parseInt(newquantity) :undefined);
                    askcommand();
                })
            })
        })
    })
 }
 function updateitem(id,newname,newprice,newquantity){
    if(shoppingcart.has(id)){
    const item = shoppingcart.get(id)
    item.name = newname || item.name;
    item.price = newprice!==undefined ? newprice : item.newprice;
    item.quantity = newquantity!==undefined ? newquantity : item.newquantity;
    shoppingcart.set(id,item);
    console.log("product updated")
    }
    else{
        console.log("product not updated")
    }
 }
 function printsummary(){
    if(shoppingcart.size>0){
        console.log("shoppingcart summary")
        let total=0;
        for([id,item] of shoppingcart){
            const subtotal = item.price * item.quantity;
            total += subtotal;
            console.log(`id : ${id} name : ${item.name} price : ${item.price.toFixed(2)} quantity : ${item.quantity.toFixed(2)}`)
        }
        console.log(`total : ${total.toFixed(2)}`)
    }
    else{
        console.log("not found")
    }
 }
 function checkout(){
    if(shoppingcart.size>0){
        console.log("proceeding to checkout")
        shoppingcart.clear(); 
        console.log ("thankyou for your purchase")
    }
    else {
        console.log("your cart is empty")
    }
 }
 askcommand();

 