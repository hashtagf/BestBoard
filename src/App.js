import React, { Component } from 'react'
import './App.css'
import ButtonAdd from './FormWidgets/ButtonAdd'
import Sidebar from './Sidebar/Sidebar'
import Hamburger from './Sidebar/Hamburger'
import Routing from './routes'
import Store from './store/Store'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: Store.mode
    }
  }
  componentWillMount () {
    //var myParam = this.props.location.search.split('board/')[1]
  }
  render() {
    const mode = this.state.mode
    return (
      <div className="App">
        <div className="wrapper">
          <Sidebar clickSetting={this.clickSetting} />
          <div className="content" id="scrollbar-style">
            <Hamburger />
            <Routing />
          </div>
          <ReactCSSTransitionGroup
          transitionName="buttontransition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          {(mode) ? <ButtonAdd /> : null}
          </ReactCSSTransitionGroup>
        </div>
        
      </div>
    )
  }
  clickSetting = (flag) => {
    this.setState({
      mode: flag
    })
    Store.mode = flag
  }
}

export default App
