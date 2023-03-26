# Table Shift Left CLI

This is a command-line interface (CLI) tool to transform a JSON array using the Table class's `shiftLeft()` method.

## Installation

To install the dependencies:

> yarn install

## Usage

The CLI takes a CSV file as an argument and outputs a CSV file with an additional column containing the transformed JSON array. To use it, run:

> node index.js input.csv > output.csv

Where `input.csv` is the CSV file to transform.

## CSV Input

The input CSV file should contain at least two columns: `id` and `json`. The `json` column should contain a valid JSON array.

Here is an example CSV file:

```csv
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]"
```

## CSV Output

The output CSV file will contain three columns: `id`, `json`, and `is_valid`. The `json` column will contain the transformed JSON array, and the `is_valid` column will contain a boolean indicating whether the original JSON array was valid.

Here is an example output CSV file:

```csv
id,json,is_valid
1,"[2,3,6,1,5,9,4,7,8]",true
2,"[20,10,40,90]",true
3,"[-5]",true
9,"[]",false
5,"[]",false
8,"[]",false
```

If the original JSON array was not valid, the `json` column will contain an empty array (`[]`) and the `is_valid` column will be `false`.

## Tests

To run the tests, run the following command:

> npm test

## Dependencies

This tool uses the following dependencies:

- csv-stream for parsing CSV files
- fast-csv for writing CSV files

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.