import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo512.png' // relative path to image 


// The REST API endpoint
const API_URL = 'https://gis2.marc2.org/marcdataapi/api/covidvaccination';

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


  return (
    <div className="wrapper">
      {posts.length > 0 ? (
        <div className="content">
          <svg>
            <g transform="translate(25, 25)">
              <image href={logo} height="350" width="350" />
            </g>
            <text x="130" y="450" font-size="2.25rem">
              <tspan font-weight="bold" fill="red">{maxMO + maxKS}</tspan>
            </text>
          </svg>
        </div>
      ) : (
        <p className="loading">Loading... </p>
      )
      }

    </div >
  );
}

export default App;