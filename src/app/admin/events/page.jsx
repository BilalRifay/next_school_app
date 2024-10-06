'use client'

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import Image from 'next/image';

const Events = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    images: [],
    date: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ta', label: 'Tamil' },
  ];

  useEffect(() => {
    fetchEvents();
  }, [selectedLanguage]);

  const fetchEvents = async () => {
    const docRef = doc(db, 'Content', selectedLanguage, 'translation', 'event');
    const docSnap = await getDoc(docRef);
    const fetchedEvents = docSnap.exists() ? docSnap.data().events || [] : [];
    const sortedEvents = fetchedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    setEvents(sortedEvents);
  };

  const handleImageUpload = async (images) => {
    const storage = getStorage();
    const uploadPromises = images.map(async (image) => {
      const storageRef = ref(storage, `events/${image.name}`);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.date) return;
    setLoading(true); // Set loading to true
    try {
      const imageUrls = form.images.length > 0 ? await handleImageUpload(form.images) : [];
      const newEvent = {
        title: form.title,
        description: form.description,
        images: imageUrls,
        date: form.date, // Use the date from form
      };

      const updatedEvents =
        editIndex !== null
          ? events.map((ev, i) => (i === editIndex ? newEvent : ev))
          : [...events, newEvent];

      await setDoc(doc(db, 'Content', selectedLanguage, 'translation', 'event'), { events: updatedEvents });

      resetForm();
      fetchEvents();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '', images: [], date: '' });
    setEditIndex(null);
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const startEdit = (event, index) => {
    setForm({
      title: event.title,
      description: event.description,
      images: [],
      date: event.date, // Set the date in form
    });
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    await setDoc(doc(db, 'Content', selectedLanguage, 'translation', 'event'), { events: updatedEvents });
    fetchEvents();
  };

  return (
    <div>
      <Label>Select Language</Label>
      <Select
        value={languageOptions.find((opt) => opt.value === selectedLanguage)}
        onChange={(opt) => setSelectedLanguage(opt.value)}
        options={languageOptions}
      />

      <Card>
        <Label>{t('Event Title')}</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Label>{t('Event Description')}</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Label>{t('Event Date')}</Label>
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <Label>{t('Upload Images')}</Label>
        <Input type="file" multiple onChange={handleFileChange} />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? t('Submitting...') : editIndex !== null ? t('Update Event') : t('Add Event')}
        </Button>
      </Card>

      <div className="mt-6">
        {events.map((event, index) => (
          <Card key={index} className="mb-6 p-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="mb-4">{event.description}</p>
            <p className="mb-4">Date: {new Date(event.date).toLocaleDateString()}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.isArray(event.images) && event.images.length > 0 ? (
                event.images.map((img, idx) => (
                  <div key={idx} className="relative w-full h-48">
                    <div className='relative w-full h-full'>

                    <Image
                      src={img}
                      fill
                      alt={`Event ${idx}`}
                      className="object-cover  rounded-md"
                    />
                    </div>
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => startEdit(event, index)}>{t('Edit')}</Button>
              <Button onClick={() => handleDelete(index)} variant="destructive">
                {t('Delete')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;