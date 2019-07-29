const fs = require('fs');
const db = require('./index.js');

let csvname = 'amenitiesCategories.csv'
let writer = fs.createWriteStream(csvname);
let grecordcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node <seed_file.js>' to (1) populate csv and (2) create table
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
// pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/amenitiesCategories.csv | psql -U cassandratong -d izippy -c "COPY amenitiesCategories FROM STDIN DELIMITERS '|';"
let schema = "DROP TABLE IF EXISTS amenitiesCategories; CREATE TABLE IF NOT EXISTS amenitiesCategories (id INT NOT NULL PRIMARY KEY, amenCategory TEXT);";
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
    const amenCategories = ['Basic', 'Not included','Guest access','Bed and bath','Safety features','Family features','Outdoor','Dining', 'Logistics','Facilities'];
    let data;
    for (let i = 0; i < amenCategories.length; i++) {
      const id = i + 1;
      const amenCategory = amenCategories[i];
      data = `${id}|${amenCategory}\n`;
      grecordcount++;
      writer.write(data, 'utf8');
    }
    writer.end();
  };
};

write1Time();

writer.on('finish', ()  => {
  console.log(`${grecordcount} data written to ${csvname}`)
});