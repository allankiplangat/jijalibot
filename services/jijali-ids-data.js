"use strict";
const request = require("request");
const config = require("../config");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  updateId: function(userId, jijali_id) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }

      let sql1 = `SELECT jijali_id FROM ids WHERE fb_id='${userId}' LIMIT 1`;
      client.query(sql1, function(err, result) {
        if (err) {
          console.log("Query error: " + err);
        } else {
          let sql;
          if (result.rows.length === 0) {
            sql = "INSERT INTO ids (fb_id, jijali_id) VALUES ($1, $2)";
          } else {
            sql = "UPDATE ids SET jijali_id=$1 WHERE fb_id=$2";
          }
          client.query(sql, [userId, jijali_id]);
        }
      });

      done();
    });
    pool.end();
  }
};
