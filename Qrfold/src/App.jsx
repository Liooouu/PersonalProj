import { useState } from "react";
import {QRCodeCanvas} from "qrcode.react";
import {FiDownload, FiCopy, FiCheck, FiX} from "react-icons/fi";
import {BsQrCode} from "react-icons/bs";

function SimpleQrGenerator() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if(!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").
    replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qr-code.png";
    link.click();
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000)
    } catch(err) {
      console.error("Copy Failed", err)
    }
  }

  const handleClear = () => {
    setInputText("");

  }

  return (
    <>
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-200 to-indigo-800">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-black/40 hover:shadow-2xl flex flex-col items-center hover:scale-105 transition-all ease-in-out duration-500">
       <div className="flex flex-col items-center mb-6">
        <div className="w-18 h-18 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-300 to-indigo-900 mb-2">
        
        <BsQrCode className="w-10 h-10 text-white"/>
        </div>

        <h1 className="text-xl font-semibold text-gray-600 mb-1">Qr code generator</h1>
        <p className="text-gray-600 text-sm">Enter text or URL to create a QR code</p>
       </div>

       <textarea 
       value={inputText} 
       onChange={(e) => setInputText(e.target.value)} 
       className="w-full mb-5 px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none resize-none text-gray-700 placeholder-blue-500 shadow-sm transition duration-500"
       />

        <div className="mb-5 flex items-center justify-center w-full">
          <div className="bg-white border border-blue-500 rounded-xl shadow-sm flex items-center justify-center p-4 min-h-[200] w-full">

            {
              inputText.trim() ? (<QRCodeCanvas value={inputText} size={200} className="rounded"/> ) : (<BsQrCode className="w-16 h-16 mb-2 text-gray-300"/>)
            }
            
          </div>
        </div>

        <div className="flex sm:flex-row flex-col w-full gap-3 mb-2">

          <button 
          onClick={handleDownload} 
          disabled={!inputText.trim()} 
          className="flex-1 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition cursor-pointer"
          >
          <FiDownload className="w-4 h-4"/>
          Download
          </button>

           <button 
           onClick={handleCopy} 
           disabled={!inputText.trim()} 
           className="flex-1 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition cursor-pointer"
           >
            {
              copied ? (<FiCheck className="w-4 h-4 text-green-400"/> ) : (<FiCopy className="w-4 h-4"/>)
            }

            {
              copied ? "Copied!" : "Copy"
            }
          </button>

          <button 
          onClick={handleClear} 
          disabled={!inputText.trim()} 
          className="flex-1 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition cursor-pointer"
          >
          <FiX 
          className="w-4 h-4"
          />
          Clear
          </button>

        </div>

      </div>
    </div>  
  </>
  )
}

export default SimpleQrGenerator

