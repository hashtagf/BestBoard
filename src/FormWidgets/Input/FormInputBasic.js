/* eslint no-eval: 0 */
import React from 'react'
import NETPIEMicrogear from '../../store/Microgear'
import DatasourceStore from '../../store/DatasourceStore'
import Creatable from 'react-select/lib/Creatable'
import InputText from './InputText'
const $ = require("jquery")

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

  componentWillReceiveProps(nextProps) {
    const values = nextProps.values
    this.setState({
      selectOption: {
        label: values.value,
        value: values.body,
      }
    })
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

  handleSelected = (selectOption) => {
    this.setState({ selectOption })
    this.props.values.value = selectOption.label
    this.props.values.body = selectOption.value
  }
  static defaultProps = {
    hiddenTitle: false
  };
  render() {
    const handleChange = this.props.callback
    let values = this.props.values
    let { selectOption, listDatasources, topics } = this.state
    let manual = (values.manual==='false'||!values.manual)?false:true
    return (
      <div className="FormInputBasic">
        {(!this.props.hiddenTitle)?<InputText callback={handleChange} title="Title" name="title" value={values.title} />:null}

        <div className="form-group row">
          <label htmlFor="datasource" className="col-3 col-form-label">
            Datasource :
          </label>
          <div className="col-9">
            <select className="form-control custom-select selectdefault"
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
              className="select"
              placeholder='Topic :: /AppID/topic'
            />
          </div>
        </div>

        <div className="accordion" id="accordionExample">
          <div className="form-group row">
            <label htmlFor="value" className="col-3 col-form-label">
              Apply Value :
              </label>
            <div className="col-9">
              
              <div className="btn-group" role="group" aria-label="Basic example" id="scrollbar-style">
                <button className={(!manual)?'btn btn-primary':'btn'} type="button" name="manual" value={false} data-toggle="collapse" data-target="#collapseAuto" aria-expanded={(!manual)?"true":"false"} aria-controls="collapseAuto" onClick={handleChange}>
                  Automatic 
                </button>
                <button type="button" className="btn or p-1" disabled={true}>
                  /
                </button>
                <button className={(manual)?'btn btn-primary':'btn'} type="button" name="manual" value={true} data-toggle="collapse" data-target="#collapseManual" aria-expanded={(manual)?"true":"false"} aria-controls="collapseManual" onClick={handleChange}>
                  Manual 
                </button>
              </div>
            </div>
          </div>

          <strong className="text-center">{(!manual)?' Automatic':' Manual'}</strong>

          <div id="collapseAuto" className={(!manual)?'collapse show':'collapse'} aria-labelledby="headingOne" data-parent="#accordionExample">
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

          <div id="collapseManual" className={(manual)?'collapse show':'collapse'} aria-labelledby="headingTwo" data-parent="#accordionExample">
            <JsText jsValue={values.jsValue} msg={selectOption.value} name='jsValue' callback={handleChange} placeholder="Enter Javascript" />
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
          <div className="btn-group btn-group-toggle" id="scrollbar-style">
            {(selectOption.value.split(filter).map((val, index) =>
              <button
                key={index}
                type="button"
                className={(parseInt(filterIndex, 10) === index)?'btn btn-primary':'btn'}
                name="filterIndex"
                data-toggle="filterIndex"
                onClick={handleChange}
                value={index}
              >
                {val}
              </button>
            )
            )}
          </div>
        </div>
      )
    } else return <h6>Index Array</h6>
  }
}
class JsText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: ''||this.props.jsValue,
      error: null,
      output: ''
    }
    this.process = this.process.bind(this)
  }
  componentDidMount () {
    $("textarea").keydown(function (e) {
      if (e.keyCode === 9) {
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var $this = $(this);
        $this.val($this.val().substring(0, start)
          + "  "
          + $this.val().substring(end));

        this.selectionStart = this.selectionEnd = start + 2;
        return false;
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.jsValue)
      this.process(nextProps.jsValue)
  }
  process (codeStr) {
    let error = null
    let value = this.props.msg
    try {
      eval(codeStr)
    }
    catch (err) {
      error = err
      console.log(err)
    }
    this.setState({
      code: codeStr,
      error: error,
      output: value
    })
  }
  render() {
    let name = this.props.name
    let placeholder = this.props.placeholder
    return (
      <div className="form-group row">
        <label htmlFor="unit" className="col-3 col-form-label text-capitalize">
          JavaScript :
        </label>
        <div className="col-9">
          function (value) {'{'}
          <textarea
            className={(this.state.error === null) ? 'form-control is-valid' : 'form-control is-invalid text-danger'}
            rows="3"
            name={name}
            value={this.state.code}
            onChange={this.props.callback}
            placeholder={placeholder}
          ></textarea>
          &emsp;return value<br />
          {'}'} result : {this.state.output}
        </div>
      </div>
    )
  }
}

export default FormInputBasic