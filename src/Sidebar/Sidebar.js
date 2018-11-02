import React, { Component } from 'react'
import './Sidebar.css'
import Settingmenu from './Setting/Settingmenu'
import Pagelist from './Pages'
import Store from '../store/Store'
import LogoPng from '../assets/logo.png'
import Logo from '../assets/bestlogo.svg'

const $ = require("jquery")

class SideBar extends Component {
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
          <div className="sidebar-header text-center">
          
          <a href="/">
            <img src={Logo} alt="" className="logoSide"/>
            <image className="my-svg-alternate logoSide" src={LogoPng} />
          </a>

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

export default SideBar
