else if (area_improve == '') {
    let replies = [
        {
            "content_type": "text",
            "title": "Finding jobs",
            "payload": "Finding jobs"
        },
        {
            "content_type": "text",
            "title": "Applying for jobs",
            "payload": "Applying for jobs"
        },
        {
            "content_type": "text",
            "title": " Improving performance",
            "payload": "Improving performance"
        },
        {
            "content_type": "text",
            "title": " Selecting career",
            "payload": " Selecting career"
        }
    ];
    fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (area_improve2 == '') {
    let replies = [
      {
          "content_type": "text",
          "title": "Finding jobs",
          "payload": "Finding jobs"
      },
      {
          "content_type": "text",
          "title": "Applying for jobs",
          "payload": "Applying for jobs"
      },
      {
          "content_type": "text",
          "title": " Improving performance",
          "payload": "Improving performance"
      },
      {
          "content_type": "text",
          "title": "Selecting career",
          "payload": "Selecting career"
      }
  ];
fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (responses == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "Very little",
              "payload": "Very little"
          },

          {
            "content_type": "text",
            "title": "Quite a bit",
            "payload": "Quite a bit"
          },

          {
              "content_type": "text",
              "title": "Very familiar",
              "payload": "Very familiar"
          },
          
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (responses2 == '') {

      let replies = [
          {
              "content_type": "text",
              "title": "Very little",
              "payload": "Very little"
          },

          {
            "content_type": "text",
            "title": "Quite a bit",
            "payload": "Quite a bit"
          },

          {
              "content_type": "text",
              "title": "Very familiar",
              "payload": "Very familiar"
          },
          
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (similarity == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "1",
              "payload": "1"
          },
          {
              "content_type": "text",
              "title": "2",
              "payload": "2"
          },
          {
              "content_type": "text",
              "title": "3",
              "payload": "3"
          },
          {
              "content_type": "text",
              "title": "4",
              "payload": "4"
          },
          {
              "content_type": "text",
              "title": "5",
              "payload": "5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (proving == '') {
      let replies = [
          {
              "content_type": "text",
              "title": "1",
              "payload": "1"
          },
          {
              "content_type": "text",
              "title": "2",
              "payload": "2"
          },
          {
              "content_type": "text",
              "title": "3",
              "payload": "3"
          },
          {
              "content_type": "text",
              "title": "4",
              "payload": "4"
          },
          {
              "content_type": "text",
              "title": "5",
              "payload": "5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
      
  } else if (account == '') {
      let replies = [
          {
              "content_type":"text",
              "title":"1",
              "payload":"1"
          },
          {
              "content_type":"text",
              "title":"2",
              "payload":"2"
          },
          {
              "content_type":"text",
              "title":"3",
              "payload":"3"
          }, 
          {
              "content_type":"text",
              "title":"4",
              "payload":"4"
          },
          {
              "content_type":"text",
              "title":"5",
              "payload":"5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
      
  } else if (skills == '') {
      let replies = [
          {
              "content_type":"text",
              "title":"1",
              "payload":"1"
          },
          {
              "content_type":"text",
              "title":"2",
              "payload":"2"
          },
          {
              "content_type":"text",
              "title":"3",
              "payload":"3"
          }, 
          {
              "content_type":"text",
              "title":"4",
              "payload":"4"
          },
          {
              "content_type":"text",
              "title":"5",
              "payload":"5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (development == '') {
      let replies = [
          {
              "content_type":"text",
              "title":"1",
              "payload":"1"
          },
          {
              "content_type":"text",
              "title":"2",
              "payload":"2"
          },
          {
              "content_type":"text",
              "title":"3",
              "payload":"3"
          }, 
          {
              "content_type":"text",
              "title":"4",
              "payload":"4"
          },
          {
              "content_type":"text",
              "title":"5",
              "payload":"5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (lifestyle == '') {
      let replies = [
          {
              "content_type":"text",
              "title":"1",
              "payload":"1"
          },
          {
              "content_type":"text",
              "title":"2",
              "payload":"2"
          },
          {
              "content_type":"text",
              "title":"3",
              "payload":"3"
          }, 
          {
              "content_type":"text",
              "title":"4",
              "payload":"4"
          },
          {
              "content_type":"text",
              "title":"5",
              "payload":"5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (income == '') {
      let replies = [
          {
              "content_type":"text",
              "title":"1",
              "payload":"1"
          },
          {
              "content_type":"text",
              "title":"2",
              "payload":"2"
          },
          {
              "content_type":"text",
              "title":"3",
              "payload":"3"
          }, 
          {
              "content_type":"text",
              "title":"4",
              "payload":"4"
          },
          {
              "content_type":"text",
              "title":"5",
              "payload":"5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (support == '') {
      let replies = [
          {
              "content_type":"text",
              "title":"1",
              "payload":"1"
          },
          {
              "content_type":"text",
              "title":"2",
              "payload":"2"
          },
          {
              "content_type":"text",
              "title":"3",
              "payload":"3"
          }, 
          {
              "content_type":"text",
              "title":"4",
              "payload":"4"
          },
          {
              "content_type":"text",
              "title":"5",
              "payload":"5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  } else if (progress == '') {
      let replies = [
          {
              "content_type":"text",
              "title":"1",
              "payload":"1"
          },
          {
              "content_type":"text",
              "title":"2",
              "payload":"2"
          },
          {
              "content_type":"text",
              "title":"3",
              "payload":"3"
          }, 
          {
              "content_type":"text",
              "title":"4",
              "payload":"4"
          },
          {
              "content_type":"text",
              "title":"5",
              "payload":"5"
          }
      ];
      fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
  }
  else if (identity == '') {
      fbService.sendTextMessage(sender, "Enter your Jijali ID");
  } 



  && area_improve != '' && responses != ''   && identity != ''  && similarity != '' && proving != '' && account != '' && skills != '' && development != '' && lifestyle != '' && income != '' && support != '' && progress != ''


  let conv_similarity = Number(similarity);
              let conv_proving = Number(proving);
              let conv_account = Number(account);
              let conv_skills = Number(skills);
              let conv_development = Number(development);
              let conv_lifestyle = Number(lifestyle);
              let conv_income = Number(income);
              let conv_support = Number(support);
              let conv_progress = Number(progress)