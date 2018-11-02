import React, { Component } from 'react'
import './Main.css'
//import Logo from './logo.png'
import Logo from '../assets/bestlogo.svg'
import LogoPng from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import Store from '../store/Store'
import { observer } from 'mobx-react'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="container text-center">
        <img src={Logo} alt="" className="logo"/>
        <image className="my-svg-alternate" src={LogoPng} />

        <div className="jumbotron bg-transparent mb-0">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <h5 className="text-center text-primary">Select Page</h5>
            </div>
            <div className="col"></div>
          </div>
          <ListPage/>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col">How to use ?</div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
}
@observer
class ListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectPage: 0
    }
  }
  handleClickAdditem = (e) => {
    Store.addPage = true
  }
  handleClickpage (pageId,pageName,colorName) {
    Store.currentId = pageId
    Store.pageName = pageName
    Store.setColor(colorName)
  }
  render() {
    
    let pages = toJS(Store.pages);
    var listPage = pages.map((page, index) => {
      //page = Object.values(page)
      return (
          <Link to={'/' + page.id} onClick={() => this.handleClickpage(page.id, page.name, page.colorName)} key={page.id}>
            <div className="rounded-circle pagecircle">
              <span className="text-white">{page.name}</span>
            </div>
          </Link>
      )
      
    })
    return (
      <div className="row d-flex justify-content-center">
          {listPage}
          <a onClick={this.handleClickAdditem}>
          <div className="rounded-circle pagecircle addpage" >
            <span className="align-middle">+</span>
          </div>
          </a>

      </div>
    )
  }
}
  export default Home