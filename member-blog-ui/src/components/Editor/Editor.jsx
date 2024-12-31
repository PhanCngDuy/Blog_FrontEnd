import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { useEffect, useRef } from 'react';
Quill.register('modules/imageResize', ImageResize);

function Editor(props) {
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: ['20px'] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
            ['code-block'],
        ],
        clipboard: {
            matchVisual: false,
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
        },
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block',
    ];
    return (
        <div className="bg-white">
            <ReactQuill
                theme="snow"
                onChange={props.handleChange}
                value={props.editorHtml}
                modules={modules}
                formats={formats}
                bounds={'#root'}
                placeholder={props.placeholder}
                style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}
            />
        </div>
    );
}

export default Editor;
