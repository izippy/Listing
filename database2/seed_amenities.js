const fs = require('fs');
const db = require('./index.js');

let csvname = 'amenities.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node seed_listing.js' to (1) populate csv and (2) create table listing
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
  // pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/listing.csv | psql -U cassandratong -d izippy -c "COPY listing FROM STDIN DELIMITERS '|';"

// CREATE SCHEMAS/TABLES
// let schemaListing = "DROP TABLE listing; CREATE TABLE IF NOT EXISTS listing (id INT NOT NULL PRIMARY KEY, title TEXT NOT NULL, location TEXT NOT NULL, user_id INT NOT NULL, type INT NOT NULL, bedrmnum INT NOT NULL, bathrmnum INT NOT NULL, guestmax INT NOT NULL, beds TEXT [] NOT NULL, bednum INT NOT NULL, general TEXT NOT NULL, space TEXT NOT NULL, guestaccess TEXT NOT NULL, interactionwithguests TEXT NOT NULL, otherthingstonote TEXT NOT NULL, license VARCHAR(15) NOT NULL);";
// db.query(schemaListing, (err, res) => {
//   if (err) {
//     console.log("err", err);
//   } else {
//     console.log(`${csvname} table created`);
//   }
//   db.end();
// });

// helper functions to generate all amenities categories
const generateBasic = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 1;
  const items = ['Wifi', 'TV', 'Iron', 'Air conditioning', 'Laptop friendly workspace', 'Heating', 'Hot water', 'Washer', 'Essentials'];
  for (let j = 0; j < items.length; j++) {
    if (items[j] === 'Wifi') {
      item = 'Wifi';
      description = 'Continuous access in the listing';
    } else if (items[j] === 'Laptop friendly workspace') {
      item = 'Laptop friendly workspace';
      description = 'A table or desk with space for a laptop and a chair that’s comfortable to work in';
    } else if (items[j] === 'Washer') {
      item = 'Washer';
      description = 'In the building, free or for a fee';
    } else if (items[i] === 'Essentials') {
      item = 'Essentials';
      description = 'Towels, bed sheets, soap, and toilet paper';
    } else {
      item = items[j];
      description = 'NULL';
    }
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateNotincluded = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 2;
  const items = ['Wifi', 'TV', 'Iron', 'Air conditioning', 'Laptop friendly workspace', 'Heating', 'Hot water', 'Washer', 'Hair dryer'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateGuestaccess = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 3;
  const items = ['Host greets you', 'Private entrance', 'Lockbox'];
  for (let j = 0; j < items.length; j++) {
    if (items[j] === 'Private entrance') {
      item = 'Private entrance';
      description = 'Separate street or building';
    } else {
      item = items[j];
      description = 'NULL';
    }
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateBedandbath = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 4;
  const items = ['Bed linens', 'Extra pillows', 'Hair dryer', 'Hangers', 'Shampoo'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateSafetyfeatures = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 5;
  const items = ['Smoke detector', 'Fire extinguisher', 'Carbon monoxide detector', 'First aid kit'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateFamilyfeatures = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 6;
  const items = ['Bathtub', 'Room-darkening shades', 'Game console', 'Crib'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateOutdoor = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 7;
  const items = ['Patio or balcony', 'Garden or backyard', 'BBQ grill'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateDining = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 8;
  const items = ['Kitchen', 'Microwave', 'Coffee maker', 'Dishes', 'Stove'];
  for (let j = 0; j < items.length; j++) {
    if (items[j] === 'Kitchen') {
      item = 'Kitchen';
      description = 'Space where guests can cook their own meals';
    } else {
      item = items[j];
      description = 'NULL';
    }
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateLogistics = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 9;
  const items = ['Luggage dropoff', 'Long term stays'];
  for (let j = 0; j < items.length; j++) {
    if (items[j] === 'Long term stays') {
      item = 'Long term stays';
      description = 'Allow stay for 28 days or more';
    } else {
      item = items[j];
      description = 'NULL';
    }
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const generateFacilities = (i) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 10;
  const items = ['Free parking', 'Hot tub', 'Free street parking', 'Pool', 'Gym'];
  for (let j = 0; j < items.length; j++) {
    if (items[j] === 'Pool') {
      item = 'Pool';
      description = 'Private or Shared';
    } else if (items[j] === 'Gym') {
      item = 'Gym';
      description = 'Free, in the building or nearby';
    } else {
      item = items[j];
      description = 'NULL';
    }
    line = `${i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    i++;
    glistingcount++;
  }
  return allLines;
};

const write1Time = () => {
  let i = 0;
  let ok = true;
  let data = '';
  
  writeAmenityCategories();

  function writeAmenityCategories() {

    // while ok is true (no drain)
    while (ok) {
      data = generateBasic(i);
      ok = writer.write(data, 'utf8');

      data = generateNotincluded(i);
      ok = writer.write(data, 'utf8');

      data = generateGuestaccess(i);
      ok = writer.write(data, 'utf8');

      data = generateBedandbath(i);
      ok = writer.write(data, 'utf8');

      data = generateSafetyfeatures(i);
      ok = writer.write(data, 'utf8');

      data = generateFamilyfeatures(i);
      ok = writer.write(data, 'utf8');

      data = generateOutdoor(i);
      ok = writer.write(data, 'utf8');

      data = generateDining(i);
      ok = writer.write(data, 'utf8');

      data = generateLogistics(i);
      ok = writer.write(data, 'utf8');

      data = generateFacilities(i);
      ok = writer.write(data, 'utf8');
    }

    if (!ok) {
      // Had to stop early. Write some more once it drains.
      writer.once('drain', writeListings);
    }

    if (i === max) {
      writer.end();
    }
  };
};

write1Time();

writer.on('finish', ()  => {
  console.log(`${glistingcount} data written to ${csvname}`)
});