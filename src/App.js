/*
import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

// The REST API endpoint
//const API_URL = 'https://gis2.marc2.org/marcdataapi/api/covidvaccination';
// https://official-joke-api.appspot.com/random_joke

const App = () => {
  const [joke, setJoke] = useState("");

  const getJoke = () => {
    axios.get("https://gis2.marc2.org/marcdataapi/api/covidvaccination").then(
      (response) => {
        console.log(response);
        //setJoke("<h1>" + response.data);
      }
    );
  };

  return (
    <div className="wrapper">
      <button onClick={getJoke}>get joke</button>
      <div dangerouslySetInnerHTML={{ __html: joke }} />
    </div>
  );
};

export default App;
*/

// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

// The REST API endpoint
const API_URL = 'https://gis2.marc2.org/marcdataapi/api/covidvaccination';

const App = () => {
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

  return (
    <div className="wrapper">
      {posts.length > 0 ? (
        <div className="content">
          <p>Total Missouri: {Math.max(...Missouri)}</p>
          <p>Total Kansas: {Math.max(...Kansas)}</p>
          <h1> Total: {maxMO + maxKS}</h1>
          {posts
            .filter(post => post.Jurisdiction === 'Missouri' || post.Jurisdiction === 'Kansas')
            .sort((a, b) => a.Date - b.Date)
            //.slice(-1)
            .map((post) => (
              <div className="post">
                <small style={{ marginBottom: 0 }}>{post.Jurisdiction} | </small>
                <small>{post.Date} | </small>
                <small>{post.RegimenCompleted_Count}</small>
              </div>
            ))
          }
        </div>
      ) : (
        <p className="loading">Loading... </p>
      )
      }
    </div >
  );
};

export default App;