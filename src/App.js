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
  const [loading, showLoading] = useState(false)
  const downloadOption = () => {
    showDropMenu(!dropMenu);
    if (embedCode === true) {
      showEmbedCode(false);
    }
  }

  const imageOptions_High = {
    scale: 20,
    encoderOptions: 1,
    backgroundColor: 'white',
  }
  const downloadPNG_High = () => {
    showLoading(true);
    saveSvgAsPng.saveSvgAsPng(document.getElementById('logoTMA'), 'TwoMillionArmsKC.png', imageOptions_High);
  }
  const imageOptions_Med = {
    scale: 10,
    encoderOptions: 1,
    backgroundColor: 'white',
  }
  const downloadPNG_Med = () => {
    showLoading(true);
    saveSvgAsPng.saveSvgAsPng(document.getElementById('logoTMA'), 'TwoMillionArmsKC.png', imageOptions_Med);
  }
  const imageOptions_Low = {
    scale: 3,
    encoderOptions: 1,
    backgroundColor: 'white',
  }
  const downloadPNG_Low = () => {
    showLoading(true);
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
            degree={(post.RegimenCompleted_Count / 2000000) * 360}
            percentage={((post.RegimenCompleted_Count * 408.45 / 100) / 2000000) * 100}
            count={formatNumber(post.RegimenCompleted_Count)}
            date={post.Date}
          />
        ))}
      </div>
      <div className={`download-option ${dropMenu === true ? "show" : "hide"}`}>
        <button onClick={downloadPNG_Low}>Low Resolution (2040x2040, 343KB)</button>
        <button onClick={downloadPNG_Med}>Medium Resolution (6800x6800, 1.9MB)</button>
        <button onClick={downloadPNG_High}>High Resolution (13600x13600, 5.6MB)</button>
      </div>
      <div className={`embed-code ${embedCode === true ? "show" : "hide"}`}>
        <div className="center-code">
          <h4>copy/paste the following html code into your web page:</h4>
          <hr />
          <code>
            &lt;div style=&quot;position: relative; overflow:hidden; width: 100%; height:100%; padding-top: calc(100% + 60px);&quot;&gt;
            &lt;iframe src=&quot;http://marc-kc.github.io/MARC_tracker_app/&quot;
            style=&quot;position:absolute; transform:translate(0,-60px); overflow: hidden; top: 0; left: 0; bottom: 0; right: 0;&quot; scrolling=&quot;no&quot; height=&quot;100%&quot; width=&quot;100%&quot; frameborder=&quot;0&quot;
            title=&quot;Two Million Arms KC&quot;&gt;&lt;/iframe&gt;&lt;/div&gt;
          </code>
          <hr />
        </div>
      </div>
      <div className={`loading ${loading === true ? "show" : "hide"}`}><h1>loading...</h1></div>
    </>
  );
}

export default App;