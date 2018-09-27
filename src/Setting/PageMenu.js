import React, { Component } from 'react'
import './PageMenu.css'
var $ = require("jquery");
class Page extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
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
        this.props.callback(true);
        console.log('The link was clicked.');
    }
  render() {
    return (
        <div className="wrapper">

            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>BreadBoard</h3>
                    <p className="text-white-50">Dashboard for IoT</p>
                </div>

                <ul className="list-unstyled components">
                    
                    <li className="active">
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">pages</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            <li><a href="">Page 1</a></li>
                            <li><a href="">Page 2</a></li>
                            <li><a href="">Page 3</a></li>
                        </ul>
                    </li>
                </ul>

                <ul className="list-unstyled CTAs">
                    <li><a className="article" onClick={this.handleClick}>Setting</a></li>
                </ul>
            </nav>
        </div>
    )
  }
}

export default Page
