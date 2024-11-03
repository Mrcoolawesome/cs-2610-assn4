import './App.css'
import { Keyboard } from './Keys.jsx'
import { TypeAlong } from './TypeAlong.jsx'
import { useState} from 'react'

function App() {
  const [currentChar, setCurrentChar] = useState("");

  return (
    <main className="content">
      <TypeAlong setCurrentChar={setCurrentChar}/>
      <Keyboard currentChar={currentChar}/> 
    </main>
  )
}

export default App
