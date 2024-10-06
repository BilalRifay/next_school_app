'use client'

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { format } from 'date-fns';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [announcementType, setAnnouncementType] = useState('General');
  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);

  const collectionPath = `announcement/${announcementType}/items`;

  const fetchAnnouncements = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, collectionPath));
    setAnnouncements(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [announcementType]);

  const addAnnouncement = async () => {
    if (newAnnouncementTitle.trim() && newAnnouncementContent.trim()) {
      await addDoc(collection(db, collectionPath), {
        title: newAnnouncementTitle,
        content: newAnnouncementContent,
        date: new Date()
      });
      setNewAnnouncementTitle('');
      setNewAnnouncementContent('');
      fetchAnnouncements();
    }
  };

  const deleteAnnouncement = async (id) => {
    await deleteDoc(doc(db, collectionPath, id));
    fetchAnnouncements();
  };

  const editAnnouncement = (announcement) => {
    setEditMode(announcement.id);
    setEditTitle(announcement.title);
    setEditContent(announcement.content);
  };

  const saveAnnouncement = async (id) => {
    const announcementDoc = doc(db, collectionPath, id);
    await updateDoc(announcementDoc, {
      title: editTitle,
      content: editContent,
      date: new Date()
    });
    setEditMode(null);
    fetchAnnouncements();
  };

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 flex flex-col gap-2">
          <Label htmlFor="announcementType">Announcement Type</Label>
          <select
            id="announcementType"
            value={announcementType}
            onChange={(e) => setAnnouncementType(e.target.value)}
            className="py-2 bg-gray-200 w-1/4"
          >
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            <option value="General">General</option>
          </select>

          <Label htmlFor="announcementTitle">Announcement Title</Label>
          <Input
            id="announcementTitle"
            value={newAnnouncementTitle}
            onChange={(e) => setNewAnnouncementTitle(e.target.value)}
            className="py-2 bg-gray-200 w-1/4"
          />
          <Label htmlFor="announcementContent">Announcement Content</Label>
          <Input
            id="announcementContent"
            value={newAnnouncementContent}
            onChange={(e) => setNewAnnouncementContent(e.target.value)}
            className="py-10 bg-gray-200"
          />
          <Button onClick={addAnnouncement} className="mt-3">Add Announcement</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Manage Announcements</h2>
        {loading ? (
          <p>Loading announcements...</p>
        ) : (
          announcements.length === 0 ? (
            <p>No announcements available</p>
          ) : (
            announcements.map((announcement) => (
              <Card key={announcement.id} className="mt-4 hover:bg-gray-100 transition-all">
                <CardContent className="flex justify-between items-center flex-col md:flex-row pt-5">
                  {editMode === announcement.id ? (
                    <div className="flex flex-col space-y-2 w-full">
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="py-2 bg-gray-200"
                      />
                      <Input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="py-10 bg-gray-200"
                      />
                      <div className="flex space-x-2">
                        <Button onClick={() => saveAnnouncement(announcement.id)} className="mt-2">Save</Button>
                        <Button onClick={() => setEditMode(null)} className="mt-2">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-xl">{announcement.title}</h3>
                      <p>{announcement.content}</p>
                      <p className="text-sm text-gray-500">
                        Posted on: {announcement.date ? format(new Date(announcement.date.seconds * 1000), 'PPP') : 'No date available'}
                      </p>
                    </div>
                  )}
                  <div className="ms-5 flex ">
                    {editMode !== announcement.id && (
                      <Button onClick={() => editAnnouncement(announcement)} className="mr-2">Edit</Button>
                    )}
                    <Button variant="destructive" onClick={() => deleteAnnouncement(announcement.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Announcements;