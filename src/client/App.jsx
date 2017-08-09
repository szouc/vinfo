import React, { Component } from 'react'

import ContactForm from './component/ContactForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit = (values) => {
    console.log(values)
  }
  render () {
    return (
      <ContactForm onSubmit={this.submit} />
    )
  }
}

export default App
