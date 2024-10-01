"use client"

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveNavbar } from '../navbar/MenuForLG';
// import MenuforSM from '../shared-components/MenuforSM';
import LanguageSelector from "../languageSelector/LanguageSelector";
// import ProfilePage from "../AuthPages/ProfilePage";
import { LogInIcon } from "lucide-react";
// import { useAuth } from "../context/authContext";
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
// import Link from "next/link";

function Navbar() {
    const { t } = useTranslation();
    // const { user } = useAuth();
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
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

    const getSchoolSections = () => {
        const baseSections = [
            {
                title: t('navbar.home'),
                items: [
                    t('navbar.home'),
                    t('navbar.news'),
                    t('navbar.announcements')
                ],
                links: ["/", "/", "/"]
            },
            {
                title: t('navbar.academic'),
                items: [
                    t('navbar.programs'),
                    t('navbar.departments'),
                    t('navbar.faculty')
                ],
                links: ['/academics', '/Departments', '/Faculty']
            },
            {
                title: t('navbar.curriculum'),
                items: [
                    t('navbar.curriculum'),
                    t('navbar.academicCalendar'),
                    t('navbar.studyResources')
                ],
                links: ['/curriculum', '/academic-calendar', '/study-resources']
            },
            {
                title: t('navbar.events'),
                items: [
                    t('navbar.events'),
                    t('navbar.pastEvents'),
                    t('navbar.calendar')
                ],
                links: ['/event', '/past-events', '/calendar']
            },
            {
                title: t('navbar.about'),
                items: [
                    t('navbar.about'),
                    t('navbar.history'),
                    t('navbar.missionVision')
                ],
                links: ['/about', '/history', '/mission-vision']
            },
            {
                title: t('navbar.contact'),
                items: [
                    t('navbar.contact'),
                    t('navbar.generalInquiries'),
                    t('navbar.admissionsOffice')
                ],
                links: ["/contact", '/general-inquiries', '/admissions-office']
            },
            {
                title: t('navbar.admission'),
                items: [
                    t('navbar.admission'),
                    t('navbar.applicationProcess'),
                    t('navbar.requirements')
                ],
                links: ["/admission", '/application-process', '/requirements']
            }
        ];

        const portalSections = [];
        // if (user) {
        //     if (user.role === 'admin') {
        //         portalSections.push({
        //             title: 'Admin Portal',
        //             items: ['Admin Dashboard'],
        //             links: ["/admin"]
        //         });
        //     }
        //     if (user.role === 'teacher') {
        //         portalSections.push({
        //             title: 'Teacher Portal',
        //             items: ['Teacher Dashboard'],
        //             links: ["/teacher"]
        //         });
        //     }
        //     if (user.role === 'student') {
        //         portalSections.push({
        //             title: 'Student Portal',
        //             items: ['Student Dashboard'],
        //             links: ["/student"]
        //         });
        //     }
        // }

        return [...baseSections, ...portalSections];
    };

    const schoolSections = getSchoolSections();

    const Contact = [
        t('navbar.contactPhone1'),
        t('navbar.contactPhone2'),
        t('navbar.contactEmail'),
        t('navbar.contactAddress')
    ];

    return (
        <>
            {/* Header Components */}
            <div className="bg-blue-800/80 md:bg-white max-w-full md:flex justify-around items-center h-[105px] font-comfortaa text-blue-800 md:rounded-none">
                <div className="flex justify-between items-center md:justify-start h-full mx-5 gap-5">
                    <picture>
                        <source srcSet={t("navbarimages.logo2")} media="(min-width: 1024px)" />
                        <img src={t("navbarimages.logo2")}  alt="logo" className="w-[7rem] md:w-[6rem] lg:mb-3" />
                    </picture>
                    {/* <MenuforSM sections={schoolSections} /> */}
                    <p className="hidden md:block">
                        {t('navbar.headerText')}
                        <br />
                        {t('navbar.headerTextPart2')}
                    </p>
                </div>
                <div>
                    <div className="hidden md:flex text-[12px] mt-2 lg:ms-[16rem] text-center ">
                        <ul>
                            {Contact.map((act, key) => (
                                <li key={key}>
                                    <p>{act}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Marquee for announcements */}
            <div className="flex justify-around py-1">
                <div className="w-[90%]">
                    <marquee direction="left">
                        {announcements.length > 0 &&
                            announcements.map((announcement) => (
                                `${announcement.title}: ${announcement.content}`
                            ))
                        }
                    </marquee>
                </div>
                <div className="hidden md:flex gap-3 flex-row">
                    <LanguageSelector />
                    {/* {user ? (
                        <ProfilePage />
                    ) : (
                        <Link to="/auth">
                            <LogInIcon />
                        </Link>
                    )} */}
                </div>
            </div>

            {/* Responsive Navbar for larger screens */}
            <div className="hidden md:block">
                <ResponsiveNavbar schoolSections={schoolSections} />
            </div>
        </>
    );
}

export default Navbar;