'use client'

import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbacksRef = collection(db, 'feedbacks');
        const q = query(feedbacksRef, orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Feedbacks</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {feedbacks.length > 0 ? (
          <ul className="space-y-4">
            {feedbacks.map(feedback => (
              <Card key={feedback.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{feedback.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Email:</strong> {feedback.email}</p>
                  <p><strong>Message:</strong> {feedback.message}</p>
                  <p><strong>Timestamp:</strong> {feedback.timestamp.toDate().toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </ul>
        ) : (
          <p>No feedbacks available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;