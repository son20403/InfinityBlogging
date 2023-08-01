import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const EyeIconClose = ({ className = '', onClick = () => { } }) => {
    return (
        <div className={`absolute right-[20px] top-1/2 -translate-y-2/4 cursor-pointer ${className}`} onClick={onClick}>
            <FontAwesomeIcon icon={faEyeSlash} />
        </div>
    );
};

export default EyeIconClose;