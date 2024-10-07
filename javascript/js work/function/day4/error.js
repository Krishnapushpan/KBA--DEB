//try {
// code that might throw an error
// }
// catch (error)
// {
    //  code to handle the error
// }finally
// {
// code that runs regardless of an error
// }


try{
    let result=riskoperation();
    console.log(result);
}
catch(error){
    console.log('an error occured'+ error.message)
}finally{
    console.log('this will always run!');
}

function riskoperation(){
    let obj;
    obj.property;  //this will throw an error
}