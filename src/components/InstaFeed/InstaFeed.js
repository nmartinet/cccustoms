import React from 'react';
import $ from 'jquery';

if (process.env.BROWSER) require('./style.scss');


const renderCaption = (text, link) => {
  var arr = text
              .split(/([#@]?[a-zA-Z0-9]+)/)
              .filter((txt) => !(txt.length === 0))
              .map((txt) => {
                if (txt[0] === '#') {
                  let tag = txt.substring(1);
                  let url = `https://www.instagram.com/explore/tags/${tag}/`

                  return (
                    <a href={url}>{txt}</a>
                  )
                }

                if (txt[0] === '@') {
                  let user = txt.substring(1);
                  let url = `https://www.instagram.com/${user}/`

                  return (
                    <a href={url}>{txt}</a>
                  )
                }
                return txt
              })
  
  return (
    <div className="picture-caption">
      <div className="caption-wrapper">
        <a className="link" href={link}>
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
        <div>
          {arr}
        </div>
        

      </div>
    </div>
  )
}

class Picture extends React.Component {
  render(){
    let {picture} = this.props;
    let caption = picture.caption ? picture.caption.text : "";
    let url = picture.images.standard_resolution.url;
    
    return (
      <div key={picture.id} className="picture">
        <a href={picture.link}>
          <img src={url} alt={ caption} caption={caption} />
        </a>
        { renderCaption(caption, picture.link) }
      </div>
    );
  }
}

class PictureList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: []
    };
  }

  componentDidMount() {
    let token = '4097059002.1677ed0.fc85b99c4cd04292a1d3d8b6001d9d85'
    let count = 4;
    let self = this;
    let url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}&count=${count}`;
    
    $.ajax({
      url: url,
      jsonp: "callback",
      dataType: "jsonp",
      data: { format: "json"},
      success: function( response ) {
        if(!response || !response.data || !response.data.length)
          return;
      
        self.setState({pictures: response.data})
      }
    });
  }

  render() {
    let {pictures} = this.state;
    
    if(!pictures.length){
      return (
        <div className="picture-list">
          No pictures :(
        </div>
      )
    };

    return (
      <div className="picture-list">
        {this.state.pictures.map((pic) => <Picture key={pic.id} picture={pic} />)}
      </div>
    ) 
  }
}

class InstaFeed extends React.Component {
  render(){
    return (
      <div className="instagram-feed">
        <PictureList />
      </div>
    )
  }
}

export default InstaFeed;