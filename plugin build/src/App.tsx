
import React, { useState, useEffect } from "react";
import "./App.css";
import { getCurrentTabUId, getCurrentTabUrl, getUrlDomain } from "./chrome/utils";
import { ChromeMessage, Sender } from "./types";

function App() {
  const [url, setUrl] = useState<string>("");
  const [website, setWebsite] = useState<string>("");


  /**
   * Get current URL
   */
  useEffect(() => {
    getCurrentTabUrl((url) => {
      setUrl(url || "undefined");
    });
    // let domain = getUrlDomain(url);

  }, []);

  useEffect(() => {
    //getUrlDomain((url) => {
    //  setWebsite(url || "undefined"); 
    //})
  }, []);

  return (
    <div className="App">
      <div className="URL">{url}</div>
      <header className="App-header">
        <div className="site">
          <h1>Site atual</h1>
          <p className="websiteName">{getUrlDomain(url)}</p>
        </div>
      </header>
    </div>
  );
}

export default App;