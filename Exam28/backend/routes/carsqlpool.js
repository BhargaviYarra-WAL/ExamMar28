var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
router.get("/createtable", function (req, res) {
  console.log(connector);
  const sql =
    "CREATE TABLE car(carname varchar(50),price int,color ENUM('black','blue', 'grey'),in_stock BOOLEAN)";
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.post("/", function (req, res) {
  const { carname, price, color, in_stock } = req.body;
  const sql = `INSERT INTO car VALUES(?,?,?,?)`;
  connector.query(
    sql,
    [carname, price, color, in_stock],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.get("/", function (req, res) {
  const sql = `SELECT * FROM car`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
});
router.delete("/:carname", function (req, res) {
  const sql = `DELETE  FROM car WHERE carname = "${req.params.carname}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put("/update/:carname", function (req, res) {
  const { carname, price, color, in_stock } = req.body;
  const sql = `UPDATE car SET carname=?,color=?,price=?,in_stock=? where carname="${req.params.carname}"
    `;
  connector.query(
    sql,
    [carname, price, color, in_stock],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.delete("/", function (req, res) {
  const sql = `DELETE FROM car`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
