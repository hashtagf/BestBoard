import React, { Component } from 'react'
import './Pagelist.scss'
class Page extends Component {
    constructor (props) {
        super(props);
        this.state = {
            addPage: false,
            pages: [{name:'page 1'}],
            inputName: '',
            editPage: null,
            selectPage: 0
        }
    }
    handleClick = (e) => {
        e.preventDefault();
        this.props.callback(!this.props.mode);
    }
    handleClickAdditem = (e) => {
        e.preventDefault();
        this.setState({
            addPage: true
        })
    }
    savePage = (id) => {
        let tem = this.state.pages
        if (this.state.inputName !== '') {
            if (id === -1) tem.push({name: this.state.inputName})
            else {
                tem[id] = {name: this.state.inputName}
            }
            this.setState({
                pages: tem,
                addPage: false,
                inputName: '',
                editPage: null,
                selectPage: tem.length-1
            })
        }
    }
    handleChange(e) {
        this.setState({ inputName: e.target.value });
    }
    _handleKeyPress = (id,e) => {
        if (e.key === 'Enter') {
          //console.log('do validate');
          this.savePage(id)
        }
    }
    editPage = (id) => {
        this.setState({ 
            editPage: id,
            inputName: this.state.pages[id].name
        });
    }
    deletePage = (id) => {
        var tem = this.state.pages
        tem.splice(id,1)
        this.setState({ 
            pages: tem,
            selectPage: tem.length
        });
    }
    handleClickpage = (id) => {
        this.setState({ 
            selectPage: id
        });
    }
  render() {
    let addPage = <a onClick={this.handleClickAdditem} className="second"><i className="fas fa-plus-square"></i> new page</a>
    if (this.state.addPage) {
        addPage = <div className="input-group addpage">
            <input type="text" className="form-control addpage border-0 rounded-0 " onBlur={()=>this.savePage(-1)} onKeyPress={this._handleKeyPress.bind(this,-1)} placeholder="new page" aria-label="new page" onChange={ this.handleChange.bind(this) } aria-describedby="button-addon2"/>
            <div className="input-group-append">
              <button className="btn rounded-0 editbtn bg-transparent" type="button" id="button-addon2" onClick={()=>this.savePage(-1)}>
                <i className="fas fa-save"></i>
              </button>
            </div>
        </div>
    }
    let listPage = []
    for (let i = 0; i < this.state.pages.length; i++) {
        var lspage
        if (this.state.editPage !== i) {
            lspage = <li className={(this.state.selectPage===i)?'active':''}><a onClick={()=>this.handleClickpage(i)}>
            <div className="row">
                <div className="col-sm-8">
                {
                this.state.pages[i].name
                }
                </div>
                        <div className="col-sm-2">
                        <i className="fas fa-pen-square editbtn mr-1" onClick={()=>this.editPage(i)}></i>
                        <i className="fas fa-minus-square editbtn" onClick={()=>this.deletePage(i)}></i>
                        </div>
                        </div>
                </a>
            </li>
        }
        else {
            lspage = <div className="input-group addpage">
                <input type="text" className="form-control addpage border-0 rounded-0 " value={this.state.inputName} onBlur={()=>this.savePage(i)} onKeyPress={this._handleKeyPress.bind(this,i)} placeholder="new page" aria-label="new page" onChange={ this.handleChange.bind(this) } aria-describedby="button-addon2" autoFocus/>
                <div className="input-group-append">
                </div>
            </div>
        }
        listPage.push(lspage)
    }
    return (
        <ul className="list-unstyled components">
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-haspopup="true" aria-expanded="false">Pages</a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                    {listPage}
                    <li>{addPage}</li>
                </ul>
            </li>
        </ul>
    )
  }
}

export default Page
