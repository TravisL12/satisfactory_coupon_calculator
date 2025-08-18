export interface TimeCalculation {
  itemsNeeded: number;
  hours: number;
  minutes: number;
  totalMinutes: number;
}

export function pointsNeeded(level: number, count: number): number {
  // Helper: sum of squares from a to b inclusive
  function sumSquares(a: number, b: number): number {
    if (b < a) return 0;
    return (b * (b + 1) * (2 * b + 1) - (a - 1) * a * (2 * (a - 1) + 1)) / 6;
  }

  let totalPoints = 0;
  let group = Math.floor(level / 3); // current group number
  let posInGroup = level % 3; // how far into the group you are (0,1,2)

  // Step 1: finish current group (if not at start of one)
  if (posInGroup !== 0) {
    let remainingInGroup = 3 - posInGroup;
    let take = Math.min(count, remainingInGroup);
    totalPoints += take * (250 * group * group + 1000);
    count -= take;
    group += 1;
  }

  // Step 2: handle full groups
  let fullGroups = Math.floor(count / 3);
  if (fullGroups > 0) {
    totalPoints +=
      3 * (250 * sumSquares(group, group + fullGroups - 1) + 1000 * fullGroups);
    group += fullGroups;
    count -= fullGroups * 3;
  }

  // Step 3: handle leftover coupons
  if (count > 0) {
    totalPoints += count * (250 * group * group + 1000);
  }

  return totalPoints;
}

export function calculateCouponLevel(approxPoints: number): number | undefined {
  if (!approxPoints) {
    return undefined;
  }

  const g = Math.round(Math.sqrt((approxPoints - 1000) / 250));
  const coupons = [3 * g + 1, 3 * g + 2, 3 * g + 3]; // three groups available

  return coupons[0];
}

export function calculateTimeRequired(
  totalPoints: number,
  itemPoints: number,
  itemsPerMinute: number
): TimeCalculation | null {
  if (!itemPoints || !itemsPerMinute || itemsPerMinute <= 0) return null;

  const itemsNeeded = Math.ceil(totalPoints / itemPoints);
  const minutesRequired = itemsNeeded / itemsPerMinute;
  const hours = Math.floor(minutesRequired / 60);
  const minutes = Math.round(minutesRequired % 60);

  return { itemsNeeded, hours, minutes, totalMinutes: minutesRequired };
}