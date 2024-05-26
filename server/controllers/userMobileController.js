const db = require('../config/query');

exports.create = (req, res) => {  
  const sql = 'INSERT INTO user_mobile (MobileNumber) VALUES (?)';
  db.query(sql, [req.body.MobileNumber], (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }else{
      res.status(201).json("Created successfully");
    }
  });
};

exports.getAll = (req, res) => {
  db.query('SELECT * FROM user_mobile', (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }else{
      res.status(200).json(results);
    }
  });
};

exports.updateById = (req, res) => {
  const sql = 'UPDATE user_mobile SET UserId = ?, GivenFrom = ?, GivenUntill = ? WHERE Id = ?';
  db.query(sql, [req.body.UserId, req.body.GivenFrom, req.body.GivenUntill, req.params.id], (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }
    else{
      res.status(200).json("Updated successfully");
    }
  });
};

exports.getVecantMobiles = (req, res) => {
  db.query('SELECT * FROM user_mobile WHERE GivenFrom = NULL OR GivenUntill != NULL', (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }else{
      res.status(200).json(results);
    }
  });
};

exports.deleteById = (req, res) => {
  const sql = 'DELETE FROM user_mobile WHERE Id = ?';
  db.query(sql, [ req.params.id], (err, results) => {
    if (err) {
      return res.status(err.code).json({ error: err.message });
    }
    else{
      res.status(200).json("Deleted successfully");
    }
  });
};
