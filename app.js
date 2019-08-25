"use strict";

const dialogflow = require("dialogflow");
const config = require("./config");
const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const uuid = require("uuid");
const pg = require("pg");
const utf8 = require("utf8");
pg.defaults.ssl = true;

const broadcast = require("./routes/broadcast");
const webviews = require("./routes/webviews");

const userService = require("./services/user-service");
const weatherService = require("./services/weather-service");
const jobApplicationService = require("./services/job-application-service");
const preProgramService = require("./services/pre-program-service");
const jijaliIdService = require("./services/jijali-id");
const basicSurveyService = require("./services/basic_survey");
const surveyService = require("./services/survey-survey");
let dialogflowService = require("./services/dialogflow-service");
const fbService = require("./services/fb-service");

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const CheckCredentials = require("./functions/checkcredentials");

CheckCredentials();

app.set("port", process.env.PORT || 5000);

//verify request came from facebook
app.use(
  bodyParser.json({
    verify: fbService.verifyRequestSignature
  })
);

//serve static files in the public directory
app.use(express.static("public"));

// Process application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Process application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitilized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(profile, cb) {
  cb(null, profile);
});

passport.deserializeUser(function(profile, cb) {
  cb(null, profile);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FB_APP_ID,
      clientSecret: config.FB_APP_SECRET,
      callbackURL: config.SERVER_URL + "auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      process.nextTick(function() {
        return cb(null, profile);
      });
    }
  )
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "public_profile" })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/broadcast/broadcast",
    failureRedirect: "/broadcast"
  })
);

app.set("view engine", "ejs");

const credentials = {
  client_email: config.GOOGLE_CLIENT_EMAIL,
  private_key: config.GOOGLE_PRIVATE_KEY
};

const sessionClient = new dialogflow.SessionsClient({
  projectId: config.GOOGLE_PROJECT_ID,
  credentials
});

const sessionIds = new Map();
const usersMap = new Map();

// Index route
app.get("/", function(req, res) {
  //res.send('Hello world, I am a chat bot')
  res.render("login");
});

// app.get('/no-access', function (req, res) {
//     //res.send('Hello world, I am a chat bot')
//     res.render('no-access');
// })

app.use("/broadcast", broadcast);
app.use("/webviews", webviews);

// for Facebook verification
app.get("/webhook/", function(req, res) {
  console.log("request");
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === config.FB_VERIFY_TOKEN
  ) {
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page.
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
app.post("/webhook/", function(req, res) {
  var data = req.body;
  console.log(JSON.stringify(data));

  // Make sure this is a page subscription
  if (data.object == "page") {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Secondary Receiver is in control - listen on standby channel
      if (pageEntry.standby) {
        // iterate webhook events from standby channel
        pageEntry.standby.forEach(event => {
          const psid = event.sender.id;
          const message = event.message;
          console.log("message from: ", psid);
          console.log("message to inbox: ", message);
        });
      }

      // Bot is in control - listen for messages
      if (pageEntry.messaging) {
        // Iterate over each messaging event
        pageEntry.messaging.forEach(function(messagingEvent) {
          if (messagingEvent.optin) {
            fbService.receivedAuthentication(messagingEvent);
          } else if (messagingEvent.message) {
            receivedMessage(messagingEvent);
          } else if (messagingEvent.delivery) {
            fbService.receivedDeliveryConfirmation(messagingEvent);
          } else if (messagingEvent.postback) {
            receivedPostback(messagingEvent);
          } else if (messagingEvent.read) {
            fbService.receivedMessageRead(messagingEvent);
          } else if (messagingEvent.account_linking) {
            fbService.receivedAccountLink(messagingEvent);
          } else if (messagingEvent.pass_thread_control) {
            // do something with the metadata: messagingEvent.pass_thread_control.metadata
          } else {
            console.log(
              "Webhook received unknown messagingEvent: ",
              messagingEvent
            );
          }
        });
      }
    });

    // Assume all went well.
    // You must send back a 200, within 20 seconds
    res.sendStatus(200);
  }
});

