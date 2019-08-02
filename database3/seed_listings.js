const fs = require('fs');
const faker = require('faker');
// const db = require('./index.js');

let csvname = 'listings.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// STEP 1: 'sh ../rundb.sh' to execute schema3.cql (use izippy, create table)
// STEP 2: 'node <seed_listings.js' to populate csv
// STEP 3: pv in new terminal to pipe in with progress bar outside of cassandra
// INC AMENITIES: pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/listings.csv | ./cassandra-loader -f STDIN -host localhost -schema "izippy.listings(id, title, loc, username, pic, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax, detailbeds, detailbednum, highlight1, highlight2, highlight3, highlight4, general, thespace, guestaccess, interactionwithguests, otherthingstonote, license, amencat_basic1, amencat_basic2, amencat_notincluded, amencat_guestaccess, amencat_bedandbath, amencat_safetyfeatures, amencat_familyfeatures, amencat_outdoor, amencat_dining, amencat_logistics, amencat_facilities)" -delim '|'
// EXCL AMENITIES: pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/listings.csv | ./cassandra-loader -f STDIN -host localhost -schema "izippy.listings(id, title, loc, username, pic, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax, detailbeds, detailbednum, highlight1, highlight2, highlight3, highlight4, general, thespace, guestaccess, interactionwithguests, otherthingstonote, license)" -delim '|'

// helper function to create accomodation object
const generateAccomodation = (type) => {
  let accomodation = {};
  let bedrmnum, bathrmnum;
  const bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds']
  let beds = [], bedsArr;
  let bedcounter = 0;

  // type 1
  if (type === 'Entire place') {
    bedrmnum = faker.random.number({min:3, max:6});
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
      // console.log("type1 currBedoption sliced", currBedoption.slice(0,1));
      bedcounter += Number(currBedoption.slice(0,1));
      beds.push(`${currBedoption}`);
    }
    // console.log('type1 beds:: ', beds);
    // console.log("type1 total::", bedcounter);
    bedsArr = `{${beds}}`

    // type 2
  } else if (type === 'Private room') {
    bedrmnum = 1;
    bathrmnum = 1;
    guestmax = faker.random.number({min:1, max:3});
    beds = `${bedoptions[Math.floor(Math.random()*bedoptions.length)]}`;
    bedcounter = Number(beds.slice(0,1));
    // console.log('type2 beds:: ', beds);
    // console.log("type2 total::", bedcounter);
    bedsArr = `{${beds}}`

  // 'type 3'
  } else if (type === 'Hotel room') {
    bedrmnum = faker.random.number({min:1, max:3});
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
      bedcounter += Number(currBedoption.slice(0,1));
      beds.push(`${currBedoption}`);
    }
    // console.log('type3 beds:: ', beds);
    // console.log("type3 total::", bedcounter);
    bedsArr = `{${beds}}`
  
  // 'type 4'
  } else if (type === 'Shared room') {   
    bedrmnum = 1;
    bathrmnum = 1;
    guestmax = faker.random.number({min:1, max:bedrmnum*2});
    beds = `${bedoptions[Math.floor(Math.random()*bedoptions.length)]}`;
    bedcounter = Number(beds.slice(0,1));
    // console.log('type4 beds:: ', beds);
    // console.log("type4 total::", bedcounter);
    bedsArr = `{${beds}}`
  }
  accomodation.bedrmnum = bedrmnum;
  accomodation.bathrmnum = bathrmnum;
  accomodation.guestmax = guestmax;
  accomodation.beds = bedsArr;
  accomodation.bednum = bedcounter;
  return accomodation;
};

