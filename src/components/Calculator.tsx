import { useState, useEffect } from 'react';
import { allItems } from '../data/couponData';
import { pointsNeeded, calculateCouponLevel, calculateTimeRequired, TimeCalculation } from '../utils/calculations';

export const Calculator: React.FC = () => {
  const [couponCost, setCouponCost] = useState<string>('');
  const [manualLevel, setManualLevel] = useState<boolean>(false);
  const [couponLevel, setCouponLevel] = useState<string>('');
  const [desiredCount, setDesiredCount] = useState<string>('');
  const [selectedItemPoints, setSelectedItemPoints] = useState<string>('');
  const [itemsPerMinute, setItemsPerMinute] = useState<string>('');
  const [result, setResult] = useState<{
    points: number;
    timeCalc: TimeCalculation | null;
  } | null>(null);

  const calculateLevel = (cost: string): number | undefined => {
    if (!cost || manualLevel) return undefined;
    return calculateCouponLevel(parseInt(cost));
  };

  useEffect(() => {
    if (couponCost && !manualLevel) {
      const level = calculateLevel(couponCost);
      setCouponLevel(level?.toString() || '');
    } else if (!couponCost) {
      setCouponLevel('');
    }
  }, [couponCost, manualLevel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let level: number;
    if (manualLevel) {
      level = parseInt(couponLevel);
    } else {
      const calculatedLevel = calculateLevel(couponCost);
      if (!calculatedLevel) return;
      level = calculatedLevel;
      setCouponLevel(level.toString());
    }

    const desired = parseInt(desiredCount);
    const totalPoints = pointsNeeded(level, desired);

    let timeCalc: TimeCalculation | null = null;
    if (selectedItemPoints && itemsPerMinute) {
      timeCalc = calculateTimeRequired(
        totalPoints,
        parseInt(selectedItemPoints),
        parseFloat(itemsPerMinute)
      );
    }

    setResult({ points: totalPoints, timeCalc });
  };

  const displayLevel = couponLevel || '--';

  return (
    <div className="calculator-section">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Approx. Coupon Cost</label>
          <input
            type="number"
            value={couponCost}
            onChange={(e) => setCouponCost(e.target.value)}
          />
        </div>

        <div className="level-display">
          <span>Coupon Level: {displayLevel}</span>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={manualLevel}
              onChange={(e) => setManualLevel(e.target.checked)}
            />
            Manually set coupon level
          </label>
        </div>

        {manualLevel && (
          <div className="form-group">
            <label>Coupon Level</label>
            <input
              type="number"
              value={couponLevel}
              onChange={(e) => setCouponLevel(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label>Coupon Count Desired</label>
          <input
            type="number"
            value={desiredCount}
            onChange={(e) => setDesiredCount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Item</label>
          <select
            value={selectedItemPoints}
            onChange={(e) => setSelectedItemPoints(e.target.value)}
          >
            <option value="">Choose an item...</option>
            {allItems.map((item) => (
              <option key={item.name} value={item.points}>
                {item.name} ({item.points} pts)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Items per Minute</label>
          <input
            type="number"
            step="0.1"
            value={itemsPerMinute}
            onChange={(e) => setItemsPerMinute(e.target.value)}
          />
        </div>

        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div id="result">
          <p id="points-result">{result.points.toLocaleString()} points needed!</p>
          {result.timeCalc && (
            <div id="item-results">
              <p>Items needed: {result.timeCalc.itemsNeeded.toLocaleString()}</p>
              <p>
                Time required: {result.timeCalc.hours > 0 
                  ? `${result.timeCalc.hours} hours${result.timeCalc.minutes > 0 ? ` and ${result.timeCalc.minutes} minutes` : ''}` 
                  : `${result.timeCalc.minutes} minutes`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};