import React, { Component, Fragment } from 'react';

// styles
import './pageGrowth.scss';

// components
import Header from '../Header/Header';
import NetworkList from '../../Containers/NetworkList/index';
import Table from '../Table/index';
import TabulateData from '../../TabulateData';


class PageGrowth extends Component {
  state = {
    tableBody: [],
  }
  componentWillMount() {
    this.callBackendAPI()
      .then(res => console.log(res.networkInfo) || this.setState({ tableBody: res.networkInfo }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/v1/customer_details')
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <Fragment>
        <Header 
          messageTerm="Page Growth"
          pageClass="page-growth"
        />
        <div className="app-body">
          <NetworkList />
          <Table
            content={
              <TabulateData tweets={this.state.tableBody} />
            }
          />
        </div>
        <div className="legends">
          <div className="legend_container">
            <div className="legend_keys">
              <img src="../../assets/images/group-users-black.svg" />
              <span>Number of followers</span>
            </div>
            <div className="legend_keys">
              <img src="../../assets/images/line-chart.svg" />
              <span>Increase</span>
            </div>
          </div>
          <button>
            <span>Export</span>
            <img src="../../assets/images/download.svg" />
          </button>
        </div>
      </Fragment>
    )
  }
}

export default PageGrowth;