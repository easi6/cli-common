//
import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import util from 'util';
import { Col } from 'reactstrap';

const _defaultTimestampColFunc = (row) => (
  <div>
    <i className='fa fa-plus-square-o' /> {moment(row.created_at ?? row.createdAt).format('YYYY-MM-DD HH:mm Z')}
    <br />
    <i className='fa fa-pencil-square-o' /> {moment(row.updated_at ?? row.updatedAt).format('YYYY-MM-DD HH:mm Z')}
  </div>
);

const GeneralDetail = ({ headers, columns = {} /* function or keypath */, entity, halfWidth = false }) => (
  <dl className='row'>
    {headers.reduce((acc, title, i) => {
      let column;
      if (Array.isArray(columns)) {
        column = columns[i];
      } else {
        column = columns[title];
      }

      let columnContent;
      if (!column) {
        if (title === 'timestamps') {
          columnContent = _defaultTimestampColFunc(entity);
        } else {
          columnContent = _.get(entity, title);
        }
      } else if (typeof column === 'string') {
        columnContent = _.get(entity, column);
      } else if (typeof column === 'function') {
        columnContent = column(entity);
      } else {
        columnContent = column;
      }
      if (typeof columnContent === 'boolean') {
        columnContent = columnContent ? 'true' : 'false';
      }
      if (columnContent !== null && _.isPlainObject(columnContent) && !React.isValidElement(columnContent)) {
        columnContent = util.inspect(columnContent, { compact: false });
      }
      return [
        ...acc,
        <dt className={halfWidth ? 'col-sm-6 col-xl-4' : 'col-sm-2'} key={`key-${title}`}>
          {title}
        </dt>,
        <dd
          key={`content-${title}`}
          className={`${halfWidth ? 'col-sm-6 col-xl-8' : 'col-sm-10'} col-xs-12`}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {columnContent === undefined || columnContent === null ? (
            <span className='text-muted'>NULL</span>
          ) : columnContent === '' ? (
            <span className='text-muted'>Empty</span>
          ) : (
            columnContent
          )}
        </dd>,
      ];
    }, [])}
  </dl>
);

export default GeneralDetail;
