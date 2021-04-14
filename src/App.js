import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo512.png' // relative path to image 


// The REST API endpoint
const API_URL = './TotalVaccinatedData.json';

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

  const TotalVaccinatedData = posts
    .map((post) => post.RegimenCompleted_Count);

  return (
    <div className="wrapper">
      {posts.length > 0 ? (
        <div className="content">
          <svg>
            <g transform="translate(25, 25)">
              <image href={logo} height="350" width="350" />
            </g>
            <text x="130" y="450" font-size="2.25rem">
              <tspan font-weight="bold" fill="red">{TotalVaccinatedData}</tspan>
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