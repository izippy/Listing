const fs = require('fs');
const faker = require('faker');
const db = require('./index.js');

let csvname = 'unitTypes.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node <seed_file.js>' to (1) populate csv and (2) create table
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
// pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/unitTypes.csv | psql -U cassandratong -d izippy -c "COPY unitTypes FROM STDIN DELIMITERS '|';"
let schema = "DROP TABLE IF EXISTS unitTypes; CREATE TABLE IF NOT EXISTS unitTypes (id INT NOT NULL PRIMARY KEY, type TEXT NOT NULL);";
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
    const unit_types = ['Entire place', 'Private room', 'Hotel room', 'Shared room'] // 4 types of places
    let data;
    for (let j = 0; j < unit_types.length; j++) {
      const unit_type_id = j + 1;
      const unit_type = unit_types[j];
      data = `${unit_type_id}|${unit_type}\n`;
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