import { t } from "i18next";

const Testimonials = ({ testimonials = [] }) => {
    const validTestimonials = Array.isArray(testimonials) ? testimonials : [];

    return (
        <section className="my-8">
            <h2 className="text-[2rem] font-bold text-blue-800/80 text-center">{t('heroPage.testimonialsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {validTestimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-800 text-lg">{testimonial.message}</p>
                        <p className="mt-4 text-blue-800/80 font-bold">{testimonial.author}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
