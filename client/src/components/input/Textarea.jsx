import React from 'react';
import { useForm, useController } from 'react-hook-form';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Label } from '../label';
import { Field } from '../field';
const config = {
    placeholderText: 'Nhập nội dung...',
    // thêm cấu hình khác ở đây nếu bạn muốn
};
const Textarea = ({ control, name, errors }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
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
                    <span className='m-2 text-xs text-[#E74C3C]'>{errors?.[name]?.message}</span>
                ) : null}
            </>
        </div>
    );
};

export default Textarea;