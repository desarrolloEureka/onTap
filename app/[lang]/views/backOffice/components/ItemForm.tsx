import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Dictionary } from '@/types/dictionary';

type ItemFormProps = {
  onAddItem: (item: { name: string; image: string }) => void;
  dictionary: Dictionary | undefined;
};

const ItemForm: React.FC<ItemFormProps> = ({ onAddItem, dictionary }) => {
  const [name, setName] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      convertToBase64(imageFile)
        .then((base64Image) => {
          onAddItem({ name, image: base64Image });
          setName('');
          setImageFile(null);
        })
        .catch((error) => console.error('Error converting to base64:', error));
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

  return (
    <form onSubmit={handleSubmit} className="tw-mb-4 tw-mt-10">
      <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Agregar Diseño</h2>
      <TextField
        className="tw-mb-2 tw-w-[184px] tw-h-[45px]"
        label="Nombre"
        variant="outlined"
        fullWidth
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="tw-mb-2 tw-w-[284px] tw-h-[45px]"
      />
      <Button
        className="tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-blue-600 tw-mt-[65px] tw-mx-2 tw-text-white"
        type="submit"
      >
        {dictionary?.homeView.agregar}
      </Button>
    </form>
  );
};

export default ItemForm;
