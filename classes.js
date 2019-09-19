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
        "SELECT assigned_classes, mentor_email FROM public.assigned WHERE fb_id=$1",
        [userId],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            let data = [];
            //callback(result.rows[0][("assigned_classes")]);
            callback(result.rows[0][("mentor_email")]);
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
        "SELECT first_name, last_name, phone_number FROM public.mentors WHERE email=$1",
        [email],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            callback(
              result.rows[0][("first_name", "last_name", "phone_number")]
            );
          }
        }
      );
    });
    pool.end();
  }
};
