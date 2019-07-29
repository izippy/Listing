const fs = require('fs');
const db = require('./index.js');

let csvname = 'highlights.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node <seed_file.js>' to (1) populate csv and (2) create table
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
// pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/highlights.csv | psql -U cassandratong -d izippy -c "COPY highlights FROM STDIN DELIMITERS '|';"
let schema = "DROP TABLE IF EXISTS highlights; CREATE TABLE IF NOT EXISTS highlights (id INT NOT NULL PRIMARY KEY, highlight_item TEXT NOT NULL, highlight_desc TEXT);";
db.query(schema, (err, res) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log(`${csvname} table created`);
  }
  db.end();
});

const write1Time = () => {
  write();
  function write() {
    const livingspace = ['livingspace'];
    const highlightItems = [livingspace,'is a Superhost','Sparkling clean', 'Great location','Great check-in experience','Self check-in']; // 4 types of places
    let data;
    for (let j = 0; j < highlightItems.length; j++) {
      const highlight_id = j + 1;
      const highlight_item = highlightItems[j];
      let highlight_desc;
      if (highlight_item === livingspace) { // note for join table, each listing MUST have this item
        highlight_desc = 'guests bedrooms bed bath';
      } else if (highlight_item === 'is a Superhost') {
        highlight_desc = 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.'
      } else if (highlight_item === 'Sparkling clean') {
        highlight_desc = 'Recent guests said this place was sparkling clean.';
      } else if (highlight_item === 'Great location') {
        highlight_desc = 'Recent guests gave the location a 5-star rating.';
      } else if (highlight_item === 'Great check-in experience') {
        highlight_desc = 'Recent guests gave the check-in process a 5-star rating.';
      } else if (highlight_item === 'Self check-in') { // note for join table, each listing can only have 1 only one type of check-in
        highlight_desc = 'Check yourself in with the keypad.';
      }
      data = `${highlight_id}|${highlight_item}|${highlight_desc}\n`;
      recordcount++;
      writer.write(data, 'utf8');
    }
    writer.end();
  };
};

write1Time();

writer.on('finish', ()  => {
  console.log(`${recordcount} data written to ${csvname}`)
});