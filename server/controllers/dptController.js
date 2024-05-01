const db = require('../config/query');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err });
    }
    res.json(results);
  });
};