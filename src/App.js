import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import LogoTracker from './LogoTracker'

const saveSvgAsPng = require('save-svg-as-png')

const imageOptions = {
  scale: 10,
  encoderOptions: 1,
  backgroundColor: 'white',
}


// The REST API endpoint
const API_URL = './TotalVaccinatedData.json';

function App() {

  const handleClick = () => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById('logoTMA'), 'TwoMillionArmsKC.png', imageOptions);
  };
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
    return num.toLocaleString('ar-US')
  }

  return (
    <>
      <div className="header">
        <div className="button-container">
          <button onClick={handleClick}>Download  PNG</button>
          <button>Embed Code</button>
        </div>
      </div>
      <div className="content">
        {posts.map(post => (
          <LogoTracker
            count={formatNumber(post.RegimenCompleted_Count)}
            date={post.Date}
          />
        ))}
      </div>
    </>
  );
}

export default App;