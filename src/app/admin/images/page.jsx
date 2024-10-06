'use client'

import { storage, db } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';

const ImageManagement = () => {
    const [images, setImages] = useState({});
    const [imageType, setImageType] = useState('');
    const [selectedImageKey, setSelectedImageKey] = useState('');
    const [isUpdateMode, setIsUpdateMode] = useState(false); // New state for mode

    useEffect(() => {
        const fetchImages = async () => {
            const docRef = doc(db, 'Content/en/translation/assets');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setImages(docSnap.data());
            } else {
                console.log('No such document!');
            }
        };
        fetchImages();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageRef = ref(storage, `${imageType}/${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);

        let updatedData;
        if (isUpdateMode) {
            // Update an existing image
            updatedData = {
                ...images[imageType],
                [selectedImageKey]: url,
            };
        } else {
            // Add a new image
            updatedData = {
                ...images[imageType],
                [`image${Object.keys(images[imageType]).length + 1}`]: url,
            };
        }

        // Update Firestore with the new data
        await updateDoc(doc(db, 'Content/en/translation/assets'), {
            [imageType]: updatedData,
        });

        const updatedDocSnap = await getDoc(doc(db, 'Content/en/translation/assets'));
        setImages(updatedDocSnap.data());

        // Reset the states after upload
        setSelectedImageKey('');
        setImageType('');
        setIsUpdateMode(false);
    };

    const handleUpdateClick = (type, key) => {
        setImageType(type);
        setSelectedImageKey(key); // Store the specific image key being replaced
        setIsUpdateMode(true); // Set mode to update
        document.getElementById('fileInput').click();
    };

    const handleAddNewClick = (type) => {
        setImageType(type);
        setIsUpdateMode(false); // Set mode to add new
        document.getElementById('fileInput').click();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Admin Image Management</h1>
            {Object.keys(images).map((key) => (
                <div className="mb-8 p-4 border border-gray-300 rounded-lg" key={key}>
                    <h2 className="text-2xl font-semibold mb-4">{key}</h2>
                    {Object.keys(images[key]).map((imageKey) => (
                        <div className="flex items-center justify-between py-2" key={imageKey}>
                            <img
                                src={images[key][imageKey]}
                                alt={imageKey}
                                className="w-44 h-auto rounded-xl shadow-sm"
                            />
                            <Button
                                className="ml-4 bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => handleUpdateClick(key, imageKey)}>
                                Update Image
                            </Button>
                        </div>
                    ))}
                    <div className="mt-4">
                        <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => handleAddNewClick(key)}>
                            Add New Image
                        </Button>
                    </div>
                </div>
            ))}
            <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleImageUpload}
            />
        </div>
    );
};

export default ImageManagement;