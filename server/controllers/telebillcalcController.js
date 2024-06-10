const db = require('../config/query');

exports.create = (req, res) => {
    const sql = 'INSERT INTO telebillscal (discount, teleLev, cess, sscl, iddLevy, Total, vat, Month, Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [
        req.body.discount,
        req.body.teleLev,
        req.body.cess,
        req.body.sscl,
        req.body.iddLevy,
        req.body.total,
        req.body.vat,
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

exports.updateById = (req, res) => {
    const sql = 'UPDATE telebillscal SET discount = ?, teleLev = ?, cess = ?, sscl = ?, iddLevy = ?, Total = ?, vat = ?, Month = ?, Year = ? WHERE Id = ?';
    db.query(sql, [
        req.body.discount,
        req.body.teleLev,
        req.body.cess,
        req.body.sscl,
        req.body.iddLevy,
        req.body.total,
        req.body.vat,
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
    const sql = 'DELETE FROM telebillscal WHERE Id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.status(200).json("Deleted successfully");
        }
    });
};

exports.getMonthlyBills = (req, res) => {
    const { month, year } = req.query;

    const sql = 'SELECT * FROM telebillscal WHERE Month = ? AND Year = ?';

    db.query(sql, [month, year], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
};
