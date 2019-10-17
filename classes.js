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
                data.push(result.rows[i]['assigned_classes']);
                data.push(result.rows[i]['mentor_email']);
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

  readMentor: function(callback, email) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      client.query(
        "SELECT first_name, last_name, email, phone_number FROM public.mentors WHERE email=$1",
        [email],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            let mentor = [];
            for (let i = 0; i < result.rows.length; i++) {
                mentor.push(result.rows[i]['first_name']);
                mentor.push(result.rows[i]['last_name']);
                mentor.push(result.rows[i]['email']);
                mentor.push(result.rows[i]['phone_number']);
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
  }
};
