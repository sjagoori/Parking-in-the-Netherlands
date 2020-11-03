import React from 'react'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        state: false,
        results: ['loading']
      }
    }
  }

  componentDidMount() {
    console.warn('mounted')
  }

  render() {
    return (
      <>
        <h1>Hello World</h1>
      </>
    )
  }
}