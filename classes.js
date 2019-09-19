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
        "SELECT assigned_classes FROM public.assigned WHERE fb_id=$1",
        [userId],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            callback(result.rows['assigned_classes']);
            //[0]["assigned_classes"]
          }
        }
      );
    });
    pool.end();
  },

  readMentor: function(callback, userId) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      client.query(
        "SELECT color FROM public.users WHERE fb_id=$1",
        [userId],
        function(err, result) {
          if (err) {
            console.log(err);
            callback("");
          } else {
            callback(result.rows[0]["color"]);
          }
        }
      );
    });
    pool.end();
  }
};
