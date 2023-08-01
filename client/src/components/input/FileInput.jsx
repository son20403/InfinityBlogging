import React from 'react';
import { useController } from 'react-hook-form';
import { Label } from '../label';
import { EyeIconOpen } from '../icon';
import { Field } from '../field';
import useImagePreview from '../../hooks/useImagePreview';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const FileInput = ({ name, placeholder, className = '', errors, lable, children, control, ...props }) => {
    const { field: { value, ...inputProps } } = useController({
        control, name,
    })
    const { handleFileChange, preview, clearPreview, fileInputRef } = useImagePreview();
    const handleOnChange = (e) => {
        inputProps.onChange(e.target.files[0]);
        handleFileChange(e)
    }
    return (
        <>
            <Field>
                <Label htmlFor={name}>{lable}:</Label>
                <div className={`relative mt-3 w-full ${className ? '' : "h-[187px]"}  overflow-hidden `}>
                    <label htmlFor={name} className={`block w-full h-full 
                    rounded-lg bg-gray-200 focus:bg-white cursor-pointer
                    absolute 
                    `}>
                        <input type='file'
                            id={name}
                            hidden
                            placeholder={`${lable}...`}
                            {...inputProps}
                            {...props}
                            onChange={handleOnChange}
                            ref={fileInputRef}
                        />
                        {!preview &&
                            <div className=' absolute inset-0 flex justify-center items-center cursor-pointer'>
                                <div className='flex flex-col justify-center items-center gap-5'>
                                    <img src='../src/assets/img-upload.png'
                                        alt="preview" className=" w-16 h-16 object-cover" />
                                    <p className='text-sm font-body font-semibold '>Choose image</p>
                                </div>
                            </div>
                        }
                    </label>
                    {preview &&
                        <div className='w-full h-full absolute rounded-lg overflow-hidden'>
                            <div className=' absolute inset-0 flex justify-center items-center group transition-all'>
                                <FontAwesomeIcon
                                    onClick={clearPreview}
                                    className='p-5 rounded-full bg-white text-lg cursor-pointer invisible
                                    opacity-0 group-hover:opacity-100 group-hover:visible transition-all'
                                    icon={faTrashCan} bounce />
                            </div>
                            <img src={preview} alt="preview" className=" w-full h-full object-cover" />
                        </div>
                    }
                    {children}
                </div>
                {errors?.[name] ? (
                    <span className='m-2 text-xs text-[#E74C3C]'>{errors?.[name]?.message}</span>
                ) : null}
            </Field>
        </>
    );
};

export default FileInput;