function setSessionAndUser(senderID) {
  if (!sessionIds.has(senderID)) {
    sessionIds.set(senderID, uuid.v1());
  }

  if (!usersMap.has(senderID)) {
    userService.addUser(function(user) {
      usersMap.set(senderID, user);
    }, senderID);
  }
}

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  setSessionAndUser(senderID);

  //console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
  //console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    fbService.handleEcho(messageId, appId, metadata);
    return;
  } else if (quickReply) {
    handleQuickReply(senderID, quickReply, messageId);
    return;
  }

  if (messageText) {
    //send message to DialogFlow
    dialogflowService.sendTextQueryToDialogFlow(
      sessionIds,
      handleDialogFlowResponse,
      senderID,
      messageText
    );
  } else if (messageAttachments) {
    fbService.handleMessageAttachments(messageAttachments, senderID);
  }
}

function handleQuickReply(senderID, quickReply, messageId) {
  var quickReplyPayload = quickReply.payload;
  switch (quickReplyPayload) {
    case "TOOK_NO":
      dialogflowService.sendTextQueryToDialogFlow(
        sessionIds,
        handleDialogFlowResponse,
        senderID,
        "Enter your jijali id number"
      );
      break;
    case "WORK_READINESS":
        dialogflowService.sendTextQueryToDialogFlow(
          sessionIds,
          handleDialogFlowResponse,
          senderID,
          "Take the Survey"
        );
        break;
    
    case "RETAKE":
      dialogflowService.sendTextQueryToDialogFlow(
        sessionIds,
        handleDialogFlowResponse,
        senderID,
        "I want to take the survey"
      );
      break;
    case "TOOK_YES":
      dialogflowService.sendTextQueryToDialogFlow(
        sessionIds,
        handleDialogFlowResponse,
        senderID,
        "I took the survey"
      );
      break;

    case "GET_HELP":
      dialogflowService.sendTextQueryToDialogFlow(
        sessionIds,
        handleDialogFlowResponse,
        senderID,
        "I want to get help"
      );
      break;

    case "LIVE_AGENT":
      fbService.sendPassThread(senderID);
      break;

    default:
      dialogflowService.sendTextQueryToDialogFlow(
        sessionIds,
        handleDialogFlowResponse,
        senderID,
        quickReplyPayload
      );
      break;
  }
}

