"use client"

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

const PopupPage = () => {
  const [open, setOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    setOpen(true);
    const fetchAnnouncements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'announcement', 'General', 'items'));
        const fetchedAnnouncements = querySnapshot.docs.map(doc => ({
          title: doc.data().title,
          content: doc.data().content
        }));
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Important Announcement</DialogTitle>
          <DialogDescription>
              {announcements.length > 0 &&
                announcements.map((announcement) => (
                  `${announcement.title}: ${announcement.content}`
                ))
              }
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupPage;
