
import { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function ToastMenu(prop) {
    const toastTopCenter = useRef(null);

    const showMessage = (event, ref, severity) => {
        const label = event.target.innerText;

        ref.current.show({ severity: severity, summary: label, detail: label, life: 3000 });
    };
    // showMessage(prop.e, prop.ref, prop.severity)
    // <div className="flex flex-wrap gap-2">
    //     <Button label="Top Center" onClick={(e) => showMessage(e, toastTopCenter, 'Mesny')} />
    // </div>
    return (
        <div className="card flex justify-content-center">
       
            <Toast ref={toastTopCenter} position="top-center" className='mt-4 d-flex justify-content-center'/>
         
        </div>
        )
}
        