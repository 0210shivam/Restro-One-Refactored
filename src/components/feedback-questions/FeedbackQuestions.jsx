import { Grid2, Stack, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import FeedbackQuestionsAPI from '../../apis/FeedbackQuestions';
import { useBusiness } from '../../context/BusinessContextProvider';
import EmojiRatings from './EmojiRatings';
import SoftStarRating from './SoftStarRating';
import YesNoSelector from './YesNoSelector';
import InitialLoader from '../InitialLoader';

const FeedbackQuestions = ({ onChangeSetShow, questions, answers, onChangeQuestions, onChangeAnswers }) => {
   const { businessData } = useBusiness();
   const business = businessData.business[0];
   const [isAPILoading, setIsAPILoading] = React.useState(false);

   const [feedbackQuestions, setFeedbackQuestions] = React.useState([]);

   React.useEffect(() => {
      const fetchQuestions = async () => {
         setIsAPILoading(true);
         const res = await FeedbackQuestionsAPI();
         setIsAPILoading(false);

         if (res.status === true) {
            onChangeSetShow(false);
            setFeedbackQuestions(res.data);

            // Map each feedback question to q1, q2, q3, etc.
            const newQuestions = res.data.reduce((acc, qus, index) => {
               const key = `q${index + 1}`; // Dynamically create keys like q1, q2, etc.
               acc[key] = qus.q_title; // Set the value for each key
               return acc;
            }, {});

            onChangeQuestions((prev) => ({ ...prev, ...newQuestions })); // Merge with existing state
         }
      };

      if (business) {
         fetchQuestions();
      }
   }, [business]);

   const handleChange = (questionKey, value) => {
      const answerKey = `a${questionKey.replace('q', '')}`; // Extracts corresponding answer key like a1, a2, etc.
      onChangeAnswers((prev) => ({
         ...prev,
         [answerKey]: value, // Update the answer state based on the input
      }));
   };

   const handleSubmit = () => {
      console.log("Submitted Feedback:");
      console.log("Questions:", questions);
      console.log("Answers:", answers);
   };

   return (
      <>
         {
            !isAPILoading ? <Stack direction="column" spacing={3}>
               {
                  feedbackQuestions && feedbackQuestions.length > 0 && feedbackQuestions
                     .filter((item) => item.status === "1")
                     .map((qus, index) => {
                        const questionTitle = `q${index + 1}`;
                        const answerKey = `a${index + 1}`; // Corresponding answer key (a1, a2, etc.)
                        return (
                           <Stack key={qus.id} width={1} alignItems="flex-start">
                              <Typography variant='subtitle' sx={{ fontWeight: '500' }}>
                                 {qus?.q_title}
                              </Typography>
                              {
                                 qus?.q_type === "0" ?
                                    <SoftStarRating onChange={(value) => handleChange(questionTitle, value)} /> :
                                    qus?.q_type === "1" ?
                                       <EmojiRatings onChange={(value) => handleChange(questionTitle, value)} /> :
                                       qus?.q_type === "2" ?
                                          <TextField
                                             rows={4}
                                             multiline
                                             fullWidth
                                             size='small'
                                             onChange={(e) => handleChange(questionTitle, e.target.value)}
                                          /> :
                                          qus?.q_type === "4" ?
                                             <YesNoSelector onChange={(value) => handleChange(questionTitle, value)} /> :
                                             null
                              }
                           </Stack>
                        );
                     })
               }
               {/* <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3 }}>
                  Submit Feedback
               </Button> */}
            </Stack> : <Stack direction="row" justifyContent="center" alignItems="center">
               <InitialLoader />
            </Stack>
         }
      </>
   );
};

export default FeedbackQuestions;
