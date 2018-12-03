import React, { Component } from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


class Staff extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: ''
  }


  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    })
    var myUploadWidget;
     document.getElementById("upload_widget_opener").addEventListener("click", function() {
    myUploadWidget = window.cloudinary.openUploadWidget({
      cloudName: 'dhtrapttx', uploadPreset: 'ajr9rptq'}, (error, result) => {
        console.log(result)});
    }, false);

  }

  render() {
    const { currentUserEmail, currentUserName } = this.state

return (
    <div>
      <h1> Welcome { currentUserName } </h1>
      <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
      <script>cloudinary.setCloudName(dhtrapttx);</script>
      <a href="#" id="upload_widget_opener">Upload multiple images</a>
      <p> Email: { currentUserEmail } </p>
      <p>Add to your timeline: </p>
      <CloudinaryContext cloudName="dhtrapttx">
      <div>
      <Image publicId="klohucao7vrmsxq0f05d" width="500" />
      </div>
      <Image publicId="tu14jajvzbnacpc0i89v" width="250" />
      </CloudinaryContext>
      </div>

    )
  }
}

export default Staff;
