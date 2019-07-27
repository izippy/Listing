const fs = require('fs');
const faker = require('faker');

let csvname = 'joinListingHighlights.csv'
let writer = fs.createWriteStream(csvname);
let recordcount = 0;

const makejoin_firstlisting_highlight = (idcount, listing_id) => {
  const allLines = `${idcount}|${listing_id}|1\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const makejoin_restlisting_highlights = (idcount, listing_id, randhighlight) => {
  const allLines = `${idcount}|${listing_id}|${randhighlight}\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const write10MTimes = () => {
  let listing_id = 1; 
  const maxlisting_id = 100; // max 100 listings for now
  let idcount = 0;
  let data;

  write();

  function write() {
    let ok = true;
    do {
      idcount++;
      if (listing_id === maxlisting_id) {
        console.log("made it inside last entry")
        idcount++;
        data = makejoin_firstlisting_highlight(idcount, listing_id);
        writer.write(data, 'utf8');
        recordcount++;
        // add a random number (1, 2, or 3 more) of highlights (from 2 to 7)
        let availablehighlights = [2, 3, 4, 5, 6, 7];
        let sortedhighlights = availablehighlights.sort(() => Math.random()-0.5); 
        let maxsortedhighlights = Math.floor(Math.random() * 3) + 1; // random number from 1 to 3
        let usedhighlights = sortedhighlights.slice(0,maxsortedhighlights); // [2,5,7]
        let allLines;
        for (let i = 0; i < usedhighlights.length; i++) {
          idcount++;
          let data = makejoin_restlisting_highlights(idcount, listing_id, usedhighlights[i]);
          listing_id++;
          recordcount++;
          writer.write(data, 'utf8');
        }
      } else {
        let alldata ='';
        let firstdata = makejoin_firstlisting_highlight(idcount, listing_id);
        alldata += firstdata;
        idcount++;
        listing_id++;
        recordcount++;
        
        // add a random number (1, 2, or 3 more) of highlights (from 2 to 7)
        let availablehighlights = [2, 3, 4, 5, 6, 7];
        let sortedhighlights = availablehighlights.sort(() => Math.random()-0.5); 
        let maxsortedhighlights = Math.floor(Math.random() * 3) + 1; // random number from 1 to 3
        let usedhighlights = sortedhighlights.slice(0,maxsortedhighlights); // [2,5,7]
        for (let i = 0; i < usedhighlights.length; i++) {
          let otherdata = makejoin_restlisting_highlights(idcount, listing_id, usedhighlights[i]);
          idcount++;
          recordcount++;
          alldata += otherdata;
        }
        writer.write(alldata, 'utf8');
      }
      // console.log(!!ok)
    } while (listing_id < maxlisting_id && ok);
    if (listing_id < maxlisting_id) {
      // Had to stop early! Write some more once it drains.
      writer.once('drain', write);
    } else if (listing_id === maxlisting_id) {
      writer.end();
    }
  };
};

write10MTimes();

writer.on('finish', ()  => {
  console.log(`${recordcount} data written to ${csvname}`)
});