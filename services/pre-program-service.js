"use strict";

const config = require("../config");
const emailService = require("./email-service");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = function(
  conv_like_minded,
  conv_proof_myself,
  conv_accountability,
  conv_showcase_skills,
  conv_self_development,
  conv_lifestyle_improvement,
  conv_income_growth,
  conv_support_others,
  conv_making_progess,
) {

  var pool = new pg.Pool(config.PG_CONFIG);
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }

    client.query(
      "INSERT into motivation_data" +
        "(conv_like_minded, conv_proof_myself, conv_accountability, conv_showcase_skills, conv_self_development, conv_lifestyle_improvement, conv_income_growth, conv_support_others, conv_making_progess)" +
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
      [
        conv_like_minded,
        conv_proof_myself,
        conv_accountability,
        conv_showcase_skills,
        conv_self_development,
        conv_lifestyle_improvement,
        conv_income_growth,
        conv_support_others,
        conv_making_progess,

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
