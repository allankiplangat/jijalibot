classes.readCode(function(classCode){
    let code = classCode[0]
}, class_name)

result_two.forEach(function (item) {
console.log(item);
});

classes.readUser(function(userDetails){
    let jijali_id = userDetails[0]
    let learning_endgoal = userDetails[1]
    let prof_exp = userDetails[2]
    let learning_preference = userDetails[3]
    let learning_time = userDetails[4]
    let studies = userDetails[5]
    let education = userDetails[6]
    let business = userDetails[7]
    let areaof_improvement = userDetails[8]
    let areaof_improvement2 = userDetails[9]
    let areaof_improvement3 = userDetails[10]
    let area_response = userDetails[11]
    let area_response2 = userDetails[12]
    let area_response3 = userDetails[13]
    let like_minded = userDetails[14]
    let proof_myself = userDetails[15]
    let accountability = userDetails[16]
    let showcase_skills = userDetails[17]
    let self_development = userDetails[18]
    let lifestyle_improvement = userDetails[19]
    let income_growth = userDetails[20]
    let support_others = userDetails[21]
    let making_progress = userDetails[22]
    let taking_email = userDetails[23]
    if(learning_endgoal=== null || prof_exp=== null || learning_preference=== null || learning_time=== null || studies === null || education === null ||  areaof_improvement === null || areaof_improvement2 === null || areaof_improvement3 === null || area_response === null || area_response2 === null || area_response3 === null || like_minded === null || proof_myself === null || accountability === null || showcase_skills === null || self_development === null || lifestyle_improvement === null || income_growth === null || support_others === null || making_progress === null){
        greetUserText(senderID);
        setTimeout(function() {
            let buttons = [
              {
                type: "postback",
                title: "After Class Survey",
                payload: "AFTER_EVERY_CLASS"
              }
            ];
    
            fbService.sendButtonMessage(
              senderID,
              "",
              buttons
            );
          }, 3000);


    } else {
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

    }
}, sender)





