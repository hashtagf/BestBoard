import React from 'react'
import FacebookLogin from 'react-facebook-login'
import Store from '../store/Store'

class Login extends React.Component {
  responseFacebook(response) {
    console.log(response)
    Store.user = {
      id: response.id,
      name: response.name,
      picture: response.picture
    }
  }

  render() {
    return (
      <FacebookLogin
        appId="542425579430557"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
    )
  }
}

export default Login