'use client'

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [editingClassId, setEditingClassId] = useState(null);
  const [editedClassName, setEditedClassName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch the classes from Firestore
  const fetchClasses = async () => {
    const querySnapshot = await getDocs(collection(db, 'Classes'));
    const classData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setClasses(classData);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Add a new class to Firestore
  const addClass = async () => {
    if (newClassName.trim()) {
      await addDoc(collection(db, 'Classes'), { className: newClassName });
      setNewClassName('');
      fetchClasses();
    }
  };

  // Edit an existing class in Firestore
  const editClass = async () => {
    if (editedClassName.trim() && editingClassId) {
      await updateDoc(doc(db, 'Classes', editingClassId), { className: editedClassName });
      setEditingClassId(null);
      setEditedClassName('');
      fetchClasses();
    }
  };

  // Delete a class from Firestore
  const deleteClass = async (id) => {
    await deleteDoc(doc(db, 'Classes', id));
    fetchClasses();
  };

  // Filter classes based on the search term
  const filteredClasses = classes.filter((cls) =>
    cls.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Card for Adding New Class */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="className">Class Name</Label>
          <Input
            id="className"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
          <Button onClick={addClass} className="mt-2">Add Class</Button>
        </CardContent>
      </Card>

      {/* Card for Editing Class */}
      {editingClassId && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Class</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="editClassName">New Class Name</Label>
            <Input
              id="editClassName"
              value={editedClassName}
              onChange={(e) => setEditedClassName(e.target.value)}
            />
            <Button onClick={editClass} className="mt-2">Save Changes</Button>
          </CardContent>
        </Card>
      )}

      {/* Section for Managing Classes */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Manage Classes</h2>
        <Input
          placeholder="Search Classes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 mb-4"
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.map((cls) => (
              <TableRow key={cls.id} className="cursor-pointer hover:bg-gray-100">
                <TableCell>{cls.className}</TableCell>
                <TableCell>
                  <Button
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingClassId(cls.id);
                      setEditedClassName(cls.className);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteClass(cls.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Classes;

