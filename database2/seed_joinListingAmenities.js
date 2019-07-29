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

const generateJoinListingAmenity = (joinid, currlistingid, amenityid) => {
  const allLines = `${joinid}|${currlistingid}|${amenityid}\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const writeMaxTimes = () => {
  let currlistingid = 1; 
  const lastlistingid = 1; // max is number of listings we need to join. 100 for now
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

  const amenrequiredobj = {
    'Wifi': [1,10], 
    'TV': [2,11], 
    'Iron': [3,12],
    'Air conditioning': [4,13], 
    'Laptop friendly workspace': [5,14], 
    'Heating': [6,15], 
    'Hot water': [7,16],
    'Washer': [8,17],
    'Essentials': [9,18],
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

      // make required amenities categories (1: basic or 2:notincluded)
      // loop through amenrequiredobj. slice out either the first or second element in value
      // to randomly build out cat1 and cat2
      let cat1basic = [];
      let cat2notincluded = [];
      for (let key in amenrequiredobj) {
        let randomindex = Math.round(Math.random()); // random index from 0 or 1;
        let basicitem = amenrequiredobj[key].splice(randomindex, 1);
        cat1basic.push(basicitem);
      }
      for (let key in amenrequiredobj) {
        let arr = amenrequiredobj[key]; // [10]
        cat2notincluded.push(arr);
      }

      cat1basic = [].concat(...cat1basic); // [ 10, 2, 12, 13, 14, 6, 7, 17, 9 ]
      cat2notincluded = [].concat(...cat2notincluded); // [ 1, 11, 3, 4, 5, 15, 16, 8, 18 ]
      
      // loop through cat1. get joinid, listingid, and amenityid and plug into helper function
      for (let i = 0; i < cat1basic.length; i++) {
        data = generateJoinListingAmenity(joinid, currlistingid, cat1basic[i]);
        joinid++;
        glistingcount++;
        alldata += data;
      };

      // loop through cat2. do the same as above
      for (let i = 0; i < cat2notincluded.length; i++) {
        data = generateJoinListingAmenity(joinid, currlistingid, cat2notincluded[i]);
        joinid++;
        glistingcount++;
        alldata += data;
      };

      // make optional amenities. Add random optional categories of amenities (from ids 19 to 50)
      let availablecategories = [3, 4, 5, 6, 7, 8, 9, 10];
      let mixedcategories = availablecategories.sort(() => Math.random()-0.5); 
      let maxmixedcategories = Math.floor(Math.random() * availablecategories.length) + 1; // random number from 1 to 8
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
        maxmixeditems = Math.floor(Math.random() * availableitems.length) + 1; // random number from mixed used items, 2
        useditems = mixeditems.slice(0, maxmixeditems); // [3, 1]

        for (let i = 0; i < useditems.length; i++) {
          data = generateJoinListingAmenity(joinid, currlistingid, useditems[i]);
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