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
    console.log(data);
    setPosts(data);
  };
  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  const TotalVaccinatedData = posts
    .map((post) => post.RegimenCompleted_Count);

  return (
    <div className="wrapper">
      {posts.length > 0 ? (
        <div className="content">
          <div>
            <button onClick={handleClick}>Download Image</button>
          </div>
          <div>
            <LogoTracker
              count={TotalVaccinatedData.toLocaleString('ar-US')}
            />
          </div>
        </div>
      ) : (
        <p className="loading">Loading... </p>
      )
      }

    </div >
  );
}

export default App;