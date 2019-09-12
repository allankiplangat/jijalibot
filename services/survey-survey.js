"use strict";
const request = require("request");
const config = require("../config");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  addUser: function(
    callback,
    userId,
    endgoal,
    profexp,
    area_improve,
    responses,
    learningpreference,
    learningtime
  ) {
    request(
      {
        uri: "https://graph.facebook.com/v3.2/" + userId,
        qs: {
          access_token: config.FB_PAGE_TOKEN
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var user = JSON.parse(body);
          if (user.first_name.length > 0) {
            var pool = new pg.Pool(config.PG_CONFIG);
            pool.connect(function(err, client, done) {
              if (err) {
                return console.error("Error acquiring client", err.stack);
              }
              var rows = [];
              client.query(
                `SELECT id_number FROM survey WHERE id_number='${userId}' LIMIT 1`,
                function(err, result) {
                  if (err) {
                    console.log("Query error: " + err);
                  } else {
                    if (result.rows.length === 0) {
                      client.query(
                        "INSERT into survey " +
                          "(endgoal, profexp, area_improve, responses, learningpreference, learningtime, id_number)" +
                          "VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
                        [
                          endgoal,
                          profexp,
                          area_improve,
                          responses,
                          learningpreference,
                          learningtime,
                          id_number
                        ]
                      );
                    }
                  }
                }
              );

              callback(user);
            });
            pool.end();
          } else {
            console.log("Cannot get data for fb user with id", userId);
          }
        } else {
          console.error(response.error);
        }
      }
    );
  }
};
