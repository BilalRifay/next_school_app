'use client'

import { useState, useEffect } from 'react';
import { getDoc, doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const AdmissionQuery = () => {
    const [formData, setFormData] = useState({});
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchAdmissionData = async () => {
            try {
                const admissionRef = doc(db, 'Admission', 'post_admission');
                const docSnap = await getDoc(admissionRef);

                if (!docSnap.exists()) {
                    console.log('No such document!');
                    return;
                }

                const data = docSnap.data();
                setFormData({
                    admission_year: data.admission_year || '',
                    admission_opening: data.admission_opening || false,
                    admission_guidelines: data.admission_guidelines || ''
                });
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchAdmissionData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePostAdmission = async (e) => {
        e.preventDefault();
        try {
            const admissionRef = doc(db, 'Admission', 'post_admission');
            await updateDoc(admissionRef, formData);
            console.log('Admission data updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleViewApplications = async () => {
        try {
            const receivedAdmissionsRef = collection(db, 'Admission', 'received_admission', '2023');
            const querySnapshot = await getDocs(receivedAdmissionsRef);
            const apps = [];

            if (querySnapshot.empty) {
                console.log('No applications found!');
                return;
            }

            querySnapshot.forEach((doc) => {
                apps.push(doc.data());
            });

            setApplications(apps);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    return (
        <div className="p-5 bg-gray-100 h-[70vh] lg:h-auto text-5xl lg:text-[18px]">
            <div className="mb-5">
                <form onSubmit={handlePostAdmission} className="bg-white p-5 rounded shadow">
                    <h2 className="font-bold mb-4">Update Admission Details</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Admission Year:</label>
                        <input
                            type="text"
                            name="admission_year"
                            value={formData.admission_year || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Admission Opening:
                            <input
                                type="checkbox"
                                name="admission_opening"
                                checked={formData.admission_opening || false}
                                onChange={handleInputChange}
                                className="ml-2"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Admission Guidelines:</label>
                        <textarea
                            name="admission_guidelines"
                            value={formData.admission_guidelines || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 py-5 lg:py-0 border border-gray-300 rounded h-[30rem] lg:h-[5rem]"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded" onClick={() => alert("Admission Guidelines Updated")}>
                        Update Admission
                    </button>
                </form>
            </div>

            <div className="mt-5">
                <button
                    onClick={handleViewApplications}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    View Latest Applications
                </button>

                {applications.length > 0 && (
                    <div className="mt-5">
                        <div className="bg-white p-5 rounded shadow mb-5">
                            <h2 className="font-bold mb-4">Application Details</h2>
                            {applications.map((app, index) => (
                                <div key={index} className="mb-4 p-4 border border-gray-300 rounded w-3/4">
                                    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start mb-4">
                                        <img src={app.photo} alt='Student_Image' className="object-cover w-3/4 lg:w-24 lg:h-24 rounded-xl mb-5" />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold">{app.student_name}</h3>
                                            <p><strong>Grade:</strong> {app.grade}</p>
                                            <p><strong>DOB:</strong> {app.dob}</p>
                                            <p><strong>Email:</strong> {app.email}</p>
                                            <p><strong>Fathers Name:</strong> {app.father_name}</p>
                                            <p><strong>Mothers Name:</strong> {app.mother_name}</p>
                                            <p><strong>Current School:</strong> {app['current-school']}</p>
                                            <p><strong>Address:</strong> {app.address}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdmissionQuery;