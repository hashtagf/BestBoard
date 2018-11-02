/* eslint no-eval: 0 */
import React from 'react'
import NETPIEMicrogear from '../../store/Microgear'
import DatasourceStore from '../../store/DatasourceStore'
import Creatable from 'react-select/lib/Creatable'
import InputText from './InputText'
import date from 'date-and-time';

class FormInputBasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      checkTopic: [],
      selectOption: {},
      listDatasources: DatasourceStore.listsDatasources(),
      manual: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    let now = new Date();
    const formats = ['YYYY/MM/DD HH:mm:ss','ddd MMM DD YYYY','hh:mm A [GMT]Z']
    let strTime = []

    formats.map((format)=>{
      strTime.push({
        label: date.format(now, format)+'',
        value: format
      })
      return 0
    })
    this.setState({
      topics: strTime
    })
    console.log(this.state.topics,strTime)
  }

  handleChange(e) {
    let { value } = this.props.values
    if (e.target.name === 'datasource') {
      this.setState({
        topics: []
      })
      var topicsObj = NETPIEMicrogear.topics[e.target.value]
      if (topicsObj) {
        var topicsAr = Object.values(topicsObj)
        this.setState({
          topics: topicsAr
        })
        if (topicsObj[value]) {
          this.props.values.body = topicsObj[value].value
          this.setState({
            selectOption: {
              label: topicsObj[value].label,
              value: topicsObj[value].value,
            }
          })
        }
      }
    }
    this.props.callback(e)
  }

  handleSelected = (e) => {
    var obj = {
      target: {
        name: 'time',
        value: e.value
      }
    }
    this.props.callback(obj)
  }
  static defaultProps = {
    hiddenTitle: false
  };
  render() {
    let now = new Date();
    const handleChange = this.props.callback
    let values = this.props.values
    let { topics } = this.state
    let valueTime = {
      label: date.format(now, values.time)+'',
      value: values.time
    }
    return (
      <div className="FormInputBasic">
        {(!this.props.hiddenTitle)?<InputText callback={handleChange} title="Title" name="title" value={values.title} />:null}

        <InputText callback={handleChange} title="URL" name="url" value={values.url} />
        <div className="form-group row">
          <label htmlFor="value" className="col-3 col-form-label">
            format time :
            </label>
          <div className="col-9">
            <Creatable
              value={valueTime}
              onChange={this.handleSelected}
              options={topics}
              className="select"
              placeholder='format time'
            />
          </div>
        </div>


      </div>
    )
  }
}



export default FormInputBasic