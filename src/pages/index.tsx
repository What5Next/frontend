import Image from "next/image";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return (
    <div className="bg-black min-h-screen relative pb-20">
      <div className="flex justify-between p-6 bg-black text-white">
        <Image
          src="/svgs/hamberger.svg"
          width={18}
          height={20}
          alt="hamberger svg"
        />
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

      <div className="relative">
        <Image
          src="/images/landing1.png"
          width={1080}
          height={1080}
          alt="landing1"
        />
        <div className="absolute text-white bottom-0 p-5">
          <p className="font-bold text-2xl pb-2">
            Protect your drawing
            <br />
            with NFTs
          </p>
          <p className="text-sm">
            Onstage protects the rights of creators.
            <br />
            Protect your creations with Onstage.
          </p>
        </div>
      </div>

      <div className="py-12 px-5 text-white">
        <p className="font-bold text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
          Put your
          <br />
          character on stage
        </p>
        <div className="grid grid-cols-2 pt-5 pb-2">
          <Image
            src="/images/landing2.png"
            className="rounded-lg"
            width={1080}
            height={1080}
            alt="landing1"
          />
          <Image
            src="/images/landing3.png"
            width={1080}
            height={1080}
            alt="landing1"
          />
        </div>
        <p>
          If you make your creations into NFTs, you can use them in other
          contents as well. In the process, you can earn money through IP. Build
          your character on the stage of various contents! Many people may buy
          your character.
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 py-16">
        <Image
          src="/svgs/onstage-logo.svg"
          width={38}
          height={32}
          alt="onstage-logo"
        />
        <h1 className="text-white text-3xl font-bold">onstage</h1>
      </div>

      <div className="sticky bottom-4 px-5">
        <button
          type="button"
          onClick={() => router.push("/upload")}
          className="w-full text-white font-bold text-xl rounded-lg bg-purple py-5"
        >
          New
        </button>
      </div>
    </div>
  );
};

export default Home;
