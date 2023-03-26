import { Table } from './table';
import { createReadStream } from 'fs';
import { format } from 'fast-csv';
import { resolve } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv = require('csv-stream');

const options = {
  columns: ['id', 'json'],
  enclosedChar: '"',
  columnOffset: 1,
};

const csvStream = csv.createStream(options);
const writeStream = format({
  headers: true,
  quoteColumns: [false, true, false], // in the expected output only json is quoted: id,json,is_valid -> 1,”[2, 3, 6, 1, 5, 9, 4, 7, 8]”,true
  quoteHeaders: false,
});
writeStream.pipe(process.stdout);
createReadStream(resolve(__dirname, process.argv[2]))
  .pipe(csvStream)
  .on('error', function (err) {
    console.error(err);
    console.log(err);
    writeStream.end();
    csvStream.end();
  })
  .on('data', function (data: { id: string; json: string }) {
    try {
      const table = new Table(JSON.parse(data.json));
      writeStream.write({
        id: data.id,
        json: table.is_valid ? `[${table.shiftLeft()}]` : '[]',
        is_valid: table.is_valid,
      });
    } catch (e) {
      console.error(e);
    }
  });