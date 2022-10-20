import { useTabsContext } from './Tabs';

export interface TabProps {
  text: string;
  children: string;
}

function Tab(props: TabProps) {
  const { text, children } = props;
  const { text: selectedTab, onChange } = useTabsContext();

  return (
    <>
      <div
        className={text === selectedTab ? 'selected' : ''}
        onClick={() => onChange(text)}
      >
        {children}
      </div>
      <style jsx>{`
        div {
          color: white;
        }
        div.selected {
          color: red;
        }
      `}</style>
    </>
  );
}

export default Tab;
