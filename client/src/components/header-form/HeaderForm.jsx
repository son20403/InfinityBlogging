import React from 'react';

const HeaderForm = ({ children, urlImage = './src/assets/infinity.png', className = '' }) => {
    return (
        <>
            <div className='header flex flex-col justify-center items-center '>
                <img src={urlImage}
                    alt="" className={`w-[150px] h-[130px] rounded-full overflow-hidden object-cover
                    ${className} `} />
                <h1 className=' font-semibold text-2xl'>{children}</h1>
            </div>
        </>
    );
};

export default HeaderForm;