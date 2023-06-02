import { TabItem } from "../TabItem";

type NavTab = {
  id: string | number;
  title: string;
};

interface NavTabProps {
  tabs: NavTab[];
  currentTab: NavTab;
  onChangeTab: (id: string | number) => void;
  hasUnderline?: boolean;
}

const NavTab = ({
  tabs,
  currentTab,
  onChangeTab,
  hasUnderline,
}: NavTabProps) => {
  return (
    <div className="pr-5 h-full overflow-y-auto whitespace-nowrap scrollbar-hide">
      {tabs.map(({ id, title }) => {
        const isActive = currentTab.id === id;

        return (
          <TabItem
            key={id}
            id={id}
            title={title}
            isActive={isActive}
            onChange={onChangeTab}
            hasUnderline={hasUnderline}
          />
        );
      })}
    </div>
  );
};

export default NavTab;
