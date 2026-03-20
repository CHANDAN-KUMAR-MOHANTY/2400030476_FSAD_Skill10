import { useState } from "react";

const initialStudents = [
  { id: 101, name: "Karan", course: "B.Tech CSE" },
  { id: 102, name: "Divya", course: "BBA" },
  { id: 103, name: "Chandan", course: "B.Com" },
  { id: 104, name: "Rishitha", course: "MBA" },
  { id: 105, name: "Rohit", course: "MCA" }
];

const emptyStudent = { id: "", name: "", course: "" };

function StudentManager() {
  const [students, setStudents] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState(emptyStudent);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const addStudent = () => {
    const trimmedName = newStudent.name.trim();
    const trimmedCourse = newStudent.course.trim();
    const numericId = Number(newStudent.id);

    if (!numericId || !trimmedName || !trimmedCourse) {
      return;
    }

    const studentToAdd = {
      id: numericId,
      name: trimmedName,
      course: trimmedCourse
    };

    setStudents((prev) => [...prev, studentToAdd]);
    setNewStudent(emptyStudent);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="container">
      <h1>Student Manager</h1>

      <div className="form-card">
        <input
          type="number"
          name="id"
          placeholder="Student ID"
          value={newStudent.id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={newStudent.course}
          onChange={handleInputChange}
        />
        <button type="button" className="add-btn" onClick={addStudent}>
          Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <p className="empty">No students available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentManager;
