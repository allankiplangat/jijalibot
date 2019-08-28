"use strict";
const request = require("request");
const config = require("../config");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  updateId: function(jijali_id, userId) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      let sql = "UPDATE public.users SET jijali_id=$1 WHERE fb_id=$2";
      client.query(sql, [jijali_id, userId]);
    });
    pool.end();
  },
  careerstartSurvey: function(
    learning_endgoal,
    prof_exp,
    learning_preference,
    learning_time,
    studies,
    education,
    userId
  ) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      let sql =
        "UPDATE public.users SET learning_endgoal=$1, prof_exp=$2, learning_preference=$3, learning_time=$4, studies=$5, education=$6 WHERE fb_id=$7";
      client.query(sql, [
        learning_endgoal,
        prof_exp,
        learning_preference,
        learning_time,
        studies,
        education,
        userId
      ]);
    });
    pool.end();
  },

  entrepreneurSurvey: function(
    learning_endgoal,
    prof_exp,
    learning_preference,
    learning_time,
    studies,
    education,
    business,
    userId
  ) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      let sql =
        "UPDATE public.users SET learning_endgoal=$1, prof_exp=$2, learning_preference=$3, learning_time=$4, studies=$5, education=$6, business=$7 WHERE fb_id=$8";
      client.query(sql, [
        learning_endgoal,
        prof_exp,
        learning_preference,
        learning_time,
        studies,
        education,
        business,
        userId
      ]);
    });
    pool.end();
  }
};
