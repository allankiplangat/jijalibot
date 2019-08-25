"use strict";

const config = require("../config");
const emailService = require("./email-service");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = function(
  improvement,
  imp_responses,
  improvement2,
  imp_responses2,
  improvement3,
  imp_responses3,
) {
  var pool = new pg.Pool(config.PG_CONFIG);
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }

    client.query(
      "INSERT into Improvement " +
        "(improvement, imp_responses, improvement2, imp_responses2, improvement3, imp_responses3)" +
        "VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        improvement,
        imp_responses,
        improvement2,
        imp_responses2,
        improvement3,
        imp_responses3
      ],
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
