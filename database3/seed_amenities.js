const fs = require('fs');
const faker = require('faker');
// const db = require('./index.js');

let csvname = 'amenities4.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// STEP 1: 'sh ../rundb.sh' to execute schema3.cql (use izippy, create table)
// STEP 2: 'node <seed_listings.js' to populate csv
// STEP 3: pv in new terminal in cassandraloader>builder to pipe in with progress bar outside of cassandra
// TEST: pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/amenities.csv | ./cassandra-loader -f STDIN -host localhost -schema "izippy.amenities(id, categories, item, itemdescription)" -delim '|'

const amenCategories = ['Basic', 'Not included','Guest access','Bed and bath','Safety features','Family features','Outdoor','Dining', 'Logistics','Facilities'];
  let data;
  for (let i = 0; i < amenCategories.length; i++) {
    const id = i + 1;
    const amenCategory = amenCategories[i];
    data = `${id}|${amenCategory}\n`;
  }

// helper functions to generate all amenities categories
const generateBasicOrNotIncluded = (currlistingid) => {
  let item, description, line, allLines = '';
  const items = ['Hot water', 'Laptop friendly workspace','TV' , 'Wifi'];
  while (items.length > 0) {
    let currentItem = items.pop();
    let category = faker.random.arrayElement(['Basic', 'Not included']);
    if (currentItem === 'Wifi') {
      item = 'Wifi';
      description = (category === 'Basic' ? 'Continuous access in the listing' : '*');
    } else if (currentItem === 'Laptop friendly workspace') {
      item = 'Laptop friendly workspace';
      description = (category === 'Basic' ? 'A table or desk with space for a laptop and a chair that’s comfortable to work in' : '*');
    } else if (currentItem === 'Washer') {
      item = 'Washer';
      description = (category === 'Basic' ? 'In the building, free or for a fee' : '*');
    } else { 
      item = currentItem;
      description = '*';
    }
    line = `${currlistingid}|${category}|${item}|${description}\n`;
    allLines += line;
    // obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateGuestaccess = (currlistingid) => {
  let item, description, line, allLines = '';
  const items = ['Host greets you', 'Private entrance', 'Lockbox'];
  const sorteditems = items.sort(() => Math.random()-0.5);
  const maxitemindex = Math.floor(Math.random() * sorteditems.length); // random index up to length
  // const selecteditems = sorteditems.slice(0,maxitemindex) // end is not included
  const selecteditems = sorteditems.slice(0,1) // end is not included
  for (let j = 0; j < selecteditems.length; j++) {
    if (items[j] === 'Private entrance') {
      item = 'Private entrance';
      description = 'Separate street or building';
    } else {
      item = items[j];
      description = '*';
    }
    line = `${currlistingid}|${'Guest_access'}|${item}|${description}\n`;
    allLines += line;
    // obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateBedandbath = (currlistingid) => {
  let item, description, line, allLines = '';
  const items = ['Bed linens', 'Hangers', 'Shampoo', 'Extra pillows'];
  const sorteditems = items.sort(() => Math.random()-0.5);
  // const maxitemindex = Math.floor(Math.random() * sorteditems.length); // random index up to length
  const maxitemindex = Math.floor(Math.random() * 2); // random index up to length
  const selecteditems = sorteditems.slice(0,maxitemindex) // end is not included
  for (let j = 0; j < selecteditems.length; j++) {
    item = items[j];
    description = '*';
    line = `${currlistingid}|${'Bed_and_Bath'}|${item}|${description}\n`;
    allLines += line;
    // obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateSafetyfeatures = (currlistingid) => {
  let item, description, line, allLines = '';
  const items = ['Smoke detector', 'Fire extinguisher', 'Carbon monoxide detector', 'First aid kit'];
  const sorteditems = items.sort(() => Math.random()-0.5);
  const maxitemindex = Math.floor(Math.random() * sorteditems.length); // random index up to length
  // const selecteditems = sorteditems.slice(0,maxitemindex) // end is not included
  const selecteditems = sorteditems.slice(0,1) // end is not included
  for (let j = 0; j < selecteditems.length; j++) {
    item = items[j];
    description = '*';
    line = `${currlistingid}|${'Safety_features'}|${item}|${description}\n`;
    allLines += line;
    // obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateFamilyfeatures = (currlistingid) => {
  let item, description, line, allLines = '';
  const items = ['Bathtub', 'Crib', 'Game console'];
  const sorteditems = items.sort(() => Math.random()-0.5);
  const maxitemindex = Math.floor(Math.random() * sorteditems.length); // random index up to length
  // const selecteditems = sorteditems.slice(0,maxitemindex) // end is not included
  const selecteditems = sorteditems.slice(0,1) // end is not included
  for (let j = 0; j < selecteditems.length; j++) {
    item = items[j];
    description = '*';
    line = `${currlistingid}|${'Family_features'}|${item}|${description}\n`;
    allLines += line;
    // obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateOutdoor = (currlistingid) => {
  let item, description, line, allLines = '';
  const items = ['Patio or balcony', 'Garden or backyard', 'BBQ grill'];
  const sorteditems = items.sort(() => Math.random()-0.5);
  const maxitemindex = Math.floor(Math.random() * sorteditems.length); // random index up to length
  // const selecteditems = sorteditems.slice(0,maxitemindex) // end is not included
  const selecteditems = sorteditems.slice(0,1) // end is not included
  for (let j = 0; j < selecteditems.length; j++) {
    item = items[j];
    description = '*';
    line = `${currlistingid}|${'Outdoor'}|${item}|${description}\n`;
    allLines += line;
    // obj.i++;
    glistingcount++;
  }
  return allLines;
};

const generateDining = (currlistingid) => {
  let item, description, line, allLines = '';
  const items = ['Kitchen', 'Dishes', 'Stove', 'Microwave', 'Coffee maker'];
  const sorteditems = items.sort(() => Math.random()-0.5);
  // const maxitemindex = Math.floor(Math.random() * sorteditems.length); // random index up to length
  const maxitemindex = Math.floor(Math.random() * 3); // random index up to 3
  const selecteditems = sorteditems.slice(0,maxitemindex) // end is not included
  for (let j = 0; j < selecteditems.length; j++) {
    if (items[j] === 'Kitchen') {
      item = 'Kitchen';
      description = 'Space where guests can cook their own meals';
    } else {
      item = items[j];
      description = '*';
    }
    line = `${currlistingid}|${'Dining'}|${item}|${description}\n`;
    allLines += line;
    // obj.i++;
    glistingcount++;
  }
  return allLines;
};

// const generateLogistics = (currlistingid) => {
//   let item, description, line, allLines = '';
//   const items = ['Luggage dropoff', 'Long term stays'];
//   const sorteditems = items.sort(() => Math.random()-0.5);
//   const maxitemindex = Math.floor(Math.random() * sorteditems.length); // random index up to length
//   // const selecteditems = sorteditems.slice(0,maxitemindex) // end is not included
//   const selecteditems = sorteditems.slice(0,1) // end is not included
//   for (let j = 0; j < selecteditems.length; j++) {
//     if (items[j] === 'Long term stays') {
//       item = 'Long term stays';
//       description = 'Allow stay for 28 days or more';
//     } else {
//       item = items[j];
//       description = '*';
//     }
//     line = `${currlistingid}|${'Logistics'}|${item}|${description}\n`;
//     allLines += line;
//     // obj.i++;
//     glistingcount++;
//   }
//   return allLines;
// };

// const generateFacilities = (currlistingid) => {
//   let item, description, line, allLines = '';
//   const items = ['Hot tub', 'Pool', 'Gym'];
//   const sorteditems = items.sort(() => Math.random()-0.5);
//   const maxitemindex = Math.floor(Math.random() * sorteditems.length); // random index up to length
//   // const selecteditems = sorteditems.slice(0,maxitemindex) // end is not included
//   const selecteditems = sorteditems.slice(0,1) // end is not included
//   for (let j = 0; j < selecteditems.length; j++) {
//     if (items[j] === 'Pool') {
//       item = 'Pool';
//       description = 'Private or Shared';
//     } else if (items[j] === 'Gym') {
//       item = 'Gym';
//       description = 'Free, in the building or nearby';
//     } else {
//       item = items[j];
//       description = '*';
//     }
//     line = `${currlistingid}|${'Facilities'}|${item}|${description}\n`;
//     allLines += line;
//     // obj.i++;
//     glistingcount++;
//   }
//   return allLines;
// };

let currlistingid = 7500001; 
const writeMaxTimes = () => {

  const lastlistingid = 10000000;
  const whilemax = lastlistingid + 1; // max is number of listings we need to join. 100 for now
  let ok = true;
  let finalData = '';

  writeAmenities();
  
  function writeAmenities() {

    while (currlistingid < whilemax) {
      generateAmenities(currlistingid);
      function generateAmenities(currlistingid){
        data1 = generateBasicOrNotIncluded(currlistingid);
        data2 = generateGuestaccess(currlistingid);
        data3 = generateBedandbath(currlistingid);
        data4 = generateSafetyfeatures(currlistingid);
        data5 = generateFamilyfeatures(currlistingid);
        data6 = generateOutdoor(currlistingid);
        data7 = generateDining(currlistingid);
        // data8 = generateLogistics(currlistingid);
        // data9 = generateFacilities(currlistingid);
      }

      // finalData = data1 + data2 + data3 + data4 + data5 + data6 + data7 + data8 + data9;
      finalData = data1 + data2 + data3 + data4 + data5 + data6 + data7;
      ok = writer.write(finalData, 'utf8');
      currlistingid++;
  
      // drain needed if ok is false
      if (!ok) {
        break;
      }
  
      // for long writes, check progress
      if (currlistingid % 500000 === 0) {
        console.log(currlistingid);
      }
  
      if (currlistingid === whilemax) {
        writer.end();
      }
    }
``
    // restart data generation after drain event
    if (!ok) {
      writer.once('drain', writeAmenities);
    }
  }
};

writeMaxTimes();

writer.on('finish', ()  => {
  console.log(`${glistingcount} data written to ${csvname}`)
});