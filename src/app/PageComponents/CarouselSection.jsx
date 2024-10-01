import { useInView } from 'react-intersection-observer';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../../components/ui/carousel';

const CarouselSection = ({ title, description, items }) => {
    const validItems = Array.isArray(items) ? items : [];

    const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const renderImages = (images) => {
        if (images.length <= 1) {
            return (
                <div className="w-full flex overflow-x-auto space-x-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Event image ${index + 1}`}
                            className="w-full h-[30rem] object-cover rounded-xl"
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Event image ${index + 1}`}
                            className="w-full h-[20rem] object-cover rounded-xl"
                        />
                    ))}
                </div>
            );
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`py-7 transition-opacity duration-1000 ease-in-out ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="text-center mb-10">
                <h2 className="text-[2rem] font-bold text-white lg:text-4xl bg-blue-800/80 inline-block px-8 py-2 rounded-xl">
                    {title}
                </h2>
                {description && (
                    <p className="mt-8 text-[1rem] lg:text-lg w-[90%] m-auto">
                        {description}
                    </p>
                )}
            </div>
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 5000 })]}
                className="w-[90%] m-auto"
            >
                <CarouselContent>
                    {validItems.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="w-full flex flex-col items-center justify-center text-blue-800/80 p-5">
                                <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold mb-2 font-poppins">{item.title}</h3>
                                <p className="mb-4 text-[1rem] text-center font-poppin">
                                    {item.description}
                                </p>
                                {renderImages(item.images)}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
};

export default CarouselSection;
