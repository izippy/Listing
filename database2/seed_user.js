const fs = require('fs');
const faker = require('faker');

let csvname = 'users.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

// generate the listings unit type (entire place, private room, hotel room, shared room)

const generateUsers = (i) => {
  const id = i + 1;
  const name = faker.name.firstName();
  const pic = faker.image.avatar();
  const dataLine = `${id}|${name}|${pic}\n`;
  return dataLine;
}

const writeMaxTimes = () => {
  const max = 500000;
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