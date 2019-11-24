import React, { Component } from "react";

import GetOneApp from "../GetOneApp/GetOneApp";
import App from "../App/App";
import "./Versions.css";
import requestHandler from "../../requestsHandling";
import commonUrl from '../../commonUrl';

import axios from "axios";

class Versions extends Component {
  state = {
    selectedApp: "",
    versionId: ""
  };

  addVersion = () => {
    axios
      .post(
        `${commonUrl}/api/apps/${this.state.selectedApp.id}/${this.state.versionId}`
      )
      .then(response => {
        axios
          .get(`${commonUrl}/api/apps/${this.state.selectedApp.id}`)
          .then(response =>
            this.setState({ selectedApp: requestHandler(response, null), versionId: '' })
          )
          .catch(err => requestHandler(null, err));
      })
      .catch(err => requestHandler(null, err));
  };

  render() {
    return (
      <div className="versions">
        <div className="versions-input">
          <GetOneApp
            getApp={app => {
              Object.keys(app).length !== 0
                ? this.setState({ selectedApp: app })
                : this.setState({ selectedApp: "" });
            }}
          />
          <div className="apps-add-version-container">
            <input
              type="text"
              className="apps-new-app-input apps-new-app-input-search"
              placeholder="Version ID"
              value={this.state.versionId}
              onChange={e => {
                this.setState({ versionId: e.target.value });
              }}
            />
            <button className="apps-get-app-button" onClick={this.addVersion}>
              Add Version
            </button>
          </div>
        </div>
        <div className="apps-main">
          <div className="apps-main-title-container">
            <h2 className="apps-main-title">Apps</h2>
          </div>
          {this.state.selectedApp ? (
            <App app={this.state.selectedApp} />
          ) : (
            <p className="apps-main-no-items">
              Please get app first to add versions!
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Versions;
