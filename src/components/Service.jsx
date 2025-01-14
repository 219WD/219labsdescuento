import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/Service.css'

const Service = ({ icon, description, size }) => {
    return (
        <div className="service">
            <FontAwesomeIcon icon={icon} size={`${size}x`} className='icono' />
            <p>{description}</p>
        </div>
    )
}

export default Service