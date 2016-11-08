import React from 'react';
import marked from 'marked';
import InstaFeed from '../InstaFeed/Instafeed.js';
import servicesData from './servicesData.js'
import $ from 'jquery';


class ScrollToButton extends React.Component {
  onClick(){
    let {scrollTo} = this.props;
    $('html, body').animate({
      scrollTop: $(scrollTo).offset().top
    }, 500, 'swing');
  }

  render(){
    let {text} = this.props;
    return(
      <div className="button">
        <a onClick={this.onClick.bind(this)}>
          {text}
        </a>
      </div>
    ); 
  }


}

class NavBar extends React.Component {
  render(){
    return (
      <div id="navigation">
        <nav>
          <ScrollToButton text="Services" scrollTo="#services" /> 
          <ScrollToButton text="Contact" scrollTo="#contact" /> 
        </nav>
      </div>
    );
  }
}

class Welcome extends React.Component {
  render(){
    return(
      <section id="welcome">
        <div className="landing">
          <div className="logo">
            <img src={require("./logo-b.png")} />
          </div>
        </div>
        <div className="intro">
          <div className="content-container">
            <div className="content">
               <h2>Hello, what have we here?</h2>    
              <div>
                Got a problem with your guitar or bass?

                My name is Ryan, and I&#39;ve been obsessed with guitars most of my life. I began
                playing at age 11, and building at age 16. What started as curiosity quickly turned
                into obsession, and then into a labour of love.
                Your guitar is your baby, and you could only really take it to someone you trust. I get
                that, and feel the same way, which is why I started doing my own repairs many
                years ago! I take the utmost care with each instrument that visits my workbench,
                and pay close attention to every detail, like they were my own babies.
              </div>

              <div className="call-to-action">
                <ScrollToButton text="Get in touch" scrollTo="#contact" />
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}


class Service extends React.Component {
  render(){
    let {title, subtitle, price, desc} = this.props.service;
    let {i} = this.props;

    return (
      <div className={`service guit${i+1}`}>
          <header>
            <div className="content">
              <h2>
                {title}
              </h2>
              <h3>
                {subtitle}
              </h3>
            </div>
          </header>
          <div className="content-wrapper">
            <div className="content">
              <div className="description" dangerouslySetInnerHTML={ {__html: marked(desc)}}>
              </div>
              <div className="price">
                <div className="wrapper">
                  {price}
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

class ServiceList extends React.Component {
  render(){
    return (
      <div className="service-list">
        {servicesData.map((s, i) => {
          return (
            <div key={i}>
              <Service service={s} i={i} />
            </div>
          );
        })}
      </div>
    )
  }
}

class Services extends React.Component {
  render(){
    return (
      <section id="services">
        <div className="container">
          <header>
            <h2>
              I know what she means to you
            </h2>
            <h3>
              I&#39;ll take good care of her
            </h3>
          </header>
          <div className="content">
            <p>
            
              From simple restringing to comprehensive setups, fretwork, and electronics, the
              whole point of what I do is to make your guitar or bass the best it can be. If you
              need a repair, modification or other work that is not listed here, please don’t
              hesitate to contact me for a quote or consultation.
            </p>
            <div className="call-to-action">
              <ScrollToButton text="Get in touch" scrollTo="#contact" />
            </div>
          </div>
        </div>
        <ServiceList />
      </section>
    );
  }
}



class Contact extends React.Component {
  render(){
    return (
      <section id="contact">
        <div className="container">
          <header>
            <h2>Get in touch</h2>
          </header>
          <div className="content">
            Cloud City Customs is located in Montreal in the Notre-Dame de Grace neighbourhood. If you have any questions, concerns, or to make an appointment, please email me or use the form below. I am also available from 9am to 8pm by phone.<div className="contact-list">
              <div className="item">
                <a href="tel:+15149229732">
                  <div className="icon"><i className="fa fa-phone" aria-hidden="true"></i></div>
                  <div className="info">514.922.9732</div>
                </a>
              </div>
              <div className="item">
                <a href="mailto:cloudcitymtl@gmail.com">
                  <div className="icon"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                  <div className="info">cloudcitymtl@gmail.com</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

class Social extends React.Component {
  render() {
    return (
      <section id="social">
        <div className="container">
          <header>
            <h2>Follow us on social media</h2>
          </header>

          <div className="social-list">
            <div>
              <a href="https://www.instagram.com/cloudcitycustoms/">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>

            <div>
              <a href="https://www.instagram.com/cloudcitycustoms/">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </div>
          </div> 
        </div>
        <InstaFeed />  
      </section>
    )
  }
}

class Footer extends React.Component {
  render(){
    return (
      <div className="footer">
        <div className="container">
          <p>&copy;2016  Cloud City Customs</p>
          <p>design by <a href="https://nmartinet.github.io">Nicolas Martinet</a></p> 
        </div>
      </div>
    );
  }
}

class FrontPage extends React.Component {
  render() {
    return (
      <div>{/*main*/}
        <NavBar />
        <Welcome />
        <Services />
        <Contact />
        <Social />
        <Footer />
      </div>
    );
  }
}

export default FrontPage