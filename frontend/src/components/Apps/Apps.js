import React, { Component } from "react";

import axios from "axios";

import "./Apps.css";
import requestsHandler from "../../requestsHandling";
import App from "../App/App";
import GetOneApp from "../GetOneApp/GetOneApp";

class Apps extends Component {
  state = {
    newAppName: "",
    newAppId: "",
    searchAppId: "",
    apps: []
  };

  async componentDidMount() {
    await axios
      .get("http://localhost:5000/api/apps", {
        "Content-Type": "application/json"
      })
      .then(response => {
        const result = requestsHandler(response, null);
        this.setState({ apps: result });
      })
      .catch(error => {
        requestsHandler(null, error);
      });
  }

  addNewApp = async () => {
    if (this.state.newAppName && this.state.newAppId) {
      axios
        .post(`http://localhost:5000/api/apps/${this.state.newAppId}`, {
          name: this.state.newAppName
        })
        .then(response => {
          const result = requestsHandler(response, null);
          let apps = [...this.state.apps];
          apps.push(result);
          this.setState({ apps, newAppId: "", newAppName: "" });
        })
        .catch(err => {
          const error = requestsHandler(null, err);
        });
    }else{
      alert('Please fill in all inputs to add app!')
    }
  };

  render() {
    let displayedApps;
    if (this.state.apps.length > 0) {
      displayedApps = this.state.apps.map(app => {
        return (
          <App
            app={app}
            selectedApp={this.state.selectedApp}
            key={app.id}
            removeApp={apps => this.setState({apps})}
          />
        );
      });
    }
    return (
      <div className="apps">
        <div className="apps-inputs">
          <div className="apps-new-app-input-container">
            <input
              type="text"
              className="apps-new-app-input"
              placeholder="Add New App"
              value={this.state.newAppName}
              onChange={e => {
                this.setState({ newAppName: e.target.value });
              }}
            />
            <input
              type="text"
              className="apps-new-app-input"
              placeholder="Add New ID"
              value={this.state.newAppId}
              onChange={e => {
                this.setState({ newAppId: e.target.value });
              }}
            />
            <button className="apps-new-app-button" onClick={this.addNewApp}>
              Add App
            </button>
          </div>
          <GetOneApp getApp={app => this.setState({ selectedApp: app })} />
        </div>
        <div className="apps-main">
          <div className="apps-main-title-container">
            <h2 className="apps-main-title">Apps</h2>
          </div>
          {displayedApps ? (
            <React.Fragment>{displayedApps}</React.Fragment>
          ) : (
            <p className="apps-main-no-items">
              Sorry, You don't have any apps!
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Apps;
