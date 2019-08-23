"use strict";

const config = require("../config");
const emailService = require("./email-service");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = function(
  endgoal,
  profexp,
  area_improve,
  responses,
  learningpreference,
  learningtime,
  identity,
  studies,
  education,
  similarity,
  proving,
  account,
  skills,
  development,
  lifestyle,
  income,
  support,
  progress
) {
  // console.log('sending email');
  // let emailContent = 'A new job inquiry from ' + user_name + ' for the job: ' + job_vacancy +
  //     '.<br> Previous job position: ' + previous_job + '.' +
  //     '.<br> Years of experience: ' + years_of_experience + '.' +
  //     '.<br> Phone number: ' + phone_number + '.';

  // emailService.sendEmail('New job application', emailContent);

  var pool = new pg.Pool(config.PG_CONFIG);
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }

    client.query(
      "INSERT into survey " +
        "(endgoal, profexp, area_improve, responses, learningpreference, learningtime, id_number, studies, education, similarity, proving, account, skills, development, lifestyle, income, support, progress)" +
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id",
      [
        endgoal,
        profexp,
        area_improve,
        responses,
        learningpreference,
        learningtime,
        identity,
        studies,
        education,
        similarity,
        proving,
        account,
        skills,
        development,
        lifestyle,
        income,
        support,
        progress
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
