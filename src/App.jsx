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
<section className="h-screen flex justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500">
  <div className="m-auto p-10 rounded-2xl w-3/4 max-w-xl shadow-2xl bg-white  brightness-90 -hue-rotate-30 bg-opacity-90">
    <h1 className="text-4xl mb-6 text-gray-700 font-bold text-center">
      🔒 Password Generator
    </h1>
    <div className="container space-y-6">
      {/* Password Display */}
      <div className="border border-gray-300 p-4 rounded-lg bg-gray-100 shadow-sm flex items-center">
        <input
          type="text"
          value={password}
          ref={textArea}
          className="flex-grow p-3 text-lg rounded-l-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Your Password"
          readOnly
        />
        <button
          className="w-1/4 bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-semibold p-3 rounded-r-lg hover:shadow-lg hover:scale-105 transition-all"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Password Length */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-600">Password Length:</label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              max={30}
              min={6}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-lg font-semibold text-gray-700">{length}</span>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-wrap justify-between">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              value={char}
              onChange={() => setChar((prev) => !prev)}
              className="h-5 w-5 text-indigo-500 focus:ring-indigo-400 rounded"
            />
            <span className="text-lg font-medium text-gray-700">Include Characters</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              value={numbers}
              onChange={() => setNumbers((prev) => !prev)}
              className="h-5 w-5 text-indigo-500 focus:ring-indigo-400 rounded"
            />
            <span className="text-lg font-medium text-gray-700">Include Numbers</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</section>


    </>
  );
}

export default App;
