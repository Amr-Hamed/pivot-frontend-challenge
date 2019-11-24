import React, { Component } from "react";

import axios from "axios";

import requestsHandler from "../../requestsHandling";
import "./GetOneApp.css";

class GetOneApp extends Component {
  state = {
    searchAppId: ""
  };

  getApp = async () => {
    axios
      .get(`http://localhost:5000/api/apps/${this.state.searchAppId}`)
      .then(response => {
        let result = requestsHandler(response, null);
        this.props.getApp(result);
      })
      .catch(error => {
        requestsHandler(null, error);
        this.props.getApp({});
      });
  };

  render() {
    return (
      <div className="apps-search-input-container">
        <input
          type="text"
          className="apps-new-app-input apps-new-app-input-search"
          placeholder="Get One App Using App ID"
          value={this.state.searchAppId}
          onChange={e => {
            this.setState({ searchAppId: e.target.value });
          }}
        />
        <button className="apps-get-app-button" onClick={this.getApp}>
          Get App
        </button>
      </div>
    );
  }
}

export default GetOneApp;
