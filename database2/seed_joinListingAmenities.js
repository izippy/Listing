const fs = require('fs');

let csvname = 'joinListingAmenities.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// joinid | listingid | amenityid

// join basic vs. not included (amentityids from 1 to 2)
  // let amencatid = [1, 2]
  // let amenid = [1, 2, 3...17, 18]


// join everthing else (amenityids from 3 to 10)
  // let amencatid = [3, 4, 5, 6, 7, 8, 9, 10]
  // let amenid = [19, 20, 21...48, 49 50]
  // pick random categories to represent
    // pick random items to represent

const makejoin_firstlisting_highlight = (joinid, currlistingid) => {
  const allLines = `${joinid}|${currlistingid}|1\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const generateOptionalItems = (joinid, currlistingid, amenityid) => {
  const allLines = `${joinid}|${currlistingid}|${amenityid}\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const writeMaxTimes = () => {
  let currlistingid = 1; 
  const lastlistingid = 2; // max is number of listings we need to join. 100 for now
  const whilemax = lastlistingid + 1;
  let joinid = 1;
  let ok = true;
  const amenitiesitemsobj = {
    // amenitycategory: [item, item, item.. item],
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    2: [10, 11, 12, 13, 14, 15, 16, 17, 18],
    3: [19, 20, 21],
    4: [22, 23, 24, 25, 26],
    5: [27, 28, 29, 30],
    6: [31, 32, 33, 44],
    7: [35, 36, 37],
    8: [38, 39, 40, 41, 42, 43],
    9: [44, 45],
    10: [46, 47, 48, 49, 50],
  }

  writeJoin();

  function writeJoin() {
    while (currlistingid < whilemax) {
      let alldata = '';
      let data = '';
      // make first (required) highlight
      // let firstdata = makejoin_firstlisting_highlight(joinid, currlistingid);
      // alldata += firstdata;
      // joinid++;
      // glistingcount++;

      // make other (optional) highlights. Add a random number (1, 2, or 3 more) of highlights (from ids 2 to 7)
      let availablecategories = [3, 4, 5, 6, 7, 8, 9, 10];
      let mixedcategories = availablecategories.sort(() => Math.random()-0.5); 
      let maxmixedcategories = Math.floor(Math.random() * 8) + 1; // random number from 1 to 8... 5
      let usedcategories = mixedcategories.slice(0, maxmixedcategories); // [2,5,7,6,4]
      console.log("usedcategoriesARR:", usedcategories);
      
      let usedcategoriesobj = {};
      for (let i = 0; i < usedcategories.length; i++) {
        // console.log("usedcategories[i]: ", usedcategories[i]);
        usedcategoriesobj[usedcategories[i]] = amenitiesitemsobj[usedcategories[i]];
      }
      console.log("usedcategoriesobj", usedcategoriesobj);

      // console.log("usedcategoriesOBJ", usedcategoriesobj);
      // loop thru usedcategoriesobj, get the items array from each prop, mix it, find the max number you'll select, finalized the items to use
      let availableitems, mixeditems, maxmixeditems;
      let useditems;
      for (let cat in usedcategoriesobj) {
        availableitems = usedcategoriesobj[cat]; // [1, 2, 3, 4, 5]
        mixeditems = availableitems.sort(() => Math.random()-0.5); // mix order of used items [3, 1, 4, 5, 2]
        maxmixeditems = Math.floor(Math.random() * availableitems.length) + 1; // random number from mixed used items, 2
        useditems = mixeditems.slice(0, maxmixeditems); // [3, 1]

        for (let i = 0; i < useditems.length; i++) {
          // save each item number and add to row
          data = generateOptionalItems(joinid, currlistingid, useditems[i]);
          joinid++;
          glistingcount++;
          alldata += data;
        }
      }
      writer.write(alldata, 'utf8');
      currlistingid++;

      // drain is needed if ok is false
      if (!ok) {
        break;
      }

      // for long writes, check progress
      if (currlistingid % 100000 === 0) {
        console.log(currlistingid);
      }

      if (currlistingid === whilemax) {
        writer.end();
      }
    }
  }
};

writeMaxTimes();

writer.on('finish', ()  => {
  console.log(`${glistingcount} data written to ${csvname}`)
});