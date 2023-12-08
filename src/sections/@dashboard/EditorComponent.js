
import React, { useEffect, useState } from 'react';
import Editor from 'ckeditor5-custom-build';
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function EditorComponent({val,setVal}) {
    const [value, setValue] = useState(val)
    useEffect(()=>{
        setValue(val)
    },[val])
    return (
        <div>
            
            <CKEditor
                style={{height:'300px'}}
                editor={ Editor }
                data={value}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setValue(data)
                } }
                onBlur={ ( event, editor ) => {
                    const data = editor.getData();
                    setVal(data)
                } }
            />
        </div>
    )
}