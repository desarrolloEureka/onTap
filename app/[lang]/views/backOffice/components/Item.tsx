// components/Item.tsx
import { Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

type ItemProps = {
  id: number;
  name: string;
  image: string;
};

const Item: React.FC<ItemProps> = ({ id, name, image }) => {
  return (
    <Card className='tw-mb-4'>
      <CardContent>
        <Typography variant='h6'>ID: {id}</Typography>
        <Typography variant='body1'>Name: {name}</Typography>
        <Image
          src={image}
          alt={name}
          className='w-full tw-h-auto tw-max-w-[200px] tw-max-h-[200px] tw-mt-2'
        />
      </CardContent>
    </Card>
  );
};

export default Item;
export type { ItemProps };
