import { cls } from "@/utils/tailwindCss";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { NFTStorage } from "nft.storage";

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_IPFS_API_KEY as string,
});

const CollectionCreate = () => {
  const [images, setImages] = useState<any[]>([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    },
  });

  const onUpload = async () => {
    if (!images || images.length === 0) {
      return alert("No images");
    }

    const cid = await client.storeDirectory(images);
  };

  return (
    <div className="pb-12">
      <div className="flex justify-between p-6 bg-black text-white strongWhite">
        <Image
          src="/svgs/hamberger.svg"
          width={18}
          height={20}
          alt="hamberger svg"
        />
        <div className="flex gap-1">
          <h1 className="font-bold">OnStage</h1>
        </div>
        <div className="w-4.5" />
      </div>

      <div className="flex flex-col gap-10 p-5">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-xl font-bold">Upload</h2>
          <ul
            className={cls(
              "grid gap-2",
              images.length >= 2 ? "grid-cols-3" : "",
              images.length === 1 ? "grid-cols-2" : ""
            )}
          >
            {images.map((image, index) => (
              <li className="max-h-36 rounded-xl overflow-hidden" key={index}>
                <Image
                  src={URL.createObjectURL(image)}
                  width={300}
                  height={300}
                  className="rounded-xl"
                  alt={`uploaded-${index}`}
                />
              </li>
            ))}
            <li
              className="flex w-full flex-col justify-center items-center gap-2 bg-gray200 py-10 rounded-xl text-gray700 text-xl font-bold cursor-pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Image
                src="/svgs/plus.svg"
                width={18}
                height={20}
                alt="hamberger svg"
              />
              <p>Add</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <h2 className="text-xl font-bold">Character name</h2>
          <input
            className="bg-white border rounded-xl font-bold border-gray500 p-4"
            placeholder="Character name"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="fixed bottom-0 flex justify-center items-center bg-gray500 w-full h-16 font-bold text-white text-xl"
      >
        Upload
      </button>
    </div>
  );
};

export default CollectionCreate;
