// components/Item.tsx
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

type ItemProps = {
  id: number;
  name: string;
  image: string;
};

const { dictionary } = useDictionary({ lang: 'es' });

const Item: React.FC<ItemProps> = ({ id, name, image }) => {
  return (
    <Card className='tw-mb-4'>
      <CardContent>
        <Typography variant='h6'>{dictionary?.backOffice.ID}: {id}</Typography>
        <Typography variant='body1'>{dictionary?.backOffice.Name}: {name}</Typography>
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