function handleDialogFlowAction(
  sender,
  action,
  messages,
  contexts,
  parameters
) {
  switch (action) {

    case "action.id":
        if (fbService.isDefined(contexts[1]) && contexts[1].name.includes('jijali-id_dialog_context')){
          let jijali_id = (fbService.isDefined(contexts[1].parameters.fields['jijali_id'])
          && contexts[1].parameters.fields['jijali_id'] != '') ? contexts[1].parameters.fields['jijali_id'].stringValue : '';

          if (jijali_id == ''){
            fbService.sendTextMessage(sender, "Enter your Jijali ID");
          } 
        } else if (fbService.isDefined(contexts[0]) && contexts[0].name.includes('jijali-id')){
          let jijali_id = (fbService.isDefined(contexts[0].parameters.fields['jijali_id'])
            && contexts[0].parameters.fields['jijali_id'] != '') ? contexts[0].parameters.fields['jijali_id'].stringValue : '';
            if (jijali_id != "" &&  jijali_id<= "3000"){
              jijaliIdService(jijali_id)
              let responseText = "You can start the work readiness survey by using the button";

              let replies = [
                {
                  content_type: "text",
                  title: "Work Readiness",
                  payload: "WORK_READINESS"
                }
              ];
              fbService.sendQuickReply(sender, responseText, replies);
              
            }
        }
      break;
    
    case "take.survey":
      fbService.handleMessages(messages, sender);
      fbService.sendTypingOn(sender);

      setTimeout(function() {
        let responseText = "Did you take the Pre program survey before?";

        let replies = [
          {
            content_type: "text",
            title: "Yes",
            payload: "TOOK_YES"
          },
          {
            content_type: "text",
            title: "No",
            payload: "TOOK_NO"
          }
        ];
        fbService.sendQuickReply(sender, responseText, replies);
      }, 2000);

      break;
    case "took-survey":
      if (fbService.isDefined(contexts[1]) && contexts[1].name.includes('took-survey_dialog_context')){
        let finished = (fbService.isDefined(contexts[1].parameters.fields['finished_survey'])
        && contexts[1].parameters.fields['finished_survey'] != '') ? contexts[1].parameters.fields['finished_survey'].stringValue : '';

        if (finished == ''){
          let replies = [
            {
                "content_type": "text",
                "title": "yes",
                "payload": "yes"
            },
            {
                "content_type": "text",
                "title": "no",
                "payload": "no"
            }
          ];
          fbService.sendQuickReply(sender, messages[0].text.text[0], replies);

        }
      } else if (fbService.isDefined(contexts[0]) && contexts[0].name.includes('took')){
        let finished = (fbService.isDefined(contexts[0].parameters.fields['finished_survey'])
              && contexts[0].parameters.fields['finished_survey'] != '') ? contexts[0].parameters.fields['finished_survey'].stringValue : '';
        if (finished == 'yes'){
          fbService.sendTextMessage(sender, "Great! I will get back to you with the next steps later.")
        } else if(finished == 'no'){
          let responseText = " You will need to start over again. Please be attentive and do not leave the chat till you complete the survey. It will take around 5 minutes of your time.";

          let replies = [
            {
              content_type: "text",
              title: "Retake the survey",
              payload: "RETAKE"
            }
          ];
          fbService.sendQuickReply(sender, responseText, replies);
        }
      }

      break;
    case "end.goal":
          
      if (fbService.isDefined(contexts[1]) && contexts[1].name.includes('pre-program-survey_dialog_context')){
          //let endgoal = (fbService.isDefined(contexts[0].parameters.fields['end_goal']) && contexts[0].parameters.fields['end_goal']!='') ? contexts[0].parameters.fields['end_goal'].stringValue : '';


          let endgoal = (fbService.isDefined(contexts[1].parameters.fields['end_goal'])
              && contexts[1].parameters.fields['end_goal'] != '') ? contexts[1].parameters.fields['end_goal'].stringValue : '';

          let profexp = (fbService.isDefined(contexts[1].parameters.fields['prof_exp'])
          && contexts[1].parameters.fields['prof_exp'] != '') ? contexts[1].parameters.fields['prof_exp'].stringValue : '';

          let learningpreference = (fbService.isDefined(contexts[1].parameters.fields['learning_preference'])
          && contexts[1].parameters.fields['learning_preference'] != '') ? contexts[1].parameters.fields['learning_preference'].stringValue : '';

          let learningtime = (fbService.isDefined(contexts[1].parameters.fields['learning_time'])
              && contexts[1].parameters.fields['learning_time'] != '') ? contexts[1].parameters.fields['learning_time'].stringValue : '';

          let studies = (fbService.isDefined(contexts[1].parameters.fields['study_area'])
              && contexts[1].parameters.fields['study_area'] != '') ? contexts[1].parameters.fields['study_area'].stringValue : '';

          let education = (fbService.isDefined(contexts[1].parameters.fields['education_level'])
          && contexts[1].parameters.fields['education_level'] != '') ? contexts[1].parameters.fields['education_level'].stringValue : '';
          
          // let proving = (fbService.isDefined(contexts[1].parameters.fields['prove_myself'])
          //     && contexts[1].parameters.fields['prove_myself'] != '') ? contexts[1].parameters.fields['prove_myself'].stringValue : '';
          
          // let lifestyle = (fbService.isDefined(contexts[1].parameters.fields['lifestyle_improvement'])
          // && contexts[1].parameters.fields['lifestyle_improvement'] != '') ? contexts[1].parameters.fields['lifestyle_improvement'].stringValue : '';
          
          // let similarity = (fbService.isDefined(contexts[1].parameters.fields['like_minded'])
          //     && contexts[1].parameters.fields['like_minded'] != '') ? contexts[1].parameters.fields['like_minded'].stringValue : '';
          
          // let account = (fbService.isDefined(contexts[1].parameters.fields['accountability'])
          //     && contexts[1].parameters.fields['accountability'] != '') ? contexts[1].parameters.fields['accountability'].stringValue : '';
          
          // let skills = (fbService.isDefined(contexts[1].parameters.fields['showcase_skills'])
          //     && contexts[1].parameters.fields['showcase_skills'] != '') ? contexts[1].parameters.fields['showcase_skills'].stringValue : '';
          
          // let support = (fbService.isDefined(contexts[1].parameters.fields['support_others'])
          // && contexts[1].parameters.fields['support_others'] != '') ? contexts[1].parameters.fields['support_others'].stringValue : '';
          
          // let development = (fbService.isDefined(contexts[1].parameters.fields['self_development'])
          //     && contexts[1].parameters.fields['self_development'] != '') ? contexts[1].parameters.fields['self_development'].stringValue : '';
          
          // let progress = (fbService.isDefined(contexts[1].parameters.fields['making_progress'])
          // && contexts[1].parameters.fields['making_progress'] != '') ? contexts[1].parameters.fields['making_progress'].stringValue : '';
          
          
          // let identity = (fbService.isDefined(contexts[1].parameters.fields['id_number'])
          //     && contexts[1].parameters.fields['id_number'] != '') ? contexts[1].parameters.fields['id_number'].stringValue : '';
          
          // let income = (fbService.isDefined(contexts[1].parameters.fields['income_growth'])
          // && contexts[1].parameters.fields['income_growth'] != '') ? contexts[1].parameters.fields['income_growth'].stringValue : '';
      
          

          // let area_improve = (fbService.isDefined(contexts[1].parameters.fields['improvement'])
          // && contexts[1].parameters.fields['improvement'] != '') ? contexts[1].parameters.fields['improvement'].stringValue : '';

          // let area_improve2 = (fbService.isDefined(contexts[1].parameters.fields['improvement2'])
          // && contexts[1].parameters.fields['improvement2'] != '') ? contexts[1].parameters.fields['improvement2'].stringValue : '';

          // let responses = (fbService.isDefined(contexts[1].parameters.fields['imp_responses'])
          // && contexts[1].parameters.fields['imp_responses'] != '') ? contexts[1].parameters.fields['imp_responses'].stringValue : '';

          // let responses2 = (fbService.isDefined(contexts[1].parameters.fields['imp_responses2'])
          // && contexts[1].parameters.fields['imp_responses2'] != '') ? contexts[1].parameters.fields['imp_responses2'].stringValue : '';

          if (endgoal == '') {
              // fbService.handleMessages(messages, sender);
              // let emailContent = "A new app"
              // sendEmail('new job', emailContent)
              let replies = [
                  {
                      "content_type": "text",
                      "title": "Get a job",
                      "payload": "Get a job"
                  },
                  {
                      "content_type": "text",
                      "title": "Change job",
                      "payload": "Change job"
                  },

                  {
                      "content_type": "text",
                      "title": "Get a promotion",
                      "payload": "Get a promotion"
                  },
                  {
                    "content_type": "text",
                    "title": "Choose career",
                    "payload": "Choose career"
                  },
                  {
                    "content_type": "text",
                    "title": "Prepare for career",
                    "payload": "Prepare for career"
                  }
              ];
              fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
          } else if (profexp == '') {

              let replies = [
                  {
                      "content_type": "text",
                      "title": "0-1",
                      "payload": "0-1"
                  },
                  {
                      "content_type": "text",
                      "title": "2-3",
                      "payload": "2-3"
                  },
                  {
                      "content_type": "text",
                      "title": "3-5",
                      "payload": "3-5"
                  },
                  {
                      "content_type": "text",
                      "title": "Over 5",
                      "payload": "Over 5"
                  }
              ];
              fbService.sendQuickReply(sender, messages[0].text.text[0], replies);

          } else if (learningpreference == '') {

            let replies = [
                {
                    "content_type": "text",
                    "title": "Doing practical tasks",
                    "payload": "Doing practical tasks"
                },
                {
                    "content_type": "text",
                    "title": "Reading",
                    "payload": "Reading"
                },
                {
                    "content_type": "text",
                    "title": "Watching Videos",
                    "payload": "Watching Videos"
                },
            ];
            fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
          } else if (learningtime == '') {

            let replies = [
                {
                    "content_type": "text",
                    "title": "0-2",
                    "payload": "0-2"
                },
                {
                    "content_type": "text",
                    "title": "2-4",
                    "payload": "2-4"
                },
                {
                    "content_type": "text",
                    "title": "5-8",
                    "payload": "5-8"
                },
                {
                    "content_type": "text",
                    "title": "9-12",
                    "payload": "9-12"
                },
            ];
            fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
          } else if (studies == '') {
            let replies = [
                {
                    "content_type": "text",
                    "title": "Humanities",
                    "payload": "Humanities"
                },
                {
                    "content_type": "text",
                    "title": "STEM",
                    "payload": "Stem"
                }
            ];
            fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
          
          } else if (education == '') {
            let replies = [
                {
                    "content_type": "text",
                    "title": "High School",
                    "payload": "High School"
                },
                {
                    "content_type": "text",
                    "title": "Primary School",
                    "payload": "Primary School"
                },
                {
                    "content_type": "text",
                    "title": "College",
                    "payload": "College"
                },
                {
                    "content_type": "text",
                    "title": "University",
                    "payload": "University"
                }
            ];
            fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
            
          } 
        
      } else if (fbService.isDefined(contexts[0]) && contexts[0].name.includes('survey')){
          // let endgoal = (fbService.isDefined(contexts[0].parameters.fields['end_goal']) && contexts[0].parameters.fields['end_goal']!='') ? contexts[0].parameters.fields['end_goal'].stringValue : '';

          let endgoal = (fbService.isDefined(contexts[0].parameters.fields['end_goal'])
              && contexts[0].parameters.fields['end_goal'] != '') ? contexts[0].parameters.fields['end_goal'].stringValue : '';

          let profexp = (fbService.isDefined(contexts[0].parameters.fields['prof_exp'])
          && contexts[0].parameters.fields['prof_exp'] != '') ? contexts[0].parameters.fields['prof_exp'].stringValue : '';

          let learningpreference = (fbService.isDefined(contexts[0].parameters.fields['learning_preference'])
          && contexts[0].parameters.fields['learning_preference'] != '') ? contexts[0].parameters.fields['learning_preference'].stringValue : '';

          let learningtime = (fbService.isDefined(contexts[0].parameters.fields['learning_time'])
          && contexts[0].parameters.fields['learning_time'] != '') ? contexts[0].parameters.fields['learning_time'].stringValue : '';
    
          
          let studies = (fbService.isDefined(contexts[0].parameters.fields['study_area'])
              && contexts[0].parameters.fields['study_area'] != '') ? contexts[0].parameters.fields['study_area'].stringValue : '';

          let education = (fbService.isDefined(contexts[0].parameters.fields['education_level'])
              && contexts[0].parameters.fields['education_level'] != '') ? contexts[0].parameters.fields['education_level'].stringValue : '';
          
          // let proving = (fbService.isDefined(contexts[0].parameters.fields['prove_myself'])
          //     && contexts[0].parameters.fields['prove_myself'] != '') ? contexts[0].parameters.fields['prove_myself'].stringValue : '';
          
          // let lifestyle = (fbService.isDefined(contexts[0].parameters.fields['lifestyle_improvement'])
          // && contexts[0].parameters.fields['lifestyle_improvement'] != '') ? contexts[0].parameters.fields['lifestyle_improvement'].stringValue : '';
          
          // let skills = (fbService.isDefined(contexts[0].parameters.fields['showcase_skills'])
          //     && contexts[0].parameters.fields['showcase_skills'] != '') ? contexts[0].parameters.fields['showcase_skills'].stringValue : '';
          
          // let income = (fbService.isDefined(contexts[0].parameters.fields['income_growth'])
          //     && contexts[0].parameters.fields['income_growth'] != '') ? contexts[0].parameters.fields['income_growth'].stringValue : '';
          
          // let progress = (fbService.isDefined(contexts[0].parameters.fields['making_progress'])
          // && contexts[0].parameters.fields['making_progress'] != '') ? contexts[0].parameters.fields['making_progress'].stringValue : '';
          
          // let development = (fbService.isDefined(contexts[0].parameters.fields['self_development'])
          // && contexts[0].parameters.fields['self_development'] != '') ? contexts[0].parameters.fields['self_development'].stringValue : '';
          
          // let account = (fbService.isDefined(contexts[0].parameters.fields['accountability'])
          //     && contexts[0].parameters.fields['accountability'] != '') ? contexts[0].parameters.fields['accountability'].stringValue : '';
          
          // let support = (fbService.isDefined(contexts[0].parameters.fields['support_others'])
          // && contexts[0].parameters.fields['support_others'] != '') ? contexts[0].parameters.fields['support_others'].stringValue : '';
          
          
          
          // let similarity = (fbService.isDefined(contexts[0].parameters.fields['like_minded'])
          // && contexts[0].parameters.fields['like_minded'] != '') ? contexts[0].parameters.fields['like_minded'].stringValue : '';
      
          // let identity = (fbService.isDefined(contexts[0].parameters.fields['id_number'])
          // && contexts[0].parameters.fields['id_number'] != '') ? contexts[0].parameters.fields['id_number'].stringValue : '';

          
          // let area_improve = (fbService.isDefined(contexts[0].parameters.fields['improvement'])
          // && contexts[0].parameters.fields['improvement'] != '') ? contexts[0].parameters.fields['improvement'].stringValue : '';

          // let area_improve2 = (fbService.isDefined(contexts[0].parameters.fields['improvement2'])
          // && contexts[0].parameters.fields['improvement2'] != '') ? contexts[0].parameters.fields['improvement2'].stringValue : '';

          // let responses = (fbService.isDefined(contexts[0].parameters.fields['imp_responses'])
          // && contexts[0].parameters.fields['imp_responses'] != '') ? contexts[0].parameters.fields['imp_responses'].stringValue : '';

          if (endgoal != '' && profexp != '' && learningpreference != '' && learningtime != '' && studies != ''  && education != '') {
              basicSurveyService(endgoal, profexp, learningpreference, learningtime, studies, education);
          }
  
      } 
      
      break;
    
    case "input.unknown":
      fbService.handleMessages(messages, sender);
      
      fbService.sendTypingOn(sender);

      //ask what user wants to do next
      setTimeout(function() {
          let responseText = "I am sorry I cannot understand you. If you want to continue the previous conversation, please press the Start Over button below. If you need to get in touch with Jijali team, please contact your mentor or press the Contact Jijali button below.";

          let replies = [

              {
                  "content_type": "text",
                  "title": "Contact Jijali",
                  "payload": "LIVE_AGENT"
              },
              {
                "content_type": "text",
                "title": "Start Over",
                "payload": "RETAKE"
              }
          ];

          fbService.sendQuickReply(sender, responseText, replies);
      }, 2000);

      break;

    default:
      //unhandled action, just send back the text
      fbService.handleMessages(messages, sender);
  }
}

