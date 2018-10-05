import React from 'react'
import NETPIEMicrogear from '../../store/Microgear'
import DatasourceStore from '../../store/DatasourceStore'
import Select from 'react-select'
class FormInputBasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      count: 0,
      checkTopic: [],
      selectOption: {
        value: '',
        label: '',
        body: ''
      },
      listDatasources: DatasourceStore.listsDatasources()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {

  }

  handleChange(e) {
    var { topics, checkTopic, count } = this.state
    console.log(e.target)
    if (e.target.name === 'datasource') {
      this.setState({
        topic: [],
        count: 0,
        checkTopic: []
      })
      NETPIEMicrogear.microgear[e.target.value].on('message', (topic, body) => {
        console.log('incoming : ' + topic + ' : ' + body)
        if (!this.state.checkTopic[topic]) {
          checkTopic[topic] = true
          topics[count++] = {
            value: topic,
            label: topic,
            body: body + ''
          }
          this.setState({
            topic: topics,
            checkTopic: checkTopic
          })
        }
      })
    }
    this.props.callback(e)
  }

  handleSelected = (selectOption) => {
    this.setState({ selectOption })
    this.props.values.value = selectOption.value
    console.log(selectOption)
  }

  render() {
    const handleChange = this.props.callback
    let values = this.props.values
    let { selectOption, listDatasources } = this.state
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="title" className="col-3 col-form-label">
            Title :
            </label>
          <div className="col-9">
            <input
              name="title"
              type="text"
              className="form-control"
              value={values.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="datasource" className="col-3 col-form-label">
            Datasource :
          </label>
          <div className="col-9">
            <select className="custom-select" name="datasource" onBlur={this.handleChange}>
              {listDatasources}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="value" className="col-3 col-form-label">
            Value :
          </label>
          <div className="col-9">
            <Select
              value={selectOption}
              onChange={this.handleSelected}
              options={this.state.topic}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="filter" className="col-3 col-form-label">
            Filter :
          </label>
          <div className="col-2">
            <input
              name="filter"
              type="text"
              className="form-control"
              value={values.filter}
              onChange={handleChange}
            />
          </div>
          <div className="col-7">
            <div class="btn-group" role="group" aria-label="First group">
              <ButtonIndex selectIndex={selectOption.body.split(values.filter)} handleChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ButtonIndex extends React.Component {
  render() {
    const selectIndex = this.props.selectIndex
    const handleChange = this.props.handleChange
    return (selectIndex.map((val, index) =>
      <button
        key={index}
        type="button"
        className={"btn btn-secondary active"}
        name="filterIndex"
        onClick={handleChange}
        value={index}
      >
        {val}
      </button>
    )
    )
  }
}

export default FormInputBasic