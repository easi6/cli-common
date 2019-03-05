//
import React from 'react';
import moment from 'moment';
import { Table, Card } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
// import GeneralDetail from './GeneralDetail';
import { Desktop, Mobile } from './ByScreen';

const _defaultOptionColFunc = (prefix, row) => <Link to={`/${prefix}/${row.id}`}>show</Link>;

const _defaultTimestampColFunc = (row) => (
  <div>
    <i className='fa fa-plus-square-o' /> {moment(row.created_at || row.createdAt).format('YYYY-MM-DD HH:mm Z')}
    <br />
    <i className='fa fa-pencil-square-o' /> {moment(row.updated_at || row.updatedAt).format('YYYY-MM-DD HH:mm Z')}
  </div>
);

const _defaultSortableHeader = (sortingElements, header) => {
  let className = 'fa fa-sort';
  if (sortingElements.sort_key === header.sort_key) {
    className = `fa fa-caret-${sortingElements.sort_order === 'desc' ? 'down' : 'up'}`;
  }
  return (
    <th key={header.title} style={{ cursor: 'pointer' }} onClick={() => sortingElements.sortByKey(header.sort_key)}>
      {header.title} <i className={className} />
    </th>
  );
};

const GeneralList = ({
  headers,
  columns = {} /* function or keypath */,
  columnClassNames = {},
  rows,
  prefix,
  sortingElements = {},
  optionHeader = _defaultSortableHeader,
  optionColumn = _defaultOptionColFunc,
  ...rest
}) => (
  <div>
    <Desktop>
      <div style={{ wordBreak: 'break-word', width: '100%' }}>
        <Table responsive hover {...rest}>
          <thead>
            <tr>
              {headers.map((header) => {
                if (_.isObject(header)) {
                  return optionHeader(sortingElements, header);
                }
                return <th key={header}>{header}</th>;
              })}
              {optionColumn && <th>&nbsp;</th>}
            </tr>
          </thead>

          <tbody>
            {_.map(rows, (row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {headers.map((keypath, i) => {
                  let columnClassName;
                  if (Array.isArray(columnClassNames)) {
                    columnClassName = columnClassNames[i];
                  } else {
                    columnClassName = _.isObject(keypath) ? columnClassNames[keypath.title] : columnClassNames[keypath];
                  }

                  let columnClassNameString;
                  if (typeof columnClassName === 'string') {
                    columnClassNameString = columnClassName;
                  } else if (typeof columnClassName === 'function') {
                    columnClassNameString = columnClassName(row, rowIndex);
                  } else {
                    columnClassNameString = '';
                  }

                  let column;
                  if (Array.isArray(columns)) {
                    column = columns[i];
                  } else {
                    column = _.isObject(keypath) ? columns[keypath.title] : columns[keypath];
                  }
                  let columnContent;
                  if (!column) {
                    if (keypath === 'timestamps') {
                      columnContent = _defaultTimestampColFunc(row);
                    } else {
                      columnContent = _.isObject(keypath) ? _.get(row, keypath.title) : _.get(row, keypath);
                    }
                  } else if (typeof column === 'string') {
                    columnContent = _.get(row, column);
                  } else if (typeof column === 'function') {
                    columnContent = column(row, rowIndex);
                  } else {
                    columnContent = '?';
                  }

                  return (
                    <td key={`${row.id},col${i}`} className={columnClassNameString || ''}>
                      {columnContent === undefined || columnContent === null ? (
                        <span className='text-muted'>NULL</span>
                      ) : (
                        columnContent
                      )}
                    </td>
                  );
                })}
                {optionColumn && <td>{optionColumn(prefix, row)}</td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Desktop>
    <Mobile>
      {_.map(rows, (row, rowIndex) => (
        <Card style={{ padding: '10px' }} key={rowIndex}>
          <div key={row.id || rowIndex}>
            {headers.map((keypath, i) => {
              let columnClassName;
              if (Array.isArray(columnClassNames)) {
                columnClassName = columnClassNames[i];
              } else {
                columnClassName = _.isObject(keypath) ? columnClassNames[keypath.title] : columnClassNames[keypath];
              }

              let columnClassNameString;
              if (typeof columnClassName === 'string') {
                columnClassNameString = columnClassName;
              } else if (typeof columnClassName === 'function') {
                columnClassNameString = columnClassName(row, rowIndex);
              } else {
                columnClassNameString = '';
              }

              let column;
              if (Array.isArray(columns)) {
                column = columns[i];
              } else {
                column = _.isObject(keypath) ? columns[keypath.title] : columns[keypath];
              }
              let columnContent;
              if (!column) {
                if (keypath === 'timestamps') {
                  columnContent = _defaultTimestampColFunc(row);
                } else {
                  columnContent = _.isObject(keypath) ? _.get(row, keypath.title) : _.get(row, keypath);
                }
              } else if (typeof column === 'string') {
                columnContent = _.get(row, column);
              } else if (typeof column === 'function') {
                columnContent = column(row, rowIndex);
              } else {
                columnContent = '?';
              }

              return (
                <div key={`${row.id}${i}`} style={{ marginTop: '5px', marginBottom: '5px' }}>
                  <div key={`${row.id},${i}`}>
                    <b>{keypath.title || keypath}</b>
                  </div>
                  <div key={`${row.id},col${i}`} className={columnClassNameString || ''}>
                    {columnContent === undefined || columnContent === null ? (
                      <span className='text-muted'>NULL</span>
                    ) : (
                      columnContent
                    )}
                  </div>
                </div>
              );
            })}
            {optionColumn && <div>{optionColumn(prefix, row)}</div>}
          </div>
        </Card>
      ))}
    </Mobile>
  </div>
);

export default GeneralList;
