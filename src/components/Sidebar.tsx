import { useState } from 'react';
import { allItems } from '../data/couponData';

export const Sidebar: React.FC = () => {
  const [filter, setFilter] = useState<string>('');

  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Items & Point Values</h3>
        <input
          type="text"
          placeholder="Filter items..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="items-list">
        {filteredItems.map((item) => (
          <div key={item.name} className="item-entry">
            <span className="item-name">{item.name}</span>
            <span className="item-points">{item.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};