import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LogoTrackerEn from './LogoTracker_en'


const saveSvgAsPng = require('save-svg-as-png')
const svgAsPngUri = require('save-svg-as-png')


// The REST API endpoint
const API_URL = './TotalVaccinatedData.json';

export default function English() {

  // At the beginning, posts is an empty array
  const [posts, setPosts] = useState([]);
  const [pngData, setPngData] = useState("loading");
  const [loading, showLoading] = useState(false)

  // download options
  const [dropMenu, showDropMenu] = useState(false);
  const downloadOption = () => {
    showDropMenu(!dropMenu);
    if (embedCode === true) {
      showEmbedCode(false);
    }
  }

  const [embedCode, showEmbedCode] = useState(false);
  const embedOption = () => {
    showEmbedCode(!embedCode);
    if (dropMenu === true) {
      showDropMenu(false);
    }
  }


  // Define the function that fetches the data from API
  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setPosts(data);

    const imageOptions = {
      scale: 3,
      encoderOptions: 1,
      backgroundColor: 'white',
    }
    svgAsPngUri.svgAsPngUri(document.getElementById("logoTMA"), imageOptions).then(uri =>
      setPngData(uri)
    );
  };

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

  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  function formatNumber(num) {
    return num.toLocaleString('en-US')
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
          <LogoTrackerEn
            degree={(post.RegimenCompleted_Count / 2000000) * 360}
            percentage={((post.RegimenCompleted_Count * 408.45 / 100) / 2000000) * 100}
            count={formatNumber(post.RegimenCompleted_Count)}
            date={post.Date}
          />
        ))}
        <img class={`logoPNG ${pngData === "loading" ? "loading" : "load"}`} src={pngData} alt="tracker png" />
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
            &lt;div style=&quot;position: relative; left:50%; transform:translate(-50%,0); overflow:hidden; max-width:500px; max-height:600px; padding-top: calc(100% + 60px);&quot;&gt;
            &lt;iframe src=&quot;http://marc-kc.github.io/MARC_tracker_app/#/&quot;
            style=&quot;position:absolute; top:0; left:50%; transform:translate(-50%,-60px); overflow: hidden; max-width:500px !important; max-height:600px !important&quot;
            scrolling=&quot;no&quot; height=&quot;100%&quot; width=&quot;100%&quot; frameborder=&quot;0&quot; title=&quot;Two Million Arms KC&quot;&gt;&lt;/iframe&gt;

            &lt;a style=&quot;display:block; position:absolute; top: 0; width:100%; text-align:center; padding-top: 100%; font-family: 'Poppins', Arial, Helvetica, sans-serif;text-decoration:none; color: #333; font-size: 13px;&quot;
            href=&quot;https://marc-kc.github.io/MARC_tracker_app/&quot;&gt;Get this tracker for your site
            &lt;img src=&quot;https://marc-kc.github.io/MARC_tracker_app/static/media/expand_more.1afc4c76.svg&quot; width=&quot;14&quot;
            style=&quot;display:inline-block; transform: translate(0, 3px) rotate(-90deg)&quot; title=&quot;link&quot; /&gt;
            &lt;/a&gt;
            &lt;/div&gt;
          </code>
          <hr />
        </div>
      </div>
      <div className={`loading ${loading === true ? "show" : "hide"}`}><h1>loading...</h1></div>
    </>
  );
}