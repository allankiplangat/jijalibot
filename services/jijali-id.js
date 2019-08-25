"use strict";

const config = require("../config");
const emailService = require("./email-service");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = function(jijali_id) {
  var pool = new pg.Pool(config.PG_CONFIG);
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client.query(
      "INSERT into ids " + "(jijali_id)" + "VALUES($1) RETURNING id",
      [jijali_id],
      function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("row inserted with id: " + result.rows[0].id);
        }
      }
    );
  });
  pool.end();
};
