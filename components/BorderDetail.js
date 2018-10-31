import React from 'react';
import {Button} from 'reactstrap';
import Detail from './GeneralDetail';

const BorderDetail = ({
  headers,
  columns = []/* function or keypath */,
  entity,
  className,
  style,
  okButtonClick,
  okButtonString,
  cancelButtonClick,
  cancelButtonString,
}: {
  headers: Array,
  columns: Array|Object,
  entity: Object,
  className: String,
  style: Object,
  okButtonClick: Function,
  okButtonString: String,
  cancelButtonClick: Function,
  cancelButtonString: String,
}) => (
  <div className={className} style={{...style, border: 'gray 1px solid', padding: '10px'}}>
    <Detail
      headers={headers}
      columns={columns}
      entity={entity}
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
);

export default BorderDetail;

