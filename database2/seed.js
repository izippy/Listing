const fs = require('fs');
const faker = require('faker');

let csvname = 'cookiemonster2.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

const generateData = () => {
  const general = faker.lorem.sentences();
  const thespace = faker.lorem.sentences();
  const guestaccess = faker.lorem.sentences();
  const interactionwithguests = faker.lorem.sentences();
  const otherthings = faker.lorem.sentences();
  const license = `STR-${faker.random.number({min:1000000, max:9999999})}`;
  const allLines = `#${recordcount}: ${general}|${thespace}|${guestaccess}|${interactionwithguests}|${otherthings}|${license}\n`;
  return allLines;
}

const write10MTimes = () => {
  let i = 10;
  write();
  function write() {
    let ok = true;
    // let allLines = '';
    // let oneLineDelimitedFinal = '';
    // const descsubtitle = ['General','The space', 'Guest access', 'Interaction with guests', 'Other things to note','License or registration number'];
    
    do {
      i--;
      if (i === 0) {
        let data = generateData();
        recordcount++;
        writer.write(data, 'utf8');
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        let data = generateData();
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