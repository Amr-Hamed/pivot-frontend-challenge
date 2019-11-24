import React, { Component } from "react";

import axios from "axios";
import fileDownload from "react-file-download";

import GetOneApp from "../GetOneApp/GetOneApp";
import App from "../App/App";
import "./Files.css";
import requestHandler from "../../requestsHandling";

class Files extends Component {
  state = {
    selectedApp: "",
    versionId: "",
    selectedVersion: ""
  };

  selectVersion = () => {
    if (this.state.selectedApp) {
      if (this.state.versionId in this.state.selectedApp.versions) {
        this.setState({ selectedVersion: this.state.versionId });
      } else {
        alert("Sorry, No Version with this ID in the app specified!");
      }
    } else {
      alert("PLease select an app first!");
    }
  };

  uploadFile = () => {
    if (this.state.selectedApp) {
      if (this.state.selectedVersion) {
        if (this.state.uploadFile) {
          const formData = new FormData();
          formData.append("file", this.state.uploadFile);
          axios
            .post(
              `http://localhost:5000/api/apps/${this.state.selectedApp.id}/${this.state.selectedVersion}/file`,
              formData,
              {
                headers: {
                  "content-type": "multipart/form-data"
                }
              }
            )
            .then(response => {
              axios
                .get(
                  `http://localhost:5000/api/apps/${this.state.selectedApp.id}`
                )
                .then(response =>
                  this.setState({ selectedApp: requestHandler(response, null) })
                )
                .catch(err => requestHandler(null, err));
            })
            .catch(err => requestHandler(null, err));
        } else {
          alert("PLease select file to upload!");
        }
      } else {
        alert("PLease select the version!");
      }
    } else {
      alert("Please select app first!");
    }
  };

  downloadFile = () => {
    if (this.state.selectedApp) {
      if (this.state.selectedVersion) {
        if (this.state.selectedApp.versions[this.state.selectedVersion].file) {
          axios
            .get(
              `http://localhost:5000${this.state.selectedApp.versions[this.state.selectedVersion].file}`
            )
            .then(response => {
              const result = requestHandler(response, null);
              const splitArray = this.state.selectedApp.versions[
                this.state.selectedVersion
              ].file.split(".");

              fileDownload(
                result,
                `file1.${splitArray[splitArray.length - 1]}`
              );
            })
            .catch(err => requestHandler(null, err));
        } else {
          alert("Sorry, The selected version of the app has no uploaded file!");
        }
      } else {
        alert("PLease select the version!");
      }
    } else {
      alert("Please select app first!");
    }
  };

  render() {
    return (
      <div>
        <div className="files-input">
          <div className="files-app-version-input">
            <GetOneApp
              getApp={app => {
                Object.keys(app).length !== 0
                  ? this.setState({ selectedApp: app })
                  : this.setState({ selectedApp: "" });
              }}
            />
            <div className="apps-select-version-container">
              <input
                type="text"
                className="apps-select-version-input apps-select-version-input-search"
                placeholder="Version ID"
                value={this.state.versionId}
                onChange={e => {
                  this.setState({ versionId: e.target.value });
                }}
              />
              <button
                className="apps-get-app-button"
                onClick={this.selectVersion}
              >
                Select Version
              </button>
            </div>
          </div>
          <div className="files-inputs">
            <div className="apps-select-version-container">
              <input
                type="file"
                className="apps-select-version-input apps-select-version-input-search files-upload-input"
                placeholder="Browse for file"
                value={this.state.fileID}
                onChange={e => {
                  this.setState({ uploadFile: e.target.files[0] });
                }}
              />
              <button className="apps-get-app-button" onClick={this.uploadFile}>
                Upload File
              </button>
            </div>

            <div className="apps-select-version-container">
              <input
                type="text"
                className="apps-new-app-input apps-new-app-input-search "
                placeholder="Download File"
                disabled
              />
              <button
                className="apps-get-app-button"
                onClick={this.downloadFile}
              >
                Download File
              </button>
            </div>
          </div>
        </div>
        <div className="apps-main">
          <div className="apps-main-title-container">
            <h2 className="apps-main-title">Apps</h2>
          </div>
          {this.state.selectedApp ? (
            <App
              app={this.state.selectedApp}
              selectedVersion={this.state.selectedVersion}
            />
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

export default Files;

// <div className="apps-search-input-container">
//   <input
//     type="text"
//     className="apps-new-app-input apps-new-app-input-search"
//     placeholder="Get One App Using App ID"
//     value={this.state.searchAppId}
//     onChange={e => {
//       this.setState({ searchAppId: e.target.value });
//     }}
//   />
//   <button className="apps-get-app-button" onClick={this.getApp}>
//     Get App
//   </button>
// </div>

// <div className="apps-select-version-container">
//   <input
//     type="text"
//     className="apps-select-version-input apps-select-version-input-search"
//     placeholder="Version ID"
//     value={this.state.versionId}
//     onChange={e => {
//       this.setState({ versionId: e.target.value });
//     }}
//   />
//   <button
//     className="apps-get-app-button"
//     onClick={this.selectVersion}
//   >
//     Select Version
//   </button>
// </div>
