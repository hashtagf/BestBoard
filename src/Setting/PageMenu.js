import React, { Component } from 'react'
import './PageMenu.scss'
import Settingmenu from './Settingmenu'
import Pagelist from './Pagelist'
var $ = require("jquery");
class Page extends Component {
    componentDidMount() {
        $(document).ready(function() {
            $("#sidebarCollapse").on("click", function() {
              $("#sidebar").toggleClass("active");
              $(this).toggleClass("active");
            });
          });          
    }
    handleClick = (e) => {
        e.preventDefault();
        this.props.callback(!this.props.mode);
    }
  render() {
    return (
        <div className="wrapper">

            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>BestBoard</h3>
                    <p className="text-white-50">Dashboard for IoT</p>
                </div>
                <Pagelist/>
                {(this.props.mode)?<Settingmenu colorId={this.props.colorId}/>:''}
                <ul className="list-unstyled CTAs">
                    <li><a className="article" onClick={this.handleClick}>{(this.props.mode)?'Done':'Setting'}</a></li>
                </ul>
            </nav>
        </div>
    )
  }
}

export default Page
