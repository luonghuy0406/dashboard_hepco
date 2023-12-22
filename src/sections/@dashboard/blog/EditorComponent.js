
import React, { useEffect, useState } from 'react';
import Editor from 'ckeditor5-custom-build';
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function EditorComponent({des,setDes}) {
    const [value, setValue] = useState(des)
    useEffect(()=>{
        setValue(des)
    },[des])
    return (
        <div>
            
            <CKEditor
                editor={ Editor }
                data={value}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setValue(data)
                } }
                onBlur={ ( event, editor ) => {
                    const data = editor.getData();
                    setDes(data)
                } }
            />
        </div>
    )
}