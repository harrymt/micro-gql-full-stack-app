import React, { useState, useEffect } from 'react';
import './App.css';
import { client } from '../client';
import { gql } from '@apollo/client';

export const App = () => {
  const [data, setData] = useState({
    hello: "",
    loading: false
  })

  useEffect(() => {
    (async () => {
      try {

      const data = await client.query({
        query: gql`
          {
            hello
          }
        `
      })
      setData(data)
    } catch(e) {
      console.error(e);
      setData({...data, error: e})
    }
    })()
  }, [setData])

  return (
    <div className="App">
      <header className="App-header">
        {data.loading && <p>Reading from GQL...</p>}
        {data.hello}
        {data.error && JSON.stringify(data.error)}
      </header>
    </div>
  );
};
