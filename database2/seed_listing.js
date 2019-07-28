const fs = require('fs');
const faker = require('faker');
const db = require('./index.js');

let csvname = 'listing.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node seed_listing.js' to (1) populate csv and (2) create table listing
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
  // pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/listing.csv | psql -U cassandratong -d izippy -c "COPY listing FROM STDIN DELIMITERS '|';"

// CREATE SCHEMAS/TABLES
let schemaListing = "DROP TABLE listing; CREATE TABLE IF NOT EXISTS listing (id INT NOT NULL PRIMARY KEY, title TEXT NOT NULL, location TEXT NOT NULL, user_id INT NOT NULL, type INT NOT NULL, bedrmnum INT NOT NULL, bathrmnum INT NOT NULL, guestmax INT NOT NULL, beds TEXT [] NOT NULL, bednum INT NOT NULL, general TEXT NOT NULL, space TEXT NOT NULL, guestaccess TEXT NOT NULL, interactionwithguests TEXT NOT NULL, otherthingstonote TEXT NOT NULL, license VARCHAR(15) NOT NULL);";
db.query(schemaListing, (err, res) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log(`${csvname} table created`);
  }
  db.end();
});

// helper function to create accomodation object
const generateAccomodation = (type) => {
  let accomodation = {};
  let bedrmnum, bathrmnum;
  const bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds']
  let beds = [], bedsArr;
  let bedcounter = 0;

  // 'Entire place'
  if (type === 1) {
    bedrmnum = faker.random.number({min:3, max:6});
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
      // console.log("YO1 currBedoption SLICED", currBedoption.slice(0,1));
      bedcounter += Number(currBedoption.slice(0,1));
      beds.push(`${currBedoption}`);
    }
    // console.log("type1 total:: ",bedcounter);
    bedsArr = `{${beds}}`

  // 'Private room'
  } else if (type === 2) {
    bedrmnum = 1;
    bathrmnum = 1;
    guestmax = faker.random.number({min:1, max:3});
    beds = `${bedoptions[Math.floor(Math.random()*bedoptions.length)]}`;
    bedcounter = Number(beds.slice(1,2));
    // console.log("type2 total::", bedcounter);
    bedsArr = `{${beds}}`

  // 'Hotel room'
  } else if (type === 3) {
    bedrmnum = faker.random.number({min:1, max:3});
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
      // console.log("type3 currBedoption SLICED", currBedoption.slice(0,1));
      bedcounter += Number(currBedoption.slice(0,1));
      beds.push(`${currBedoption}`);
    }
    // console.log("type3 total::", bedcounter);
    bedsArr = `{${beds}}`
  
  // 'Shared room'
  } else if (type === 4) {   
    bedrmnum = 1;
    bathrmnum = 1;
    guestmax = faker.random.number({min:1, max:bedrmnum*2});
    beds = `${bedoptions[Math.floor(Math.random()*bedoptions.length)]}`;
    bedcounter = Number(beds.slice(1,2));
    // console.log("typeO4 total::", bedcounter);
    bedsArr = `{${beds}}`
  }
  accomodation.bedrmnum = bedrmnum;
  accomodation.bathrmnum = bathrmnum;
  accomodation.guestmax = guestmax;
  accomodation.beds = bedsArr;
  accomodation.bednum = bedcounter;
  return accomodation;
}

const maketable_listing = (i) => {
  const listingid = i + 1;
  const title = faker.lorem.words();
  const location = faker.address.city();
  const user_id = faker.random.number({min:1, max:i});
  const type = faker.random.number({min:1, max:4}); // 4 types of places, see table unit_type
  const accomodations = generateAccomodation(type);
  const general = faker.lorem.sentences();
  const thespace = faker.lorem.sentences();
  const guestaccess = faker.lorem.sentences();
  const interactionwithguests = faker.lorem.sentences();
  const otherthings = faker.lorem.sentences();
  const license = `STR-${faker.random.number({min:1000000, max:9999999})}`;
  const allLines = `${listingid}|${title}|${location}|${user_id}|${type}|${accomodations.bedrmnum}|${accomodations.bathrmnum}|${accomodations.guestmax}|${accomodations.beds}|${accomodations.bednum}|${general}|${thespace}|${guestaccess}|${interactionwithguests}|${otherthings}|${license}\n`;
  return allLines;
}

const write10MTimes = () => {
  const max = 10;
  let i = 0;
  
  write();
  function write() {
    let ok = true;
    
    do {
      if (i === max) {
        let data = maketable_listing(i);
        recordcount++;
        writer.write(data, 'utf8');
      } else {
        // not done yet...
        let data = maketable_listing(i);
        recordcount++;
        ok = writer.write(data, 'utf8');
        i++;
      }
    } while (i < max && ok);
    if (i < max) {
      // Had to stop early! Write some more once it drains.
      writer.once('drain', write);
    } else if (i === max) {
      writer.end();
    }
  };
};

write10MTimes();

writer.on('finish', ()  => {
  console.log(`${recordcount} data written to ${csvname}`)
});