// https://satisfactory.wiki.gg/wiki/AWESOME_Sink

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

// Coupon data from coupon.json
const couponData = {
  "Alien Protein, Bacon Agaric, Beryl Nut, Blue Power Slug, Encased Plutonium Cell, FICSIT Coupon, Ficsonium Fuel Rod, Ficsonium, Hatcher Remains, Hog Remains, Mercer Sphere,  Non-Fissile Uranium,  Paleberry,  Plutonium Pellet,  Plutonium Waste,  Power Shard,  Purple Power Slug,  Somersloop,  Spitter Remains,  Stinger Remains,  Uranium Waste,  Yellow Power Slug": "0",
  "Blue FICSMAS Ornament,  FICSIT Coupon,  FICSMAS Gift,  Iron Ore": "1",
  "FICSMAS Tree Branch,  Iron Ingot,  Limestone,  Red FICSMAS Ornament,  Screws": "2",
  "Coal,  Copper Ore,  Leaves": "3",
  "FICSMAS Bow,  Iron Rod": "4",
  "FICSMAS Actual Snow": "5",
  "Candy Cane,  Copper Ingot,  Iron Plate,  Wire": "6",
  "Caterium Ore": "7",
  "Bauxite,  Iron Rebar,  Steel Ingot": "8",
  "Mycelia": "10",
  "Sulfur": "11",
  "Biomass,  Concrete,  Polymer Resin": "12",
  "Black Powder": "14",
  "Raw Quartz": "15",
  "Quickwire": "17",
  "Iron FICSMAS Ornament": "18",
  "Petroleum Coke,  SAM,  Silica": "20",
  "Cable,  Copper Sheet,  Steel Pipe": "24",
  "Rifle Ammo": "25",
  "Aluminum Scrap": "27",
  "Compacted Coal": "28",
  "Snowball,  Wood": "30",
  "Copper FICSMAS Ornament,  Sparkly Fireworks": "32",
  "Uranium": "35",
  "Fancy Fireworks": "40",
  "Caterium Ingot": "42",
  "Solid Biofuel": "48",
  "Quartz Crystal": "50",
  "Portable Miner": "56",
  "Smokeless Powder": "58",
  "Empty Canister,  Rubber,  Sweet Fireworks": "60",
  "Steel Beam": "64",
  "Copper Powder": "72",
  "Plastic": "75",
  "Employee of the Planet": "84",
  "FICSMAS Ornament Bundle": "100",
  "Reinforced Iron Plate,  Turbo Rifle Ammo": "120",
  "Medicinal Inhaler": "125",
  "Packaged Water": "130",
  "Aluminum Ingot": "131",
  "Fabric,  Rotor": "140",
  "Encased Uranium Cell": "147",
  "Nobelisk,  Packaged Sulfuric Acid": "152",
  "Packaged Alumina Solution,  Reanimated SAM": "160",
  "Empty Fluid Tank": "170",
  "Packaged Heavy Oil Residue,  Packaged Oil": "180",
  "Stun Rebar": "186",
  "Alien Power Matrix": "210",
  "Diamonds,  Stator": "240",
  "Alclad Aluminum Sheet": "266",
  "Packaged Fuel": "270",
  "Packaged Nitrogen Gas": "312",
  "Shatter Rebar": "332",
  "Explosive Rebar": "360",
  "Packaged Liquid Biofuel": "370",
  "Aluminum Casing": "393",
  "Modular Frame": "408",
  "Packaged Nitric Acid": "412",
  "Battery": "465",
  "Smart Plating": "520",
  "Encased Industrial Beam": "528",
  "Gas Nobelisk": "544",
  "Packaged Turbofuel": "570",
  "Gas Filter": "608",
  "FICSMAS Wreath": "630",
  "Circuit Board": "696",
  "Homing Rifle Ammo": "855",
  "AI Limiter": "920",
  "Time Crystal": "960",
  "Packaged Rocket Fuel": "1,028",
  "Versatile Framework": "1,176",
  "Ficsite Trigon": "1,291",
  "Cluster Nobelisk": "1,376",
  "Object Scanner": "1,400",
  "Automated Wiring": "1,440",
  "Motor": "1,520",
  "Pulse Nobelisk": "1,533",
  "Factory Cart™": "1,552",
  "Dark Matter Crystal": "1,780",
  "Golden Factory Cart™": "1,852",
  "Xeno-Zapper": "1,880",
  "Ficsite Ingot": "1,936",
  "Rebar Gun,  SAM Fluctuator": "1,968",
  "Iodine-Infused Filter": "2,274",
  "Electromagnetic Control Rod": "2,560",
  "Chainsaw": "2,760",
  "Heat Sink": "2,804",
  "Crystal Oscillator": "3,072",
  "High-Speed Connector": "3,776",
  "Blade Runners": "4,088",
  "Packaged Ionized Fuel": "5,246",
  "Zipline": "5,284",
  "Parachute": "6,080",
  "Nobelisk Detonator": "6,480",
  "FICSMAS Wonder Star": "6,540",
  "Candy Cane Basher": "7,850",
  "Computer": "8,352",
  "Rifle": "9,480",
  "Modular Engine": "9,960",
  "Heavy Modular Frame": "10,800",
  "Magnetic Field Generator": "11,000",
  "Cooling System": "12,006",
  "Gas Mask": "14,960",
  "Jetpack": "16,580",
  "Xeno-Basher": "17,800",
  "Nuke Nobelisk": "19,600",
  "Radio Control Unit": "32,352",
  "Superposition Oscillator": "37,292",
  "Uranium Fuel Rod": "43,468",
  "Hazmat Suit": "54,100",
  "Fused Modular Frame": "62,840",
  "Adaptive Control Unit": "76,368",
  "Supercomputer": "97,352",
  "Singularity Cell": "114,675",
  "Plutonium Fuel Rod": "153,184",
  "Turbo Motor": "240,496",
  "Neural-Quantum Processor": "248,034",
  "Pressure Conversion Cube": "255,088",
  "Hoverpack": "265,632",
  "Biochemical Sculptor": "301,778",
  "Assembly Director System": "500,176",
  "Nuclear Pasta": "538,976",
  "AI Expansion Server": "597,652",
  "Thermal Propulsion Rocket": "728,508",
  "Ballistic Warp Drive": "2,895,334"
};

