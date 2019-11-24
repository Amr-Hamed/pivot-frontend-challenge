import React, { Component } from "react";
import "./App.css";

import Home from "./components/Home/Home";


class App extends Component {
  state = {
    currentTab: "Files"
  };

  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
