// @flow

import React, { Component } from 'react'

import ContactForm from './component/ContactForm'

class App extends Component {
  submit = (values: {firstName: String, lastName: String, email: String}) => {
    console.log(values)
  }
  render () {
    return (
      <ContactForm onSubmit={this.submit} />
    )
  }
}

export default App
