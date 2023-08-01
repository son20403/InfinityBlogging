import React from 'react';

const SectionField = ({ children, className }) => {
    return (
        <>
            <section className={`${className} page-container grid grid-cols-3 gap-10 mb-20`}>
                {children}
            </section>
        </>
    );
};

export default SectionField;