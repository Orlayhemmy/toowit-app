import React, { Fragment } from 'react';

const me = (data, index) => (
  <React.Fragment>
    <th className="serial-number">{index != null ? index + 1 : ''}</th>
    <td className="tweet">{data.text}</td>
    <td className="user">{data.user.name}</td>
    <td className="time">{data.created_at.replace('+0000', '')}</td>
  </React.Fragment>
)
const show = (entry, index, toggleVisibility) => (
  <tr className={index == null ? 'tbl-row replies' : 'tbl-row'} key={index} onClick={toggleVisibility}>
    {me(entry, index)}
    {entry.replies && entry.replies.map(data => show(data))}
  </tr>
)
// const renderTableRows = (data, index) => ( console.log(data) ||
// data.replies.length && data.replies.map(data => show(data, index)),
// show(data,index)
// )

const displayGrowthData = data => (
    <Fragment>
      <tr>        
        <td>{data[0].day}</td>
        {
          data.map(entry => (
            <td className="growth_td">
              <td>{entry.followers_count}</td>
              <td>{entry.followers_increase}</td>
            </td>
          ))
        }
      </tr>
    </Fragment>
)

const tabulateData = ({ tweets, toggleVisibility, pageType }) => (
  !tweets.length 
    ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="100" height="100"
      viewBox="0 0 252 252"
      style={{fill:'#ffffff'}}></svg>
    : tweets.map((entry, index) => (
      <Fragment key={index}>
        {pageType
          ? show(entry, index, toggleVisibility)
          : displayGrowthData(entry)
        }
      </Fragment>
    ))
)

export default tabulateData;