const generateHighlights = (detailtype, bedrmnum, bednum, bathrmnum, guestmax, username) => {
  data =  {};
  const guest = (guestmax===1) ? guestmax+' guest' : guestmax +' guests';
  const bedrm = (bedrmnum===1) ? bedrmnum+' bedroom' : bedrmnum +' bedrooms';
  const bed = (bednum===1) ? bednum+' bed' : bednum +' beds';
  const bath = (bathrmnum===1) ? bathrmnum+' bath' : bathrmnum +' baths';
  if(detailtype==='Entire place'){
    data['Entire apartment'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
  } else if(detailtype==='Private room'){
    data['Private room in house'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
  } else if(detailtype==='Hotel room'){
    data['Private room in hostel'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
  } else if(detailtype==='Shared room'){
    let sharebath; 
    if(bathrmnum===0){
        sharebath = null;
    } else if (bathrmnum===1){
        sharebath = bathrmnum+' bath'
    } else if (bathrmnum>1){  
        sharebath = bathrmnum +' baths'
    };
    data['Shared room in house'] = guest + '\t' + bedrm + '\t' + bed + '\t' + sharebath;
  }

  const highlightsoptions = [username+' is a Superhost', 'Sparkling clean', 'Self check-in', 'Great location','Great check-in experience']
  highlightsoptions.sort(() => Math.random()-0.5);
  highlightsoptions.slice(0,3) // [is a superhost, sparkling clean, self check in]
  for (let i = 0; i < 3; i++ ) {
    if (highlightsoptions[i] === `${username} is a Superhost`) {
      data[highlightsoptions[i]] = 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.';
    } else if (highlightsoptions[i] === 'Sparkling clean') {
      data[highlightsoptions[i]] = 'Recent guests said this place was sparkling clean.';
    } else if (highlightsoptions[i] === 'Self check-in') {
      data[highlightsoptions[i]] = 'Check yourself in with the keypad.';
    } else if (highlightsoptions[i] === 'Great location') { 
      data[highlightsoptions[i]] = 'Recent guests gave the location a 5-star rating.';
    } else if (highlightsoptions[i] === 'Great check-in experience') { 
      data[highlightsoptions[i]] = 'Recent guests gave the check-in process a 5-star rating.';
    }
  }
  // console.log("highlights data: ", data);
  return data
};

const generateListings = (i) => {
  const listingid = i + 1;
  const title = faker.lorem.words();
  const loc = faker.address.city();
  const username = faker.name.firstName();
  const pic = faker.image.avatar();
  const detailtype = faker.random.arrayElement(['Entire place','Private room','Hotel room','Shared room']);
  const accomodations = generateAccomodation(detailtype); // type will be input string
  const highlights = generateHighlights(detailtype, accomodations.bedrmnum, accomodations.bednum, accomodations.bathrmnum, accomodations.guestmax, username);
  const highlightskeys = Object.keys(highlights);
  const highlights1 = `${highlightskeys[0]}: ${highlights[highlightskeys[0]]}`;
  const highlights2 = `${highlightskeys[1]}: ${highlights[highlightskeys[1]]}`;
  const highlights3 = `${highlightskeys[2]}: ${highlights[highlightskeys[2]]}`;
  const highlights4 = `${highlightskeys[3]}: ${highlights[highlightskeys[3]]}`;
  const general = faker.lorem.sentences();
  const thespace = faker.lorem.sentences();
  const guestaccess = faker.lorem.sentences();
  const interactionwithguests = faker.lorem.sentences();
  const otherthingstonote = faker.lorem.sentences();
  const license = `STR-${faker.random.number({min:1000000, max:9999999})}`;
  // const amencat_basic1 = 'Wifi';
  // const amencat_basic2 = 'TV';
  // const amencat_notincluded = 'Hot water';
  // const amencat_guestaccess = 'Private entrance';
  // const amencat_bedandbath = 'Bed linens';
  // const amencat_safetyfeatures = 'Smoke detector';
  // const amencat_familyfeatures = 'Crib';
  // const amencat_outdoor = 'BBQ grill';
  // const amencat_dining = 'Microwave';
  // const amencat_logistics = 'Luggage dropoff';
  // const amencat_facilities = 'Pool';

//   const data = `${listingid}|${title}|${loc}|${username}|${pic}|${detailtype}|${accomodations.bedrmnum}|${accomodations.bathrmnum}|${accomodations.guestmax}|${accomodations.beds}|${accomodations.bednum}|\
// ${highlights1}|${highlights2}|${highlights3}|${highlights4}|\
// ${general}|${thespace}|${guestaccess}|${interactionwithguests}|${otherthingstonote}|${license}|\
// ${amencat_basic1}|${amencat_basic2}|${amencat_notincluded}|${amencat_guestaccess}|${amencat_bedandbath}|${amencat_safetyfeatures}|\
// ${amencat_familyfeatures}|${amencat_outdoor}|${amencat_dining}|${amencat_logistics}|${amencat_facilities}\n`;
  const data = `${listingid}|${title}|${loc}|${username}|${pic}|${detailtype}|\
${accomodations.bedrmnum}|${accomodations.bathrmnum}|${accomodations.guestmax}|${accomodations.beds}|${accomodations.bednum}|\
${highlights1}|${highlights2}|${highlights3}|${highlights4}|\
${general}|${thespace}|${guestaccess}|${interactionwithguests}|${otherthingstonote}|${license}\n`;
  return data;
};

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