import React from 'react'
import NETPIEMicrogear from '../../store/Microgear'
import DatasourceStore from '../../store/DatasourceStore'
import Creatable from 'react-select/lib/Creatable'

class FormInputBasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      checkTopic: [],
      selectOption: {},
      listDatasources: DatasourceStore.listsDatasources()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const values = nextProps.values
    console.log('body', values.body)
    this.setState({
      selectOption: {
        label: values.value,
        value: values.body,
        //__isNew__: true
      }
    })
  }


  handleChange(e) {
    let { topics, checkTopic } = this.state
    let { value } = this.props.values
    if (e.target.name === 'datasource') {
      this.setState({
        topics: []
      })
      NETPIEMicrogear.microgear[e.target.value].on('message', (topic, msg) => {
        // console.log('incoming : ' + topic + ' : ' + msg)
        if (topic === value) this.props.values.body = msg + ''
        
        if (!this.state.checkTopic[topic]) {
          checkTopic[topic] = true
          topics.push({
            label: topic,
            value: msg + '',
          })
          this.setState({
            topics: topics,
            checkTopic: checkTopic,
          })
        }
      })
    }
    this.props.callback(e)
  }

  handleSelected = (selectOption) => {
    this.setState({ selectOption })
    
    this.props.values.value = selectOption.label
    this.props.values.body = selectOption.value
  }

  render() {
    const handleChange = this.props.callback
    let values = this.props.values
    let { selectOption, listDatasources, topics } = this.state
    return (
      <div className="FormInputBasic">
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
            Datasource : {console.log(values.datasource)}
          </label>
          <div className="col-9">
            <select className="form-control custom-select" 
              name="datasource" 
              onChange={this.handleChange}
              value={values.datasource}
              readOnly
            >
              <option value="" disabled>Please Select Datasource</option>
              {listDatasources}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="value" className="col-3 col-form-label">
            Value :
          </label>
          <div className="col-9">
            <Creatable
              value={selectOption}
              onChange={this.handleSelected}
              options={topics}
              placeholder='Topic :: /AppID/topic'
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="filter" className="col-3 col-form-label">
            Filter Symbol :
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
            <ButtonIndex selectOption={selectOption}
              handleChange={handleChange}
              filterIndex={values.filterIndex}
              filter={values.filter}
            />
          </div>
        </div>
      </div>
    )
  }
}

class ButtonIndex extends React.Component {

  render() {
    const { filter, filterIndex, handleChange, selectOption } = this.props
    if (selectOption.__isNew__) {
      return (
        <div className="form-group row">
          <label htmlFor="filter" className="col-5 col-form-label">
            Array Index :
          </label>
          <div className="col-7">
            <input type="number"
              className="form-control"
              name="filterIndex"
              value={filterIndex}
              onChange={handleChange}
              min={0}
              placeholder="Index of Array Split"
            />
          </div>
        </div>
      )
    }
    else if (selectOption.value !== undefined) {
      return (
        <div className="Index">
          Example Data ( select Index ) : <br />
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {(selectOption.value.split(filter).map((val, index) =>
              <button
                key={index}
                type="radio"
                className="btn border-right"
                name="filterIndex"
                onClick={handleChange}
                value={index}
              >
                {val}
              </button>
              // <label key={index} class={"btn btn-secondary"}>
              //   <input type="radio"
              //     name="filterIndex"
              //     id={index}
              //     className="btn btn-secondary"
              //     onClick={handleChange}
              //     value={index}
              //     autoComplete="off"
              //   /> {val}
              // </label>
            )
            )}
          </div>
        </div>
      )
    } else return <h4>Index Array</h4>
  }
}

export default FormInputBasic