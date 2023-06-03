import Image from "next/image";

interface NFTCollectionCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  onClick?: () => void;
}

const NFTCollectionCard = ({
  id,
  image,
  title,
  price,
  onClick,
}: NFTCollectionCardProps) => {
  return (
    <button
      key={id}
      onClick={onClick}
      className="relative h-48 shadow overflow-hidden rounded-md font-medium flex items-end"
    >
      <Image
        src={image}
        className="absolute top-0"
        width={300}
        height={300}
        alt="trend-thumbnail"
      />
      <div className="flex flex-col justify-between text-left bg-white p-2 w-full h-1/2 z-20">
        <div>
          <p className="text-gray500">{title}</p>
          <p>{id}</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-black text-white text-sm w-4 h-4 flex justify-center items-center font-bold rounded-full">
            n
          </div>
          <p className="font-bold">{price}</p>
        </div>
      </div>
    </button>
  );
};

export default NFTCollectionCard;
