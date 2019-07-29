const fs = require('fs');
const db = require('./index.js');

let csvname = 'joinListingsAmenities.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node <seed_file.js>' to (1) populate csv and (2) create table
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
// pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/joinListingsAmenities.csv | psql -U cassandratong -d izippy -c "COPY joinListingsAmenities FROM STDIN DELIMITERS '|';"
let schema = "DROP TABLE IF EXISTS joinListingsAmenities; CREATE TABLE IF NOT EXISTS joinListingsAmenities (id INT NOT NULL PRIMARY KEY, listings_id INT NOT NULL, amenities_id INT NOT NULL);";
db.query(schema, (err, res) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log(`${csvname} table created`);
  }
  db.end();
});

const generateJoinListingsAmenities = (joinid, currlistingid, amenityid) => {
  const allLines = `${joinid}|${currlistingid}|${amenityid}\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const writeMaxTimes = () => {
  let currlistingid = 1; 
  const lastlistingid = 10000000; // max is number of listings we need to join.
  const whilemax = lastlistingid + 1;
  let joinid = 1;
  let ok = true;
  const amenitiesitemsobj = {
    // amenitycategory: [item, item, item.. item],
    1: [1, 2, 3, 4, 5, 6],
    2: [7, 8, 9, 10, 11, 12],
    3: [13, 14, 15],
    4: [16, 17, 18],
    5: [19, 20, 21],
    6: [22, 23, 24],
    7: [25, 26, 27],
    8: [28, 29, 30],
    9: [31, 32],
    10: [33, 34, 35],
  };

  const amenrequiredobj = {
    'Wifi': [1,7], 
    'TV': [2,8], 
    'Air conditioning': [3,9], 
    'Laptop friendly workspace': [4,10], 
    'Hot water': [5,11],
    'Washer': [6,12],
  };

  writeJoin();

  function writeJoin() {
    while (currlistingid < whilemax) {
      let alldata = '';
      let data = '';
      let cat1and2 = [];

      for (let key in amenrequiredobj) {
        let randomindex = Math.round(Math.random()); // random index from 0 or 1;
        let basicitem = amenrequiredobj[key].splice(randomindex, 1);
        cat1and2.push(basicitem);
      }

      cat1and2 = [].concat(...cat1and2); // [ 1, 8, 9, 10, 5, 12]
      
      // loop through cat1. get joinid, listingid, and amenityid and plug into helper function
      for (let i = 0; i < cat1and2.length; i++) {
        data = generateJoinListingsAmenities(joinid, currlistingid, cat1and2[i]);
        joinid++;
        glistingcount++;
        alldata += data;
      };

      // make optional amenities. Add random optional categories of amenities (from ids 19 to 50)
      let availablecategories = [3, 4, 5, 6, 7, 8, 9, 10];
      let mixedcategories = availablecategories.sort(() => Math.random()-0.5); 
      // let maxmixedcategories = Math.floor(Math.random() * availablecategories.length) + 1; // random number from 1 to 8
      let maxmixedcategories = Math.floor(Math.random() * 2) + 1; // random number from 1 to 2
      let usedcategories = mixedcategories.slice(0, maxmixedcategories);
      
      // build object of usedcategories and their values of array amenityitems
      let usedcategoriesobj = {};
      for (let i = 0; i < usedcategories.length; i++) {
        usedcategoriesobj[usedcategories[i]] = amenitiesitemsobj[usedcategories[i]];
      }

      // loop thru usedcategoriesobj. get the array amenityitems. mix it, find the max number to select, finalized the random items to use per category
      let availableitems, mixeditems, maxmixeditems;
      let useditems;
      for (let cat in usedcategoriesobj) {
        availableitems = usedcategoriesobj[cat]; // [1, 2, 3, 4, 5]
        mixeditems = availableitems.sort(() => Math.random()-0.5); // mix order of used items [3, 1, 4, 5, 2]
        // maxmixeditems = Math.floor(Math.random() * availableitems.length) + 1; // random number from mixed used items, 2
        maxmixeditems = Math.floor(Math.random() * availableitems.length) + 1; // random number from 1 to 2, 2
        useditems = mixeditems.slice(0, maxmixeditems); // [3, 1]

        for (let i = 0; i < useditems.length; i++) {
          data = generateJoinListingsAmenities(joinid, currlistingid, useditems[i]);
          joinid++;
          glistingcount++;
          alldata += data;
        }
      }

      ok = writer.write(alldata, 'utf8');
      currlistingid++;

      // drain is needed if ok is false
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
    // restart data generation after drain event finishes
    if (!ok) {
      writer.once('drain', writeJoin);
    }
  }
};

writeMaxTimes();

writer.on('finish', ()  => {
  console.log(`${glistingcount} data written to ${csvname}`)
});