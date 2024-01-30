// components/Item.tsx
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

type ItemProps = {
  id: number;
  name: string;
  image: string;
  onDelete?: (id: number) => void; // Hacer onDelete opcional
};

const Item: React.FC<ItemProps> = ({ id, name, image, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteItem = () => {
    onDelete && onDelete(id);
    handleCloseDialog();
  };
  

  return (
    <Card className='tw-mb-4'>
      <CardContent>
        <Typography variant='h6'>ID: {name}</Typography>
        <Typography variant='body1'>Name: {name}</Typography>
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className='w-full h-auto mt-2'
        />
        <Button onClick={handleOpenDialog} variant="outlined" color="error">
          Eliminar
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar este ítem?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteItem} color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Item;
export type { ItemProps };