// Create array of all individual items with their point values
const allItems = [];
Object.entries(couponData).forEach(([itemsString, pointsString]) => {
  const points = parseInt(pointsString.replace(/,/g, ''));
  const items = itemsString.split(',').map(item => item.trim());
  items.forEach(item => {
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

// Initialize the page
function initializePage() {
  populateItemSelect();
  populateItemsSidebar();
  setupEventListeners();
}

function populateItemSelect() {
  allItems.forEach(item => {
    const option = document.createElement('option');
    option.value = item.points;
    option.textContent = `${item.name} (${item.points} pts)`;
    itemSelect.appendChild(option);
  });
}

function populateItemsSidebar(filter = '') {
  itemsList.innerHTML = '';
  const filteredItems = allItems.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  filteredItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-entry';
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
    levelText.textContent = 'Coupon Level: --';
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
  formEl["coupon-cost"].addEventListener('input', updateCouponLevel);
  
  // Manual level toggle
  manualLevelToggle.addEventListener('change', (e) => {
    manualLevelGroup.style.display = e.target.checked ? 'block' : 'none';
    if (!e.target.checked) {
      updateCouponLevel();
    }
  });
  
  // Manual level input
  formEl["coupon-level"].addEventListener('input', (e) => {
    if (manualLevelToggle.checked) {
      levelText.textContent = `Coupon Level: ${e.target.value || '--'}`;
    }
  });
  
  // Filter input
  filterInput.addEventListener('input', (e) => {
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
    const selectedItemPoints = parseInt(event.currentTarget["item-select"].value);
    const itemsPerMinute = parseFloat(event.currentTarget["items-per-minute"].value);
    
    if (selectedItemPoints && itemsPerMinute) {
      const timeCalc = calculateTimeRequired(totalPoints, selectedItemPoints, itemsPerMinute);
      if (timeCalc) {
        itemsNeeded.textContent = `Items needed: ${timeCalc.itemsNeeded.toLocaleString()}`;
        
        let timeText = 'Time required: ';
        if (timeCalc.hours > 0) {
          timeText += `${timeCalc.hours} hours`;
          if (timeCalc.minutes > 0) {
            timeText += ` and ${timeCalc.minutes} minutes`;
          }
        } else {
          timeText += `${timeCalc.minutes} minutes`;
        }
        
        timeNeeded.textContent = timeText;
        itemResults.style.display = 'block';
      }
    } else {
      itemResults.style.display = 'none';
    }
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializePage);
