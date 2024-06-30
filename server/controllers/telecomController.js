const db = require('../config/query');

exports.create = (req, res) => {
  const sql = 'INSERT INTO telecom (MobileNumber, Dpt) VALUES (?, ?)';
  db.query(sql, [req.body.mobileNumber, req.body.dpt], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(201).json("Created successfully");
    }
  });
};

exports.getAll = (req, res) => {
  db.query('SELECT * FROM telecom', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.updateById = (req, res) => {
  const sql = 'UPDATE telecom SET MobileNumber = ?, Dpt = ? WHERE Id = ?';
  db.query(sql, [
    req.body.mobileNumber,
    req.body.dpt,
    req.params.id
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(200).json("Updated successfully");
    }
  });
};

exports.deleteById = (req, res) => {
  const sql = 'DELETE FROM telecom WHERE Id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(200).json("Deleted successfully");
    }
  });
};
