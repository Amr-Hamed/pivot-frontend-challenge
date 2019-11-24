import React, { Component } from "react";

import axios from "axios";

import requestsHandler from "../../requestsHandling";
import "./App.css";

class App extends Component {
  removeApp = async appId => {
    if (this.props.selectedApp) {
      if (this.props.selectedApp.id === appId) {
        this.props.selectedApp.id = null;
      }
    }
    await axios
      .delete(`http://localhost:5000/api/apps/${appId}`)
      .then(response => {
        const result = requestsHandler(response);
        this.props.removeApp(result);
      })
      .catch(error => {
        requestsHandler(null, error);
      });
  };

  render() {
    let versions = Object.keys(this.props.app.versions).map(version => {
      return (
        <div
          className={
            this.props.app.versions[version].id === this.props.selectedVersion
              ? "app-item-versions-selected-item"
              : "app-item-versions-item"
          }
          key={this.props.app.versions[version].id}
        >
          <h4 className="app-item-verions-item-id">
            Version ID: {this.props.app.versions[version].id}
          </h4>
          {this.props.app.versions[version].file ? (
            <h6 className="app-item-verions-item-file">
              Version File: {this.props.app.versions[version].file}
            </h6>
          ) : null}
        </div>
      );
    });
    return (
      <div
        className={
          this.props.selectedApp &&
          this.props.selectedApp.id === this.props.app.id
            ? "apps-selected-item"
            : "apps-item"
        }
      >
        <div className="apps-item-data">
          <div className="apps-item-app-data">
            <h4 className="apps-item-name">App Name: {this.props.app.name}</h4>
            <h6 className="apps-item-id">App ID: {this.props.app.id}</h6>
          </div>
          <div className="apps-item-versions-data">{versions}</div>
        </div>
        {this.props.removeApp ? (
          <button
            className="apps-remove-item"
            onClick={() => this.removeApp(this.props.app.id)}
          >
            x
          </button>
        ) : null}
      </div>
    );
  }
}

export default App;
