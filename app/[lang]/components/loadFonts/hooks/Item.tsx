// components/Item.tsx
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

type ItemProps = {
  id: number;
  name: string;
  image: string;
};


const Item: React.FC<ItemProps> = ({ id, name, image }) => {
  const { dictionary } = useDictionary({ lang: 'es' });
  return (
    <Card className='tw-mb-4'>
      <CardContent>
        <Typography variant='h6'>{dictionary?.backOffice.ID}: {id}</Typography>
        <Typography variant='body1'>{dictionary?.backOffice.Name}: {name}</Typography>
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className='w-full tw-h-auto tw-mt-2'
        />
      </CardContent>
    </Card>
  );
};

export default Item;
export type { ItemProps };
