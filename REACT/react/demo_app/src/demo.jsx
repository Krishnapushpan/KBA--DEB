import React from 'react'

const Demo= ()=>{
    const name ='John Doe';
    const x=10;
    const y=20;
    const names= ["steve", "john", "jane"];
  const loggedin = true;
  return (
    <>
    <div className='text-5xl'> App</div>
    <p>hello {name}</p>
    <p>the sum of {x} and {y} is {x+y}</p>
    <ul>
      {
        names.map((name,index)=>(
          <li key={index}>{name}</li>
        ))
      }
    </ul>
    {loggedin ?<h1>hello member</h1>:<h1>hello guest</h1>}
    </>
    )
}
export default Demo;