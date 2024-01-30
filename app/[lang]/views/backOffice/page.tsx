"use client";
import React, { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import { Button } from "@mui/material";
import LogOut from "@/hooks/logOut/LogOut";
import { Locale } from "i18n-config";
import useDictionary from "@/hooks/dictionary/useDictionary";

type Item = {
  id: number;
  name: string;
  image: string;
};

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const [items, setItems] = useState<Array<Item>>([]);
  const { logOut } = LogOut();

  const handleAddItem = (newItem: { name: string; image: string }) => {
    setItems([...items, { id: items.length + 1, ...newItem }]);
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className="tw-container tw-mx-auto tw-p-4">
      <div
        style={{
          backgroundColor: "#62AD9B",
          width: "450px",
          borderRadius: "10px",
        }}
      >
        <h1 className="tw-text-4xl tw-font-bold tw-mb-8">Agrega Fondos a tu APP</h1>
      </div>

      <ItemForm onAddItem={handleAddItem} />
      <ItemList items={items} onDeleteItem={handleDeleteItem} />
      <Button
        onClick={logOut}
        className="tw-bg-[#62AD9B] tw-ml-[52%] tw-mt-[-57%] tw-text-white tw-py-2 tw-px-4 tw-rounded-md tw-border-none tw-cursor-pointer"
      >
        {dictionary?.logOut}
      </Button>
    </div>
  );
};

export default Page;
