function createInitTrees() {
  const treesObject = {
    totalTrees: 25,
    maxTrees: 40,
    bluntChoppedTrees: 0,
    nursery: 0,
    small: 0,
    medium: 0,
    large: 0,
    adult: 25
  }

  return JSON.stringify(treesObject);
}

function createInitRocks() {
  const rocksObject = {
    totalRocks: 6,
    smashedRocks: 0,
    hitRocks: 0
  }

  return JSON.stringify(rocksObject);
}

function createInitInventory() {
  const inventoryObject = {
    totalSlots: 10,
    items: []
  }

  return JSON.stringify(inventoryObject);
}

function createInitBells() {
  const bellsObject = {
    totalPocket: 0,
    totalSavings: 0
  }

  return JSON.stringify(bellsObject);
}

exports.trees = createInitTrees;
exports.bells = createInitBells;
exports.rocks = createInitRocks;
exports.inventory = createInitInventory;
