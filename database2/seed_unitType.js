const fs = require('fs');
const faker = require('faker');

let csvname = 'unitType.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

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