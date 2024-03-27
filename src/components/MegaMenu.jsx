// import { Modal, Button } from 'react-bootstrap';
import  { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

function MegaMenu(prop) {
  
  const dropdownItems = [
    ['Action 1', 'Action 2', 'Action 3', 'Action 4'],
    ['Action 5', 'Action 6', 'Action 7', 'Action 8'],
    ['Action 9', 'Action 10', 'Action 11', 'Action 12', 'Action 13'],
    ['Action 14'],
    ['Action 15']
  ];

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
//   const footerContent = (
//       <div className="d-flex justify-content-end">
//           <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
//           <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
//       </div>
//   );

  const subMenu = dropdownItems.map((value) => {
    return(
        <tr key={value} className="d-flex justify-content-evenly">
            <td><div className="m-3">{value}</div></td>
        </tr>
    );
  })
  const show = (position) => {
      setPosition(position);
      setVisible(true);
  };

  return (
      <div className="card">
        <Button label="Top" icon="pi pi-arrow-down" onClick={() => show('top')} className="p-button-warning" style={{ minWidth: '10rem' }} />
        <Dialog className="bg-light"  visible={visible} position={position} style={{ width: '50vw' }}
         onHide={() => setVisible(false)} draggable={false} resizable={false}>
            <div className="card">
                <div className="card-body">
                    <table className="table table-borderless w-100">
                        <tbody>
                            {subMenu}
                        </tbody>
                    </table>                    
                </div>
            </div>
        </Dialog>
      </div>
  )
}

export default MegaMenu;