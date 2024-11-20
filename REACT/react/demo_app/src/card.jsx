import { useState } from "react";

const Card = ({customClasses})=>{
    const [likes, setLikes]= useState(0);
    const [titlecolor, setTitleColor]=useState('text-black');

    const toggleTitleColor=()=>{
        setTitleColor((prevColor)=>
        prevColor==='text-black'?'text-blue':'text-black');
    };
    return (
        <div className={`max-w-sm rounded overflow-hidden shadow-lg p6 bg-white ${customClasses}`}>
            <h2 className={`font-bold text-xl mb-2 ${titlecolor}`}>CARD TITLE</h2>
            <p className="text-gray-70 text-base"> this is some example text in the card</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:by-blue-700"
            onClick={()=>setLikes(likes+1)}
            >Likes:{likes}</button>
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={toggleTitleColor}>Toggle title Color</button>

        </div>
    )
}
export default Card;
