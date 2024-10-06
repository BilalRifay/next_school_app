'use client'

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { collection, addDoc, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const TeacherPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacherData, setNewTeacherData] = useState({
        name: '',
        address: '',
        age: '',
        contactNumber: '',
        emailAddress: '',
        qualifications: [''],
        subjectsCanTeach: ['']
    });
    const [updateMode, setUpdateMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [teacherToUpdate, setTeacherToUpdate] = useState(null);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        const querySnapshot = await getDocs(collection(db, 'teacher'));
        setTeachers(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    const addTeacher = async () => {
        if (newTeacherData.name.trim()) {
            await addDoc(collection(db, 'teacher'), newTeacherData);
            resetForm();
            fetchTeachers();
        }
    };

    const deleteTeacher = async (id) => {
        await deleteDoc(doc(db, 'teacher', id));
        fetchTeachers();
        alert("Teacher Data deleted")
    };

    const updateTeacher = async () => {
        if (teacherToUpdate) {
            await setDoc(doc(db, 'teacher', teacherToUpdate.id), newTeacherData);
            resetForm();
            setUpdateMode(false);
            fetchTeachers();
        }
    };

    const handleUpdate = (teacher) => {
        setUpdateMode(true);
        setTeacherToUpdate(teacher);
        setNewTeacherData({
            name: teacher.name,
            address: teacher.address,
            age: teacher.age,
            contactNumber: teacher.contactNumber,
            emailAddress: teacher.emailAddress,
            qualifications: teacher.qualifications,
            subjectsCanTeach: teacher.subjectsCanTeach
        });
    };

    const resetForm = () => {
        setNewTeacherData({
            name: '',
            address: '',
            age: '',
            contactNumber: '',
            emailAddress: '',
            qualifications: [''],
            subjectsCanTeach: ['']
        });
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
    );

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{updateMode ? 'Update Teacher' : 'Add New Teacher'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={newTeacherData.name}
                        onChange={(e) => setNewTeacherData({ ...newTeacherData, name: e.target.value })}
                    />

                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        value={newTeacherData.address}
                        onChange={(e) => setNewTeacherData({ ...newTeacherData, address: e.target.value })}
                    />

                    <Label htmlFor="age">Age</Label>
                    <Input
                        id="age"
                        type="number"
                        value={newTeacherData.age}
                        onChange={(e) => setNewTeacherData({ ...newTeacherData, age: e.target.value })}
                    />

                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                        id="contactNumber"
                        value={newTeacherData.contactNumber}
                        onChange={(e) => setNewTeacherData({ ...newTeacherData, contactNumber: e.target.value })}
                    />

                    <Label htmlFor="emailAddress">Email Address</Label>
                    <Input
                        id="emailAddress"
                        type="email"
                        value={newTeacherData.emailAddress}
                        onChange={(e) => setNewTeacherData({ ...newTeacherData, emailAddress: e.target.value })}
                    />

                    <Label htmlFor="qualifications">Qualifications</Label>
                    {newTeacherData.qualifications.map((qualification, index) => (
                        <Input
                            key={index}
                            value={qualification}
                            onChange={(e) => {
                                const newQualifications = [...newTeacherData.qualifications];
                                newQualifications[index] = e.target.value;
                                setNewTeacherData({ ...newTeacherData, qualifications: newQualifications });
                            }}
                            className="mb-2"
                        />
                    ))}
                    <Button
                        type="button"
                        onClick={() => setNewTeacherData({ ...newTeacherData, qualifications: [...newTeacherData.qualifications, ''] })}
                        className="mt-2"
                    >
                        Add Qualification
                    </Button>
                    <br />
                    <Label htmlFor="subjectsCanTeach">Subjects Can Teach</Label>
                    {newTeacherData.subjectsCanTeach.map((subject, index) => (
                        <Input
                            key={index}
                            value={subject}
                            onChange={(e) => {
                                const newSubjects = [...newTeacherData.subjectsCanTeach];
                                newSubjects[index] = e.target.value;
                                setNewTeacherData({ ...newTeacherData, subjectsCanTeach: newSubjects });
                            }}
                            className="mb-2"
                        />
                    ))}
                    <Button
                        type="button"
                        onClick={() => setNewTeacherData({ ...newTeacherData, subjectsCanTeach: [...newTeacherData.subjectsCanTeach, ''] })}
                        className="mt-2"
                    >
                        Add Subject
                    </Button>

                    <div className='flex gap-5'>
                        <Button
                            onClick={updateMode ? updateTeacher : addTeacher}
                            className="mt-2"
                        >
                            {updateMode ? 'Update Teacher' : 'Add Teacher'}
                        </Button>
                        <Button
                            onClick={() => {
                                setUpdateMode(false);
                                resetForm();
                            }}
                            className="mt-2"
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Manage Teachers</h2>
                <Input
                    placeholder="Search Teacher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                />
                {filteredTeachers.map((teacher) => (
                    <Card key={teacher.id} className="mt-4 hover:bg-gray-100 transition-all">
                        <CardContent>
                            <h3 className="text-lg font-bold">{teacher.name}</h3>
                            <p><strong>Address:</strong> {teacher.address}</p>
                            <p><strong>Age:</strong> {teacher.age}</p>
                            <p><strong>Contact Number:</strong> {teacher.contactNumber}</p>
                            <p><strong>Email Address:</strong> {teacher.emailAddress}</p>
                            <p><strong>Qualifications:</strong> {teacher.qualifications.join(', ')}</p>
                            <p><strong>Subjects Can Teach:</strong> {teacher.subjectsCanTeach.join(', ')}</p>
                            <div className='flex items-center gap-3'>
                                <Button
                                    variant="destructive"
                                    onClick={() => deleteTeacher(teacher.id)}
                                    className="mt-2"
                                >
                                    Delete
                                </Button>
                                <Button
                                    onClick={() => handleUpdate(teacher)}
                                    className="mt-2"
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

export default TeacherPage;