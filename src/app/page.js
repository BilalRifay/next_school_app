"use client";

import { useInView } from "react-intersection-observer";
import CarouselSection from "../components/PageComponents/CarouselSection";
import Testimonials from "../components/pageComponents/Testimonials";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import PopupPage from "../components/pageComponents/PopupPage";
import Image from "next/image";

const HeroPage = () => {
  const { t } = useTranslation();
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const eventData = t("events", { returnObjects: true });

  return (
    <div className="font-comfortaa">
      <PopupPage />
      {/* Hero Section */}
      <div className="relative w-full md:mt-0 h-[80vh] flex items-center justify-center">
        <picture className="w-full h-full">
          <img
            src={t("heroimages.image1")}
            alt="Hero"
            className="w-full h-full object-cover shadow-lg"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-transparent to-transparent shadow-lg" />
        <div className="absolute top-[50%] md:top-[35%] right-5 md:right-[2rem] bg-white/90 md:bg-white/70 text-gray-900 p-8 rounded-xl shadow-xl w-[90%] md:w-[40%] lg:w-[27%]">
          <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bold leading-tight">
            {t("heroPage.title")}
          </h1>
          <p className="mt-4 mb-4 text-[1rem] md:text-[1rem]">
            {t("heroPage.description")}
          </p>
          <Link
            href="/admission"
            className="mt-6 w-full md:w-3/4 text-[1rem] p-2 px-[2rem] bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            {t("heroPage.applyNow")}
          </Link>
        </div>
      </div>

      {/* Welcome Section */}
      <section
        ref={heroRef}
        className={`md:mt-[6rem] text-center transition-opacity duration-1000 ease-in-out ${
          heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-[2rem] mt-5 font-poppins lg:text-4xl text-blue-800/80 font-bold inline-block px-8 py-2 rounded-xl animate-fade-in">
          {t("heroPage.welcomeTitle")}
        </h1>
        <p className="mt-4 text-[1.2rem] w-3/4 m-auto lg:text-[2rem] text-gray-700 lg:text-xl font-poppins">
          {t("heroPage.welcomeDescription")}
        </p>
        <Testimonials
          testimonials={t("testimonials", { returnObjects: true })}
        />
      </section>

      {/* Carousel Section for Events */}
      <div>
        <CarouselSection
          title={t("heroPage.celebrationsTitle")}
          items={eventData}
        />
        <CarouselSection
          title={t("heroPage.servicesTitle")}
          description={t("heroPage.serviceDescription")}
          items={eventData}
        />
      </div>
      <div className="relative w-full h-screen flex items-center justify-center bg-blue-900 text-white">
        <picture>
          <img
            src={t("heroimages.image1")}
            alt="School"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-transparent to-transparent" />
        <div className="relative z-10 text-center p-8 md:p-16 lg:p-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("heroPage.welcomeTitle")}
          </h1>
          <p className="text-lg mb-6">{t("heroPage.welcomeDescription")}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/admission"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              {t("heroPage.applyNow")}
            </Link>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              {t("heroPage.downloadBrochure")}
            </button>
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              {t("heroPage.scheduleVisit")}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
