const fs = require('fs');
const db = require('./index.js');

let csvname = 'joinListingsHighlights.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node <seed_file.js>' to (1) populate csv and (2) create table
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
// pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/joinListingsHighlights.csv | psql -U cassandratong -d izippy -c "COPY joinListingsHighlights FROM STDIN DELIMITERS '|';"
let schema = "DROP TABLE IF EXISTS joinListingsHighlights; CREATE TABLE IF NOT EXISTS joinListingsHighlights (id INT NOT NULL PRIMARY KEY, listings_id INT NOT NULL, highlights_id INT);";
db.query(schema, (err, res) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log(`${csvname} table created`);
  }
  db.end();
});


const makejoin_firstlisting_highlight = (joinid, currlistingid) => {
  const allLines = `${joinid}|${currlistingid}|1\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const makejoin_restlisting_highlights = (joinid, currlistingid, randhighlight) => {
  const allLines = `${joinid}|${currlistingid}|${randhighlight}\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const writeMaxTimes = () => {
  let currlistingid = 1; 
  const lastlistingid = 10000;
  const whilemax = lastlistingid + 1; // max is number of listings we need to join. 100 for now
  let joinid = 1;
  let ok = true;

  writeJoin();

  function writeJoin() {
    while (currlistingid < whilemax) {
      
      let alldata = '';
      // make first (required) highlight
      let firstdata = makejoin_firstlisting_highlight(joinid, currlistingid);
      alldata += firstdata;
      joinid++;
      glistingcount++;

      // make other (optional) highlights. Add a random number (1, 2, or 3 more) of highlights (from ids 2 to 7)
      let availablehighlights = [2, 3, 4, 5, 6, 7];
      let mixedhighlights = availablehighlights.sort(() => Math.random()-0.5); 
      let maxmixedhighlights = Math.floor(Math.random() * 3) + 1; // random number from 1 to 3
      let usedhighlights = mixedhighlights.slice(0,maxmixedhighlights); // [2,5,7]
      for (let i = 0; i < usedhighlights.length; i++) {
        let otherdata = makejoin_restlisting_highlights(joinid, currlistingid, usedhighlights[i]);
        joinid++;
        glistingcount++;
        alldata += otherdata;
      }
      ok = writer.write(alldata, 'utf8');
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