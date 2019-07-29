const fs = require('fs');
const faker = require('faker');
const db = require('./index.js');

let csvname = 'users.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// STEP 1: POSTGRES > connect izippy
// STEP 2: 'node <seed_file.js>' to (1) populate csv and (2) create table
// STEP 3: pv in new terminal to pipe in with progress bar outside of postgres
// pv /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database2/users.csv | psql -U cassandratong -d izippy -c "COPY users FROM STDIN DELIMITERS '|';"
let schema = "DROP TABLE IF EXISTS users; CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY, name TEXT NOT NULL, pic TEXT);";
db.query(schema, (err, res) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log(`${csvname} table created`);
  }
  db.end();
});


// generate the listings unit type (entire place, private room, hotel room, shared room)
const generateUsers = (i) => {
  const id = i + 1;
  const name = faker.name.firstName();
  const pic = faker.image.avatar();
  const dataLine = `${id}|${name}|${pic}\n`;
  return dataLine;
}

const writeMaxTimes = () => {
  const max = 1000000;
  let i = 0;
  let ok = true;

  writeUsers();

  function writeUsers() {
    while (i < max) {
      let data = generateUsers(i);
      ok = writer.write(data, 'utf8');
      glistingcount++
      i++;

      // drain is needed if ok is false
      if (!ok) {
        break;
      }

      // for long writes, check progress
      if (i % 100000 === 0) {
        console.log(i);
      }
    }    

    if (!ok) {
      // had to stop early. Write more once it drains
      writer.once('drain', writeUsers)
    }

    if (i === max) {
      writer.end();
    }
  }
};

writeMaxTimes();

writer.on('finish', ()  => {
  console.log(`${glistingcount} data written to ${csvname}`)
});