'use client'

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import Select from 'react-select';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const SectionPage = () => {
  const [sections, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [standards, setStandards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSectionData, setNewSectionData] = useState({
    standard: '',
    sectionName: '',
    sectionTeacher: { documentId: '', name: '' },
    studentStrength: '',
    studentRepresentative: { documentId: '', name: '' },
    subjects: [],
    timetable: {
      Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {}
    }
  });
  const [updateMode, setUpdateMode] = useState(false);
  const [sectionToUpdate, setSectionToUpdate] = useState(null);
  const [showTimetable, setShowTimetable] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const [sectionSnap, teacherSnap, standardSnap, subjectSnap, studentSnap] = await Promise.all([
        getDocs(collection(db, 'Sections')),
        getDocs(collection(db, 'teacher')),
        getDocs(collection(db, 'Classes')),
        getDocs(collection(db, 'Subjects')),
        getDocs(collection(db, 'students'))
      ]);
      setSections(sectionSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setTeachers(teacherSnap.docs.map(doc => ({ id: doc.id, label: doc.data().name })));
      setStandards(standardSnap.docs.map(doc => ({ value: doc.id, label: doc.data().className })));
      setSubjects(subjectSnap.docs.map(doc => ({ value: doc.id, label: doc.data().subject })));
      setStudents(studentSnap.docs.map(doc => ({ id: doc.id, label: doc.data().name })));
    };
    fetchData();
  }, [loading]);

  const handleChange = (field, value) => {
    setNewSectionData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field, key, value) => {
    setNewSectionData(prev => ({
      ...prev,
      [field]: { ...prev[field], [key]: value }
    }));
  };

  const handleSubjectChange = (selectedOptions) => {
    const selectedSubjects = selectedOptions.map(option => option.label);
    setNewSectionData(prev => ({ ...prev, subjects: selectedSubjects }));
  };

  const handleEditTimetable = (day, timeslot, field, value) => {
    setNewSectionData(prevData => ({
      ...prevData,
      timetable: {
        ...prevData.timetable,
        [day]: {
          ...prevData.timetable[day],
          [timeslot]: { ...prevData.timetable[day]?.[timeslot], [field]: value }
        }
      }
    }));
  };

  const saveSection = async () => {
    setLoading(true);
    if (!newSectionData.sectionName.trim() || !newSectionData.standard) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      // Create the section object to save
      const sectionData = {
        ...newSectionData,
        sectionId: newSectionData.sectionName + "-" + Date.now(), // Example of generating a section id
        sectionTeacher: {
          documentId: newSectionData.sectionTeacher.documentId,
          name: newSectionData.sectionTeacher.name,
        },
        studentRepresentative: {
          documentId: newSectionData.studentRepresentative.documentId,
          name: newSectionData.studentRepresentative.name,
        },
      };

      if (updateMode && sectionToUpdate) {
        await updateDoc(doc(db, 'Sections', sectionToUpdate.id), sectionData);
      } else {
        await addDoc(collection(db, 'Sections'), sectionData);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving section:", error);
    }
  };

  const resetForm = () => {
    setNewSectionData({
      standard: '',
      sectionName: '',
      sectionTeacher: { documentId: '', name: '' },
      studentStrength: '',
      studentRepresentative: { documentId: '', name: '' },
      subjects: [],
      timetable: {
        Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {}
      }
    });
    setUpdateMode(false);
    setSectionToUpdate(null);
  };

  const handleEditSection = (section) => {
    setNewSectionData(section);
    setSectionToUpdate(section);
    setUpdateMode(true);
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await deleteDoc(doc(db, 'Sections', sectionId));
      setSections(sections.filter(section => section.id !== sectionId));
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };

  const handleToggleTimetable = (sectionId) => {
    setShowTimetable(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      {/* Form for Adding or Editing Sections */}
      <Card className="flex flex-col space-y-4">
        <CardHeader>
          <CardTitle>{updateMode ? 'Update Section' : 'Add New Section'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Standard Dropdown */}
          <Label htmlFor="standard">Standard</Label>
          <Select
            id="standard"
            value={standards.find(option => option.value === newSectionData.standard)}
            onChange={(option) => handleChange('standard', option.label)}
            options={standards}
            placeholder="Select Standard"
          />

          {/* Section Name */}
          <Label htmlFor="sectionName">Section Name</Label>
          <Input
            id="sectionName"
            value={newSectionData.sectionName}
            onChange={(e) => handleChange('sectionName', e.target.value)}
          />

          {/* Student Strength */}
          <Label htmlFor="studentStrength">Student Strength</Label>
          <Input
            id="studentStrength"
            type="number"
            value={newSectionData.studentStrength}
            onChange={(e) => handleChange('studentStrength', e.target.value)}
          />

          {/* Section Teacher Dropdown */}
          <Label htmlFor="sectionTeacher">Section Teacher</Label>
          <Select
            id="sectionTeacher"
            value={teachers.find(teacher => teacher.id === newSectionData.sectionTeacher.documentId)}
            onChange={(option) => handleNestedChange('sectionTeacher', 'name', option.label)}
            options={teachers}
            placeholder="Select Teacher"
          />

          {/* Student Representative Dropdown */}
          <Label htmlFor="studentRepresentative">Student Representative</Label>
          <Select
            id="studentRepresentative"
            value={students.find(student => student.id === newSectionData.studentRepresentative.documentId)}
            onChange={(option) => handleNestedChange('studentRepresentative', 'name', option.label)}
            options={students}
            placeholder="Select Student Representative"
          />

          {/* Subjects Dropdown */}
          <Label htmlFor="subjects">Subjects</Label>
          <Select
            isMulti
            id="subjects"
            value={subjects.filter(subject => newSectionData.subjects.includes(subject.label))}
            onChange={handleSubjectChange}
            options={subjects}
            placeholder="Select Subjects"
          />

          {/* Timetable */}
          <Label>Timetable</Label>
          <Timetable
            timetableData={newSectionData.timetable}
            handleEditTimetable={handleEditTimetable}
            subjects={subjects}
          />

          {/* Save or Update Button */}
          <Button onClick={saveSection}>{updateMode ? 'Update Section' : 'Add Section'}</Button>
        </CardContent>
      </Card>

      {/* Section List with Timetable Toggle */}
      <div className="">
        {sections.map(section => (
          <Card key={section.id} className="mb-4">
            <CardHeader>
              <CardTitle>{section.sectionName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p><strong>Standard:</strong> {section.standard || 'N/A'}</p>
                <p><strong>Section Teacher:</strong> {section.sectionTeacher?.name || 'N/A'}</p>
                <p><strong>Student Strength:</strong> {section.studentStrength || 'N/A'}</p>
                <p><strong>Student Representative:</strong> {section.studentRepresentative?.name || 'N/A'}</p>
                <p><strong>Subjects:</strong> {section.subjects.length > 0 ? section.subjects.join(', ') : 'N/A'}</p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={() => handleEditSection(section)}>Edit</Button>
                <Button onClick={() => handleDeleteSection(section.id)}>Delete</Button>
                <Button onClick={() => handleToggleTimetable(section.id)}>
                  {showTimetable[section.id] ? 'Hide Timetable' : 'Show Timetable'}
                </Button>
              </div>
              {showTimetable[section.id] && <Timetable timetableData={section.timetable} />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Timetable = ({ timetableData, handleEditTimetable, subjects }) => {
  return (
    <div className="mt-4 grid grid-cols-7">
      {Object.keys(timetableData).map(day => (
        <div key={day} className="p-2 border">
          <h3 className="font-bold">{day}</h3>
          {Object.keys(timetableData[day]).map(timeslot => {
            const timeslotData = timetableData[day][timeslot];
            return (
              <div key={timeslot} className="flex flex-col">
                <label>{timeslot}</label>
                <Select
                  value={subjects.find(subject => subject.label === timeslotData.subject)}
                  onChange={(option) => handleEditTimetable(day, timeslot, 'subject', option.label)}
                  options={subjects}
                  placeholder="Select Subject"
                />
                <Input
                  type="text"
                  value={timeslotData.teacher || ''}
                  placeholder="Teacher"
                  onChange={(e) => handleEditTimetable(day, timeslot, 'teacher', e.target.value)}
                />
                <Input
                  type="text"
                  value={timeslotData.room || ''}
                  placeholder="Room"
                  onChange={(e) => handleEditTimetable(day, timeslot, 'room', e.target.value)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SectionPage;