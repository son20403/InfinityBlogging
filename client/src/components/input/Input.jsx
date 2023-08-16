import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { Label } from '../label';
import { EyeIconOpen } from '../icon';
import { Field } from '../field';



const Input = ({ type, name, placeholder, className = '', errors, lable,
    children, control, value, isSubmitting = false, ...props }) => {
    const { field, setValue } = useController({
        control, name, defaultValue: value
    })
    return (
        <>
            <Field>
                <Label htmlFor={name}>{lable}:</Label>
                <div className='relative mt-1 w-full'>
                    <input type={type} id={name}
                        disabled={isSubmitting}
                        className={` py-3 text-sm  bg-gray-200 w-full rounded-lg outline-none
                        focus:shadow-[0px_0px_0px_3px_rgba(51,_159,_254,_0.5)]
                        focus:bg-white
                        transition-all
                        ${className} ${children ? 'pr-14 pl-5 ' : 'px-5'}`}
                        placeholder={`${lable}...`}
                        {...props}
                        {...field}
                    />
                    {children}
                </div>
                {errors?.[name] ? (
                    <span className='m-2 text-xs text-[#E74C3C]'>{errors?.[name]?.message}</span>
                ) : null}
            </Field>
        </>
    );
};

export default Input;