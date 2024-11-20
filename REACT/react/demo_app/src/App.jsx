import React from 'react'
import Card from './card';
import Demo from './demo';
const App = () => {
 return(
  <>
  <Demo/>
    < Card customClasses="bg-pink-400"/>
    < Card customClasses="bg-emerald-300"/>
    < Card customClasses="bg-yellow-400"/>
    </>
  )
}

export default App