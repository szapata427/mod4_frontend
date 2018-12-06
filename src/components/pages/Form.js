import React, { Component } from 'react'



class Form extends Component {
  state = {
    title: "",
    date: null,
    description: "",
    location: ""


  }

  changeHandler = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

onSubmitHandler = (e, info) => {
  e.preventDefault()
  this.props.moment(info)

}

  render() {
    return (
    <form onSubmit={(e) => this.onSubmitHandler(e, this.state)}>
      <input type="text" name="title" placeholder="Title" onChange={this.changeHandler}/>
      <br></br>
      <input type="date" name="date" placeholder="Date" onChange={this.changeHandler}/>
      <br></br>
      <textarea name="description" placeholder="Description" onChange={this.changeHandler}/>
      <br></br>
      <textarea name="location" placeholder="Location" onChange={this.changeHandler}/>
      <br></br>
      <button>Submit</button>

    </form>
  )
  }
}


export default Form;
