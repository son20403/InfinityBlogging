import React from 'react';
import ModalBase from './ModalBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ModalAdvanced = ({ children, heading, ...props }) => {
    return (
        <>
            <ModalBase {...props}>
                <div className='relative bg-white rounded-lg m-auto p-10 z-10'>
                    {/* <h1 className=' text-2xl leading-relaxed text-center font-bold'>{heading}</h1> */}
                    <span className='absolute w-10 h-10 flex justify-center shadow-xl items-center bg-white rounded-full right-0 top-0 translate-x-2/4 -translate-y-2/4 cursor-pointer' onClick={props.onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                    {children}
                </div>
            </ModalBase>
        </>
    );
};

export default ModalAdvanced;