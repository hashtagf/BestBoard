import React, { Component } from 'react'
import './Sidebar.css'
import Settingmenu from './Setting/Settingmenu'
import Pagelist from './Pages'
import Store from '../store/Store'
import Logo from '../assets/logo.png'
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
        $(".sidebar").toggleClass("active");
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
        <nav className="sidebar" id="scrollbar-style" data-spy="scroll">
          <div className="sidebar-header">
           <a href="/"><img src={Logo} alt="" className="logoSide" /></a>
          </div>
          <Pagelist />
          <Settingmenu mode={mode} />
          <ul className="list-unstyled CTAs">
            <li><a className="article btn" onClick={this.handleClick}>{(mode) ? 'Done' : 'Setting'}</a></li>
          </ul>
        </nav>
    )
  }
}

export default Page
