import React from 'react';
import $ from 'jquery';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      messagetype: "0",
      phone: "",
      message: "",
      alert: false,
      success: false
    }
  }

  handleChange(key, event) {
    let obj = {};
    obj[key] = event.target.value;
    this.setState({[key]: event.target.value})
  }

  onSend(){
    let self = this;
    let {name, email, messagetype, phone, message} = this.state;
    let nulls = [];

    if (!name || !name.length) nulls.push("Name");
    if (!email || !email.length) nulls.push("Email");
    if (!name || !name.length) nulls.push("Name");
    if (!message || !message.length) nulls.push("Message");

    if(nulls.length != 0){
      let missing = nulls.reduce((a, b) => `${a}, ${b}`)
      let message = `${missing} cannot be empty`;
      self.setState({
        alert: message,
        success: false
      })
    } else {
      this.setState({alert: false, success: true})
    }

     $.ajax({
        type: "POST",
        url: "/sendMail",
        data: JSON.stringify(this.state),
        contentType: 'application/json',
        complete: function (resp) { 
          if (resp.status == 200) {
            this.setState({success: true});
          } else {
            this.setState({alert: "Couldn't send mail. Try again later"})
          }
        }
      });



  }

  render(){
    let {alert, success} = this.state;
    var alertMessage = null;
    var successMessage = null;

    if(alert){
      alertMessage = (
        <div className="form-message error">
          {alert}
        </div>
      )
    }

    if(success && !alert){
      successMessage = (
        <div className="form-message success">
          Message sent successfully
        </div>
      )
    }


    return (
      <div className="contact-form-wrapper">
        {alertMessage}
        {successMessage}
        <form id="contact-form">
          <div className="form-group">
            <div className="icon">
              <i className="fa fa-male"></i>
            </div>
            <input 
              id="name"
              type="text"
              placeholder="name *" 
              value={this.state.name} 
              onChange={this.handleChange.bind(this, "name")}/>
          </div>

          <div className="form-group">
            <div className="icon">
              <i className="fa fa-envelope"></i>
            </div>
            <input 
              id="email" 
              type="text" 
              placeholder="email *"
              value={this.state.email}
              onChange={this.handleChange.bind(this, "email")}/>
          </div>

          <div className="form-group">
            <div className="icon">
              <i className="fa fa-question"></i>
            </div>
            <select 
              id="name" 
              type="text" 
              placeholder="phone number"
              value={this.state.messageType}
              onChange={this.handleChange.bind(this, "messageType")}>
                
                <option value="0">Apointment</option>
                <option value="1">Quote</option>
                <option value="2">Other</option>
            </select>
          </div>

          <div className="form-group">
            <div className="icon">
              <i className="fa fa-mobile"></i>
            </div>
            <input 
              id="name"
              type="text"
              placeholder="phone number"
              vlaue={this.state.phone}
              onChange={this.handleChange.bind(this, "phone")}/>
          </div>

          <div className="form-group">
            <div className="icon">
              <i className="fa fa-pencil"></i>
            </div>
            <textarea 
              id="message" 
              placeholder="message *"
              value={this.state.message}
              onChange={this.handleChange.bind(this, "message")}>
            </textarea>
          </div>

          <input 
            className="button"
            id="submit" 
            type="button" 
            value="send"
            onClick={this.onSend.bind(this)} />
          
        </form>
      </div>
    )
  }

}