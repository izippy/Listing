const fs = require('fs');
const faker = require('faker');

let csvname = 'user.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

// generate the listings unit type (entire place, private room, hotel room, shared room)

const maketable_user = (i) => {
  const id = i + 1;
  const name = faker.name.firstName();
  const pic = faker.image.imageUrl();
  const dataLine = `${id}|${name}|${pic}\n`;
  return dataLine;
}

const write10MTimes = () => {
  let i = 1000;
  write();
  function write() {
    let ok = true;
    
    do {
      i--;
      if (i === 0) {
        let data = maketable_user(i);
        recordcount++;
        writer.write(data, 'utf8');
      } else {
        // we're not done yet.
        let data = maketable_user(i);
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