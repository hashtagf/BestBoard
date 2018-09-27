import React, { Component } from 'react'
import './PageMenu.css'
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
  render() {
    return (
        <div className="wrapper">

        <nav id="sidebar">
        <div className="sidebar-header">
        <h3>Bootstrap Sidebar</h3>
        </div>

        <ul className="list-unstyled components">
        <p>Dummy Heading</p>
        <li className="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
            <li><a href="">Home 1</a></li>
            <li><a href="">Home 2</a></li>
            <li><a href="">Home 3</a></li>
            </ul>
        </li>
        <li>
            <a href="">About</a>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
            <li><a href="">Page 1</a></li>
            <li><a href="">Page 2</a></li>
            <li><a href="">Page 3</a></li>
            </ul>
        </li>
        <li>
            <a href="">Portfolio</a>
        </li>
        <li>
            <a href="">Contact</a>
        </li>
        </ul>

        <ul className="list-unstyled CTAs">

        <li><a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to the article</a></li>
        </ul>
    </nav>


    </div>
    )
  }
}

export default Page
