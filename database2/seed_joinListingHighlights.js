const fs = require('fs');

let csvname = 'joinListingHighlights.csv'
let writer = fs.createWriteStream(csvname);
let glistingcount = 0;

const makejoin_firstlisting_highlight = (joinid, currlistingid) => {
  const allLines = `${joinid}|${currlistingid}|1\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const makejoin_restlisting_highlights = (joinid, currlistingid, randhighlight) => {
  const allLines = `${joinid}|${currlistingid}|${randhighlight}\n`; // first highlight for a listing id is always guest/bed/bath count
  return allLines;
}

const writeMaxTimes = () => {
  let currlistingid = 1; 
  const lastlistingid = 100;
  const whilemax = lastlistingid + 1; // max is number of listings we need to join. 100 for now
  let joinid = 1;
  let ok = true;

  writeJoin();

  function writeJoin() {
    while (currlistingid < whilemax) {
      
      let alldata = '';
      // make first (required) highlight
      let firstdata = makejoin_firstlisting_highlight(joinid, currlistingid);
      alldata += firstdata;
      joinid++;
      glistingcount++;

      // make other (optional) highlights. Add a random number (1, 2, or 3 more) of highlights (from ids 2 to 7)
      let availablehighlights = [2, 3, 4, 5, 6, 7];
      let mixedhighlights = availablehighlights.sort(() => Math.random()-0.5); 
      let maxmixedhighlights = Math.floor(Math.random() * 3) + 1; // random number from 1 to 3
      let usedhighlights = mixedhighlights.slice(0,maxmixedhighlights); // [2,5,7]
      for (let i = 0; i < usedhighlights.length; i++) {
        let otherdata = makejoin_restlisting_highlights(joinid, currlistingid, usedhighlights[i]);
        joinid++;
        glistingcount++;
        alldata += otherdata;
      }
      writer.write(alldata, 'utf8');
      currlistingid++;

      // drain is needed if ok is false
      if (!ok) {
        break;
      }

      // for long writes, check progress
      if (currlistingid % 100000 === 0) {
        console.log(currlistingid);
      }

      if (currlistingid === whilemax) {
        writer.end();
      }
    }
  }
};

writeMaxTimes();

writer.on('finish', ()  => {
  console.log(`${glistingcount} data written to ${csvname}`)
});