if (fbService.isDefined(contexts[1]) && contexts[1].name.includes('after_class_survey_dialog_context')){

    let class_code = (fbService.isDefined(contexts[1].parameters.fields['class_code'])
        && contexts[1].parameters.fields['class_code'] != '') ? contexts[1].parameters.fields['class_code'].stringValue : '';

    let class_status = (fbService.isDefined(contexts[1].parameters.fields['class_status'])
    && contexts[1].parameters.fields['class_status'] != '') ? contexts[1].parameters.fields['class_status'].stringValue : '';

    let time_on_class = (fbService.isDefined(contexts[1].parameters.fields['time_on_class'])
    && contexts[1].parameters.fields['time_on_class'] != '') ? contexts[1].parameters.fields['time_on_class'].stringValue : '';

    let class_impact = (fbService.isDefined(contexts[1].parameters.fields['class_impact'])
        && contexts[1].parameters.fields['class_impact'] != '') ? contexts[1].parameters.fields['class_impact'].stringValue : '';

    let video_time = (fbService.isDefined(contexts[1].parameters.fields['video_time'])
        && contexts[1].parameters.fields['video_time'] != '') ? contexts[1].parameters.fields['video_time'].stringValue : '';

    let enjoyed_video = (fbService.isDefined(contexts[1].parameters.fields['enjoyed_video'])
    && contexts[1].parameters.fields['enjoyed_video'] != '') ? contexts[1].parameters.fields['enjoyed_video'].stringValue : '';

    let reading_time = (fbService.isDefined(contexts[1].parameters.fields['reading_time'])
    && contexts[1].parameters.fields['reading_time'] != '') ? contexts[1].parameters.fields['reading_time'].stringValue : '';

    let enjoyed_reading = (fbService.isDefined(contexts[1].parameters.fields['enjoyed_reading'])
    && contexts[1].parameters.fields['enjoyed_reading'] != '') ? contexts[1].parameters.fields['enjoyed_reading'].stringValue : '';

    let practical_time = (fbService.isDefined(contexts[1].parameters.fields['practical_time'])
    && contexts[1].parameters.fields['practical_time'] != '') ? contexts[1].parameters.fields['practical_time'].stringValue : '';

    let enjoyed_practical = (fbService.isDefined(contexts[1].parameters.fields['enjoyed_practical'])
    && contexts[1].parameters.fields['enjoyed_practical'] != '') ? contexts[1].parameters.fields['enjoyed_practical'].stringValue : '';
    
    if (class_code == '') {
      
        classes.readCode(function(classCode){
            let code = classCode[0]
        }, class_name)

        fbService.sendTextMessage(sender, "Enter your Class Code to take the survey for.");  
    } else if (class_status == '') {

        let replies = [
            {
                "content_type": "text",
                "title": "Great",
                "payload": "Great"
            },
            {
                "content_type": "text",
                "title": "Good",
                "payload": "Good"
            },
            {
                "content_type": "text",
                "title": "Could be better",
                "payload": "Could be better"
            }
        ];
        fbService.sendQuickReply(sender, messages[0].text.text[0], replies);

    } else if (time_on_class == '') {

      let replies = [
          {
              "content_type": "text",
              "title": "less than 1",
              "payload": "less than 1"
          },
          {
              "content_type": "text",
              "title": "2-3",
              "payload": "2-3"
          },
          {
              "content_type": "text",
              "title": "4-8",
              "payload": "4-8"
          },
          {
            "content_type": "text",
            "title": "over 8",
            "payload": "over 8"
        },
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
    } else if (class_impact == '') {

      let replies = [
          {
              "content_type": "text",
              "title": "Very",
              "payload": "Very"
          },
          {
              "content_type": "text",
              "title": "Quite a bit",
              "payload": "Quite a bit"
          },
          {
              "content_type": "text",
              "title": "It was ok",
              "payload": "It was ok"
          },
          {
              "content_type": "text",
              "title": "Not so much",
              "payload": "Not so much"
          },
          {
            "content_type": "text",
            "title": "Not at all",
            "payload": "Not at all"
          },
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
    } else if (video_time == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "below 5",
              "payload": "below 5"
          },
          {
              "content_type": "text",
              "title": "5-20",
              "payload": "5-20"
          },
          {
            "content_type": "text",
            "title": "21-60",
            "payload": "21-60"
          },
          {
            "content_type": "text",
            "title": "Over 60",
            "payload": "Over 60"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
    
    } else if (enjoyed_video == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "It was awesome!",
              "payload": "It was awesome!"
          },
          {
              "content_type": "text",
              "title": "It was ok",
              "payload": "It was ok"
          },
          {
              "content_type": "text",
              "title": "Could be better",
              "payload": "Could be better"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
      
    } else if (reading_time == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "below 5",
              "payload": "below 5"
          },
          {
              "content_type": "text",
              "title": "5-20",
              "payload": "5-20"
          },
          {
              "content_type": "text",
              "title": "21-60",
              "payload": "21-60"
          },
          {
            "content_type": "text",
            "title": "over 60",
            "payload": "over 60"
        }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
      
    } else if (enjoyed_reading == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "Awesome",
              "payload": "Awesome"
          },
          {
              "content_type": "text",
              "title": "It was ok",
              "payload": "It was ok"
          },
          {
              "content_type": "text",
              "title": "Could be better",
              "payload": "Could be better"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
      
    } else if (practical_time == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "less than 1",
              "payload": "less than 1"
          },
          {
              "content_type": "text",
              "title": "2-3",
              "payload": "2-3"
          },
          {
              "content_type": "text",
              "title": "4-5",
              "payload": "4-5"
          },
          {
            "content_type": "text",
            "title": "6-10",
            "payload": "6-10"
          },
          {
            "content_type": "text",
            "title": "over 10",
            "payload": "over 10"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
      
    } else if (enjoyed_practical == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "Yes, for sure",
              "payload": "Yes, for sure"
          },
          {
              "content_type": "text",
              "title": "It was ok",
              "payload": "It was ok"
          },
          {
              "content_type": "text",
              "title": "Not that much",
              "payload": "Not that much"
          },
          {
            "content_type": "text",
            "title": "Not really",
            "payload": "Not really"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
      
    }