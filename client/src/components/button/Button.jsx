import React from 'react';
import { LoadingSpinner } from '../loading';
import PropTypes from 'prop-types'

const Button = ({ type = 'button', onClick = () => { }, isLoading, children, ...props }) => {
    const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
    return (
        <button type={type}
            onClick={onClick}
            {...props}
            className='text-white w-full py-3 flex justify-center 
            items-center h-[50px] rounded-lg font-semibold bg-[#329bf7] 
            disabled:opacity-50 disabled:pointer-events-none'>
            {child}
        </button>
    );
};
Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit']).isRequired,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node
}

export default Button;