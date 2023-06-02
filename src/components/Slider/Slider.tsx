import { useRouter } from "next/router";
import Image from "next/image";
import ReactSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  pauseOnHover: true,
  arrows: false,
  centerMode: true,
  centerPadding: "0px",
  focusOnSelect: true,
};

type SliderItem = {
  id: string | number;
  title: string;
  image: string;
};

interface SliderProps {
  items: SliderItem[];
  route: string;
}

const Slider = ({ items, route }: SliderProps) => {
  const router = useRouter();

  return (
    <ReactSlider {...settings}>
      {items.map(({ id, image, title }) => {
        return (
          <button
            key={id}
            onClick={() => {
              router.push(`/${route}/${id}`);
            }}
            className="h-full overflow-hidden"
          >
            <Image
              src={image}
              className="object-cover w-full h-full"
              width={1080}
              height={1080}
              alt={title + "-image"}
            />
          </button>
        );
      })}
    </ReactSlider>
  );
};

export default Slider;
