const fs = require('fs');
const faker = require('faker');

let csvname = 'cookiemonster2.csv'
let writeStream = fs.createWriteStream(csvname);

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 100;
  write();

  function write() {
    let ok = true;

    do {
      i--;
      if (i === 0) {
        //last time!
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue or wait.
        // dont pass the callback because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } 

    while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains.
      write.once('drain', write);
    }
    
  }
}

let allLines= '';
let oneLineFinal = '';
let recordcount = 0;

// make number of entries
for (let i = 0; i < 1000000; i++) {

  // create content for each type of description
  const descsubtitle = ['General','The space', 'Guest access', 'Interaction with guests', 'Other things to note','License or registration number'];
  let oneLineDelimited = '';

  for (let j = 0; j < descsubtitle.length; j++){
    if (j === 5) {
      const licensenum = faker.random.number({min:1000000, max:9999999});
      const license = `STR-${licensenum}`;
      oneLineDelimited += `${license}|`;
    } else {
      const sentences = faker.lorem.sentences();
      oneLineDelimited += `${sentences}|`
    }

    oneLineFinal = 'Record #' + i + ': ' + oneLineDelimited.slice(0, oneLineDelimited.length-1) + '\n';
  }

  // combine all lines to be inserted
  allLines += oneLineFinal;
  recordcount++;
}

// overwrites what's in the file if the file already exists
writeStream.write(`${allLines}`);

// finish event is emitted when all data flushed from stream
writeStream.on('finish', ()  => {
  console.log(`${recordcount} data written to ${csvname}`)
});

writeStream.end();