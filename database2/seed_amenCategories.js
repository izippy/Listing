const fs = require('fs');
const faker = require('faker');

let csvname = 'amenCategories.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

const write1Time = () => {
  write();
  function write() {
    const amenCategories = ['Basic', 'Not included','Dining','Guest access','Bed and bath','Outdoor','Safety features','Logistics', 'Facilities','Family features'];
    let data;
    for (let j = 0; j < amenCategories.length; j++) {
      const amenCategories_id = j + 1;
      const amenCat = amenCategories[j];
      data = `${amenCategories_id}|${amenCat}\n`;
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