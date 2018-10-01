import React, { Component } from 'react'
import './Settingmenu.css'
class Settingmenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            colorSet: [
                {
                    name: 'native',
                    colors: ['#2C3849','#303E4D','#6698C8','#FFFFFF','#2e3946','#4A5664','#4A5664','#FFFFFF','#FFFFFF','#94E864','#78AF8F'] 
                },
                {
                    name: 'clean',
                    colors: ['#FFFFFF','#F8F8FA','#e6e6e6','#FFFFFF','#ececec','#f5f5f5','#cfcfcf','#383F45','#4c555e','#FF8669','#FF8669'] 
                },
                {
                    name: 'farm',
                    colors: ['#0D7E83','#076570','#D37C71','#FFFFFF','#096f7a','#076570','#D37C71','#FFFFFF','#FFFFFF','#F79F66','#F15340'] 
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
        document.documentElement.style.setProperty("--borderItem", colorSet[i++]);
        document.documentElement.style.setProperty("--titleItem", colorSet[i++]);
        document.documentElement.style.setProperty("--hoverItem", colorSet[i++]);
        document.documentElement.style.setProperty("--textColor", colorSet[i++]);
        document.documentElement.style.setProperty("--textMute", colorSet[i++]);
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
