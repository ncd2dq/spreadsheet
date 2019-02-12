class Sheet{
  constructor(){
    // Keys "A1" = OBJ
    this.cells = this.initBaseCells();
  }

  initBaseCells(){
    // Creates empty base cells for initial load of UI
    let cells = {};
    let baseRows = ['N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
    baseRows.sort();

    for(let i = 0; i < baseRows.length; i++){
      cells[baseRows[i]] = {};
    }
    return cells;
  }

  _getRowRange(startRow, endRow){
    /*
    Return array of all row keys between startRow and endRow:
    Example: AB -> BC: [AB, AC, AD, AE, ... AZ, BA, BB, BC]

    @param startRow: String
    @param endRow: String
    */


    /*
    Convert startRow to an array of indexes breakdown by character
    AAA -> [0, 0, 0]
    BD -> [1, 3]
    */
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let startArray = [];
    let endArray = [];
    for(let i = 0; i < startRow.length; i++){
      startArray.push(alphabet.indexOf(startRow.charAt(i)));
    }
    for(let i = 0; i < endRow.length; i++){
      endArray.push(alphabet.indexOf(endRow.charAt(i)));
    }

    // Ensure arrays are the same length
    while(startArray.length != endArray.length){
      startArray.splice(0, 0, -1);
    }

    // Continually add to smaller array until it equals larger array
    let output = [];

    function addOne(array, index){
      /*
      Recursively add from right to left
      [-1, 9, 9, 9, 9, 8] -> [-1, 9, 9, 9, 9, 9] -> [0, 0, 0, 0, 0, 0]
      */
      if(array[index] == 25){
        array[index] = 0;
        addOne(array, index - 1);
      }
      else {
        array[index] += 1;
      }
      return array;
    }

    // Turn all interum iterations of endArray as we add up to startArray into
    // string sequences
    while(JSON.stringify(startArray) != JSON.stringify(endArray)){
      let newRow = startArray.filter(val => val != -1).map(val => alphabet.charAt(val)).join('');
      output.push(newRow);
      startArray = addOne(startArray, endArray.length - 1);
    }
    // Do one final time when equal
    let newRow = startArray.filter(val => val != -1).map(val => alphabet.charAt(val)).join('');
    output.push(newRow);

    // Already sorted by nature
    return output;
  }

  getArray(startRow, endRow, startCol, endCol, rowBuffer=20, colBuffer=20){
    // Grab the visible chunk plus some buffer and output as array
    let visibleRows = this._getRowRange(startRow, endRow);
    let output = [];
    // Create blank rows
    for(let i = 0; i < visibleRows.length; i++){
      output.push(new Array(endCol - startCol + 1));
    }

    console.log(output);
    // Fill in rows that have values
    for(let i = 0; i < visibleRows.length; i++){
      let colKeys = Object.keys(this.cells[visibleRows[i]])

      for(let j = startCol; j < endCol; j++){
        if(j.toString in colKeys){
          output[i][j] = this.cells[visibleRows[i]][j.toString];
        }
        else {
          output[i][j] = ' ';
        }
      }
    }

    return output
  }
}

class Cell{
  constructor(cellValue, row, col){
    /*
    @param cellValue: CellValue: Object
    */
    this.row = row;
    this.col = col;
    this.cellValue = cellValue;
  }

  setValue(){

  }

  getValue(){
    // Calculate the value of a cell by going through all references
    return this.cellValue.contents;
  }
}

class CellValue{
  constructor(contents, cellType, dataType){
    /*
    @param contents: String
    @param type: String: "Value" -> Just a value, "Ref" -> Contains a reference to other cells
    @param dataType: String: Actual javascript datatype of cell contents
    */
    this.dataType = dataType;
    this.cellType = cellType;
    this.contents = contents;
  }

  test(){

  }
}

let newDB = new Sheet();

module.exports = exports = newDB;
