import React, { Component } from 'react'
import './PageMenu.css'
var $ = require("jquery");
class Page extends Component {
    constructor (props) {
        super(props);
        this.state = {
            set: this.props.value
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
        this.props.callback(!this.props.value);
        //console.log(this.props.value);
    }
  render() {
    return (
        <div className="wrapper">

            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>BestBoard</h3>
                    <p className="text-white-50">Dashboard for IoT</p>
                </div>

                <ul className="list-unstyled components">
                    
                    <li className="active">
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">pages</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            <li><a href="">Page 1</a></li>
                            <li><a href="">+</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="list-unstyled components">
                    <li>
                        <a>Datasource</a>
                        <ul className="list-unstyled" >
                            <li><a href="">Netpie</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="list-unstyled components">
                    <li>
                        <a>color</a>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <div className="rounded-circle colorset-1 coloroption"></div>
                            </li>
                            <li className="list-inline-item">
                                <div className="rounded-circle colorset-2 coloroption"></div>
                            </li>
                            <li className="list-inline-item">
                                <div className="rounded-circle colorset-3 coloroption"></div>
                            </li>
                            
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
