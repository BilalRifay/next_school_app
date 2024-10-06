'use client'

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { db } from '../../../firebase';
import { collection, doc, updateDoc, deleteDoc, getDocs, setDoc } from 'firebase/firestore';
import { Button } from '../../../components/ui/button';

function StudentForm() {
  const [newStudentData, setNewStudentData] = useState({
    className: '',
    classId: '',
    sectionName: '',
    sectionId: '',
    name: '',
    email: '',
    attendance: '',
    grade: '',
    dateOfBirth: '',
    address: '',
    bloodGroup: '',
    remark: '',
  });

  const [newMarksData, setNewMarksData] = useState({
    examType: '',
    english: '',
    math: '',
    science: '',
    socialScience: '',
    tamil: '',
    total: '',
  });

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [updateMode, setUpdateMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentSnapshot = await getDocs(collection(db, 'students'));
        const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const classSnapshot = await getDocs(collection(db, 'Classes'));
        const classList = classSnapshot.docs.map(doc => ({ value: doc.data().className, label: doc.data().className, id: doc.id }));

        const sectionSnapshot = await getDocs(collection(db, 'Sections'));
        const sectionList = sectionSnapshot.docs.map(doc => ({
          value: doc.data().sectionName,
          label: doc.data().sectionName,
          id: doc.id,
        }));

        setStudents(studentList);
        setClasses(classList);
        setSections(sectionList);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };
    fetchData();
  }, []);

  const handleChange = (selectedOption, key) => {
    setNewStudentData((prev) => ({
      ...prev,
      [key]: selectedOption ? selectedOption.value : '',
      ...(key === 'className' && { classId: selectedOption.id }),
      ...(key === 'sectionName' && { sectionId: selectedOption.id }),
    }));
  };

  const handleInputChange = (e, key) => {
    setNewStudentData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleMarksInputChange = (e, key) => {
    setNewMarksData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const studentEmail = newStudentData.email.trim();
      const studentDocRef = doc(db, 'students', studentEmail);
      await setDoc(studentDocRef, newStudentData);
      resetForm();
      setFormVisible(false);
      fetchStudents();
    } catch (e) {
      console.error('Error adding student:', e);
    }
  };

  const fetchStudents = async () => {
    const studentSnapshot = await getDocs(collection(db, 'students'));
    const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentList);
  };

  const deleteStudent = async (studentId) => {
    try {
      await deleteDoc(doc(db, 'students', studentId));
      setStudents(students.filter(student => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const startEditing = (student) => {
    setEditingStudent(student);
    setFormVisible(true);
    setNewStudentData({
      className: student.className,
      classId: student.classId,
      sectionName: student.sectionName,
      sectionId: student.sectionId,
      name: student.name,
      email: student.email,
      attendance: student.attendance,
      grade: student.grade,
      dateOfBirth: student.dateOfBirth,
      address: student.address,
      bloodGroup: student.bloodGroup,
      remark: student.remark,
    });
    if (student.marks) {
      setNewMarksData({
        examType: 'final',
        english: student.marks.final?.english || '',
        math: student.marks.final?.math || '',
        science: student.marks.final?.science || '',
        socialScience: student.marks.final?.socialScience || '',
        tamil: student.marks.final?.tamil || '',
        total: student.marks.final
          ? student.marks.final.english + student.marks.final.math + student.marks.final.science + student.marks.final.socialScience + student.marks.final.tamil
          : '',
      });
    }
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    const studentEmail = editingStudent.email.trim(); 
    const studentDocRef = doc(db, 'students', studentEmail);
    try {
      await updateDoc(studentDocRef, newStudentData);
      console.log("Document updated successfully!");
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Can't update student details right now!");
    } finally {
      resetForm();
      setFormVisible(false);
    }
  };

  const updateMarks = async (e) => {
    e.preventDefault();
    const studentEmail = editingStudent.email.trim(); 
    const studentDocRef = doc(db, 'students', studentEmail);
    try {
      await updateDoc(studentDocRef, {
        marks: { [newMarksData.examType]: newMarksData },
      });
      console.log("Marks updated successfully!");
      fetchStudents();
    } catch (error) {
      console.error("Error updating marks:", error);
      alert("Can't update marks right now!");
    } finally {
      resetForm();
      setFormVisible(false);
    }
  };

  const resetForm = () => {
    setNewStudentData({
      className: '',
      classId: '',
      sectionName: '',
      sectionId: '',
      name: '',
      email: '',
      attendance: '',
      grade: '',
      dateOfBirth: '',
      address: '',
      bloodGroup: '',
      remark: '',
    });
    setNewMarksData({
      examType: '',
      english: '',
      math: '',
      science: '',
      socialScience: '',
      tamil: '',
      total: '',
    });
    setEditingStudent(null);
    setUpdateMode(null);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.sectionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full p-6 rounded-lg shadow-lg">
        {!formVisible ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded w-1/3"
              />
              <button
                onClick={() => {
                  resetForm();
                  setFormVisible(true);
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Add New Student
              </button>
            </div>
            <ul className="w-full">
              {filteredStudents.map((student) => (
                <li key={student.id} className="border-b py-4 md:flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{student.name}</h3>
                    <p>Email: {student.email}</p>
                    <p>Class: {student.className}</p>
                    <p>Section: {student.sectionName}</p>
                    <p>Grade: {student.grade}</p>
                    <p>Attendance: {student.attendance}</p>
                    <p>Date of Birth: {student.dateOfBirth}</p>
                    <p>Address: {student.address}</p>
                    <p>Blood Group: {student.bloodGroup}</p>
                    <p>Remark: {student.remark}</p>
                  </div>
                  <div className='flex gap-3 md:flex-col'>
                    <Button
                      className="text-white px-4 py-2 rounded-md mt-2"
                      onClick={() => startEditing(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="text-white px-4 py-2 rounded-md mt-2"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      className="text-white bg-green-600 px-4 py-2 rounded-md mt-2"
                      onClick={() => {
                        startEditing(student);
                        setUpdateMode('marks');
                      }}
                    >
                      Add Marks
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <form onSubmit={updateMode === 'marks' ? updateMarks : editingStudent ? updateStudent : addStudent}>
            <h2 className="text-2xl font-semibold mb-4">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <Select
              options={classes}
              onChange={(option) => handleChange(option, 'className')}
              placeholder="Select Class"
              className="mb-4"
              value={classes.find(option => option.value === newStudentData.className) || null}
            />
            <Select
              options={sections}
              onChange={(option) => handleChange(option, 'sectionName')}
              placeholder="Select Section"
              className="mb-4"
              value={sections.find(option => option.value === newStudentData.sectionName) || null}
            />
            <input
              type="text"
              placeholder="Name"
              value={newStudentData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              className="p-2 border rounded w-full mb-4"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newStudentData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              className="p-2 border rounded w-full mb-4"
              required
            />
            <input
              type="text"
              placeholder="Attendance"
              value={newStudentData.attendance}
              onChange={(e) => handleInputChange(e, 'attendance')}
              className="p-2 border rounded w-full mb-4"
              required
            />
            <input
              type="text"
              placeholder="Grade"
              value={newStudentData.grade}
              onChange={(e) => handleInputChange(e, 'grade')}
              className="p-2 border rounded w-full mb-4"
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={newStudentData.dateOfBirth}
              onChange={(e) => handleInputChange(e, 'dateOfBirth')}
              className="p-2 border rounded w-full mb-4"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={newStudentData.address}
              onChange={(e) => handleInputChange(e, 'address')}
              className="p-2 border rounded w-full mb-4"
              required
            />
            <input
              type="text"
              placeholder="Blood Group"
              value={newStudentData.bloodGroup}
              onChange={(e) => handleInputChange(e, 'bloodGroup')}
              className="p-2 border rounded w-full mb-4"
              required
            />
            <input
              type="text"
              placeholder="Remark"
              value={newStudentData.remark}
              onChange={(e) => handleInputChange(e, 'remark')}
              className="p-2 border rounded w-full mb-4"
              required
            />
            {updateMode === 'marks' && (
              <>
                <h3 className="text-xl font-semibold mb-2">Enter Marks</h3>
                <input
                  type="text"
                  placeholder="Exam Type"
                  value={newMarksData.examType}
                  onChange={(e) => handleMarksInputChange(e, 'examType')}
                  className="p-2 border rounded w-full mb-4"
                  required
                />
                <input
                  type="number"
                  placeholder="English"
                  value={newMarksData.english}
                  onChange={(e) => handleMarksInputChange(e, 'english')}
                  className="p-2 border rounded w-full mb-4"
                  required
                />
                <input
                  type="number"
                  placeholder="Math"
                  value={newMarksData.math}
                  onChange={(e) => handleMarksInputChange(e, 'math')}
                  className="p-2 border rounded w-full mb-4"
                  required
                />
                <input
                  type="number"
                  placeholder="Science"
                  value={newMarksData.science}
                  onChange={(e) => handleMarksInputChange(e, 'science')}
                  className="p-2 border rounded w-full mb-4"
                  required
                />
                <input
                  type="number"
                  placeholder="Social Science"
                  value={newMarksData.socialScience}
                  onChange={(e) => handleMarksInputChange(e, 'socialScience')}
                  className="p-2 border rounded w-full mb-4"
                  required
                />
                <input
                  type="number"
                  placeholder="Tamil"
                  value={newMarksData.tamil}
                  onChange={(e) => handleMarksInputChange(e, 'tamil')}
                  className="p-2 border rounded w-full mb-4"
                  required
                />
                <input
                  type="number"
                  placeholder="Total"
                  value={newMarksData.total}
                  onChange={(e) => handleMarksInputChange(e, 'total')}
                  className="p-2 border rounded w-full mb-4"
                  required
                />
              </>
            )}
            <Button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
              {editingStudent ? (updateMode === 'marks' ? 'Update Marks' : 'Update Student') : 'Add Student'}
            </Button>
            <Button onClick={resetForm} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 ml-4">
              Cancel
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default StudentForm;