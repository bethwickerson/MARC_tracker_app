import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import LogoTracker from './LogoTracker'

const saveSvgAsPng = require('save-svg-as-png')



// The REST API endpoint
const API_URL = './TotalVaccinatedData.json';

function App() {

  // At the beginning, posts is an empty array
  const [posts, setPosts] = useState([]);

  // Define the function that fetches the data from API
  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setPosts(data);
  };
  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  function formatNumber(num) {
    return num.toLocaleString('en-US')
  }

  // download options
  const [dropMenu, showDropMenu] = useState(false);
  const downloadOption = () => {
    showDropMenu(!dropMenu);
    if (embedCode === true) {
      showEmbedCode(false);
    }
  }

  const imageOptions_High = {
    scale: 25,
    encoderOptions: 1,
    backgroundColor: 'white',
  }
  const downloadPNG_High = () => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById('logoTMA'), 'TwoMillionArmsKC.png', imageOptions_High);
  }
  const imageOptions_Med = {
    scale: 15,
    encoderOptions: 1,
    backgroundColor: 'white',
  }
  const downloadPNG_Med = () => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById('logoTMA'), 'TwoMillionArmsKC.png', imageOptions_Med);
  }
  const imageOptions_Low = {
    scale: 5,
    encoderOptions: 1,
    backgroundColor: 'white',
  }
  const downloadPNG_Low = () => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById('logoTMA'), 'TwoMillionArmsKC.png', imageOptions_Low);
  }
  const [embedCode, showEmbedCode] = useState(false);
  const embedOption = () => {
    showEmbedCode(!embedCode);
    if (dropMenu === true) {
      showDropMenu(false);
    }
  }


  return (
    <>
      <div className="header">
        <div className="button-container">
          <button className={`download-open ${dropMenu === true ? "show" : "hide"}`} onClick={downloadOption}>Download PNG</button>
          <button className={`embed-open ${embedCode === true ? "show" : "hide"}`} onClick={embedOption}>Embed Code</button>
        </div>
      </div>
      <div className="content">
        {posts.map(post => (
          <LogoTracker
            percentage={(post.RegimenCompleted_Count / 2000000) * 100}
            count={formatNumber(post.RegimenCompleted_Count)}
            date={post.Date}
          />
        ))}
      </div>
      <div className={`download-option ${dropMenu === true ? "show" : "hide"}`}>
        <button onClick={downloadPNG_Low}>Low Resolution (3500x3500, 658KB)</button>
        <button onClick={downloadPNG_Med}>Medium Resolution (9300x9300, 3.2MB)</button>
        <button onClick={downloadPNG_High}>High Resolution (15500x17000, 7.1MB)</button>
      </div>
      <div className={`embed-code ${embedCode === true ? "show" : "hide"}`}>
        lfdsdfldsflsdjfldsaf
      </div>
    </>
  );
}

export default App;