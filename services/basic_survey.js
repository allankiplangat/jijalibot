"use strict";

const config = require("../config");
const emailService = require("./email-service");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = function(
  endgoal,
  profexp,
  learningpreference,
  learningtime,
  studies,
  education,
) {
  var pool = new pg.Pool(config.PG_CONFIG);
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }

    client.query(
      "INSERT into basic_survey " +
        "(end_goal, prof_exp, learning_preference, learning_time, study_area, education_level)" +
        "VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        endgoal,
        profexp,
        learningpreference,
        learningtime,
        studies,
        education
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
