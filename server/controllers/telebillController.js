const db = require('../config/query');

exports.create = (req, res) => {  
  const sql = 'INSERT INTO telebills (Mobile, Rent, Other, VoiceUsage, CallCharges, Total, Dpt, Month, Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [
    req.body.mobile,
    req.body.rent,
    req.body.other,
    req.body.voiceUsage,
    req.body.callCharges,
    req.body.total,
    req.body.dpt,
    req.body.month,
    req.body.year
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(201).json("Created successfully");
    }
  });
};

exports.getAll = (req, res) => {
  db.query('SELECT * FROM telebills', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.updateById = (req, res) => {
  const sql = 'UPDATE telebills SET Mobile = ?, Rent = ?, Other = ?, VoiceUsage = ?, CallCharges = ?, Total = ?, Dpt = ?, Month = ?, Year = ? WHERE Id = ?';
  db.query(sql, [
    req.body.mobile,
    req.body.rent,
    req.body.other,
    req.body.voiceUsage,
    req.body.callCharges,
    req.body.total,
    req.body.dpt,
    req.body.month,
    req.body.year,
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
  const sql = 'DELETE FROM telebills WHERE Id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(200).json("Deleted successfully");
    }
  });
};
