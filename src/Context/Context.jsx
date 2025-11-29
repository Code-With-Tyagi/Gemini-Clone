import { createContext } from "react";
import { useState } from "react";
import main from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typing animation
  function delayPara(index, nextWord) {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  }

  const newChat=function(){
    setLoading(false);
    setShowResult(false);
  }



  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);


    let response;

    if(prompt!==undefined){
        response = await main(prompt);
        setRecentPrompt(prompt);
    }

    else{
        setPrevPrompts(prev=>[...prev,input])
        setRecentPrompt(input)
        response=await main(input)
    }

    

    // ---- Format Gemini output ----
    let boldParsed = "";
    const boldParts = response.split("**");

    for (let i = 0; i < boldParts.length; i++) {
      boldParsed += i % 2 === 1 ? "<b>" + boldParts[i] + "</b>" : boldParts[i];
    }

    let formatted = boldParsed
      .replace(/\*\*(.*?)\*\*/g, "<h3>$1</h3>")
      .replace(/\n?\d+\.\s/g, "<br>$&")
      .replace(/\n?\-\s/g, "<br>• ")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(/\n/g, "<br>");

    let words = formatted.split(" ");

    words.forEach((word, index) => {
      delayPara(index, word + " ");
    });

    setTimeout(() => {
      setLoading(false);
    }, words.length * 75);

    setInput("");
  };

  const contextValue = {
    prevPrompts,
    onSent,
    recentPrompt,
    showResult,
    setRecentPrompt,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
