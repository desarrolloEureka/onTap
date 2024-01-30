import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import {app, dataBase} from "@/firebase/firebaseConfig"
type ItemFormProps = {
  onAddItem: (item: { name: string; image: string }) => void;
};

const ItemForm: React.FC<ItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      console.error("El nombre es obligatorio");
      return;
    }
    console.log('imageFile :>> ', imageFile);
    if (imageFile) {
      try {
        const base64Image = await convertToBase64(imageFile);

        onAddItem({ name, image: base64Image });
        const uniqueId = Math.random().toString(16).slice(2)
        await setDoc(doc(dataBase, 'background_images' , uniqueId), {
          name,
          image: base64Image,
          id: uniqueId
        });

        setName("");
        setImageFile(null);
      } catch (error) {
        console.error("Error =>",error);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#62AD9B",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px", // Ajusta según tus necesidades
        width: "700px",
      }}
    >
      <form onSubmit={handleSubmit} className="tw-mb-4 tw-mt-10">
        <h2 className="tw-text-2xl tw-ml-[40%] tw-mt-[-5%] tw-font-bold tw-mb-4">Agregar Diseño</h2>
        <TextField
          className="tw-mb-2 tw-w-[184px] tw-h-[45px] tw-ml-[40%] "
          label="Nombre"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
          required 
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="tw-mb-2 tw-w-[284px] tw-h-[45px] tw-ml-[40%] tw-mt-[10px] "
        />
        <Button
          className="tw-w-[184px] tw-h-[45px] tw-ml-[40%] tw-rounded-3xl tw-bg-white tw-mt-[15px] tw-mx-2 tw-text-'#62AD9B'"
          type="submit"
        >
          Agregar
        </Button>
      </form>
    </div>
  );
};

export default ItemForm;