function handleMessages(messages, sender) {
  let timeoutInterval = 1100;
  let previousType;
  let cardTypes = [];
  let timeout = 0;
  for (var i = 0; i < messages.length; i++) {
    if (
      previousType == "card" &&
      (messages[i].message != "card" || i == messages.length - 1)
    ) {
      timeout = (i - 1) * timeoutInterval;
      setTimeout(handleCardMessages.bind(null, cardTypes, sender), timeout);
      cardTypes = [];
      timeout = i * timeoutInterval;
      setTimeout(handleMessage.bind(null, messages[i], sender), timeout);
    } else if (messages[i].message == "card" && i == messages.length - 1) {
      cardTypes.push(messages[i]);
      timeout = (i - 1) * timeoutInterval;
      setTimeout(handleCardMessages.bind(null, cardTypes, sender), timeout);
      cardTypes = [];
    } else if (messages[i].message == "card") {
      cardTypes.push(messages[i]);
    } else {
      timeout = i * timeoutInterval;
      setTimeout(handleMessage.bind(null, messages[i], sender), timeout);
    }

    previousType = messages[i].message;
  }
}

function handleDialogFlowResponse(sender, response) {
  let responseText = response.fulfillmentMessages.fulfillmentText;

  let messages = response.fulfillmentMessages;
  let action = response.action;
  let contexts = response.outputContexts;
  let parameters = response.parameters;

  fbService.sendTypingOff(sender);

  if (fbService.isDefined(action)) {
    handleDialogFlowAction(sender, action, messages, contexts, parameters);
  } else if (fbService.isDefined(messages)) {
    fbService.handleMessages(messages, sender);
  } else if (responseText == "" && !fbService.isDefined(action)) {
    //dialogflow could not evaluate input.
    fbService.sendTextMessage(
      sender,
      "I'm not sure what you want. Can you be more specific?"
    );
  } else if (fbService.isDefined(responseText)) {
    fbService.sendTextMessage(sender, responseText);
  }
}

