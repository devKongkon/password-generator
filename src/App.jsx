import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()`"
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]);


    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      // passwordRef.current.setSelectionRange(0, 10)
      window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className='mt-20 '>
      <div className='bg-gradient-to-r from-blue-500 to-purple-300 text-transparent      bg-clip-text py-10 flex flex-wrap justify-center'>
        <h2 className='text-5xl font-semibold text-center'>
          Password  Generator
        </h2>
      </div>
      <div className=' mx-auto max-w-md'>
        <div className='w-full mx-auto max-w-md '>
          <div className='flex'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-2 px-4 rounded-l-full overflow-hidden'
              name="password"
              id="password"
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className='py-2 text-white bg-green-700 px-4 shrink-0 rounded-r-full outline-none'>Copy
            </button>
          </div>
        </div>
        <div className='flex items-center mt-5 justify-center gap-x-4 text-xl flex-wrap overflow-hidden'>
          <div className='flex items-center text-white '>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              name=""
              id=""
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="rang">{length}</label>
          </div>
          <div className=''>
            <input
              type="checkbox"
              name="numberInput"
              id="numberInput"
              className='cursor-pointer'
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
            <label className='text-white cursor-pointer' htmlFor="numberInput">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              name="characterInput"
              id="characterInput"
              onChange={() => { setCharAllowed((prev) => !prev) }}
            />
            <label className='text-white cursor-pointer' htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
