import React from 'react'
// import FacebookLogin from 'react-facebook-login'
import Store from '../store/Store'
import axios from 'axios'
import Home from './Home'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLogin: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    axios.get(Store.server + '/login/' + token).then(res => {
      Store.user = res.data.payload.authData
      if (Store.user.user != null) {
        Store.isLogin = true
        this.setState({
          isLogin: true
        })
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  responseFacebook(response) {
    console.log(response)
    Store.user = {
      id: response.id,
      name: response.name,
      picture: response.picture
    }
  }

  handleSubmit = () => {
    const { username, password } = this.state
    const payload = {
      user: username,
      pass: password
    }
    axios.post(Store.server + '/login', payload).then(res => {
      console.log(res.data)
      Store.user = res.data.authData
      localStorage.setItem('token', res.data.token)
      if (res.data.token !== null) {
        Store.isLogin = true
        this.setState({
          isLogin: true
        })
      }
      window.location.reload()
    })
  }

  render() {
    const isLogin = this.state.isLogin
    return (
      <div className="Login row justify-content-center">
        <div className="col-6 ">
          {isLogin ?
            <Home /> :
            <div>
              <LoginForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
              <Register/>
            </div>
          }
        </div>
        {/* <FacebookLogin
        appId="542425579430557"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.responseFacebook}
        /> */}
      </div>

    )
  }
}

class LoginForm extends React.Component {
  render() {
    const { handleChange, handleSubmit } = this.props
    return (
      <div className="LoginForm mb-5">
        <div className="headLogin mb-5">
          <h2>Login</h2>
        </div>
        <div className="form-group row">
          <label htmlFor="username" className="col-3 col-form-label">Username : </label>
          <div className="col-9">
            <input type="text" className="form-control" name="username" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-3 col-form-label">Password : </label>
          <div className="col-9">
            <input type="password" className="form-control" name="password" onChange={handleChange} />
          </div>
        </div>
        <div className="buttonLogin">
          <button type="button"
            className="float-right btn btn-lg btn-primary border-0"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    )
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    axios.post(Store.server + '/users', {
      user: this.state.username,
      pass: this.state.password,
      email: this.state.email
    }).then(res => {
      console.log('Sign Up BestBoard Success')
      this.setState({
        username: '',
        password: '',
        email: ''
      })
    })
  }

  render() {
    return (
      <div className="Register mt-5">
        <div className="headLogin mb-5">
          <h2>Sign Up Bestboard</h2>
        </div>
        <div className="form-group row">
          <label htmlFor="username" className="col-3 col-form-label">Username : </label>
          <div className="col-9">
            <input type="text" className="form-control" name="username" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-3 col-form-label">Password : </label>
          <div className="col-9">
            <input type="password" className="form-control" name="password" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-3 col-form-label">Email : </label>
          <div className="col-9">
            <input type="email" className="form-control" name="email" onChange={this.handleChange} />
          </div>
        </div>
        <div className="buttonRegister">
          <button type="button"
            className="float-right btn btn-lg btn-primary border-0"
            onClick={this.handleSubmit}
          >
            Sign Up Bestboard
          </button>
        </div>
      </div>
    )
  }
}

export default Login