import jwt  from 'jsonwebtoken';
const secretkey = "hello";


const authenticate =(req,res, next)=>{
const cookies =req.headers.cookie;
// req.cookies;
// console.log(cookies);
const cookie=cookies.split(';');
for(let cooki of cookie){
    const [name,value] = cooki.trim().split('=');
    if(name=='certiapp'){
    const verified=  jwt.verify(value ,secretkey )
    // console.log("username:",verified.username);
    req.username = verified.username;
    req.role = verified.role;
    const role=req.role;
    console.log( role);
    
    break;
    }
}
next();
}


export{authenticate};