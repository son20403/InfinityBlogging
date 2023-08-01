import React from 'react';
import { useController } from 'react-hook-form';
import { Label } from '../label';
import { EyeIconOpen } from '../icon';
import { Field } from '../field';

const Select = ({ type, name, placeholder, className = '', errors, lable, children, control, value = '', data, ...props }) => {
    const { field } = useController({
        control, name,
    })
    return (
        <>
            <Field>
                <Label htmlFor={name}>{lable}:</Label>
                <div className='relative mt-3 w-full'>
                    <select id={name}
                        className={` py-3 text-sm  bg-gray-200 w-full rounded-lg outline-none
                        focus:shadow-[0px_0px_0px_3px_rgba(51,_159,_254,_0.5)]
                        focus:bg-white
                        transition-all
                        ${className} ${children ? 'pr-14 pl-5 ' : 'px-5'}`}
                        placeholder={`${lable}...`}
                        {...field}
                        {...props}
                    >
                        <option value="">-Chọn-</option>
                        {data && data.length > 0 && data.map(item => (
                            <option key={item._id} value={item._id}>{item.title}</option>
                        ))}
                    </select>
                    {children}
                </div>
                {errors?.[name] ? (
                    <span className='m-2 text-xs text-[#E74C3C]'>{errors?.[name]?.message}</span>
                ) : null}
            </Field>
        </>
    );
};

export default Select;