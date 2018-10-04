import React, { Component } from 'react'
import './Sidebar.css'
import Settingmenu from './Setting/Settingmenu'
import Pagelist from './Pages'
import Store from '../store/Store'
const $ = require("jquery")

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: Store.mode
    }
  }
  componentDidMount() {
    $(document).ready(function () {
      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $(this).toggleClass("active");
      });
    });
  }
  handleClick = (e) => {
    e.preventDefault();
    this.props.clickSetting(!Store.mode)
    this.setState({
      mode: Store.mode
    })
  }
  render() {
    const mode = this.state.mode
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>BestBoard</h3>
            <p className="">Dashboard for IoT</p>
          </div>
          <Pagelist />
          <Settingmenu colorId={this.props.colorId} mode={mode} />
          <ul className="list-unstyled CTAs">
            <li><a className="article" onClick={this.handleClick}>{(mode) ? 'Done' : 'Setting'}</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Page
