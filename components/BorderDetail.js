import React from 'react';
import {Button} from 'reactstrap';
import Detail from './GeneralDetail';

const BorderDetail = ({
  headers,
  columns = []/* function or keypath */,
  entity,
  halfWidth = false,
  className = '',
  style = {},
  okButtonClick,
  okButtonString,
  cancelButtonClick,
  cancelButtonString,
}: {
  headers: Array,
  columns: Array|Object,
  entity: Object,
  halfWidth: Boolean,
  className: String,
  style: Object,
  okButtonClick: Function,
  okButtonString: String,
  cancelButtonClick: Function,
  cancelButtonString: String,
}) => (
  <div className={className} style={style}>
    <div style={{border: 'gray 1px solid', padding: '10px'}}>
      <Detail
        headers={headers}
        columns={columns}
        entity={entity}
        halfWidth={halfWidth}
      />
      <Button
        size="sm"
        color={'primary'}
        onClick={() => okButtonClick()}
      >
        {okButtonString}
      </Button>
      <Button
        size="sm"
        color={'danger'}
        onClick={() => cancelButtonClick()}
        style={{marginLeft: '8px'}}
      >
        {cancelButtonString}
      </Button>
    </div>
  </div>
);

export default BorderDetail;

