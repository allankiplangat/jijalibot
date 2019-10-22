"use strict";
const request = require("request");
const config = require("./config");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  readClass: function(callback, userId) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      client.query(
        "SELECT klass_name, mentor_name FROM public.assigned WHERE fb_id=$1",
        [userId],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            let data = [];
            for (let i = 0; i < result.rows.length; i++) {
              data.push(result.rows[i]["klass_name"]);
              data.push(result.rows[i]["mentor_name"]);
            }
            //callback(result.rows[0][("assigned_classes")]);
            callback(data);
            //result.rows[0][("mentor_email")]
            //[0]["assigned_classes"]
          }
        }
      );
    });
    pool.end();
  },

  readMentor: function(callback, username) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      client.query(
        "SELECT username, email, phone_number FROM public.mentors WHERE username=$1",
        [username],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            let mentor = [];
            for (let i = 0; i < result.rows.length; i++) {
              mentor.push(result.rows[i]["username"]);
              mentor.push(result.rows[i]["email"]);
              mentor.push(result.rows[i]["phone_number"]);
            }
            //callback(result.rows[0][("assigned_classes")]);
            callback(mentor);
            // callback(
            //   result.rows[0][("first_name", "last_name", "phone_number")]
            // );
          }
        }
      );
    });
    pool.end();
  },

  readUser: function(callback, userId) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      client.query(
        "SELECT jijali_id, learning_endgoal, prof_exp, learning_preference, learning_time, studies, education, business, areaof_improvement, areaof_improvement2, areaof_improvement3, area_response, area_response2, area_response3, like_minded, proof_myself, accountability, showcase_skills, self_development, lifestyle_improvement, income_growth, support_others, making_progress, taking_email FROM public.users WHERE fb_id=$1",
        [userId],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            let data = [];
            for (let i = 0; i < result.rows.length; i++) {
              data.push(result.rows[i]["jijali_id"]);
              data.push(result.rows[i]["learning_endgoal"]);
              data.push(result.rows[i]["prof_exp"]);
              data.push(result.rows[i]["learning_preference"]);
              data.push(result.rows[i]["learning_time"]);
              data.push(result.rows[i]["studies"]);
              data.push(result.rows[i]["education"]);
              data.push(result.rows[i]["business"]);
              data.push(result.rows[i]["areaof_improvement"]);
              data.push(result.rows[i]["areaof_improvement2"]);
              data.push(result.rows[i]["areaof_improvement3"]);
              data.push(result.rows[i]["area_response"]);
              data.push(result.rows[i]["area_response2"]);
              data.push(result.rows[i]["area_response3"]);
              data.push(result.rows[i]["like_minded"]);
              data.push(result.rows[i]["proof_myself"]);
              data.push(result.rows[i]["accountability"]);
              data.push(result.rows[i]["showcase_skills"]);
              data.push(result.rows[i]["self_development"]);
              data.push(result.rows[i]["lifestyle_improvement"]);
              data.push(result.rows[i]["income_growth"]);
              data.push(result.rows[i]["support_others"]);
              data.push(result.rows[i]["making_progress"]);
              data.push(result.rows[i]["taking_email"]);
            }
            //callback(result.rows[0][("assigned_classes")]);
            callback(data);
            //result.rows[0][("mentor_email")]
            //[0]["assigned_classes"]
          }
        }
      );
    });
    pool.end();
  },

  readCode: function(callback, name) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      client.query(
        "SELECT code FROM public.klasses WHERE name=$1",
        [name],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            let data = [];
            for (let i = 0; i < result.rows.length; i++) {
              data.push(result.rows[i]["code"]);
            }
            //callback(result.rows[0][("assigned_classes")]);
            callback(data);
            //result.rows[0][("mentor_email")]
            //[0]["assigned_classes"]
          }
        }
      );
    });
    pool.end();
  },
};
