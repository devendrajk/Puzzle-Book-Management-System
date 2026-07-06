import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FileUpload from "../components/FileUpload";

function FileUploadPage() {

    return (

        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <FileUpload />

                </div>

            </div>
        </>

    );

}

export default FileUploadPage;