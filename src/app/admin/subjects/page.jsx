'use client'

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import Select from 'react-select';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubjectData, setNewSubjectData] = useState({
    subject: '',
    description: ''
  });
  const [updateMode, setUpdateMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectToUpdate, setSubjectToUpdate] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'Subjects'));
      setSubjects(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchSubjects();
  }, []);

  const addSubject = async () => {
    if (newSubjectData.subject.trim()) {
      await addDoc(collection(db, 'Subjects'), newSubjectData);
      setNewSubjectData({ subject: '', description: '' });
      const querySnapshot = await getDocs(collection(db, 'Subjects'));
      setSubjects(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
  };

  const deleteSubject = async (id) => {
    await deleteDoc(doc(db, 'Subjects', id));
    const querySnapshot = await getDocs(collection(db, 'Subjects'));
    setSubjects(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const updateSubject = async () => {
    if (subjectToUpdate) {
      const subjectDoc = doc(db, 'Subjects', subjectToUpdate.id);
      await addDoc(subjectDoc, { ...newSubjectData });
      setUpdateMode(false);
      setNewSubjectData({ subject: '', description: '' });
      const querySnapshot = await getDocs(collection(db, 'Subjects'));
      setSubjects(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
  };

  const handleUpdate = (subject) => {
    setUpdateMode(true);
    setSubjectToUpdate(subject);
    setNewSubjectData({
      subject: subject.subject,
      description: subject.description
    });
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.subject?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{updateMode ? 'Update Subject' : 'Add New Subject'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="subject">Subject Name</Label>
          <Input
            id="subject"
            value={newSubjectData.subject}
            onChange={(e) => setNewSubjectData({ ...newSubjectData, subject: e.target.value })}
          />

          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={newSubjectData.description}
            onChange={(e) => setNewSubjectData({ ...newSubjectData, description: e.target.value })}
          />

         <div className=''>
         <Button
            onClick={updateMode ? updateSubject : addSubject}
            className="mt-2 me-5"
          >
            {updateMode ? 'Update Subject' : 'Add Subject'}
          </Button>
          <Button
            onClick={() => {
              setUpdateMode(false);
              setNewSubjectData({ subject: '', description: '' });
            }}
            className="mt-2"
          >
            Cancel
          </Button>
         </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Manage Subjects</h2>
        <Input
          placeholder="Search Subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        {filteredSubjects.map((subject) => (
          <Card key={subject.id} className="mt-4 hover:bg-gray-100 transition-all w-auto md:w-3/4 ">
            <CardContent className='flex flex-col md:flex-row justify-between items-center'>
              <h3 className="text-lg font-bold">{subject.subject}</h3>
              <div className='flex flex-row gap-5 md:flex-col mt-5 md:mt-0'>
                <Button
                  variant="destructive"
                  onClick={() => deleteSubject(subject.id)}
                  className="mt-5"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleUpdate(subject)}
                  className=""
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectPage;