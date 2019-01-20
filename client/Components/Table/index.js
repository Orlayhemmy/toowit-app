import  React, { Fragment } from 'react';
import './table.scss';

const thisss = () => (
  <th className="page_growth_head">
    <td><img src="../../assets/images/group-users.png" /></td>
    <td><img src="../../assets/images/line-chart.png" /></td>
  </th>
)
const renderTableHead = tableHead => tableHead.map(entry => typeof(entry) === 'object' ? renderTableHead(entry) : <th>{entry}</th>);
const renderSecondaryTH = () =>  {
  return (
    <Fragment>
      <th>Day</th>
      {[0, 1, 2, 3].map(() => thisss())}
    </Fragment>
  )
}
const Table = ({ content, tableHead, pageType }) => (
  <table className="table table-striped table-dark">
    <thead>
      <tr className="tbl-header">
        {pageType && <th scope="col">#</th>}
        {pageType ? renderTableHead(tableHead) : renderSecondaryTH()}
      </tr>
    </thead>
    <tbody>
      {content}
    </tbody>
  </table>
);

export default Table;
