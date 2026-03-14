import { useTranslation } from 'react-i18next';
import type { ItemResponse } from '../../types/item';

interface Props {
  item: ItemResponse;
}

const ItemCard = ({ item }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="relative pt-[100%]">
        <img 
          src={item.imageUrl || 'https://via.placeholder.com/300'} 
          alt={item.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 h-10 font-medium">{item.name}</h3>
        <div className="mt-auto">
          <div className="text-orange-600 font-bold text-lg">
            {item.originalPrice.toLocaleString('vi-VN')} ₫
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {t('sold')}: {Math.floor(Math.random() * 100)} {/* Thêm key 'sold' */}
          </div>
        </div>
        
        <button className="w-full mt-4 bg-orange-50 text-orange-600 border border-orange-200 py-1.5 rounded hover:bg-orange-500 hover:text-white transition-colors text-sm font-medium">
          {t('add_to_cart')} {/* Thêm key 'add_to_cart' */}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;