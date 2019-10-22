classes.readCode(function(classCode){
    let code = classCode[0]
}, class_name)

result_two.forEach(function (item) {
    console.log(item);
    });





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