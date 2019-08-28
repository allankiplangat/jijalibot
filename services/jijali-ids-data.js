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

      let sql1 = `SELECT jijali_id FROM ids WHERE fb_id='${userId}' LIMIT 1`;
      client.query(sql1, function(err, result) {
        if (err) {
          console.log("Query error: " + err);
        } else {
          let sql;
          if (result.rows.length === 0) {
            sql = "INSERT INTO public.ids (jijali_id, fb_id) VALUES ($1, $2)";
          } else {
            sql = "UPDATE public.ids SET jijali_id=$1 WHERE fb_id=$2";
          }
          client.query(sql, [jijali_id, userId]);
        }
      });

      done();
    });
    pool.end();
  }
};
