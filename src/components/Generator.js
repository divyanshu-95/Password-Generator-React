import React,{useState} from 'react';
import { numbers,lowerCaseLetter,specialChar,upperCaseLetters } from './character'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { COPY_MSG } from './message';
const Generator = () => {
    const [password, setpassword] = useState('');
    const [passwordLength, setpasswordLength] = useState(20);
    const [includeUpperCase, setincludeUpperCase] = useState(false);
    const [includeLowerCase, setincludeLowerCase] = useState(false);
    const [includeNumbers, setincludeNumbers] = useState(false);
    const [includeSymbols, setincludeSymbols] = useState(false);
    const notify=(msg,hasNotCopy=false)=>{
        if(hasNotCopy){
            toast.error(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else{
            toast(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    
    const handleClick=(e)=>{
        if(!includeLowerCase&&!includeNumbers&&!includeSymbols&&!includeUpperCase){
            notify("You must select one Option",true);
        }
        let charList='';
        if(includeLowerCase){
            charList=charList+lowerCaseLetter;
        }
        if(includeNumbers){
            charList=charList+numbers;
        }
        if(includeSymbols){
            charList=charList+specialChar;
        }
        if(includeUpperCase){
            charList=charList+upperCaseLetters;
        }

        setpassword(createPassword(charList));

    }
    const createPassword=(charList)=>{
        let pwd='';
        const lenCharList=charList.length;
        for(let i=0;i<passwordLength;i++){
            const charIdx=Math.round(Math.random()*lenCharList);
            pwd=pwd+charList.charAt(charIdx);
        }
        return pwd;
    }
    const copyToClipBoard=()=>{
        const newTextArea=document.createElement('textarea');
        newTextArea.innerText=password;
        document.body.appendChild(newTextArea);
        newTextArea.select();
        document.execCommand('copy');
        newTextArea.remove();
    }
    const handleCopy=(e)=>{
        if(password===''){
            notify('Nothing to Copy',true)
        }else{
            copyToClipBoard();
            notify(COPY_MSG);
        }
    }
    
    
  return (
    <>
        <h3 className='div'>Divyanshu Varshney</h3>
    <div className="generator">
        <h2 className="generator_header">Password generator</h2>
        <div className="generator_password">
            <h3>{password}</h3>
            <button className='copyBtn' onClick={handleCopy}>
                <i className="fa-solid fa-copy"></i>
            </button>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
        <div className="form-group">
            <label htmlFor="password-strength">Password Length</label>
            <input defaultValue={passwordLength} onChange={(e)=>setpasswordLength(e.target.value)} type="number" id='password-strength' name='password-strength' max='20' min='10'/>
        </div>
        <div className="form-group">
            <label htmlFor="upperCase">Include uppercase</label>
            <input checked={includeUpperCase} onChange={(e)=>setincludeUpperCase(e.target.checked)} type="checkbox" id='upperCase' name='upperCase' max='20' min='10'/>
        </div>
        <div className="form-group">
            <label htmlFor="lowerCase">Include Lowercase</label>
            <input checked={includeLowerCase} onChange={(e)=>setincludeLowerCase(e.target.checked)} type="checkbox" id='lowerCase' name='lowerCase' max='20' min='10'/>
        </div>
        <div className="form-group">
            <label htmlFor="numbers">Include Numbers</label>
            <input checked={includeNumbers} onChange={(e)=>setincludeNumbers(e.target.checked)}  type="checkbox" id='numbers' name='numbers' max='20' min='10'/>
        </div>
        <div className="form-group">
            <label htmlFor="symbols">Include Symbols</label>
            <input checked={includeSymbols} onChange={(e)=>setincludeSymbols(e.target.checked)} type="checkbox" id='symbols' name='symbols' max='20' min='10'/>
        </div>
        <button onClick={handleClick} className="generatorBtn">Generate</button>
    </div>
    </>
  )
}

export default Generator;