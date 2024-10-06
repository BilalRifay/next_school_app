'use client'

import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState({ General: [], Student: [], Teacher: [] });
  const [events, setEvents] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesRef = collection(db, 'Classes');
        const sectionsRef = collection(db, 'Sections');
        const studentsRef = collection(db, 'students');
        const eventsRef = collection(db, 'Events');

        const classesSnapshot = await getDocs(classesRef);
        const sectionsSnapshot = await getDocs(sectionsRef);
        const studentsSnapshot = await getDocs(studentsRef);
        const eventsSnapshot = await getDocs(eventsRef);

        const classesCount = classesSnapshot.size;
        const sectionsCount = sectionsSnapshot.size;
        const studentsCount = studentsSnapshot.size;
        const eventsCount = eventsSnapshot.size;
        setCardData([
          { title: 'Classes', count: classesCount, description: 'Classes', navigateTo: '/admin/classes' },
          { title: 'Sections', count: sectionsCount, description: 'Sections', navigateTo: '/admin/sections' },
          { title: 'Students', count: studentsCount, description: 'Students', navigateTo: '/admin/students' },
          { title: 'Events', count: eventsCount, description: 'Upcoming Events', navigateTo: '/admin/events' },
        ]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsData = { general: [], student: [], teacher: [] };
        const subCollections = ['General', 'Student', 'Teacher'];

        for (const subCollection of subCollections) {
          const subColRef = collection(db, 'announcement', subCollection, 'items');
          const subColSnapshot = await getDocs(subColRef);
          const subColData = subColSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          announcementsData[subCollection] = subColData;
        }

        setAnnouncements(announcementsData);

      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    fetchAnnouncements();
  }, []);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'Events');
        const q = query(eventsRef, orderBy('date', 'desc'), limit(5));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'Users'), where('adminApproval', '==', false));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbacksRef = collection(db, 'feedbacks');
        const q = query(feedbacksRef, orderBy('timestamp', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const userDocRef = doc(db, 'Users', userId);
      await updateDoc(userDocRef, { adminApproval: true });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error approving user: ', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid gap-4 mb-8 grid-cols-1 md:grid-cols-4">
        {cardData.map((card, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white text-gray-900"
            onClick={() => router.push(card.navigateTo)}
          >
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{card.count} {card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-gray-900">
        <h2 className="text-1xl font-bold mb-4">Quick Access</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <Button className="flex-1" onClick={() => router.push('/admin/students')}>Add New Student</Button>
          <Button className="flex-1" onClick={() => router.push('/admin/events')}>Schedule Event</Button>
          <Button className="flex-1" onClick={() => router.push('/admin/announcements')}>Create Announcement</Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-gray-900 h-[27rem] overflow-hidden overflow-y-auto">
        <h2 className="text-1xl font-bold mb-4">User Approval</h2>
        {users.length > 0 ? (
          <ul className="space-y-3">
            {users.map((user) => (
              <li key={user.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-100 rounded-md">
                <span>
                  <p>UserName: {user.username}</p>
                  <p>User Role: {user.role}</p>
                  <p>User Email: {user.email}</p>
                </span>
                <Button onClick={() => handleApprove(user.id)}>Approve</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users pending approval.</p>
        )}
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md mb-8 text-gray-900">
        <h2 className="text-2xl font-bold mb-4">Recently Posted Announcements</h2>

        {/* General Announcements */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">General Announcements</h3>
          <ul className="list-disc pl-5">
            {announcements.General.length > 0 ? (
              announcements.General.map(announcement => (
                <li key={announcement.id}>{announcement.title}</li>
              ))
            ) : (
              <li>No General Announcements.</li>
            )}
          </ul>
        </div>

        {/* Student Announcements */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Student Announcements</h3>
          <ul className="list-disc pl-5">
            {announcements.Student.length > 0 ? (
              announcements.Student.map(announcement => (
                <li key={announcement.id}>{announcement.title}</li>
              ))
            ) : (
              <li>No Student Announcements.</li>
            )}
          </ul>
        </div>

        {/* Teacher Announcements */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Teacher Announcements</h3>
          <ul className="list-disc pl-5">
            {announcements.Teacher.length > 0 ? (
              announcements.Teacher.map(announcement => (
                <li key={announcement.id}>{announcement.title}</li>
              ))
            ) : (
              <li>No Teacher Announcements.</li>
            )}
          </ul>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-8 text-gray-900">
        <h2 className="text-2xl font-bold mb-4">Recently Posted Events</h2>
        <ul className="list-disc pl-5">
          {events.length > 0 ? (
            events.map(event => (
              <li key={event.id}>{event.title}</li>
            ))
          ) : (
            <li>No Events available.</li>
          )}
        </ul>
      </section>

      <Link href='/admin/feedback'>
        <section className="bg-white p-6 rounded-lg shadow-md mb-8 text-gray-900">
          <h2 className="text-2xl font-bold mb-4">Recent Feedback</h2>
          <ul className="list-disc pl-5">
            {feedbacks.length > 0 ? (
              feedbacks.map(feedback => (
                <li key={feedback.id}>{feedback.name}
                  <p><strong>{feedback.message}</strong></p>

                </li>
              ))
            ) : (
              <li>No Feedback available.</li>
            )}
          </ul>
        </section>
      </Link>
    </div>
  );
};

export default Dashboard;