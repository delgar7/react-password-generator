import React, { useState } from 'react'; 
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from "./characters";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { COPY_SUCCES } from './message';


function App() {

 // Declaring the variables for the checkboxes 
const [password, setPassword] = useState("");
const [passwordLength, setPasswordLength] = useState(20);
const [includeUppercase, setIncludeUppercase] = useState(false);
const [includeLowercase, setIncludeLowercase] = useState(false);
const [includeNumbers, setIncludeNumbers] = useState(false);
const [includeSymbols, setIncludeSymbols] = useState(false);

 // Generate Password Function 
const handleGeneratePassword = (e) => {

  // Notify when no checkbox is clicked 
  if(!includeLowercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    notify("You must select one option", true); 

  }
  let characterList = ""
  
  if(includeLowercase) {
    characterList = characterList + lowerCaseLetters;
  }
  if(includeUppercase) {
    characterList = characterList + upperCaseLetters;
  }
  if(includeNumbers) {
    characterList = characterList + numbers;
  }
  if(includeSymbols) {
    characterList = characterList + specialCharacters; 
  }

  setPassword(createPassword(characterList));
}

const createPassword = (characterList) => {
  let password = "";
  const characterListLength = characterList.length;


  // Generate a random index and create the password based on the checkboxes
  for (let i=0; i<passwordLength; i++) {
    const characterIndex = Math.round(Math.random() * characterListLength)
    password = password + characterList.charAt(characterIndex)
  }
  return password;
}


  //Build the copyToClipboard function in order to call it
  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea")
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand("copy")
    newTextArea.remove()
  }

  //React-toastify function 
  const notify = (message, hasError = false) => {
    if(hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
  }


  //Function for the copy button
  const handleCopyPassword = (e) => {
    if (password === "") { 
      notify("There is nothing to copy", true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCES)
  }
}


  return <div className='App'>

    <div className="container">
      <div className="generator">
        <h2 className="generator__header">
          Password Generator
        </h2>
        <div className="generator__password">
          <h3>{password}</h3>
          <button onClick={handleCopyPassword} className="copy__btn">
          <i className="far fa-copy"></i>
          </button>
        </div>


        <div className="form-group">
          <label htmlFor="password-length">Password Length</label>
          <input 
          defaultValue={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          type="number" 
          id="password-length" 
          name="password-length" 
          min="6" 
          max="20"/>
        </div>

        <div className="form-group">
          <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
          <input 
          checked = {includeUppercase}
          onChange= {(e) => setIncludeUppercase(e.target.checked)}
          type="checkbox" 
          id="uppercase-letters" 
          name="uppercase-letters" 
          min="6" 
          max="20"/>
        </div>

        <div className="form-group">
          <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
          <input 
          checked = {includeLowercase}
          onChange = {(e) => setIncludeLowercase(e.target.checked)}
          type="checkbox" 
          id="lowercase-letters" 
          name="lowercase-letters" 
          min="6" 
          max="20"/>
        </div>

        <div className="form-group">
          <label htmlFor="include numbers">Include Numbers</label>
          <input 
          checked = {includeNumbers}
          onChange = {(e) => setIncludeNumbers(e.target.checked)}
          type="checkbox" 
          id="include-numbers" 
          name="include-numbers" 
          min="6" 
          max="20"/>
        </div>

        <div className="form-group">
          <label htmlFor="include-symbols">Include Symbols</label>
          <input 
          checked = {includeSymbols}
          onChange = {(e) => setIncludeSymbols(e.target.checked)}
          type="checkbox" 
          id="include-symbols" 
          name="include-symbols" 
          min="6" 
          max="20"/>
        </div> 

        <button onClick={handleGeneratePassword} className="create__button">
          Generate Password
        </button>

        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />

      </div>
    </div>
  </div>



}

export default App;
