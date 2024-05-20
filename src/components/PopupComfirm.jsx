import React from 'react';
import { Button, message, Popconfirm } from 'antd';
const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};
const PopupComfirm = () => (
    <React.Fragment>
        <Popconfirm
        title="Hủy đơn hàng"
        description="Bạn có chắc muốn hủy đơn hàng này không"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Có"
        cancelText="Không"
        >
        <Button danger>Hủy</Button>
        </Popconfirm>
    </React.Fragment>
);
export default PopupComfirm;