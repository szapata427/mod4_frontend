import React, { Component } from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Form from './Form'


class Staff extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    imageArray: []
  }


imageSubmit = () => {
  var myUploadWidget;
   // document.getElementById("upload_widget_opener").addEventListener("click", function() {
  myUploadWidget = window.cloudinary.openUploadWidget({
    cloudName: 'dhtrapttx',
    uploadPreset: 'ajr9rptq'}, (error, result) => {
  this.uploadImage(result)});
  // });
}

uploadImage = (result) => {
  if (result.event === "success") {
    fetch('http://localhost:3001/pictures', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        title: result.info.secure_url,
        comment: "",
        date: null,
        moment_id: 1
      })
    }).then(res => res.json())
    .then(data => {
      this.setState({
        imageArray: [...this.state.imageArray, result.info.secure_url]

      })
    })
  }
}

  componentDidMount() {
    var image;
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    })
    // var myUploadWidget;
    //  document.getElementById("upload_widget_opener").addEventListener("click", function() {
    // myUploadWidget = window.cloudinary.openUploadWidget({
    //   cloudName: 'dhtrapttx', uploadPreset: 'ajr9rptq'}, (error, result) => {
    //     // this.setState({
    //     //   currentImg: result.info.secure_url
    //     // })
    //     console.log(error, result.info.url)
    //     });
    // },false);
    // console.log(result.info)

// var widget = window.cloudinary.createUploadWidget({cloudName: 'dhtrapttx', uploadPreset: 'ajr9rptq'},
// (error, result) => {console.log(result)}
// );
// widget.open();
}


  render() {
    const { currentUserEmail, currentUserName } = this.state

return (
    <div>
      <h1> Welcome { currentUserName } </h1>
      <Form />
      <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
      <script>cloudinary.setCloudName(dhtrapttx);</script>
      <a href="#" id="upload_widget_opener" onClick={this.imageSubmit}>Upload multiple images</a>
      <p>Add to your timeline: </p>
      <CloudinaryContext cloudName="dhtrapttx">
      <div>
      <Image publicId="klohucao7vrmsxq0f05d" width="500" />
      </div>
      <Image publicId="tu14jajvzbnacpc0i89v" width="250" />
      <Image publicId="be04f0i5zsxcudauijau" width="250" />
      <Image publicId="o5cuohlxhmmm3l67kzhr" width="250" />
      </CloudinaryContext>
      </div>

    )
  }
}

export default Staff;
