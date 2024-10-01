import { useTranslation } from 'react-i18next';

const Curriculum = () => {
  const { t } = useTranslation();

  // Get descriptions and subject lists directly
  const desc = t('curriculumPage.approachDescription', { returnObjects: true });
  const subLists = t('curriculumPage.subjectsList', { returnObjects: true });

  // Curriculum sections
  const curriculumSections = [
    {
      title: t('curriculumPage.sections.overview.title'),
      image: t('curriculumimage.image1'),
      content: {
        header: t('curriculumPage.sections.overview.header'),
        content: t('curriculumPage.sections.overview.content'),
      },
    },
    {
      title: t('curriculumPage.sections.subjects.title'),
      image: t('curriculumimage.image2'),
      content: {
        header: t('curriculumPage.sections.subjects.header'),
        content: t('curriculumPage.sections.subjects.content'),
      },
    },
    {
      title: t('curriculumPage.sections.development.title'),
      image: t('curriculumimage.image3'),
      content: {
        header: t('curriculumPage.sections.development.header'),
        content: t('curriculumPage.sections.development.content'),
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-6 lg:px-12">

        {/* Introduction Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-blue-800/80">{t('curriculumPage.pageTitle')}</h1>
          <p className="text-lg max-w-2xl mx-auto">{t('curriculumPage.pageIntro')}</p>
        </div>

        {/* Curriculum Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="p-8 bg-blue-100 rounded-lg shadow-lg text-gray-800">
            <h2 className="text-3xl font-bold mb-4">{t('curriculumPage.approachTitle')}</h2>
            {Array.isArray(desc) && desc.map((paragraph, index) => (
              <p className="mb-4" key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="p-8 bg-green-100 rounded-lg shadow-lg text-gray-800">
            <h2 className="text-3xl font-bold mb-4 text-blue-800/80">{t('curriculumPage.subjectsTitle')}</h2>
            <ul className="list-inside list-disc space-y-2">
              {Array.isArray(subLists) && subLists.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Show all Curriculum Sections with separated image and content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {curriculumSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              {/* Ensure all images have the same size and are separated from text */}
              <div className="mb-6">
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </div>
              {/* Add a border, padding, or any separation between image and text */}
              <div className="pt-4 border-t">
                <h3 className="text-3xl font-bold mb-4 text-center">{section.title}</h3>
                <h4 className="text-2xl font-semibold mb-2 text-center">{section.content.header}</h4>
                <p className="text-center">{section.content.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
