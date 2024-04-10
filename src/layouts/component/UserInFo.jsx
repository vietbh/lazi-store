import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserInFo = () => {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {   
        const userInfos = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfos) {
          setDataUser(userInfos);
        }
    },[])

    return (
        <React.Fragment>
            <Link className="nav-link dropdown-toggle"
            id="pagesDropdown" href="#" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false"
            >
                {dataUser.image_url ? <img className="rounded-circle" src={dataUser.image_url} width={50} /> : <i className="fas fa-user me-1 text-gray fw-normal"></i>} 
                <span>{dataUser.name}</span>
            </Link>
        </React.Fragment>
    );
};

export default UserInFo;