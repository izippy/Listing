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
const generateBasic = (obj) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 1;
  const items = ['Wifi', 'TV', 'Air conditioning', 'Laptop friendly workspace', 'Hot water', 'Washer'];
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
    } else { 
      item = items[j];
      description = 'NULL';
    }
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateNotincluded = (obj) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 2;
  const items = ['Wifi', 'TV', 'Air conditioning', 'Laptop friendly workspace', 'Hot water', 'Washer'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateGuestaccess = (obj) => {
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
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateBedandbath = (obj) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 4;
  const items = ['Bed linens', 'Hangers', 'Shampoo'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateSafetyfeatures = (obj) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 5;
  const items = ['Smoke detector', 'Fire extinguisher', 'Carbon monoxide detector'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateFamilyfeatures = (obj) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 6;
  const items = ['Bathtub', 'Crib', 'Game console'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateOutdoor = (obj) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 7;
  const items = ['Patio or balcony', 'Garden or backyard', 'BBQ grill'];
  for (let j = 0; j < items.length; j++) {
    item = items[j];
    description = 'NULL';
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateDining = (obj) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 8;
  const items = ['Kitchen', 'Dishes', 'Stove',];
  for (let j = 0; j < items.length; j++) {
    if (items[j] === 'Kitchen') {
      item = 'Kitchen';
      description = 'Space where guests can cook their own meals';
    } else {
      item = items[j];
      description = 'NULL';
    }
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateLogistics = (obj) => {
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
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateFacilities = (obj) => {
  let item, description, line, allLines = '';
  const amen_cat_id = 10;
  const items = ['Hot tub', 'Pool', 'Gym'];
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
    line = `${obj.i}|${amen_cat_id}|${item}|${description}\n`;
    allLines += line;
    obj.i++;
    glistingcount++;
  }
  return allLines;
};

/* METHOD A
const write1Time = () => {
  let i = 0;
  let data = '';
  
  const drain = () => {
    return new Promise((resolve) => {
      writer.once('drain', resolve);
    });
  }
  
  const writeAmenityCategories = async (i) => {
    let ok = true;
    
    while (ok) {
      data = generateBasic(i);
      ok = writer.write(data, 'utf8');
      console.log("ok1: ", !!ok)
  
      data = generateNotincluded(i);
      ok = writer.write(data, 'utf8');
      console.log("ok2: ", !!ok)
  
      data = generateGuestaccess(i);
      ok = writer.write(data, 'utf8');
      console.log("ok3: ", !!ok)
  
      data = generateBedandbath(i);
      ok = writer.write(data, 'utf8');
      console.log("ok4: ", !!ok)
  
      data = generateSafetyfeatures(i);
      ok = writer.write(data, 'utf8');
      console.log("ok5: ", !!ok)
  
      data = generateFamilyfeatures(i);
      ok = writer.write(data, 'utf8');
      console.log("ok6: ", !!ok)
  
      data = generateOutdoor(i);
      ok = writer.write(data, 'utf8');
            console.log("ok7: ", !!ok)
  
      data = generateDining(i);
      ok = writer.write(data, 'utf8');
            console.log("ok8: ", !!ok)
  
      data = generateLogistics(i);
      ok = writer.write(data, 'utf8');
            console.log("ok9: ", !!ok)
  
      data = generateFacilities(i);
      ok = writer.write(data, 'utf8');
            console.log("ok0: ", !!ok)
    }

    if (!ok) {
      // Had to stop early. Write some more once it drains.
      await drain();
    }
    
    writer.end();
  }

  writeAmenityCategories(i);
}
*/

/* METHOD B
const write1Time = () => {
  let i = 0;
  let data = '';
  let ok = true;

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
      writer.once('drain', writeAmenityCategories);
    }

    if (i === max) {
      writer.end();
    }
  };
  
  if (!ok) {
    // Had to stop early. Write some more once it drains.
    await drain();
  }
  
  writer.end();

}
*/

const write1Time = () => {
  let idcount = { i: 1 };
  let finalData = '';

  generateAmenities(idcount);

  function generateAmenities(obj){
    data1 = generateBasic(idcount);
    data2 = generateNotincluded(idcount);
    data3 = generateGuestaccess(idcount);
    data4 = generateBedandbath(idcount);
    data5 = generateSafetyfeatures(idcount);
    data6 = generateFamilyfeatures(idcount);
    data7 = generateOutdoor(idcount);
    data8 = generateDining(idcount);
    data9 = generateLogistics(idcount);
    data0 = generateFacilities(idcount);
  }

  finalData = data1 + data2 + data3 + data4 + data5 + data6 + data7 + data8 + data9 + data0;

  writer.write(finalData, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      writer.end();
    }
  });
}
 
write1Time();

writer.on('finish', ()  => {
  console.log(`${glistingcount} data written to ${csvname}`)
});