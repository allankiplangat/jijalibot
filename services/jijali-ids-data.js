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
  }
};
