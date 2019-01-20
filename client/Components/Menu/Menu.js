import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './menu.scss';

class Menu extends Component {
  state = {
    displayMenu: false,
  }

  toggleMenuDisplay = () => {
    this.setState({ displayMenu: !this.state.displayMenu });
  }

  redirectUser = page => () => this.props.history.push(page)

  render() {
    return (
      <div className="menu-container" onBlur={this.toggleMenuDisplay} tabIndex={0}>
        {!this.state.displayMenu &&
          <div className="menu-icon" onClick={this.toggleMenuDisplay}>&#9776;</div>
        }
        {this.state.displayMenu &&
          <div className="menu-items">
            <span onClick={this.redirectUser('/overview')}>&#x1f5d2; Overview</span>
            <span onClick={this.redirectUser('/dashboard')}>&#x1f4ac; Dashboard</span>
            <span onClick={this.redirectUser('/engagement')}>&#x1f4e3; Engagement</span>
            <span onClick={this.redirectUser('/page-growth')}>&#x1F4C8; Page Growth</span>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Menu);