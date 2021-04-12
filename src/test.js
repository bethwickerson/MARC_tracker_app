import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// The REST API endpoint
const API_URL = 'https://gis2.marc2.org/marcdataapi/api/covidvaccination';
const trackerLogo = '/logo512.png';

function App() {
  // At the beginning, posts is an empty array
  const [posts, setPosts] = useState([]);

  // Define the function that fetches the data from API
  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    console.log(data);
    setPosts(data);
  };
  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  const Missouri = posts
    .filter(post => post.Jurisdiction === 'Missouri')
    .sort((a, b) => a.Date - b.Date)
    //.slice(-1)
    .map((post) => post.RegimenCompleted_Count);

  const Kansas = posts
    .filter(post => post.Jurisdiction === 'Kansas')
    .sort((a, b) => a.Date - b.Date)
    .map((post) => post.RegimenCompleted_Count);

  const maxMO = Math.max(...Missouri)
  const maxKS = Math.max(...Kansas)


  // CREATE IMAGE
  const canvas = useRef();
  let ctx = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth * 2;
    canvasEle.height = canvasEle.clientHeight * 2.3;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
    drawRect();
  }, []);

  // draw rectangle
  const drawRect = () => {
    ctx.font = "90px Arial Black";
    ctx.fillStyle = "red";
    ctx.fillText(maxMO + maxKS, 200, 850);
    ctx.drawImage(trackerLogo, 10, 10, 150, 180);
  }

  return (
    <div className="wrapper">
      {posts.length > 0 ? (
        <div className="content">
          <canvas ref={canvas}></canvas>
        </div>
      ) : (
        <p className="loading">Loading... </p>
      )
      }

    </div>
  );
}

export default App;