import React, { Component } from "react";

import "./HomeTabs.css";

class HomeTabs extends Component {

    state = {
        currentTab : 'Apps'
    }
  render() {
    return (
      <div className="tabs-container">
        <button
          className={
            this.state.currentTab === "Apps" ? "tab selected-tab" : "tab"
          }
          onClick={() => {
            this.props.getTab("Apps");
            this.setState({ currentTab: "Apps" });
          }}
        >
          Apps
        </button>
        <button
          className={
            this.state.currentTab === "Versions" ? "tab selected-tab" : "tab"
          }
          onClick={() => {
            this.props.getTab("Versions");
            this.setState({ currentTab: "Versions" });
          }}
        >
          Versions
        </button>
        <button
          className={
            this.state.currentTab === "Files" ? "tab selected-tab" : "tab"
          }
          onClick={() => {
            this.props.getTab("Files");
            this.setState({ currentTab: "Files" });
          }}
        >
          Files
        </button>
      </div>
    );
  }
}

export default HomeTabs;
