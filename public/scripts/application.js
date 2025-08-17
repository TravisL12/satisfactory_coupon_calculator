// https://satisfactory.wiki.gg/wiki/AWESOME_Sink

const formEl = document.getElementById("calc-form");
const result = document.querySelector("#result p");

// thanks chatGPT
function pointsNeeded(level, count) {
  // Helper: sum of squares from a to b inclusive
  function sumSquares(a, b) {
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
    totalPoints += take * (500 * group * group + 1000);
    count -= take;
    group += 1;
  }

  // Step 2: handle full groups
  let fullGroups = Math.floor(count / 3);
  if (fullGroups > 0) {
    totalPoints +=
      3 * (500 * sumSquares(group, group + fullGroups - 1) + 1000 * fullGroups);
    group += fullGroups;
    count -= fullGroups * 3;
  }

  // Step 3: handle leftover coupons
  if (count > 0) {
    totalPoints += count * (500 * group * group + 1000);
  }

  return totalPoints;
}

const calculateCouponLevel = (approxPoints) => {
  if (!approxPoints) {
    return undefined;
  }
  // const g = Math.round(Math.sqrt((approxPoints - 1000) / 500));
  const g = Math.round(Math.sqrt((approxPoints - 1000) / 250));

  const coupons = [3 * g + 1, 3 * g + 2, 3 * g + 3]; // three groups available

  return coupons[0];
};

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cost = event.currentTarget["coupon-cost"].value;
  const level = calculateCouponLevel(cost);
  event.currentTarget["coupon-level"].value = level;
  const desired = event.currentTarget["desired-count"].value;
  const output = pointsNeeded(level, desired);

  result.textContent = `${output.toLocaleString()} points needed!`;
});
