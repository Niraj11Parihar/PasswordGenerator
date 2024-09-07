/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(12);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);
  const textArea = useRef(null);

  function copyToClipboard(e) {
    textArea.current.select();
    navigator.clipboard.writeText(textArea.current.value)
    .then(()=>{
      console.log("Content Copied")
    }).catch((error)=>{
      console.error("Error in copying text: ", error)
    })

    setCopy("copied!d")
    }

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (char) str += "!@#$%^&*()[]{}?|><,.;:`~";

    for (let i = 1; i <= length; i++) {
      let charval = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charval);
    }

    setPassword(pass);
  }, [length, numbers, char]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, char]);

  return (
    <>
      <section className="h-screen flex justify-center">
        <center className="m-auto p-10 rounded-2xl w-1/2 bg-purple-100">
          <h1 className="text-4xl mb-4 text-neutral-600 font-bold">Password Generator</h1>
          <div className="container">
            <div className="border  p-2 rounded-md ">
              <div className="w-full flex items-center">
                  <input
                    type="text"
                    value={password}
                    ref={textArea}
                    className=" p-2 w-4/5  rounded-s bg-slate-300"
                    placeholder="password"
                  ></input>
                  <button className="w-1/5 bg-indigo-300 text-white p-2" onClick={copyToClipboard}>Copy</button>
              </div>

              <div className="flex  justify-evenly" >
                <div className="flex items-center justify-start">
                  <input
                    type="range"
                    max={30}
                    min={6}
                    value={length}
                    onChange={(e) => {
                      setLength(Number(e.target.value));
                    }}
                  ></input>
                  <label className="px-2">{length}</label>
                </div>
                <div className="flex items-center justify-start">
                  <input
                    type="checkbox"
                    value={char}
                    onChange={() => setChar((prev) => !prev)}
                  ></input>
                  <label className="px-2 font-medium">Characters</label>
                </div>
                <div className="flex items-center justify-start">
                  <input
                    type="checkbox"
                    value={numbers}
                    onChange={() => setNumbers((prev) => !prev)}
                  ></input>
                  <label className="px-2 font-medium">Numbers</label>
                </div>
              </div>
            </div>
          </div>
        </center>
      </section>
    </>
  );
}

export default App;
