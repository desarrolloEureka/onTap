import { useState } from 'react';

const HomeHook = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const Tab1 = () => {
    return <div>Tab1</div>;
  };
  const Tab2 = () => {
    return <div>Tab2</div>;
  };
  const Tab3 = () => {
    return <div>Tab3</div>;
  };
  const Tab4 = () => {
    return <div>Tab4</div>;
  };

  const HandleNavTab = () => {
    switch (value) {
      case 1:
        return <Tab2 />;
        break;
      case 2:
        return <Tab3 />;
        break;
      case 3:
        return <Tab4 />;
        break;
      default:
        return <Tab1 />;
        break;
    }
  };

  return { HandleNavTab, handleChange, value };
};

export default HomeHook;
