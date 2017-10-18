import React, {Component} from 'react';
import moment from 'moment';
import {Table} from 'reactstrap';
import _ from 'lodash';
import {Link} from 'react-router-dom';
const _defaultOptionColFunc = (prefix, row) => <Link to={`/${prefix}/` + row.id}>show</Link>

const _defaultTimestampColFunc = (row) =>
  <div>
    <i className="fa fa-plus-square-o"/> {moment(row.created_at).format('YYYY-MM-DD HH:mm Z')}
    <br/>
    <i className="fa fa-pencil-square-o"/> {moment(row.updated_at).format('YYYY-MM-DD HH:mm Z')}
  </div>;



const GeneralList = ({headers, columns=[] /* function or keypath */, rows, prefix, optionColumn=_defaultOptionColFunc /* func */}) => (
  <Table responsive hover>
    <thead>
    <tr>
      {headers.map((title) => <th key={title}>{title}</th>)}
      {optionColumn && <th>&nbsp;</th>}
    </tr>
    </thead>

    <tbody>
    {rows.map(row =>
      <tr key={row.id}>
        {headers.map((keypath, i) => {
          let column;
          if (Array.isArray(columns)) {
            column = columns[i];
          } else {
            column = columns[keypath];
          }
          let columnContent;
          if (!column) {
            if (keypath === 'timestamps') {
              columnContent = _defaultTimestampColFunc(row);
            } else {
              columnContent = _.get(row, keypath);
            }
          } else if (typeof column === 'string') {
            columnContent = _.get(row, column);
          } else if (typeof column === 'function') {
            columnContent = column(row);
          } else {
            columnContent = '?';
          }

          return <td key={`${row.id},col${i}`}>{columnContent === undefined || columnContent === null ?
            <span className='text-muted'>NULL</span> : columnContent}</td>;
        })}
        {optionColumn && <td>{optionColumn(prefix, row)}</td>}
      </tr>
    )}
    </tbody>
  </Table>
);

export default GeneralList;
