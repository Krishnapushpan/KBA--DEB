const readline =require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})
const productdetails = new Map();
function askcommand(){
    console.log("manage product details")
    console.log("avaliable command : add, remove, search , update , summary , exit")
        rl.question("enter the command : " ,function(command){
            switch(command.trim().toLowerCase()){
                case 'add':
                    addproductprompt();
                    break;
                case 'remove':
                    removeproductprompt();
                    break; 
                case 'search':
                    searchproductprompt();
                   
                    break;
                case 'update':
                    updateproductprompt();
                    break;
                case 'summary':
                    printsummary();
                    askcommand();
                    break;
                case 'exit':
                    rl.close();
                    break;
                default :
                console.log("enter a valid command!")
                askcommand();
            }
        })
    }
function addproductprompt(){
    rl.question("Order Id : ",function(id){
        rl.question("Product Name : ",function(pname){
            rl.question("quantity : ",function(quantity){
                rl.question("customer name : ",function(custname){
                    additem(id,pname, quantity,custname);
                    askcommand();
                })
            })
        })
    })
}
 function additem(id,pname, quantity,custname){
    if(productdetails.has(id)){
        console.log(`Error product with id ${id} already exist `)
    }
    else{
        productdetails.set(id,{pname, quantity,custname})
        console.log("product details are added")
    }
 }
function removeproductprompt(){
    rl.question("enter the product id want to remove : " ,function(id){
        removeitem(id);
        askcommand();
    })
}
function removeitem(id){
    if(productdetails.has(id)){
        productdetails.delete(id)
        console.log("product details are removed ")
    }
    else{
        console.log("order not found")
    }
}
function searchproductprompt(){
    rl.question("enter the search term : ",function(term){
        searchitem(term);
        askcommand();
    })
}
function searchitem(term){
    result =[];
    for(const [id,item] of productdetails){
        if(id==(term)|| item.pname==(term)|| item.quanity==(term)|| item.custname==(term)){
            result.push({id,...item})
        }
    }
    if(result.length>0){
        console.log("search result : ",result)

    }
    else{
        console.log("no search term found")
    }
}
function updateproductprompt(){
    rl.question("enter the id : ",function(id){
        rl.question("Product Name : ",function(newpname){
            rl.question("quantity : ",function(newquantity){
                rl.question("customer name : ",function(newcustname){
                   updateitem(id,newpname, newquantity ? parseFloat(newquantity) : undefined, newcustname );
                    askcommand();
                })
            })
        })
    })
}
function updateitem(id,newpname, newquantity,newcustname){
    if(productdetails.has(id)){
        const item = productdetails.get(id);
        item.pname = newpname || item.pname
        item.quanity = newquantity !== undefined ? newquantity : item.quanity 
        item.custname = newcustname || item.custname;
        productdetails.set(id.item);
        console.log("product detail updated")
    }
    else{
        console.log("product detail is not updated")
    }
}
function printsummary(){
    console.log("product details summary")
        if(productdetails.size>0){
            for(const [id,item] of productdetails){
            console.log(` order id : ${id} product name : ${item.pname} quantity : ${item.quantity} customer name : ${item.custname}`)
        }
    }
    else{
        console.log("no product is found")
    }
    askcommand();

}
askcommand();