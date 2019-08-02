const fs = require('fs');
const faker = require('faker');
const db = require('./index.js');

let csvname = 'listings.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node <seed_file.js>' to (1) populate csv and (2) create table
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
// pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/listings.csv | psql -U cassandratong -d izippy -c "COPY listings FROM STDIN DELIMITERS '|';"
let schema = "DROP TABLE IF EXISTS listings; CREATE TABLE IF NOT EXISTS listings (id INT NOT NULL PRIMARY KEY, title TEXT NOT NULL, location TEXT NOT NULL, users_id INT NOT NULL, unittype INT NOT NULL, bedrmnum INT NOT NULL, bathrmnum INT NOT NULL, guestmax INT NOT NULL, beds TEXT [] NOT NULL, bednum INT NOT NULL, general TEXT NOT NULL, space TEXT NOT NULL, guestaccess TEXT NOT NULL, interactionwithguests TEXT NOT NULL, otherthingstonote TEXT NOT NULL, license VARCHAR(15) NOT NULL);";
db.query(schema, (err, res) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log(`${csvname} table created`);
  }
  db.end();
});

// helper function to create accomodation object
const generateAccomodation = (unittype) => {
  let accomodation = {};
  let bedrmnum, bathrmnum;
  const bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds']
  let beds = [], bedsArr;
  let bedcounter = 0;

  // 'Entire place'
  if (unittype === 1) {
    bedrmnum = faker.random.number({min:3, max:6});
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
      // console.log("unittype1 currBedoption sliced", currBedoption.slice(0,1));
      bedcounter += Number(currBedoption.slice(0,1));
      beds.push(`${currBedoption}`);
    }
    // console.log("unittype1 total:: ",bedcounter);
    bedsArr = `{${beds}}`

  // 'Private room'
  } else if (unittype === 2) {
    bedrmnum = 1;
    bathrmnum = 1;
    guestmax = faker.random.number({min:1, max:3});
    beds = `${bedoptions[Math.floor(Math.random()*bedoptions.length)]}`;
    bedcounter = Number(beds.slice(1,2));
    // console.log("unittype2 total::", bedcounter);
    bedsArr = `{${beds}}`

  // 'Hotel room'
  } else if (unittype === 3) {
    bedrmnum = faker.random.number({min:1, max:3});
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
      // console.log("unittype3 currBedoption sliced", currBedoption.slice(0,1));
      bedcounter += Number(currBedoption.slice(0,1));
      beds.push(`${currBedoption}`);
    }
    // console.log("unittype3 total::", bedcounter);
    bedsArr = `{${beds}}`
  
  // 'Shared room'
  } else if (unittype === 4) {   
    bedrmnum = 1;
    bathrmnum = 1;
    guestmax = faker.random.number({min:1, max:bedrmnum*2});
    beds = `${bedoptions[Math.floor(Math.random()*bedoptions.length)]}`;
    bedcounter = Number(beds.slice(1,2));
    // console.log("unittypeO4 total::", bedcounter);
    bedsArr = `{${beds}}`
  }
  accomodation.bedrmnum = bedrmnum;
  accomodation.bathrmnum = bathrmnum;
  accomodation.guestmax = guestmax;
  accomodation.beds = bedsArr;
  accomodation.bednum = bedcounter; // NEED TO FIX BEDCOUNTER< SHOWING UP AS 0 IN DATABASe
  return accomodation;
}

const generateListings = (i) => {
  const listingid = i + 1;
  const title = faker.lorem.words();
  const location = faker.address.city();
  const users_id = Math.floor(Math.random() * 1000000) + 1;
  const unittype = faker.random.number({min:1, max:4}); // 4 types of places, see table unit_type
  const accomodations = generateAccomodation(unittype);
  const general = faker.lorem.sentences();
  const thespace = faker.lorem.sentences();
  const guestaccess = faker.lorem.sentences();
  const interactionwithguests = faker.lorem.sentences();
  const otherthings = faker.lorem.sentences();
  const license = `STR-${faker.random.number({min:1000000, max:9999999})}`;
  const allLines = `${listingid}|${title}|${location}|${users_id}|${unittype}|${accomodations.bedrmnum}|${accomodations.bathrmnum}|${accomodations.guestmax}|${accomodations.beds}|${accomodations.bednum}|${general}|${thespace}|${guestaccess}|${interactionwithguests}|${otherthings}|${license}\n`;
  return allLines;
}

const writeMaxTimes = () => {
  const max = 10000000;
  let i = 0;
  let ok = true;
  
  writeListings();

  function writeListings() {
    while (i < max) {
      let data = generateListings(i);
      ok = writer.write(data, 'utf8');
      glistingcount++;
      i++;

      // drain is needed if ok is false
      if (!ok) {
        break;
      }

      // for long writes, check progress
      if (i % 500000 === 0) {
        console.log(i);
      }
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

writeMaxTimes();

writer.on('finish', ()  => {
  console.log(`${glistingcount} data written to ${csvname}`)
});