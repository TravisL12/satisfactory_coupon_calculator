// https://satisfactory.wiki.gg/wiki/AWESOME_Sink

import { couponData } from "./coupon.js";

const formEl = document.getElementById("calc-form");
const pointsResult = document.getElementById("points-result");
const itemResults = document.getElementById("item-results");
const itemsNeeded = document.getElementById("items-needed");
const timeNeeded = document.getElementById("time-needed");
const levelText = document.getElementById("level-text");
const manualLevelToggle = document.getElementById("manual-level-toggle");
const manualLevelGroup = document.getElementById("manual-level-group");
const itemSelect = document.getElementById("item-select");
const filterInput = document.getElementById("filter-input");
const itemsList = document.getElementById("items-list");

// Create array of all individual items with their point values
const allItems = [];
Object.entries(couponData).forEach(([itemsString, points]) => {
  const items = itemsString.split(",").map((item) => item.trim());
  items.forEach((item) => {
    if (item) {
      allItems.push({ name: item, points });
    }
  });
});

// Sort items alphabetically
allItems.sort((a, b) => a.name.localeCompare(b.name));

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

const calculateCouponLevel = (approxPoints) => {
  if (!approxPoints) {
    return undefined;
  }

  const g = Math.round(Math.sqrt((approxPoints - 1000) / 250));
  const coupons = [3 * g + 1, 3 * g + 2, 3 * g + 3]; // three groups available

  return coupons[0];
};

// Initialize the page
function initializePage() {
  populateItemSelect();
  populateItemsSidebar();
  setupEventListeners();
}

function populateItemSelect() {
  allItems.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.points;
    option.textContent = `${item.name} (${item.points} pts)`;
    itemSelect.appendChild(option);
  });
}

function populateItemsSidebar(filter = "") {
  itemsList.innerHTML = "";
  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-entry";
    itemDiv.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-points">${item.points.toLocaleString()}</span>
    `;
    itemsList.appendChild(itemDiv);
  });
}

function updateCouponLevel() {
  const cost = formEl["coupon-cost"].value;
  if (cost && !manualLevelToggle.checked) {
    const level = calculateCouponLevel(cost);
    formEl["coupon-level"].value = level;
    levelText.textContent = `Coupon Level: ${level}`;
  } else if (!cost) {
    levelText.textContent = "Coupon Level: --";
  }
}

function calculateTimeRequired(totalPoints, itemPoints, itemsPerMinute) {
  if (!itemPoints || !itemsPerMinute || itemsPerMinute <= 0) return null;

  const itemsNeeded = Math.ceil(totalPoints / itemPoints);
  const minutesRequired = itemsNeeded / itemsPerMinute;
  const hours = Math.floor(minutesRequired / 60);
  const minutes = Math.round(minutesRequired % 60);

  return { itemsNeeded, hours, minutes, totalMinutes: minutesRequired };
}

function setupEventListeners() {
  // Coupon cost input - update level display
  formEl["coupon-cost"].addEventListener("input", updateCouponLevel);

  // Manual level toggle
  manualLevelToggle.addEventListener("change", (e) => {
    manualLevelGroup.style.display = e.target.checked ? "block" : "none";
    if (!e.target.checked) {
      updateCouponLevel();
    }
  });

  // Manual level input
  formEl["coupon-level"].addEventListener("input", (e) => {
    if (manualLevelToggle.checked) {
      levelText.textContent = `Coupon Level: ${e.target.value || "--"}`;
    }
  });

  // Filter input
  filterInput.addEventListener("input", (e) => {
    populateItemsSidebar(e.target.value);
  });

  // Form submission
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    let level;
    if (manualLevelToggle.checked) {
      level = parseInt(event.currentTarget["coupon-level"].value);
    } else {
      const cost = event.currentTarget["coupon-cost"].value;
      level = calculateCouponLevel(cost);
      event.currentTarget["coupon-level"].value = level;
    }

    const desired = parseInt(event.currentTarget["desired-count"].value);
    const totalPoints = pointsNeeded(level, desired);

    pointsResult.textContent = `${totalPoints.toLocaleString()} points needed!`;

    // Handle item calculations
    const selectedItemPoints = parseInt(
      event.currentTarget["item-select"].value
    );
    const itemsPerMinute = parseFloat(
      event.currentTarget["items-per-minute"].value
    );

    if (selectedItemPoints && itemsPerMinute) {
      const timeCalc = calculateTimeRequired(
        totalPoints,
        selectedItemPoints,
        itemsPerMinute
      );
      if (timeCalc) {
        itemsNeeded.textContent = `Items needed: ${timeCalc.itemsNeeded.toLocaleString()}`;

        let timeText = "Time required: ";
        if (timeCalc.hours > 0) {
          timeText += `${timeCalc.hours} hours`;
          if (timeCalc.minutes > 0) {
            timeText += ` and ${timeCalc.minutes} minutes`;
          }
        } else {
          timeText += `${timeCalc.minutes} minutes`;
        }

        timeNeeded.textContent = timeText;
        itemResults.style.display = "block";
      }
    } else {
      itemResults.style.display = "none";
    }
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initializePage);
