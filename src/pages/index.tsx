import { useCallback, useState } from "react";
import Image from "next/image";

import {
  mainSliderItems,
  suggestTabList,
  trendingNFTList,
  categoryTab,
} from "@/data";
import { Slider } from "@/components/Slider";
import { NavTab, TabItem } from "@/components/Tab";
import { NFTCollectionCard } from "@/components/NFT";

const Home = () => {
  const [currentCategoryTab, setCurrentCategoryTab] = useState<string | number>(
    categoryTab[0]
  );
  const [currentSuggestTab, setCurrentSuggetsTab] = useState<string | number>(
    suggestTabList[0]
  );

  const handleChangeCurrentCategoryTab = useCallback((id: string | number) => {
    setCurrentCategoryTab(id);
  }, []);

  const handleChangeCurrentSuggestTab = useCallback((id: string | number) => {
    setCurrentSuggetsTab(id);
  }, []);

  return (
    <div className="flex flex-col pb-24">
      <div className="flex justify-between p-6 bg-black text-white">
        <Image
          src="/svgs/hamberger.svg"
          width={18}
          height={20}
          alt="hamberger svg"
        />
        <div className="flex gap-1">
          <h1 className="font-bold">ON Stage</h1>
        </div>
        <div className="w-4.5" />
      </div>

      <Slider items={mainSliderItems} route="/" />

      <div className="py-4">
        {suggestTabList.map((suggestTab) => {
          const isActive = currentSuggestTab === suggestTab;

          return (
            <TabItem
              key={suggestTab}
              id={suggestTab}
              title={suggestTab}
              isActive={isActive}
              onChange={handleChangeCurrentSuggestTab}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 gap-y-6 px-5">
        {trendingNFTList.map(({ id, title, price, image }) => (
          <NFTCollectionCard
            id={id}
            title={title}
            price={price}
            image={image}
          />
        ))}
      </div>

      <button className="flex justify-center items-center py-3 m-5 bg-gray200 rounded-lg shadow font-bold text-lg">
        See more
      </button>

      <div className="h-full overflow-y-auto whitespace-nowrap scrollbar-hide">
        <NavTab
          tabs={categoryTab.map((genreTab) => ({
            id: genreTab,
            title: genreTab,
          }))}
          currentTab={{
            id: currentCategoryTab,
            title: currentCategoryTab + "",
          }}
          onChangeTab={handleChangeCurrentCategoryTab}
        />
      </div>
    </div>
  );
};

export default Home;
