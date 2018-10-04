import React, { Component } from 'react'
class ColorSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorId: this.props.colorId,
      colorSet: [{
        name: 'native',
        colors: ['#2C3849', '#303E4D', '#6698C8', '#FFFFFF', '#2e3946', '#4A5664', '#4A5664', '#FFFFFF', '#FFFFFF', '#94E864', '#78AF8F']
      },
      {
        name: 'clean',
        colors: ['#FFFFFF', '#F8F8FA', '#e6e6e6', '#FFFFFF', '#ececec', '#f5f5f5', '#cfcfcf', '#383F45', '#4c555e', '#FF8669', '#FF8669']
      },
      {
        name: 'farm',
        colors: ['#0D7E83', '#076570', '#D37C71', '#FFFFFF', '#096f7a', '#076570', '#D37C71', '#FFFFFF', '#FFFFFF', '#F79F66', '#F15340']
      },
      {
        name: 'farm',
        colors: ['#084278', '#f5f3f3', '#0BB1EF', '#66666A', '#f5f3f3', '#e7e4e4', '#d7d7e2', '#66666A', '#66666A', '#00A9EE', '#0BB1EF']
      },
      {
        name: 'farm',
        colors: ['#e7eaef', '#dadfe9', '#01a398', '#FFFFFF', '#e7eaef', '#45959e', '#79c476', '#0d3340', '#0d3340', '#79c476', '#78AF8F']
      },
      {
        name: 'farm',
        colors: ['#1F313F', '#355263', '#FDD24E', '#FEFEFE', '#1a2833', '#536c7a', '#557486', '#FEFEFE', '#FEFEFE', '#FDD24E', '#fad976']
      },
      ]
    }
  }
  componentDidMount() {
    this.setColor(this.props.colorId)
  }
  setColor = (id) => {
    //id = 2
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
    this.setState({
      colorId: id
    })
  }
  render() {
    return (
        <li>
          <a> Color </a>
          <ul className="list-inline" > {this.state.colorSet.map((colors, i) => (
            <li className="list-inline-item" key={i}
              onClick={this.handleClick.bind(this, i)} >
              <div className={(this.state.colorId === i) ? 'rounded-circle coloroption border-active' : 'rounded-circle coloroption'}
                id={'colorset-' + (i + 1)} >
              </div>
            </li>
          ))}
          </ul>
        </li>
    )
  }
}

export default ColorSetting