const fs = require('fs');
const faker = require('faker');

let csvname = 'amenitiesCategories.csv'
let writer = fs.createWriteStream(csvname);
let grecordcount = 0;

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