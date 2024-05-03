const db = require('../config/query');

exports.create = (req, res) => {  
  const sql = 'INSERT INTO users (Name, Position, Dpt) VALUES (?, ?, ?)';
  db.query(sql, [req.body.name, req.body.position, req.body.department], (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }else{
      res.status(201).json("Created successfully");
    }
  });
};

exports.getAll = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }else{
      res.status(200).json(results);
    }
  });
};

exports.getById = (req, res) => {
  const sql = 'SELECT * FROM users WHERE Id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.updateById = (req, res) => {
  const sql = 'UPDATE users SET Name = ?, Position = ?, Dpt = ? WHERE Id = ?';
  db.query(sql, [req.body.name, req.body.position, req.body.department, req.params.id], (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }
    else{
      res.status(200).json("Updated successfully");
    }
  });
};

exports.deleteById = (req, res) => {
  const sql = 'DELETE FROM users WHERE Id = ?';
  db.query(sql, [ req.params.id], (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }
    else{
      res.status(200).json("Deleted successfully");
    }
  });
};
