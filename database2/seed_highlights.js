const fs = require('fs');
const faker = require('faker');

let csvname = 'highlights.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

// Name is a Superhost => Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
// Sparkling Clean => 12 recent guests said this place was sparkling clean.
// Great check-in experience => Recent guests gave the check-in process a 5-star rating.
// Great location => Recent guests gave the location a 5-star rating.
// Self check-in => Check yourself in with the keypad.
// Self check-in => Check yourself in with the lockbox.

const write1Time = () => {
  write();
  function write() {
    const livingspace = ['livingspace'];
    const highlightItems = [livingspace,'is a Superhost','Sparkling clean', 'Great location','Great check-in experience','Self check-in1', 'Self check-in2']; // 4 types of places
    let data;
    for (let j = 0; j < highlightItems.length; j++) {
      const highlight_id = j + 1;
      const highlight_item = highlightItems[j];
      let highlight_desc;
      if (highlight_item === livingspace) { // note for join table, each listing MUST have this item
        highlight_desc = 'guests bedrooms bed bath';
      } else if (highlight_item === 'is a Superhost') {
        highlight_desc = 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.'
      } else if (highlight_item === 'Sparkling clean') {
        highlight_desc = 'Recent guests said this place was sparkling clean.';
      } else if (highlight_item === 'Great location') {
        highlight_desc = 'Recent guests gave the location a 5-star rating.';
      } else if (highlight_item === 'Great check-in experience') {
        highlight_desc = 'Recent guests gave the check-in process a 5-star rating.';
      } else if (highlight_item === 'Self check-in1') { // note for join table, each listing can only have 1 only one type of check-in
        highlight_desc = 'Check yourself in with the keypad.';
      } else if (highlight_item === 'Self check-in2') { // note for join table, each listing can only have 1 only one type of check-in
        highlight_desc = 'Check yourself in with the lockbox.';
      }
      data = `${highlight_id}|${highlight_item}|${highlight_desc}\n`;
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