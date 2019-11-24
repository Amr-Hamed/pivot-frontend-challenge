import React, { Component } from "react";

import Header from '../Header/Header'
import HomeTabs from "../HomeTabs/HomeTabs";
import Apps from "../Apps/Apps";
import Versions from "../Versions/Versions";
import Files from "../Files/Files";
import './Home.css';

class Home extends Component {

    state = {
        currentTab : 'Apps'
    }

  render() {
    return (
      <div>
        <Header />
        <HomeTabs getTab={tab => this.setState({ currentTab: tab })} />
        <div className="home-main">
          {this.state.currentTab === "Apps" ? <Apps /> : null}
          {this.state.currentTab === "Versions" ? <Versions /> : null}
          {this.state.currentTab === "Files" ? <Files /> : null}
        </div>
      </div>
    );
  }
}

export default Home;
