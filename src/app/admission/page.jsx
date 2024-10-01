import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import Select from 'react-select';
import { Textarea } from '@/components/ui/textarea';
import { getDoc, doc, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { db, storage } from '../../firebase';

const AdmissionForm = () => {
    const { t } = useTranslation();
    const [admissionOpen, setAdmissionOpen] = useState(false);
    const [admissionYear, setAdmissionYear] = useState('');
    const [admissionGuidelines, setAdmissionGuidelines] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        studentName: '',
        dob: '',
        grade: '',
        gender: '',
        nationality: '',
        religion: '',
        caste: '',
        community: '',
        fatherName: '',
        fatherQualification: '',
        fatherMobile: '',
        fatherOccupation: '',
        fatherIncome: '',
        motherName: '',
        motherQualification: '',
        motherMobile: '',
        motherOccupation: '',
        motherIncome: '',
        currentSchool: '',
        board: '',
        email: '',
        address: '',
        siblings: '',
        photo: null,
    });

    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchAdmissionData = async () => {
            try {
                const docRef = doc(db, 'Admission', 'post_admission');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setAdmissionOpen(data.admission_opening);
                    setAdmissionYear(data.admission_year);
                    setAdmissionGuidelines(data.admission_guidelines);
                } else {
                    console.log('No admission data found');
                }
            } catch (error) {
                console.error('Error fetching admission data:', error);
            }
        };

        fetchAdmissionData();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = "Please fill all form fields";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                let photoUrl = null; 

             
                if (formData.photo) {
                    const photoRef = ref(storage, `admissions/${formData.photo.name}`); 
                    await uploadBytes(photoRef, formData.photo); 
                    photoUrl = await getDownloadURL(photoRef); 
                }

                const admissionYearRef = collection(db, 'Admission', 'received_admission', '2023');
                await addDoc(admissionYearRef, {
                    ...formData,
                    photo: photoUrl,
                });
                alert('Admission data submitted successfully!');

                setFormData({
                    studentName: '',
                    dob: '',
                    grade: '',
                    gender: '',
                    nationality: '',
                    religion: '',
                    caste: '',
                    community: '',
                    fatherName: '',
                    fatherQualification: '',
                    fatherMobile: '',
                    fatherOccupation: '',
                    fatherIncome: '',
                    motherName: '',
                    motherQualification: '',
                    motherMobile: '',
                    motherOccupation: '',
                    motherIncome: '',
                    currentSchool: '',
                    board: '',
                    email: '',
                    address: '',
                    siblings: '',
                    photo: null,
                });
            } catch (error) {
                console.error('Error submitting admission data:', error);
            }
        }
    };

    if (!admissionOpen) {
        return (
            <div className="bg-gray-50 p-8 max-w-5xl mx-auto shadow-lg rounded-lg text-center">
                <h1 className="text-3xl font-bold text-red-600">{t('admission.closed')}</h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-8 max-w-5xl mx-auto shadow-lg rounded-lg">
            <header className="bg-blue-800/80 text-white text-center py-4 rounded-t-lg">
                <h1 className="text-3xl font-bold">{t('admission.formTitle')} ({admissionYear})</h1>
                <p className="mt-2 text-white text-sm">{admissionGuidelines}</p>
            </header>
            <form onSubmit={onSubmit} className="space-y-6">
                {/* Student Details */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('admission.studentDetails')}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Input
                            name="studentName"
                            label={t('admission.studentName')}
                            placeholder={t('admission.studentName')}
                            value={formData.studentName}
                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        />
                        {errors.studentName && <p className="text-red-500">{errors.studentName}</p>}

                        <Input
                            name="dob"
                            label={t('dob')}
                            placeholder="dd-mm-yyyy"
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                        {errors.dob && <p className="text-red-500">{errors.dob}</p>}

                        <Select
                            name="grade"
                            options={[
                                { value: '1', label: 'Grade 1' },
                                { value: '2', label: 'Grade 2' },
                            ]}
                            placeholder={t('grade')}
                            value={formData.grade ? { value: formData.grade, label: `Grade ${formData.grade}` } : null}
                            onChange={(option) => setFormData({ ...formData, grade: option.value })}
                        />
                        {errors.grade && <p className="text-red-500">{errors.grade}</p>}

                        <Select
                            name="gender"
                            options={[
                                { value: 'male', label: t('male') },
                                { value: 'female', label: t('female') },
                                { value: 'other', label: t('other') },
                            ]}
                            placeholder={t('admission.gender')}
                            value={formData.gender ? { value: formData.gender, label: t(formData.gender) } : null}
                            onChange={(option) => setFormData({ ...formData, gender: option.value })}
                        />
                        {errors.gender && <p className="text-red-500">{errors.gender}</p>}

                        <Input
                            name="nationality"
                            label={t('admission.nationality')}
                            placeholder={t('admission.nationality')}
                            value={formData.nationality}
                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                        />
                        {errors.nationality && <p className="text-red-500">{errors.nationality}</p>}

                        <Input
                            name="religion"
                            label={t('admission.religion')}
                            placeholder={t('admission.religion')}
                            value={formData.religion}
                            onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                        />
                        {errors.religion && <p className="text-red-500">{errors.religion}</p>}

                        <Input
                            name="caste"
                            label={t('admission.caste')}
                            placeholder={t('admission.caste')}
                            value={formData.caste}
                            onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                        />
                        {errors.caste && <p className="text-red-500">{errors.caste}</p>}

                        <Select
                            name="community"
                            options={[
                                { value: 'general', label: t('general') },
                                { value: 'obc', label: t('obc') },
                                { value: 'sc', label: t('sc') },
                                { value: 'st', label: t('st') },
                            ]}
                            placeholder={t('admission.community')}
                            value={formData.community ? { value: formData.community, label: t(formData.community) } : null}
                            onChange={(option) => setFormData({ ...formData, community: option.value })}
                        />
                        {errors.community && <p className="text-red-500">{errors.community}</p>}
                    </div>
                </section>

                {/* Father Details */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-
                    700 mb-4">{t('admission.fatherDetails')}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Input
                            name="fatherName"
                            label={t('admission.fatherName')}
                            placeholder={t('admission.fatherName')}
                            value={formData.fatherName}
                            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        />
                        {errors.fatherName && <p className="text-red-500">{errors.fatherName}</p>}

                        <Input
                            name="fatherQualification"
                            label={t('admission.fatherQualification')}
                            placeholder={t('admission.fatherQualification')}
                            value={formData.fatherQualification}
                            onChange={(e) => setFormData({ ...formData, fatherQualification: e.target.value })}
                        />
                        {errors.fatherQualification && <p className="text-red-500">{errors.fatherQualification}</p>}

                        <Input
                            name="fatherMobile"
                            label={t('admission.fatherMobile')}
                            placeholder={t('admission.fatherMobile')}
                            type="tel"
                            value={formData.fatherMobile}
                            onChange={(e) => setFormData({ ...formData, fatherMobile: e.target.value })}
                        />
                        {errors.fatherMobile && <p className="text-red-500">{errors.fatherMobile}</p>}

                        <Input
                            name="fatherOccupation"
                            label={t('admission.fatherOccupation')}
                            placeholder={t('admission.fatherOccupation')}
                            value={formData.fatherOccupation}
                            onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                        />
                        {errors.fatherOccupation && <p className="text-red-500">{errors.fatherOccupation}</p>}

                        <Input
                            name="fatherIncome"
                            label={t('admission.fatherIncome')}
                            placeholder={t('admission.fatherIncome')}
                            type="number"
                            value={formData.fatherIncome}
                            onChange={(e) => setFormData({ ...formData, fatherIncome: e.target.value })}
                        />
                        {errors.fatherIncome && <p className="text-red-500">{errors.fatherIncome}</p>}
                    </div>
                </section>

                {/* Mother Details */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('admission.motherDetails')}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Input
                            name="motherName"
                            label={t('admission.motherName')}
                            placeholder={t('admission.motherName')}
                            value={formData.motherName}
                            onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                        />
                        {errors.motherName && <p className="text-red-500">{errors.motherName}</p>}

                        <Input
                            name="motherQualification"
                            label={t('admission.motherQualification')}
                            placeholder={t('admission.motherQualification')}
                            value={formData.motherQualification}
                            onChange={(e) => setFormData({ ...formData, motherQualification: e.target.value })}
                        />
                        {errors.motherQualification && <p className="text-red-500">{errors.motherQualification}</p>}

                        <Input
                            name="motherMobile"
                            label={t('admission.motherMobile')}
                            placeholder={t('admission.motherMobile')}
                            type="tel"
                            value={formData.motherMobile}
                            onChange={(e) => setFormData({ ...formData, motherMobile: e.target.value })}
                        />
                        {errors.motherMobile && <p className="text-red-500">{errors.motherMobile}</p>}

                        <Input
                            name="motherOccupation"
                            label={t('admission.motherOccupation')}
                            placeholder={t('admission.motherOccupation')}
                            value={formData.motherOccupation}
                            onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
                        />
                        {errors.motherOccupation && <p className="text-red-500">{errors.motherOccupation}</p>}

                        <Input
                            name="motherIncome"
                            label={t('admission.motherIncome')}
                            placeholder={t('admission.motherIncome')}
                            type="number"
                            value={formData.motherIncome}
                            onChange={(e) => setFormData({ ...formData, motherIncome: e.target.value })}
                        />
                        {errors.motherIncome && <p className="text-red-500">{errors.motherIncome}</p>}
                    </div>
                </section>

                {/* Other Details */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('admission.otherDetails')}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Input
                            name="currentSchool"
                            label={t('admission.currentSchool')}
                            placeholder={t('admission.currentSchool')}
                            value={formData.currentSchool}
                            onChange={(e) => setFormData({ ...formData, currentSchool: e.target.value })}
                        />
                        {errors.currentSchool && <p className="text-red-500">{errors.currentSchool}</p>}

                        <Select
                            name="board"
                            options={[
                                { value: 'cbse', label: t('cbse') },
                                { value: 'icse', label: t('icse') },
                                { value: 'state', label: t('state') },
                            ]}
                            placeholder={t('admission.board')}
                            value={formData.board ? { value: formData.board, label: t(formData.board) } : null}
                            onChange={(option) => setFormData({ ...formData, board: option.value })}
                        />
                        {errors.board && <p className="text-red-500">{errors.board}</p>}

                        <Input
                            name="email"
                            label={t('admission.email')}
                            placeholder={t('admission.email')}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}

                        <Textarea
                            name="address"
                            label={t('admission.address')}
                            placeholder={t('admission.address')}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                        {errors.address && <p className="text-red-500">{errors.address}</p>}

                        <Select
                            name="siblings"
                            options={[
                                { value: 'yes', label: t('yes') },
                                { value: 'no', label: t('no') },
                            ]}
                            placeholder={t('admission.siblings')}
                            value={formData.siblings ? { value: formData.siblings, label: t(formData.siblings) } : null}
                            onChange={(option) => setFormData({ ...formData, siblings: option.value })}
                        />
                        {errors.siblings && <p className="text-red-500">{errors.siblings}</p>}

                        <Input
                            name="photo"
                            label={t('admission.uploadPhoto')}
                            type="file"
                            onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                        />
                        {errors.photo && <p className="text-red-500">{errors.photo}</p>}
                    </div>
                </section>

                <div className="flex justify-end">
                    <Button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                        {t('admission.submitButton')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdmissionForm;
