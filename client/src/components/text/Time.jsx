import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Time = ({ children, className }) => {
    return (
        <>
            <span className={`${className} flex items-center gap-x-2`}>
                <FontAwesomeIcon icon={faClock} /> {children || "Mar 16,2023"}</span>
        </>
    );
};

export default Time;