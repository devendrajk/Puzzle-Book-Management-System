import { useState } from "react";
import api from "../services/salesforceApi";

function FileUpload() {

    const [file, setFile] = useState(null);

    async function handleUpload() {

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response =
            await api.post(

                "/upload",

                formData,

                {
                    headers: {
                        "Content-Type":
                        "multipart/form-data"
                    }
                }

            );

            alert(response.data.message);

        }

        catch(err){

            console.error(err);

        }

    }

    return(

        <div className="card p-4">

            <h3>Upload File</h3>

            <input

                type="file"

                className="form-control mb-3"

                onChange={(e)=>
                    setFile(e.target.files[0])
                }

            />

            <button

                className="btn btn-success"

                onClick={handleUpload}

            >
                Upload

            </button>

        </div>

    );

}

export default FileUpload;