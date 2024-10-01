'use client'

import { useTranslation } from "react-i18next";

const Card = ({ title, description, extraClasses = '', children }) => (
    <div
        className={`bg-white text-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-500 ${extraClasses}`}
    >
        <h3 className="text-2xl md:text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm">{description}</p>
        {children}
    </div>
);


const ImageCard = ({ src, alt, label }) => (
    <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500">
        <img src={src} alt={alt} className="w-full h-auto" />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
            {label}
        </div>
    </div>
);


const Section = ({ title, children, extraClasses = '' }) => (
    <div className={`container mx-auto py-8 px-4 md:px-8 ${extraClasses}`}>
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">{title}</h2>
        {children}
    </div>
);

export default function Academics() {
    const { t } = useTranslation();

    const ImageLink = t("academicimage", { returnObjects: true });


    return (
        <div className="min-h-screen bg-blue-800/80 text-white">
            {/* Campus Life Section */}
            <Section title={t('academics.campusLife.sectionTitle')}>
                <p className="text-base md:text-lg mb-6 text-center animate-slide-up">
                    {t('academics.campusLife.description')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card
                        title={t('academics.campusLife.cards.0.title')}
                        description={t('academics.campusLife.cards.0.description')}
                    />
                    <Card
                        title={t('academics.campusLife.cards.1.title')}
                        description={t('academics.campusLife.cards.1.description')}
                    />
                    <Card
                        title={t('academics.campusLife.cards.2.title')}
                        description={t('academics.campusLife.cards.2.description')}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <ImageCard
                            src={t('academicimage.image2')}
                            alt="Campus_Image-1"
                            label={t('academics.campusLife.imageCards.0.label')}
                        />

                        <ImageCard
                            src={t('academicimage.image1')}
                            alt="Campus_Image-2"
                            label={t('academics.campusLife.imageCards.1.label')}
                        />

                    </div>
                </div>
            </Section>

            {/* Academics Section */}
            <Section title={t('academics.sectionTitle')} extraClasses="bg-gray-100 text-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        title={t('academics.cards.0.title')}
                        description={t('academics.cards.0.description')}
                    />
                    <Card
                        title={t('academics.cards.1.title')}
                        description={t('academics.cards.1.description')}
                    />
                    <Card
                        title={t('academics.cards.2.title')}
                        description={t('academics.cards.2.description')}
                    />
                    <Card
                        title={t('academics.cards.3.title')}
                        description={t('academics.cards.3.description')}
                    />
                    <Card
                        title={t('academics.cards.4.title')}
                        description={t('academics.cards.4.description')}
                    />
                    <Card
                        title={t('academics.cards.5.title')}
                        description={t('academics.cards.5.description')}
                    />
                </div>
            </Section>

            {/* Navigation Links */}
            <h2 className="text-center font-semibold text-xl pt-2">Campus Images</h2>
            <div className="text-center py-8 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                
                {Object.values(ImageLink).map((img, index) => (
                    <div key={index}>
                        <img src={img} alt={`Image ${index + 1}`} className="w-full h-auto" />
                    </div>
                ))}
            </div>


        </div>
    );
}