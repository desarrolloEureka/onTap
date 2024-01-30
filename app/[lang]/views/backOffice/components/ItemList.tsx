import Item, { ItemProps } from './Item';

type ItemListProps = {
  items: ItemProps[];
  onDeleteItem: (id: number) => void;
};

const ItemList: React.FC<ItemListProps> = ({ items, onDeleteItem }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de diseños</h2>
      {items.map((item) => (
        <Item key={item.id} {...item} onDelete={onDeleteItem} />
      ))}
    </div>
  );
};

export default ItemList;
