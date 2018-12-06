import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';



class Timeline extends Component {

  state = {
    imageArray: [],
    comment: ""
  }

  imageSubmit = (mom) => {
    console.log(mom)
    var myUploadWidget;
     // document.getElementById("upload_widget_opener").addEventListener("click", function() {
    myUploadWidget = window.cloudinary.openUploadWidget({
      cloudName: 'dhtrapttx',
      uploadPreset: 'ajr9rptq'}, (error, result) => {
    this.uploadImage(result, mom)});
    // });
  }

  uploadImage = (result, mom) => {
    console.log("result", result)

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
          moment_id: mom

        })
      }).then(res => res.json())
      .then(data => {
        this.setState({
          imageArray: [...this.state.imageArray, data]

        })
      })
    }
  }


  componentDidMount() {
    fetch('http://localhost:3001/pictures')
    .then(response => response.json())
    .then(data => {
      this.setState({
          imageArray: data
      })
    })
}

commentInput = (event) => {
  // console.log(event)
  console.log(event.target.value)
  this.setState({
    comment: event.target.value
  })
}

commentSubmit = (e, info, id) => {
  e.preventDefault()
  console.log(info.comment)
  fetch(`http://localhost:3001/pictures/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      comment: info.comment
    })
  }).then(response => response.json())
  .then(data => {
    this.setState({
      imageArray: data
    })
  })

  this.setState({
    comment: ""
  })
}

// imageClick = (event, info) => {
//   console.log(event.target, info)
// }

  allImages = (id) => {
    let copyArray = [...this.state.imageArray].filter(img =>  img.moment_id === id)

     return copyArray.map(image => {
      return  <div><img className="moment-image" dataid={image.id} src={image.title} alt="hope it works" onClick={this.imageClick}/>
      <p>Comment: {image.comment}</p>
      <input type ="text" name="comment" placeholder="Comment" onChange={this.commentInput} />
           <button onClick={(e)=> this.commentSubmit(e, this.state, image.id)}>Comment Me</button>
           </div>

      })

  }

  // commentImage = () => {
  //   let images = [...this.state.imageArray].map(img => {
  //     return <div><input type ="text" name="comment" placeholder="Comment" onChange={this.commentInput} />
  //     <button onClick={(e)=> this.commentSubmit(e, this.state, img.id)}>Comment Me</button></div>
  //   })

  // }

  deleteMoment = (e, info) => {
    e.preventDefault()
    this.props.momentDelete(e, info)

  }

  allMoments = () => {

    return this.props.momentInfo.map(mom => {

      return   <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={mom.date}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon=" "
                >
        <h1>Moment Title:</h1><h4 className="vertical-timeline-element-title">{mom.title}</h4>
        <h1>Moment Description:</h1><h4 className="vertical-timeline-element-subtitle">{mom.description}</h4>
      <h1>Moment location:</h1><h4 className="vertical-timeline-element-subtitle">{mom.location}</h4>
        {this.allImages(mom.id)}
        <p>

        </p>
        <CloudinaryContext cloudName="dhtrapttx">
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        <script>cloudinary.setCloudName(dhtrapttx);</script>
        <a href="#" id="upload_widget_opener" onClick={() => this.imageSubmit(mom.id)}>Upload multiple images</a>
        </CloudinaryContext>
        <button onClick={(e) => this.deleteMoment(e, mom.id)}>Delete Your Moment</button>

        </VerticalTimelineElement>
        </VerticalTimeline>
    })
  }


render() {
  console.log(this.state.imageArray)
  return(
  <div>
    {this.allMoments()}
  </div>



)}

}

export default Timeline;
