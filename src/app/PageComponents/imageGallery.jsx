import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Slide_image1 from '../assets/cover3.jpg';
import Slide_image2 from '../assets/coverImage1.jpg';
import Slide_image3 from '../assets/coverImage2.jpg';
import Slide_image4 from '../assets/coverImage3.jpg';
import Slide_image5 from '../assets/mobImg.jpg';

export default function ImageGallery() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  
  const images = [
    Slide_image2,
    Slide_image3,
    Slide_image4,
    Slide_image5,
    Slide_image1
  ];

  const messages = [
    "Empowering Generations with Quality Education Since 1974",
    "Committed to Excellence in Education for Half a Century",
    "Shaping the Future with 50 Years of Educational Heritage",
    "50 Years of Nurturing Minds and Building Leaders",
    "Half a Century of Academic Excellence and Innovation",
  ];
  
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000 })]}
      className="w-[90%] m-auto bg-gray-600 mt-[5rem]"
      ref={emblaRef}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="w-full flex flex-col items-center justify-center bg-gray-600">
              <img
                src={src}
                alt={`Project image ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-[30rem] object-cover"
              />
              <p className="text-white font-semibold text-center text-[1.5rem] w-full ">
                {messages[index]}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
