let db = require('../../models').db;

module.exports = exports = {
  render: (req, res) => {
    data = db.getArray("A", "N", 1, 10);
    colHeaders = [1,2,3,4,5,6,7,8,9,10];
    rowHeaders = db._getRowRange("A", "N");
    res.render(
                'home',
                {
                  title: 'Home Page',
                  data: data,
                  colHeaders: colHeaders,
                  rowHeaders: rowHeaders,
                }
              );
  }
}
