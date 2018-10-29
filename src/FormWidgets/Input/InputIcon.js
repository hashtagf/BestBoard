import React from 'react'
import fontAwesomeIcons from '../fontawesomeIcons.json'
import Creatable from 'react-select/lib/Creatable'

class InputIcons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      icons: [],
      selectOption: {}
    }
  }
  componentDidMount () {
    let icons = []
    fontAwesomeIcons.icons.map((icon) =>
      icons.push({
        label: icon.split(' ')[1],
        value: icon
      })
    )
    this.setState({
      icons: icons
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectOption: {
        label: nextProps.value.icon,
        value: nextProps.value.icon
      }
    })
  }

  handleSelected = (selectOption) => {
    this.setState({ selectOption })
    this.props.value.icon = selectOption.value
  }

  render() {
    let { icons, selectOption } = this.state
    if (selectOption === null) selectOption = ''
    return (
      <div className="form-group row">
        <label htmlFor="value" className="col-3 col-form-label">
          Select Icon :
          </label>
        <div className="col-7">
          <Creatable
            value={selectOption}
            onChange={this.handleSelected}
            options={icons}
            placeholder='Topic :: Name icons'
          />
        </div>
        <div className="col-2">
          <i className={'fa-2x ' + selectOption.value}></i>
          {/* {(selectOption.value)?<i className={'fa-2x ' + selectOption.value}></i>:<i className="fa-2x fas fa-spinner fa-pulse"></i>} */}
        </div>
      </div>
    )
  }
}
export default InputIcons