import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [title, getTitle] = useState({});
  useEffect(() => {
    fetch("https://my-app-1.10978645473607.workers.dev")
      .then((response) => response?.json())
      .then((data) => {
        console.log(data)
        getTitle({ ...data });
      });
  }, []);
  return (
    <div className="App">
      <h2>12121</h2>
      {title.name}
    </div>
  );
}
export default App;