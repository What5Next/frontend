import Image from "next/image";
import Modal from "../Modal";

interface NftMintCompleteModalProps {
  imageFile: File;
  isOpen: boolean;
  onClose: () => void;
}

const NftMintCompleteModal = ({
  imageFile,
  isOpen,
  onClose,
}: NftMintCompleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-black w-full h-full text-white">
        <div className="flex justify-end p-6">
          <button type="button" onClick={onClose}>
            <Image src="/svgs/close.svg" width={16} height={16} alt="close" />
          </button>
        </div>
        <div className="flex flex-col gap-5 p-5 h-[calc(100%-64px)]">
          <p className="text-2xl text-center font-bold">
            Finished appointment!
          </p>
          <div className="bg-white w-full rounded-2xl">
            <div className="p-4">
              {imageFile && (
                <Image
                  src={URL.createObjectURL(imageFile)}
                  width={1080}
                  height={1080}
                  alt="success nft"
                />
              )}
              <p className="text-black text-center pt-2">{imageFile?.name}</p>
            </div>
            <button
              type="button"
              className="font-bold text-xl w-full rounded-b-2xl bg-purple py-4"
              onClick={() => {}}
            >
              Put my character on stage
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NftMintCompleteModal;
