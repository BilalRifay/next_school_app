import SchoolHistory from '../PageComponents/SchoolHistory ';
import { useTranslation } from 'react-i18next';


const page = () => {
    const { t } = useTranslation();
    const sectionData = [
        {
          title: t("heroPage.vision"),
          description: t("heroPage.visionDescription"),
        },
        {
          title: t("heroPage.mission"),
          description: t("heroPage.missionDescription"),
        },
        {
          title: t("heroPage.motto"),
          description: t("heroPage.motto"),
        },
      ];
    
    const sections = [
        {
            key: 'aboutUs',
            image: t('academicimage.image2'),
            title: 'aboutPage.sections.aboutUs.title',
            description: 'aboutPage.sections.aboutUs.description',
        },
        {
            key: 'whatWeServe',
            image: t('academicimage.image1'),
            title: 'aboutPage.sections.whatWeServe.title',
            description: 'aboutPage.sections.whatWeServe.description',
        },
        {
            key: 'principalDesk',
            image: t('aboutimage.image2'),
            title: 'aboutPage.sections.principalDesk.title',
            description: 'aboutPage.sections.principalDesk.message',
        },
        {
            key: 'chairmanDesk',
            image: t('aboutimage.image1'),
            title: 'aboutPage.sections.chairmanDesk.title',
            description: 'aboutPage.sections.chairmanDesk.message',
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Banner Section */}
            <div className="relative w-full h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-banner-image.jpg')" }}>
                <div className="absolute inset-0 bg-blue-800/80 flex flex-col justify-center items-center">
                    <h1 className="text-white text-4xl font-bold">{t('aboutPage.banner.title')}</h1>
                    <p className="text-white text-lg mt-2">{t('aboutPage.banner.subtitle')}</p>
                </div>
            </div>

            {/* About and Vision Section */}
            <div className="p-6 md:p-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.slice(0, 2).map(section => (
                        <div key={section.key} className="bg-white p-6 rounded-md shadow-md">
                            <img src={section.image} alt={section.title} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t(section.title)}</h2>
                            <p className="text-gray-700">{t(section.description)}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Principal's Desk and Chairman's Desk */}
            <div className="p-6 md:p-8">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.slice(2).map(section => (
                        <div key={section.key} className="bg-blue-800/10 p-6 rounded-md shadow-md">
                            <img src={section.image} alt={section.title} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t(section.title)}</h2>
                            <p className="text-gray-700">{t(section.description)}</p>
                        </div>
                    ))}
                </div>
            </div>

          {/* School History and Vision */}
      <div>
       
        

        {/* Vision and Achievement */}
        <section className="p-6 bg-gray-200 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {t("heroPage.visionTitle")}
          </h2>
          <div className="text-center">
            {sectionData.map((item, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 bg-green-100 rounded-lg shadow-lg mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t("heroPage.achievementTitle")}
          </h2>
          <p className="text-lg">{t("heroPage.achievementDescription")}</p>
        </section>
      </div>
        </div>
    );
};

export default page;
