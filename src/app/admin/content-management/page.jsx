'use client'

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const ContentManagement = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to 'en'
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const pageOptions = [
    { value: 'navbar', label: 'Navbar' },
    { value: 'about', label: 'About' },
    { value: 'academic', label: 'Academic' },
    { value: 'admissionform', label: 'Admission Form' },
    { value: 'contact', label: 'Contact' },
    { value: 'curriculum', label: 'Curriculum' },
    { value: 'footer', label: 'Footer' },
    { value: 'heropage', label: 'Hero Page' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ta', label: 'Tamil' },
    { value: 'hi', label: 'Hindi' }
  ];

  const handlePageSelect = async (selected) => {
    setSelectedPage(selected);
    setLoading(true);
    try {
      const docRef = doc(db, `Content/${selectedLanguage}/translation`, selected.value);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPageData(data);
        setFormData(data);
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleLanguageSelect = (selected) => {
    setSelectedLanguage(selected.value);
    setPageData(null); // Reset page data when language changes
  };

  const handleInputChange = (e, path) => {
    const { value } = e.target;
    const keys = path.split('.');
    const lastKey = keys.pop();
    let obj = { ...formData };

    keys.reduce((acc, key) => acc[key] = acc[key] || {}, obj)[lastKey] = value;

    setFormData(obj);
  };

  const renderInputFields = (data, path = '') => {
    return Object.keys(data).map((key) => {
      const value = data[key];
      const newPath = path ? `${path}.${key}` : key;

      if (Array.isArray(value)) {
        return (
          <div key={newPath}>
            <label className="block font-semibold">{key}</label>
            {value.map((item, index) => (
              <div key={`${newPath}[${index}]`} className="pl-4 border-l">
                <h4 className="font-bold">Item {index + 1}</h4>
                {typeof item === 'object' ? renderInputFields(item, `${newPath}[${index}]`) : (
                  <Input
                    name={newPath}
                    value={item}
                    onChange={(e) => handleInputChange(e, newPath)}
                    placeholder={`Edit ${key}`}
                  />
                )}
              </div>
            ))}
          </div>
        );
      }

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={newPath}>
            <label className="block font-semibold">{key}</label>
            <div className="pl-4 border-l">{renderInputFields(value, newPath)}</div>
          </div>
        );
      }

      return (
        <div key={newPath}>
          <label className="block font-semibold">{key}</label>
          <Input
            name={newPath}
            value={value}
            onChange={(e) => handleInputChange(e, newPath)}
            placeholder={`Edit ${key}`}
          />
        </div>
      );
    });
  };

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, `Content/${selectedLanguage}/translation`, selectedPage.value), formData);
      alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  useEffect(() => {
    if (pageData) {
      console.log('Page data:', pageData);
    }
  }, [pageData]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      <div className="mb-4">
        <Select
          options={languageOptions}
          onChange={handleLanguageSelect}
          placeholder="Select a language"
        />
      </div>

      <div className="mb-4">
        <Select
          options={pageOptions}
          onChange={handlePageSelect}
          placeholder="Select a page"
          isDisabled={!selectedLanguage}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : pageData ? (
        <div className="grid grid-cols-1 gap-4">
          {renderInputFields(pageData)}
          <Button className="mt-4" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      ) : (
        <p>Select a language and page to edit.</p>
      )}
    </div>
  );
};

export default ContentManagement;