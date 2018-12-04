import React, { Component } from 'react'


class Form extends Component {
  state = {
    title: "",
    date: null,
    description: ""


  }

  changeHandler = (event) => {
    event.preventDefault()
    this.setState({

      [event.target.name]: event.target.value
    }, () => console.log(this.state))
  }

onSubmitHandler = (event) => {
  event.preventDefault()
  console.log(event)
}

  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={this.changeHandler}/>
      <br></br>
      <input type="date" name="date" placeholder="Date" onChange={this.changeHandler}/>
      <br></br>
      <textarea name="description" placeholder="Description" onChange={this.changeHandler}/>
      <br></br>
      <button>Submit</button>
    </form>
  )
  }
}


export default Form;
