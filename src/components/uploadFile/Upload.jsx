import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {uploadFile} from "../../actions/file";

const Upload = () => {
    const dispatch = useDispatch()
    const [file, setFile] = useState()

    const fileUploadHandler = async () => {
        console.log(file)
        await uploadFile(file)
    }

    return (
        <div>
            <div className="disk__upload">
                <input multiple={true} type="file" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button onClick={(e) => fileUploadHandler(e)}>send</button>
        </div>
    );
};

export default Upload;