"use strict";

const config = require("../config");
const emailService = require("./email-service");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = function({ id, basic_survey, improvements, motivations }) {
  // destructing
  var {
    endgoal,
    profexp,
    learningpreference,
    learningtime,
    studies,
    education,
    business
  } = basic_survey;
  var {
    improvement,
    imp_responses,
    improvement2,
    imp_responses2,
    improvement3,
    imp_responses3
  } = improvements;
  var {
    conv_like_minded,
    conv_proof_myself,
    conv_accountability,
    conv_showcase_skills,
    conv_self_development,
    conv_lifestyle_improvement,
    conv_income_growth,
    conv_support_others,
    conv_making_progress
  } = motivations;

  var pool = new pg.Pool(config.PG_CONFIG);
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }

    client.query(
      "INSERT into jijalidata" +
        "( jijali_id,endgoal,profexp,learningpreference,learningtime,studies,education,business,improvement,imp_responses,improvement2,imp_responses2,improvement3,imp_responses3,conv_like_minded,conv_proof_myself,conv_accountability,conv_showcase_skills,conv_self_development,conv_lifestyle_improvement,conv_income_growth,conv_support_others,conv_making_progress)" +
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING id",
      [
        id,
        endgoal,
        profexp,
        learningpreference,
        learningtime,
        studies,
        education,
        business,
        improvement,
        imp_responses,
        improvement2,
        imp_responses2,
        improvement3,
        imp_responses3,
        conv_like_minded,
        conv_proof_myself,
        conv_accountability,
        conv_showcase_skills,
        conv_self_development,
        conv_lifestyle_improvement,
        conv_income_growth,
        conv_support_others,
        conv_making_progress
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
