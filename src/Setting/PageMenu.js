import React, { Component } from 'react'
import './PageMenu.css'
import Settingmenu from './Settingmenu'
var $ = require("jquery");
class Page extends Component {
    constructor (props) {
        super(props);
        this.state = {
            addPage: false,
            pages: [{name:'page 1'}],
            inputName: ''
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
        this.props.callback(!this.props.mode);
    }
    handleClickAdditem = (e) => {
        e.preventDefault();
        this.setState({
            addPage: true
        })
    }
    savePage = (e) => {
        e.preventDefault();
        let tem = this.state.pages
        tem.push({name: this.state.inputName})
        this.setState({
            pages: tem,
            addPage: false,
            inputName: ''
        })
    }
    handleChange(e) {
        this.setState({ inputName: e.target.value });
    }
  render() {
    let addPage = <a onClick={this.handleClickAdditem}>+</a>
    if (this.state.addPage) {
        addPage = <div className="input-group addpage">
            <input type="text" className="form-control addpage text-light border-0  rounded-0 " placeholder="new page" aria-label="new page" onChange={ this.handleChange.bind(this) } aria-describedby="button-addon2"/>
            <div className="input-group-append">
              <button className="btn rounded-0 text-light bg-transparent" type="button" id="button-addon2" onClick={this.savePage}>
                <i className="fas fa-save"></i>
              </button>
            </div>
        </div>
    }
    let listPage = []
    for (let i = 0; i < this.state.pages.length; i++) {
        listPage.push(<li><a>
        {
          this.state.pages[i].name
        }
        </a></li>)
    }
    return (
        <div className="wrapper">

            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>BestBoard</h3>
                    <p className="text-white-50">Dashboard for IoT</p>
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            {listPage}
                            <li>{addPage}</li>
                        </ul>
                    </li>
                </ul>
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
