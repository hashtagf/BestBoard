import React, { Component } from 'react'

class Settingmenu extends Component {
    componentDidMount() {      
    }
  render() {
    return (
        <div>
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

        </div>
    )
  }
}

export default Settingmenu
