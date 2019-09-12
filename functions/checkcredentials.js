const config = require("../config");
module.exports = function CheckCredentials() {
  // Messenger API parameters
  if (!config.FB_PAGE_TOKEN) {
    throw new Error("missing FB_PAGE_TOKEN");
  }
  if (!config.FB_VERIFY_TOKEN) {
    throw new Error("missing FB_VERIFY_TOKEN");
  }
  if (!config.GOOGLE_PROJECT_ID) {
    throw new Error("missing GOOGLE_PROJECT_ID");
  }
  if (!config.DF_LANGUAGE_CODE) {
    throw new Error("missing DF_LANGUAGE_CODE");
  }
  if (!config.GOOGLE_CLIENT_EMAIL) {
    throw new Error("missing GOOGLE_CLIENT_EMAIL");
  }
  if (!config.GOOGLE_PRIVATE_KEY) {
    throw new Error("missing GOOGLE_PRIVATE_KEY");
  }
  if (!config.FB_APP_SECRET) {
    throw new Error("missing FB_APP_SECRET");
  }
  if (!config.SERVER_URL) {
    //used for ink to static files
    throw new Error("missing SERVER_URL");
  }
  if (!config.SENGRID_API_KEY) {
    //sending email
    throw new Error("missing SENGRID_API_KEY");
  }
  if (!config.EMAIL_FROM) {
    //sending email
    throw new Error("missing EMAIL_FROM");
  }
  if (!config.EMAIL_TO) {
    //sending email
    throw new Error("missing EMAIL_TO");
  }
  // if (!config.WEATHER_API_KEY) { //weather api key
  //     throw new Error('missing WEATHER_API_KEY');
  // }
  if (!config.PG_CONFIG) {
    //pg config
    throw new Error("missing PG_CONFIG");
  }
  if (!config.FB_APP_ID) {
    //app id
    throw new Error("missing FB_APP_ID");
  }
  if (!config.ADMIN_ID) {
    //admin id for login
    throw new Error("missing ADMIN_ID");
  }
  // if (!config.FB_PAGE_INBOX_ID) { //page inbox id - the receiver app
  //     throw new Error('missing FB_PAGE_INBOX_ID');
  // }
};
