
const preProgramService = require("../services/pre-program-service");
const fbService = require("../services/fb-service");
module.exports = function endGoal (){
    if (fbService.isDefined(contexts[1]) && contexts[1].name.includes('pre-program-survey_dialog_context')){
        //let endgoal = (fbService.isDefined(contexts[0].parameters.fields['end_goal']) && contexts[0].parameters.fields['end_goal']!='') ? contexts[0].parameters.fields['end_goal'].stringValue : '';


        let endgoal = (fbService.isDefined(contexts[1].parameters.fields['end_goal'])
            && contexts[1].parameters.fields['end_goal'] != '') ? contexts[1].parameters.fields['end_goal'].stringValue : '';
        
        let studies = (fbService.isDefined(contexts[1].parameters.fields['study_area'])
            && contexts[1].parameters.fields['study_area'] != '') ? contexts[1].parameters.fields['study_area'].stringValue : '';
        
        let proving = (fbService.isDefined(contexts[1].parameters.fields['prove_myself'])
            && contexts[1].parameters.fields['prove_myself'] != '') ? contexts[1].parameters.fields['prove_myself'].stringValue : '';
        
        let lifestyle = (fbService.isDefined(contexts[1].parameters.fields['lifestyle_improvement'])
        && contexts[1].parameters.fields['lifestyle_improvement'] != '') ? contexts[1].parameters.fields['lifestyle_improvement'].stringValue : '';
        
        let education = (fbService.isDefined(contexts[1].parameters.fields['education_level'])
            && contexts[1].parameters.fields['education_level'] != '') ? contexts[1].parameters.fields['education_level'].stringValue : '';
        
        let similarity = (fbService.isDefined(contexts[1].parameters.fields['like_minded'])
            && contexts[1].parameters.fields['like_minded'] != '') ? contexts[1].parameters.fields['like_minded'].stringValue : '';
        
        let account = (fbService.isDefined(contexts[1].parameters.fields['accountability'])
            && contexts[1].parameters.fields['accountability'] != '') ? contexts[1].parameters.fields['accountability'].stringValue : '';
        
        let skills = (fbService.isDefined(contexts[1].parameters.fields['showcase_skills'])
            && contexts[1].parameters.fields['showcase_skills'] != '') ? contexts[1].parameters.fields['showcase_skills'].stringValue : '';
        
        let support = (fbService.isDefined(contexts[1].parameters.fields['support_others'])
        && contexts[1].parameters.fields['support_others'] != '') ? contexts[1].parameters.fields['support_others'].stringValue : '';
        
        let development = (fbService.isDefined(contexts[1].parameters.fields['self_development'])
            && contexts[1].parameters.fields['self_development'] != '') ? contexts[1].parameters.fields['self_development'].stringValue : '';
        
        let progress = (fbService.isDefined(contexts[1].parameters.fields['making_progress'])
        && contexts[1].parameters.fields['making_progress'] != '') ? contexts[1].parameters.fields['making_progress'].stringValue : '';
        
        
        let identity = (fbService.isDefined(contexts[1].parameters.fields['id_number'])
            && contexts[1].parameters.fields['id_number'] != '') ? contexts[1].parameters.fields['id_number'].stringValue : '';
        
        let income = (fbService.isDefined(contexts[1].parameters.fields['income_growth'])
        && contexts[1].parameters.fields['income_growth'] != '') ? contexts[1].parameters.fields['income_growth'].stringValue : '';
    
        let profexp = (fbService.isDefined(contexts[1].parameters.fields['prof_exp'])
        && contexts[1].parameters.fields['prof_exp'] != '') ? contexts[1].parameters.fields['prof_exp'].stringValue : '';

        let area_improve = (fbService.isDefined(contexts[1].parameters.fields['improvement'])
        && contexts[1].parameters.fields['improvement'] != '') ? contexts[1].parameters.fields['improvement'].stringValue : '';

        let responses = (fbService.isDefined(contexts[1].parameters.fields['imp_responses'])
        && contexts[1].parameters.fields['imp_responses'] != '') ? contexts[1].parameters.fields['imp_responses'].stringValue : '';

        let learningpreference = (fbService.isDefined(contexts[1].parameters.fields['learning_preference'])
        && contexts[1].parameters.fields['learning_preference'] != '') ? contexts[1].parameters.fields['learning_preference'].stringValue : '';

        let learningtime = (fbService.isDefined(contexts[1].parameters.fields['learning_time'])
            && contexts[1].parameters.fields['learning_time'] != '') ? contexts[1].parameters.fields['learning_time'].stringValue : '';
        
        if (endgoal == '') {
            // fbService.handleMessages(messages, sender);
            // let emailContent = "A new app"
            // sendEmail('new job', emailContent)
            let replies = [
                {
                    "content_type": "text",
                    "title": "Get a job",
                    "payload": "Get Job"
                },
                {
                    "content_type": "text",
                    "title": "Change my job",
                    "payload": "CHANGE_JOB"
                },
                {
                    "content_type": "text",
                    "title": "Salary Increase",
                    "payload": "SALARY_RAISE"
                },
                {
                    "content_type": "text",
                    "title": "Get Promotion",
                    "payload": "GET_PROMOTION"
                }
            ];
            fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
        } else if (profexp == '') {

            let replies = [
                {
                    "content_type": "text",
                    "title": "Less than One",
                    "payload": "Less than one"
                },
                {
                    "content_type": "text",
                    "title": "One to Two",
                    "payload": "One to two"
                },
                {
                    "content_type": "text",
                    "title": "Three to Five",
                    "payload": "Three to five"
                },
                {
                    "content_type": "text",
                    "title": "More than Five",
                    "payload": "More than five"
                }
            ];
            fbService.sendQuickReply(sender, messages[0].text.text[0], replies);

        } else if (area_improve == '') {

            let replies = [
                {
                    "content_type": "text",
                    "title": "Applying for jobs",
                    "payload": "Applying for jobs"
                },
                {
                    "content_type": "text",
                    "title": "CV Preparation",
                    "payload": "CV Preparation"
                },
                {
                    "content_type": "text",
                    "title": "Finding job opportunities",
                    "payload": "Finding job opportunities"
                },
                {
                    "content_type": "text",
                    "title": "Great job performance",
                    "payload": "Great job performance"
                },
                {
                    "content_type": "text",
                    "title": "Pass Interview",
                    "payload": "Pass Interview"
                }
            ];
            fbService.sendQuickReply(sender, messages[0].text.text[0], replies);
        } else if (responses == '') {

            let replies = [
                {
                    "content_type": "text",
                    "title": "Not at all",
                    "payload": "Not at all"
                },
                {
                    "content_type": "text",
                    "title": "Quite a bit",
                    "payload": "Quite a bit"
                },
                {
                    "content_type": "text",
                    "title": "Very Familiar",
                    "payload": "Very Familiar"
                },
                {
                    "content_type": "text",
                    "title": "Very Little",
                    "payload": "Very Little"
                },
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
                    "title": "Eight to twelve hours",
                    "payload": "Eight to twelve hours"
                },
                {
                    "content_type": "text",
                    "title": "Four to eight hours",
                    "payload": "Four to eight hours"
                },
                {
                    "content_type": "text",
                    "title": "One to two hours",
                    "payload": "One to two hours"
                },
                {
                    "content_type": "text",
                    "title": "Two to four hours",
                    "payload": "Two to four hours"
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
            fbService.sendTextMessage(sender, "Enter your Jijali ID Number");
        } 

    } else if (fbService.isDefined(contexts[0]) && contexts[0].name.includes('survey')){
        // let endgoal = (fbService.isDefined(contexts[0].parameters.fields['end_goal']) && contexts[0].parameters.fields['end_goal']!='') ? contexts[0].parameters.fields['end_goal'].stringValue : '';

        let endgoal = (fbService.isDefined(contexts[0].parameters.fields['end_goal'])
            && contexts[0].parameters.fields['end_goal'] != '') ? contexts[0].parameters.fields['end_goal'].stringValue : '';
        
        let studies = (fbService.isDefined(contexts[0].parameters.fields['study_area'])
            && contexts[0].parameters.fields['study_area'] != '') ? contexts[0].parameters.fields['study_area'].stringValue : '';
        
        let proving = (fbService.isDefined(contexts[0].parameters.fields['prove_myself'])
            && contexts[0].parameters.fields['prove_myself'] != '') ? contexts[0].parameters.fields['prove_myself'].stringValue : '';
        
        let lifestyle = (fbService.isDefined(contexts[0].parameters.fields['lifestyle_improvement'])
        && contexts[0].parameters.fields['lifestyle_improvement'] != '') ? contexts[0].parameters.fields['lifestyle_improvement'].stringValue : '';
        
        let skills = (fbService.isDefined(contexts[0].parameters.fields['showcase_skills'])
            && contexts[0].parameters.fields['showcase_skills'] != '') ? contexts[0].parameters.fields['showcase_skills'].stringValue : '';
        
        let income = (fbService.isDefined(contexts[0].parameters.fields['income_growth'])
            && contexts[0].parameters.fields['income_growth'] != '') ? contexts[0].parameters.fields['income_growth'].stringValue : '';
        
        let progress = (fbService.isDefined(contexts[0].parameters.fields['making_progress'])
        && contexts[0].parameters.fields['making_progress'] != '') ? contexts[0].parameters.fields['making_progress'].stringValue : '';
        
        let development = (fbService.isDefined(contexts[0].parameters.fields['self_development'])
        && contexts[0].parameters.fields['self_development'] != '') ? contexts[0].parameters.fields['self_development'].stringValue : '';
        
        let account = (fbService.isDefined(contexts[0].parameters.fields['accountability'])
            && contexts[0].parameters.fields['accountability'] != '') ? contexts[0].parameters.fields['accountability'].stringValue : '';
        
        let support = (fbService.isDefined(contexts[0].parameters.fields['support_others'])
        && contexts[0].parameters.fields['support_others'] != '') ? contexts[0].parameters.fields['support_others'].stringValue : '';
        
        let education = (fbService.isDefined(contexts[0].parameters.fields['education_level'])
            && contexts[0].parameters.fields['education_level'] != '') ? contexts[0].parameters.fields['education_level'].stringValue : '';
        
        let similarity = (fbService.isDefined(contexts[0].parameters.fields['like_minded'])
        && contexts[0].parameters.fields['like_minded'] != '') ? contexts[0].parameters.fields['like_minded'].stringValue : '';
    
        let identity = (fbService.isDefined(contexts[0].parameters.fields['id_number'])
        && contexts[0].parameters.fields['id_number'] != '') ? contexts[0].parameters.fields['id_number'].stringValue : '';

        let profexp = (fbService.isDefined(contexts[0].parameters.fields['prof_exp'])
        && contexts[0].parameters.fields['prof_exp'] != '') ? contexts[0].parameters.fields['prof_exp'].stringValue : '';

        let area_improve = (fbService.isDefined(contexts[0].parameters.fields['improvement'])
        && contexts[0].parameters.fields['improvement'] != '') ? contexts[0].parameters.fields['improvement'].stringValue : '';

        let responses = (fbService.isDefined(contexts[0].parameters.fields['imp_responses'])
        && contexts[0].parameters.fields['imp_responses'] != '') ? contexts[0].parameters.fields['imp_responses'].stringValue : '';

        let learningpreference = (fbService.isDefined(contexts[0].parameters.fields['learning_preference'])
        && contexts[0].parameters.fields['learning_preference'] != '') ? contexts[0].parameters.fields['learning_preference'].stringValue : '';

        let learningtime = (fbService.isDefined(contexts[0].parameters.fields['learning_time'])
        && contexts[0].parameters.fields['learning_time'] != '') ? contexts[0].parameters.fields['learning_time'].stringValue : '';
        
        if (endgoal != '' && profexp != '' && area_improve != '' && responses != '' && learningpreference != '' && learningtime != '' && identity != '' && studies != '' && education != '' && similarity != '' && proving != '' && account != '' && skills != '' && development != '' && lifestyle != '' && income != '' && support != '' && progress != '') {
            
            let conv_similarity = Number(similarity);
            let conv_proving = Number(proving);
            let conv_account = Number(account);
            let conv_skills = Number(skills);
            let conv_development = Number(development);
            let conv_lifestyle = Number(lifestyle);
            let conv_income = Number(income);
            let conv_support = Number(support);
            let conv_progress = Number(progress)


            preProgramService(endgoal, profexp, area_improve, responses, learningpreference, learningtime, identity, studies, education, conv_similarity, conv_proving, conv_account, conv_skills, conv_development, conv_lifestyle, conv_income, conv_support, conv_progress);
            fbService.handleMessages(messages, sender);

        }

    } 
    
    break;
}