async function resolveAfterXSeconds(x) {
  receivedPostback;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, x * 1000);
  });
}

async function greetUserText(userId) {
  let user = usersMap.get(userId);
  if (!user) {
    await resolveAfterXSeconds(2);
    user = usersMap.get(userId);
  }

  if (user) {
    fbService.sendTextMessage(
      userId,
      "Hi " +
        user.first_name +
        "! " +
        "Welcome to Jijali. I will be guiding you through the journey with us." +
        "I hope you will enjoy it."
    );
  } else {
    fbService.sendTextMessage(
      userId,
      "Hi!" +
        "Welcome to Jijali. I will be guide you through the journey with us." +
        "I hope you will enjoy it."
    );
  }
}

function sendFunNewsSubscribe(userId) {
  let responceText =
    "I can send you latest updates to improve your learning, " +
    "How often would you like to receive them?";

  let replies = [
    {
      content_type: "text",
      title: "Once per week",
      payload: "NEWS_PER_WEEK"
    },
    {
      content_type: "text",
      title: "Once per day",
      payload: "NEWS_PER_DAY"
    }
  ];

  fbService.sendQuickReply(userId, responceText, replies);
}

/*
 * Call the Send API. The message data goes in the body. If successful, we'll
 * get the message id in a response
 *
 */
