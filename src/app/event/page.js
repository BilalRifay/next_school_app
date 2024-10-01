'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import CarouselSection from '../../components/pageComponents/CarouselSection';
import { useInView } from 'react-intersection-observer';

const EventPage = () => {
  const { t } = useTranslation();


  let events = t('events', { returnObjects: true });
  if (!Array.isArray(events)) {
    console.error('Events data is not an array:', events);
    events = [];
  }


  const currentDate = moment().startOf('day');
  const pastEvents = events.filter(event => moment(event.date).isBefore(currentDate));
  const upcomingEvents = events.filter(event => moment(event.date).isAfter(currentDate));


  const EventSection = ({ title, description, images }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });


    const validImages = Array.isArray(images) ? images : [];

    return (
      <div
        ref={ref}
        className={`p-6 md:p-8 bg-gray-50 mb-8 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-teal-600">
          {title}
        </h2>
        <p className="text-center mb-6">{description}</p>
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl mb-6">
          {validImages[0] && (
            <img
              src={validImages[0]}
              alt={title}
              className="w-3/4 m-auto h-full object-cover"
            />
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {validImages.slice(1).map((img, index) => (
            <div
              key={index}
              className="relative w-full h-32 md:h-40 overflow-hidden rounded-lg"
            >
              <img src={img} alt={`event-image-${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    );
  };


  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: carouselRef, inView: carouselInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="font-sans">
      {/* Header Section */}
      <div
        ref={headerRef}
        className={`relative text-center mb-12 p-8 bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg transition-opacity duration-700 ${headerInView ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <h1 className="relative text-5xl font-extrabold mb-4 text-white tracking-wider drop-shadow-md">
          Our School Events
        </h1>
        <p className="relative text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-sm">
          Explore our past and upcoming events where students engage, learn, and celebrate various academic, cultural, and extracurricular activities.
        </p>
      </div>
      <div>
        <h2 className="text-4xl font-bold text-center mb-8">Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-center">No upcoming events.</p>
        ) : (
          upcomingEvents.map((event, index) => (
            <EventSection
              key={index}
              title={event.title}
              description={event.description}
              images={event.images || []}
            />
          ))
        )}
      </div>
      {/* Past Events */}
      <div>
        <h2 className="text-4xl font-bold text-center mb-8">Past Events</h2>
        {pastEvents.length === 0 ? (
          <p className="text-center">No past events.</p>
        ) : (
          pastEvents.map((event, index) => (
            <EventSection
              key={index}
              title={event.title}
              description={event.description}
              images={event.images || []}
            />
          ))
        )}
      </div>

      {/* Upcoming Events */}


      {/* Carousel Section */}
      <div
        ref={carouselRef}
        className={`transition-opacity duration-700 ${carouselInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <CarouselSection
          title={t('heroPage.celebrationsTitle')}
          items={events}
          image={events.flatMap(event => event.images || [])}
        />
      </div>
    </div>
  );
};

export default EventPage;