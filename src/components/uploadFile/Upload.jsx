import React from 'react';
import {useDispatch} from "react-redux";
import {uploadFile} from "../../actions/file";

const Upload = () => {
    const dispatch = useDispatch()

    const fileUploadHandler = (event) => {
        const file = event.target.files[0]
        dispatch(uploadFile(file))
    }

    return (
        <div>
            <div className="disk__upload">
                <input multiple={true} type="file" onChange={(e) => fileUploadHandler(e)}/>
            </div>
        </div>
    );
};

export default Upload;