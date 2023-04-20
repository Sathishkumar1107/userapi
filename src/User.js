
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function User() {
  const [items, setItems] = useState([]);
  let getUserfromLocal = () => {
    const localNames = JSON.parse(localStorage.getItem("localname"));
    if (localNames) {
      setItems(localNames);
    }
  };
  let getUserfromAPI = async () => {
    let res = await axios.get("https://randomuser.me/api");
    localStorage.setItem("localname", JSON.stringify(res.data.results));
    getUserfromLocal();
  };

  useEffect(() => {
    getUserfromAPI();

    //try this for api

    // getUserfromLocal();

    //try this for local names
  }, []);

  useEffect(() => {}, []);
  return (
    <div className="App">
      <h1>User</h1>

      {items &&
        items.map((data, index) => {
          return (
            <div key={index}>
              <h1>{data.name.title + data.name.first + data.name.last}</h1>
              <h1>{data.email}</h1>
            </div>
          );
        })}
      <button onClick={getUserfromAPI}>Reload</button>
    </div>
  );
}