function callSendAPI(messageData) {
  request(
    {
      uri: "https://graph.facebook.com/v3.2/me/messages",
      qs: {
        access_token: config.FB_PAGE_TOKEN
      },
      method: "POST",
      json: messageData
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;

        if (messageId) {
          console.log(
            "Successfully sent message with id %s to recipient %s",
            messageId,
            recipientId
          );
        } else {
          console.log(
            "Successfully called Send API for recipient %s",
            recipientId
          );
        }
      } else {
        console.error(
          "Failed calling Send API",
          response.statusCode,
          response.statusMessage,
          body.error
        );
      }
    }
  );
}

/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 *
 */
function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  setSessionAndUser(senderID);

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  var payload = event.postback.payload;

  switch (payload) {
    case "FUN_NEWS":
      sendFunNewsSubscribe(senderID);
      break;
    case "GET_STARTED":
      greetUserText(senderID);
      setTimeout(function() {
        let buttons = [
          {
            type: "postback",
            title: "Preprogram Survey",
            payload: "PRE_PROGRAM_SURVEY"
          }
        ];

        fbService.sendButtonMessage(
          senderID,
          "Please answer the Pre-program Suvey. This information will help us build a personalized course for you. Please make sure you have around 5 minutes available, and do not leave the chat till you complete the full survey.",
          buttons
        );
      }, 3000);

      break;

    case "PRE_PROGRAM_SURVEY":
      //dialogflowService.sendEventToDialogFlow(sessionIds, handleDialogFlowResponse, senderID, 'PRE_SURVEY');
      dialogflowService.sendTextQueryToDialogFlow(
        sessionIds,
        handleDialogFlowResponse,
        senderID,
        "preprogram survey"
      );
      break;

    case "GET_HELP":
      //dialogflowService.sendEventToDialogFlow(sessionIds, handleDialogFlowResponse, senderID, 'PRE_SURVEY');
      dialogflowService.sendTextQueryToDialogFlow(
        sessionIds,
        handleDialogFlowResponse,
        senderID,
        "I want to get help"
      );
      break;

    default:
      //unindentified payload
      fbService.sendTextMessage(
        senderID,
        "I'm not sure what you want. Can you be more specific?"
      );
      break;
  }

  console.log(
    "Received postback for user %d and page %d with payload '%s' " + "at %d",
    senderID,
    recipientID,
    payload,
    timeOfPostback
  );
}

