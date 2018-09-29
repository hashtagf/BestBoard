import React, { Component } from 'react'
import './Settingmenu.css'
class Settingmenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            colorSet: [
                {
                    name: 'native',
                    colors: ['#303E4D','#2C3849','#6698C8','#FFFFFF','#4A5664','#FFFFFF','#94E864','#78AF8F'] 
                },
                {
                    name: 'clean',
                    colors: ['#F8F8FA','#FFFFFF','#CAD1D9','#FFFFFF','#FFFFFF','#383F45','#60D156','#FF8669'] 
                },
                {
                    name: 'farm',
                    colors: ['#0D7E83','#076570','#F79F66','#FFFFFF','#D37C71','#FFFFFF','#F79F66','#F15340'] 
                },
            ]
        }
    }
    componentDidMount() {
        this.setColor(this.props.colorId)
    }
    setColor = (id) => {
        var i = 0
        var colorSet = this.state.colorSet[id].colors
        document.documentElement.style.setProperty("--themeBG", colorSet[i++]);
        document.documentElement.style.setProperty("--themeBGHover", colorSet[i++]);
        document.documentElement.style.setProperty("--activeItem", colorSet[i++]);
        document.documentElement.style.setProperty("--activeItemText", colorSet[i++]);
        document.documentElement.style.setProperty("--hoverItem", colorSet[i++]);
        document.documentElement.style.setProperty("--textColor", colorSet[i++]);
        document.documentElement.style.setProperty("--activePresence", colorSet[i++]);
        document.documentElement.style.setProperty("--mentionBadge", colorSet[i++]);
    } 
    handleClick = (id) => {
        //e.preventDefault();
        this.setColor(id)
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
                        <a>Color</a>
                        <ul className="list-inline">
                        {this.state.colorSet.map((colors,i) => (
                            <li className="list-inline-item" onClick={this.handleClick.bind(this,i)}>
                                <div className="rounded-circle coloroption" id={'colorset-'+(i+1)}></div>{colors.name}
                            </li>
                        ))} 
                        </ul>
                    </li>
                </ul>

        </div>
    )
  }
}

export default Settingmenu
