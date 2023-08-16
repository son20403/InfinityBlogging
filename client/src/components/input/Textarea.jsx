import React, { useEffect } from 'react';
import { useForm, useController } from 'react-hook-form';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Label } from '../label';
import { Field } from '../field';
const Textarea = ({ control, name, errors, defaultValue, heightMax = 170 }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: defaultValue,
    });
    const config = {
        placeholderText: 'Nhập nội dung...',
        // thêm cấu hình khác ở đây nếu bạn muốn
        heightMax: heightMax

    };
    // Theo dõi sự thay đổi của defaultValue
    useEffect(() => {
        field.onChange(defaultValue);
    }, [defaultValue]);
    return (
        <div>
            <>
                <FroalaEditorComponent
                    config={config}
                    tag="textarea"
                    model={field.value}
                    onModelChange={field.onChange}
                    {...field}
                />
                {errors?.[name] ? (
                    <span className='m-1 text-xs text-[#E74C3C]'>{errors?.[name]?.message}</span>
                ) : null}
            </>
        </div>
    );
};

export default Textarea;