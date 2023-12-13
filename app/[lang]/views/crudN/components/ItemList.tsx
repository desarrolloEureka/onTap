// components/ItemList.tsx
import Item, { ItemProps } from './Item';

type ItemListProps = {
  items: ItemProps[];
};

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de diseños</h2>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ItemList;
