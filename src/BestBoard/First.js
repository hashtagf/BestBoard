import React, { Component } from 'react'
import './Main.css'
import Logo from './logo.png'
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import PageStore from '../store/PageStore'
import Store from '../store/Store'
import { observer } from 'mobx-react'

class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    //PageStore.getPages()
  }
  handleClickAdditem = (e) => {
    Store.addPage = true
  }
  render() {
    return (
      <div className="first text-center">
        
        <div className="row bg-transparent">
          <div className="container">
            <img src={Logo} alt="" className="logo" />
            <div className="row">
              <span className=" text-center "></span><h6 className="">Select Page</h6>
            </div>
            <div className="row d-flex justify-content-center">
                <ListPage/>
                <div className="rounded-circle pagecircle addpage" onClick={this.handleClickAdditem}>
                  <span className="align-middle ">+</span>
                </div>
            </div>
          </div>
        </div>
        <div className="row">
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

  handleClickpage (pageId,pageName,colorName) {
    Store.currentId = pageId
    Store.pageName = pageName
    Store.setColor(colorName)
  }
  render() {
    let pages = toJS(PageStore.pages);
    var listPage = pages.map((page, index) => {
      //page = Object.values(page)
      console.log(page);
      let objKeypress = {
        index: index,
        pageId: page.id
      }
        return (
            <Link to={'/board/' + page.id} onClick={() => this.handleClickpage(page.id, page.name, page.colorName)} key={page.id}>
              <div className="rounded-circle pagecircle">
                <span className="align-middle">{page.name}</span>
              </div>
            </Link>
        )
      
    })
    return (listPage)
  }
}
  export default First