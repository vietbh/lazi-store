import { checkPropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertBootrap({title='',type=''}) {
  const [show, setShow] = useState(true);
  useEffect(()=>{
      if(show){
        const timeout = setTimeout(()=>setShow(!show),1500);
        return ()=>clearTimeout(timeout);
      }
  },[show])
  return (
    <React.Fragment>
        <div className='container-fluid position-relative'>
            <div className='position-fixed end-0 me-1' style={{top:"6.5rem"}}>
                {show && (
                    <Alert className='opacity-75 btn-sm' variant={type} onClose={() => setShow(false)} dismissible>
                        <p className='fw-bold mb-0'>{title}</p>
                    </Alert>
                )}
            </div>
        </div>
    </React.Fragment>
  );
}
AlertBootrap.propTypes={
    title:checkPropTypes.string,
    type:checkPropTypes.string,
}
export default AlertBootrap;