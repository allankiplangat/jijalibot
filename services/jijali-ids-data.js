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
  },

  careerImprovement: function(
    areaof_improvement,
    areaof_improvement2,
    areaof_improvement3,
    area_response,
    area_response2,
    area_response3,
    userId
  ) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      let sql =
        "UPDATE public.users SET areaof_improvement=$1, areaof_improvement2=$2, areaof_improvement3=$3, area_response=$4, area_response2=$5, area_response3=$6 WHERE fb_id=$7";
      client.query(sql, [
        areaof_improvement,
        areaof_improvement2,
        areaof_improvement3,
        area_response,
        area_response2,
        area_response3,
        userId
      ]);
    });
    pool.end();
  },

  motivation: function(
    like_minded,
    proof_myself,
    accountability,
    showcase_skills,
    self_development,
    lifestyle_improvement,
    income_growth,
    support_others,
    making_progress,
    taking_email,
    userId
  ) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      let sql =
        "UPDATE public.users SET like_minded=$1, proof_myself=$2, accountability=$3, showcase_skills=$4, self_development=$5, lifestyle_improvement=$6,income_growth=$7, support_others=$8, making_progress=$9, taking_email=$10 WHERE fb_id=$11";
      client.query(sql, [
        like_minded,
        proof_myself,
        accountability,
        showcase_skills,
        self_development,
        lifestyle_improvement,
        income_growth,
        support_others,
        making_progress,
        taking_email,
        userId
      ]);
    });
    pool.end();
  },
  afterclass: function(
    class_code,
    class_status,
    time_on_class,
    class_impact,
    video_time,
    enjoyed_video,
    reading_time,
    enjoyed_reading,
    practical_time,
    enjoyed_practical,
    userId
  ) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      let sql =
        "UPDATE public.afterclass SET class_code=$1, class_status=$2, time_on_class=$3, class_impact=$4, video_time=$5, enjoyed_video=$6,reading_time=$7, enjoyed_reading=$8, practical_time=$9, enjoyed_practical=$10 WHERE fb_id=$11";
      client.query(sql, [
        class_code,
        class_status,
        time_on_class,
        class_impact,
        video_time,
        enjoyed_video,
        reading_time,
        enjoyed_reading,
        practical_time,
        enjoyed_practical,
        userId
      ]);
    });
    pool.end();
  }
};
