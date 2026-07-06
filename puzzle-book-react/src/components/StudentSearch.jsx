import { useState } from "react";
import api from "../services/salesforceApi";

function StudentSearch({ onStudentSelect }) {
    const [keyword, setKeyword] = useState("");
    const [students, setStudents] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await api.get(`/students?keyword=${keyword}`);

            setStudents(response.data.records);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="card p-3 mb-4">

            <h4>Select Student</h4>

            <div className="d-flex gap-2 mb-3">

                <input
                    className="form-control"
                    placeholder="Search Student"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                >
                    Search
                </button>

            </div>

            <select
                className="form-select"
                onChange={(e) => onStudentSelect(e.target.value)}
            >

                <option value="">
                    Select Student
                </option>

                {students.map(student => (

                    <option
                        key={student.Id}
                        value={student.Id}
                    >
                        {student.Name}
                    </option>

                ))}

            </select>

        </div>
    );
}

export default StudentSearch;