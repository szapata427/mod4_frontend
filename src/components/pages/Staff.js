import React, { Component } from 'react'
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Form from './Form'
import VerticalTimeline from './VerticalTimeline'


class Staff extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    momentArray: []
  }

momentSubmit = (info) => {

fetch('http://localhost:3001/moments', {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify({
    title: info.title,
    description: info.description,
    date: info.date,
    location: info.location,
    user_id: 2

  })
}).then(response => response.json())
.then(data => {
  this.setState({
    momentArray: [...this.state.momentArray, data]
  })
})

}

deleteMoment = (e, info) => {
  e.preventDefault()
  fetch(`http://localhost:3001/moments/${info}`, {
    method: "delete"
  })
    // this.setState({
    //   momentArray:
    // })
let copyArray = [...this.state.momentArray].filter(moment => {
  console.log(moment)
  return moment.id !== info
})

this.setState({
  momentArray: copyArray
})

  }






  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    })

    fetch('http://localhost:3001/moments')
    .then(response => response.json())
    .then(data => {
      this.setState({
          momentArray: data
      })
    })

}




  render() {
const { currentUserEmail, currentUserName } = this.state

return (
    <div>
      <h1> Welcome { currentUserName } </h1>
      <Form moment={this.momentSubmit} />
      <div>
      <br></br>
      </div>
      <VerticalTimeline momentInfo={this.state.momentArray} momentDelete={this.deleteMoment}/>


      </div>

    )
  }
}

export default Staff;