/*
 * Message Read Event
 *
 * This event is called when a previously-sent message has been read.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 *
 */
function receivedMessageRead(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  // All messages before watermark (a timestamp) or sequence have been seen.
  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;

  console.log(
    "Received message read event for watermark %d and sequence " + "number %d",
    watermark,
    sequenceNumber
  );
}

/*
 * Account Link Event
 *
 * This event is called when the Link Account or UnLink Account action has been
 * tapped.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 *
 */
function receivedAccountLink(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;

  console.log(
    "Received account link event with for user %d with status %s " +
      "and auth code %s ",
    senderID,
    status,
    authCode
  );
}

/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 *
 */
function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log(
        "Received delivery confirmation for message ID: %s",
        messageID
      );
    });
  }

  console.log("All message before %d were delivered.", watermark);
}

/*
 * Authorization Event
 *
 * The value for 'optin.ref' is defined in the entry point. For the "Send to
 * Messenger" plugin, it is the 'data-ref' field. Read more at
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
 *
 */
function receivedAuthentication(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfAuth = event.timestamp;

  // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
  // The developer can set this to an arbitrary value to associate the
  // authentication callback with the 'Send to Messenger' click event. This is
  // a way to do account linking when the user clicks the 'Send to Messenger'
  // plugin.
  var passThroughParam = event.optin.ref;

  console.log(
    "Received authentication for user %d and page %d with pass " +
      "through param '%s' at %d",
    senderID,
    recipientID,
    passThroughParam,
    timeOfAuth
  );

  // When an authentication is received, we'll send a message back to the sender
  // to let them know it was successful.
  sendTextMessage(senderID, "Authentication successful");
}

/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    throw new Error("Couldn't validate the signature.");
  } else {
    var elements = signature.split("=");
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto
      .createHmac("sha1", config.FB_APP_SECRET)
      .update(buf)
      .digest("hex");

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

function sendEmail(subject, content) {
  console.log("sending email");
  var helper = require("sendgrid").mail;

  var from_email = new helper.Email(config.EMAIL_FROM);
  var to_email = new helper.Email(config.EMAIL_TO);
  var subject = subject;
  var content = new helper.Content("text/html", content);
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require("sendgrid")(config.SENGRID_API_KEY);
  var request = sg.emptyRequest({
    method: "POST",
    path: "/v3/mail/send",
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
}

function isDefined(obj) {
  if (typeof obj == "undefined") {
    return false;
  }

  if (!obj) {
    return false;
  }

  return obj != null;
}

// Spin up the server
app.listen(app.get("port"), function() {
  console.log("running on port", app.get("port"));
});
