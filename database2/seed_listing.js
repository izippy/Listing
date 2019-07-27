const fs = require('fs');
const faker = require('faker');

let csvname = 'cookiemonster.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

const generateBdrmnum = (type) => {
  let bedrmnum;
  if (type === 1) {   // 'Entire place'
    bedrmnum = faker.random.number({min:3, max:6});
  } else if (type === 2) {   // 'Private room'
    bedrmnum = 1;
  } else if (type === 3) {   // 'Hotel room'
    bedrmnum = faker.random.number({min:1, max:3});
  } else if (type === 4) {   // 'Shared room'
    bedrmnum = 1;
  }
  return bedrmnum;
};

const generateBathrmnum = (type, bedrmnum) => {
  let bathrmnum;
  if (type === 1) {   // 'Entire place'
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
  } else if (type === 2) {   // 'Private room'
    bathrmnum = 1;
  } else if (type === 3) {   // 'Hotel room'
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
  } else if (type === 4) {   // 'Shared room'
    bathrmnum = 1;
  }
  return bathrmnum;
};

const generateGuestmax = (type, bedrmnum) => {
  let guestmax;
  if (type === 1) {   // 'Entire place'
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
  } else if (type === 2) {   // 'Private room'
    guestmax = faker.random.number({min:1, max:3});
  } else if (type === 3) {   // 'Hotel room'
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
  } else if (type === 4) {   // 'Shared room'
    guestmax = faker.random.number({min:1, max:bedrmnum*4});
  }
  return guestmax;
};

const generateBeds = (type, bedrmnum) => {
  const bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds']
  let beds = []
  if (type === 1) { // 'Entire place'
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
      beds.push(`'${currBedoption}'`);
    }
  } else if (type === 2) {  // 'Private room'
    beds = `'${bedoptions[Math.floor(Math.random()*bedoptions.length)]}'`;
  } else if (type === 3) {   // 'Hotel room'
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)]
      beds.push(`'${currBedoption}'`);
    }
  } else if (type === 4) {   // 'Shared room'
    beds = `'${bedoptions[Math.floor(Math.random()*bedoptions.length)]}'`;
  }
  let bedsArr = `[${beds}]`
  return bedsArr;
};

const generateBednum = () => {
  let bednum;
  if (type === 1) {   // 'Entire place'
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
  } else if (type === 2) {   // 'Private room'
    guestmax = faker.random.number({min:1, max:3});
  } else if (type === 3) {   // 'Hotel room'
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
  } else if (type === 4) {   // 'Shared room'
    guestmax = faker.random.number({min:1, max:bedrmnum*4});
  }
  return guestmax;
}

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
      beds.push(`'${currBedoption}'`);
    }
    // console.log("YO1 total:: ",bedcounter);
    bedsArr = `[${beds}]`

  // 'Private room'
  } else if (type === 2) {
    bedrmnum = 1;
    bathrmnum = 1;
    guestmax = faker.random.number({min:1, max:3});
    beds = `'${bedoptions[Math.floor(Math.random()*bedoptions.length)]}'`;
    bedcounter = Number(beds.slice(1,2));
    // console.log("YO2 total::", bedcounter);
    bedsArr = `[${beds}]`

  // 'Hotel room'
  } else if (type === 3) {
    bedrmnum = faker.random.number({min:1, max:3});
    bathrmnum = faker.random.number({min:1, max:bedrmnum});
    guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
    for (let i = 0; i < bedrmnum; i++) {
      let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
      // console.log("YO3 currBedoption SLICED", currBedoption.slice(0,1));
      bedcounter += Number(currBedoption.slice(0,1));
      beds.push(`'${currBedoption}'`);
    }
    // console.log("YO3 total::", bedcounter);
    bedsArr = `[${beds}]`
  
  // 'Shared room'
  } else if (type === 4) {   
    bedrmnum = 1;
    bathrmnum = 1;
    guestmax = faker.random.number({min:1, max:bedrmnum*2});
    beds = `'${bedoptions[Math.floor(Math.random()*bedoptions.length)]}'`;
    bedcounter = Number(beds.slice(1,2));
    // console.log("YO4 total::", bedcounter);
    bedsArr = `[${beds}]`
  }
  accomodation.bedrmnum = bedrmnum;
  accomodation.bathrmnum = bathrmnum;
  accomodation.guestmax = guestmax;
  accomodation.beds = bedsArr;
  accomodation.bednum = bedcounter;
  console.log(accomodation);
  return accomodation;
}

const maketable_listing = (i) => {
  const listingid = i + 1;
  const title = faker.lorem.words();
  const general = faker.lorem.sentences();
  const location = faker.address.city();
  const host_id = faker.random.number({min:1, max:i});
  const thespace = faker.lorem.sentences();
  const guestaccess = faker.lorem.sentences();
  const interactionwithguests = faker.lorem.sentences();
  const otherthings = faker.lorem.sentences();
  const license = `STR-${faker.random.number({min:1000000, max:9999999})}`;
  const type = faker.random.number({min:1, max:4}); // 4 types of places, see maketable_unit_type
  // const bedrmnum = generateBdrmnum(type);
  // const bathrmnum = generateBathrmnum(type, bedrmnum);
  // const guestmax = generateGuestmax(type, bedrmnum);
  // const beds = generateBeds(type, bedrmnum);
  // const bednum = ;
  const accomodations = generateAccomodation(type);
  const allLines = (
    `#${recordcount}: LISTINGID${listingid}|TITLE${title}|${location}|
    ${host_id}|${general}|${thespace}|${guestaccess}|
    ${interactionwithguests}|${otherthings}|${license}|${type}|
    ${accomodations.bedrmnum}|${accomodations.bathrmnum}|
    ${accomodations.guestmax}|${accomodations.beds}|${accomodations.bednum}\n`
    );
  return allLines;
}

const write10MTimes = () => {
  let i = 10;
  write();
  function write() {
    let ok = true;
    
    do {
      i--;
      if (i === 0) {
        let data = maketable_listing(i);
        recordcount++;
        writer.write(data, 'utf8');
      } else {
        // we're not done yet.
        let data = maketable_listing(i);
        recordcount++;
        ok = writer.write(data, 'utf8');
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early! Write some more once it drains.
      writer.once('drain', write);
    } else if (i === 0) {
      writer.end();
    }
  };
};

write10MTimes();

writer.on('finish', ()  => {
  console.log(`${recordcount} data written to ${csvname}`)
});