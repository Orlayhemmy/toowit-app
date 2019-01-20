import React, { Component, Fragment } from 'react';
import './header.scss';

// components
import Menu from '../Menu/Menu';

class Header extends Component {
  state = {
    data: [],
    defaultSocialMedia: 'Twitter',
    socialMedia: ['Twitter', 'Facebook', 'Instagram'],
    tweetnReplies: [],
    appHeaderStyle: 'twit-class',
    dataState: '',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December']
  };

  render () {
    const { socialMedia, messageTerm, defaultSocialMedia, appHeaderStyle , months} = this.state;
    return (
      <Fragment>
        <div className="app-top">
          <span onClick={this.handleLogout}>
            Logout
            <img src="data:image/svg+xml;base64,
              PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDQ3NS4wODUgNDc1LjA4NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc1LjA4NSA0NzUuMDg1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjM3LjU0NSwyNTUuODE2YzkuODk5LDAsMTguNDY4LTMuNjA5LDI1LjY5Ni0xMC44NDhjNy4yMy03LjIyOSwxMC44NTQtMTUuNzk5LDEwLjg1NC0yNS42OTRWMzYuNTQ3ICAgIGMwLTkuOS0zLjYyLTE4LjQ2NC0xMC44NTQtMjUuNjkzQzI1Ni4wMTQsMy42MTcsMjQ3LjQ0NCwwLDIzNy41NDUsMGMtOS45LDAtMTguNDY0LDMuNjIxLTI1LjY5NywxMC44NTQgICAgYy03LjIzMyw3LjIyOS0xMC44NSwxNS43OTctMTAuODUsMjUuNjkzdjE4Mi43MjhjMCw5Ljg5NSwzLjYxNywxOC40NjQsMTAuODUsMjUuNjk0ICAgIEMyMTkuMDgxLDI1Mi4yMDcsMjI3LjY0OCwyNTUuODE2LDIzNy41NDUsMjU1LjgxNnoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiNGOEY1RjUiPjwvcGF0aD4KCQk8cGF0aCBkPSJNNDMzLjgzNiwxNTcuODg3Yy0xNS4zMjUtMzAuNjQyLTM2Ljg3OC01Ni4zMzktNjQuNjY2LTc3LjA4NGMtNy45OTQtNi4wOS0xNy4wMzUtOC40Ny0yNy4xMjMtNy4xMzkgICAgYy0xMC4wODksMS4zMzMtMTguMDgzLDYuMDkxLTIzLjk4MywxNC4yNzNjLTYuMDkxLDcuOTkzLTguNDE4LDE2Ljk4Ni02Ljk5NCwyNi45NzljMS40MjMsOS45OTgsNi4xMzksMTguMDM3LDE0LjEzMywyNC4xMjggICAgYzE4LjY0NSwxNC4wODQsMzMuMDcyLDMxLjMxMiw0My4yNSw1MS42NzhjMTAuMTg0LDIwLjM2NCwxNS4yNyw0Mi4wNjUsMTUuMjcsNjUuMDkxYzAsMTkuODAxLTMuODU0LDM4LjY4OC0xMS41NjEsNTYuNjc4ICAgIGMtNy43MDYsMTcuOTg3LTE4LjEzLDMzLjU0NC0zMS4yNjUsNDYuNjc5Yy0xMy4xMzUsMTMuMTMxLTI4LjY4OCwyMy41NTEtNDYuNjc4LDMxLjI2MWMtMTcuOTg3LDcuNzEtMzYuODc4LDExLjU3LTU2LjY3MywxMS41NyAgICBjLTE5Ljc5MiwwLTM4LjY4NC0zLjg2LTU2LjY3MS0xMS41N2MtMTcuOTg5LTcuNzEtMzMuNTQ3LTE4LjEzLTQ2LjY4Mi0zMS4yNjFjLTEzLjEyOS0xMy4xMzUtMjMuNTUxLTI4LjY5MS0zMS4yNjEtNDYuNjc5ICAgIGMtNy43MDgtMTcuOTktMTEuNTYzLTM2Ljg3Ny0xMS41NjMtNTYuNjc4YzAtMjMuMDI2LDUuMDkyLTQ0LjcyNCwxNS4yNzQtNjUuMDkxYzEwLjE4My0yMC4zNjQsMjQuNjAxLTM3LjU5MSw0My4yNTMtNTEuNjc4ICAgIGM3Ljk5NC02LjA5NSwxMi43MDMtMTQuMTMzLDE0LjEzMy0yNC4xMjhjMS40MjctOS45ODktMC45MDMtMTguOTg2LTYuOTk1LTI2Ljk3OWMtNS45MDEtOC4xODItMTMuODQ0LTEyLjk0MS0yMy44MzktMTQuMjczICAgIGMtOS45OTQtMS4zMzItMTkuMDg1LDEuMDQ5LTI3LjI2OCw3LjEzOWMtMjcuNzkyLDIwLjc0NS00OS4zNDQsNDYuNDQyLTY0LjY2OSw3Ny4wODRjLTE1LjMyNCwzMC42NDYtMjIuOTgzLDYzLjI4OC0yMi45ODMsOTcuOTI3ICAgIGMwLDI5LjY5Nyw1LjgwNiw1OC4wNTQsMTcuNDE1LDg1LjA4MmMxMS42MTMsMjcuMDI4LDI3LjIxOCw1MC4zNCw0Ni44MjYsNjkuOTQ4YzE5LjYwMiwxOS42MDMsNDIuOTE5LDM1LjIxNSw2OS45NDksNDYuODE1ICAgIGMyNy4wMjgsMTEuNjE1LDU1LjM4OCwxNy40MjYsODUuMDgsMTcuNDI2YzI5LjY5MywwLDU4LjA1Mi01LjgxMSw4NS4wODEtMTcuNDI2YzI3LjAzMS0xMS42MDQsNTAuMzQ3LTI3LjIxMyw2OS45NTItNDYuODE1ICAgIGMxOS42MDItMTkuNjAyLDM1LjIwNy00Mi45Miw0Ni44MTgtNjkuOTQ4czE3LjQxMi01NS4zOTIsMTcuNDEyLTg1LjA4MkM0NTYuODA5LDIyMS4xNzQsNDQ5LjE2LDE4OC41MzIsNDMzLjgzNiwxNTcuODg3eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBkYXRhLW9sZF9jb2xvcj0iI0Y4RjVGNSI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=" />
          </span>
        </div>
        <div className={`app-header-cover ${this.props.pageClass}`}>
          <div className={`app-header ${appHeaderStyle}`}>
            <div className="social-title">
              <span className="social-media-term">{this.props.messageTerm}</span>
              <span className="social-media">{defaultSocialMedia}</span>
            </div>
            {this.props.pageType === 'one' &&
              <div className="chat-logo-column">
                <img className="chat-logo" src="https://img.icons8.com/ios/500/ffffff/communication.png" alt="chat-logo"/>
              </div>
            }
            <div className="filter-column">
              <div className="filter-properties">
                <div className="filter-props-column">
                  <select id="social-media" onChange={this.handleSocialMediaSelection}>
                    {
                      socialMedia.map((media, index) =>
                        <option key={index} value={media}>{media}</option>)
                    }
                  </select>
                </div>
                {this.props.pageType === 'one'
                  ? <Fragment>
                      <div className="filter-props-column date">
                        <span>From</span>
                        <input type="date" />
                      </div>
                      <div className="filter-props-column date">
                        <span>To</span>
                        <input type="date" />
                      </div>
                    </Fragment>
                  : <Fragment>
                      <select className="month">
                        <option>Select Month</option>
                        {months.map(data => <option value={data}>{data}</option>)} 
                      </select>
                    </Fragment>
                }
                <div className="filter-props-column">
                  <button className="filter-button">Go</button>
                </div>
              </div>
            </div>
            <Menu />
          </div>
          {this.props.pageType !== "one" &&
            <div className="header-bottom">
              <span>2018</span>
            </div>
          }
        </div>
      </Fragment>
    );
  }
}

export default Header;
