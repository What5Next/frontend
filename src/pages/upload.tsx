import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { NFTStorage } from "nft.storage";

import nearStore from "@/store/nearStore";
import { cls } from "@/utils/tailwindCss";
import { getWalletAuthKey } from "@/utils/auth";
import { NftMintCompleteModal } from "@/components/Modal";
import { useRouter } from "next/router";

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_IPFS_API_KEY as string,
});

const Upload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const router = useRouter();
  const { wallet } = nearStore();

  useEffect(() => {
    return () => {
      setName("");
      setDesc("");
      setImages([]);
      setIsOpen(false);
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    },
  });

  const onUpload = useCallback(async () => {
    if (!images || images.length === 0) {
      return alert("No images");
    }

    try {
      setIsLoading(true);

      const cid = await client.storeDirectory(images);

      await wallet?.createNewNftContract(name);
      const nftContractAccounts: string[] =
        await wallet?.getNftsContractAccounts();

      const nftContractId = nftContractAccounts.find((accountId) =>
        accountId.includes(name)
      );

      await wallet.newDefaultMeta(nftContractId, getWalletAuthKey());

      await wallet.nftMint(nftContractId, "#" + name, getWalletAuthKey(), {
        title: name,
        description: desc,
        media: `https://${cid}.ipfs.nftstorage.link/${images[0].name}`,
      });

      setIsOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [name, desc, images]);

  return (
    <div className="pb-12">
      <div className="flex justify-between p-6 bg-black text-white strongWhite">
        <button type="button" onClick={() => router.push("/")}>
          <Image
            src="/svgs/hamberger.svg"
            width={18}
            height={20}
            alt="hamberger svg"
          />
        </button>
        <div className="flex gap-1">
          <Image
            src="/svgs/onstage-logo.svg"
            width={18}
            height={20}
            alt="onstage-logo"
          />
          <h1 className="font-bold">onstage</h1>
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-xl font-bold">Description</h2>
          <textarea
            className="bg-white border rounded-xl font-bold border-gray500 p-4"
            placeholder="description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="fixed bottom-0 flex justify-center items-center bg-purple w-full h-16 font-bold text-white text-xl disabled:bg-gray500"
        disabled={name.length === 0 || desc.length === 0 || isLoading}
      >
        {isLoading ? (
          <div className="animate-spin">
            <Image
              width={36}
              height={36}
              src="/svgs/loading.svg"
              alt="loading"
            />
          </div>
        ) : (
          <span>Upload</span>
        )}
      </button>

      <NftMintCompleteModal
        imageFile={images[0]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Upload;
