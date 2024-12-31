import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Rating, Stack, styled, TextField, Typography } from '@mui/material';
import FeedBackAPI from '../apis/FeedbackAPI';
import { useBusiness } from '../context/BusinessContextProvider';
import InitialLoader from './InitialLoader';
import FeedbackQuestions from './feedback-questions/FeedbackQuestions';
import GoogleLogo from '../assets/glogo.webp';
import magicQrImg from // Change the border color of the empty star
   '../../public/magicqrpng.png';

const CustomRating = styled(Rating)({
   '& .MuiRating-iconEmpty': {
      color: 'gray', // Change the border color of the empty star
   },
});

const InitialFeedbackForm = (props) => {
   const { dialogData, handleChangeDialogData } = useBusiness();

   const [pageName, setPageName] = useState('');
   const [ratings, setRatings] = useState(0);
   const [reviewURL, setReviewURL] = useState(props.reviewURL);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [showDes, setShowDes] = useState(true);
   const [phone, setPhone] = useState('');
   const [description, setDescription] = useState('');
   const [display, setDisplay] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [questions, setQuestions] = React.useState({
      q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: ''
   });
   const [answers, setAnswers] = React.useState({
      a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '', a8: '', a9: '', a10: ''
   });

   useEffect(() => {
      const path = window.location?.pathname;
      setPageName(path);
   }, []);

   useEffect(() => {
      if (pageName === "/feedback" && ratings >= 4) {
         setDisplay(true);
      }
   }, [ratings, pageName]);

   useEffect(() => {
      const fetchPages = () => {
         const links = props.pages;
         const r_link =
            links.find((i) => i.link?.includes("g.page")) ? links?.find((i) => i.link?.includes("g.page"))?.link :
               links.find((i) => i.link?.includes("placeid")) ? links?.find((i) => i.link?.includes("placeid"))?.link : "";

         setReviewURL(r_link);
      };

      if (props.pages) {
         fetchPages();
      }
   }, [props.pages]);

   useEffect(() => {
      function redirectToNewTab() {
         window.open(reviewURL, '_blank');
      }

      if (ratings >= 4 && reviewURL !== "" && reviewURL !== null && reviewURL !== undefined) {
         handleSubmit();
         redirectToNewTab();
      }
   }, [ratings, reviewURL]);

   const handleSubmit = async () => {
      try {
         // if (name === "") return alert('Please fill name');
         // if (email === "" && phone === "") return alert('Please fill email or phone');
         setIsLoading(true);
         const data = await FeedBackAPI({ name, email, phone, description, ratings, questions, answers });
         setIsLoading(false);

         if (data.status === true) {
            setRatings(0);
            setName('');
            setEmail('');
            setPhone('');
            setDescription('');
            handleChangeDialogData({ ...dialogData, open: true, msg: "Thank you for your feedback!" });
         }
         // if (name && (email || phone)) {

         // }

      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
               <Typography className='text-center' variant="h5" sx={{ color: 'black', fontFamily: 'Poppins' }}>
                  {pageName === "/" ? 'Review us on' : 'Review us on'}
               </Typography>
               <Stack direction="row" alignItems="center" justifyContent="center" width={1} mt={1}>
                  <img src={GoogleLogo} height={60} />
               </Stack>
               <Typography className='text-center' variant="body2" sx={{ mb: 2, color: 'black', fontFamily: 'Poppins' }}>
                  {pageName === "/" ? 'We Value Your Feedback' : 'We Value Your Feedback'}
               </Typography>
               {/* <Typography className='text-center' variant="subtitle2" sx={{ mb: 2, color: props.theme ? props.theme.primary_text_color : 'black', fontFamily: 'Poppins' }}>
                  {
                     pageName === "/" ? "We value your feedbacks and suggestions." : "How may I help you?"
                  }
               </Typography> */}
               {
                  pageName === "/" ?
                     <Stack direction="row" spacing={2} mb={2} justifyContent="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                           <Typography sx={{ fontFamily: 'Poppins' }} variant='body1'>Ratings
                              {/* <Typography component="span" sx={{ color: 'red' }}>*</Typography> */}
                           </Typography>
                           <CustomRating size='large' name="read-only" value={ratings}
                              onChange={(event, newValue) => {
                                 setRatings(newValue);
                              }} />
                        </Stack>
                     </Stack>
                     : null
               }

               <Stack direction="row" justifyContent="center" alignItems="center">
                  {
                     pageName === "/" &&
                        (0 < +ratings && +ratings <= 3) || (+ratings >= 4 && (reviewURL === undefined || reviewURL === null || reviewURL === "")) ?
                        <Card sx={{
                           width: {
                              xs: 340,
                              lg: 400,
                           },
                           p: 3, borderRadius: 4, boxShadow: '0px 0px 5px rgb(193, 192, 192)'
                        }}>
                           <Stack spacing={2}>
                              <TextField
                                 required={pageName === "/contact"}
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 sx={{ borderRadius: '6px', '& .MuiFormLabel-asterisk': { color: 'red' }, '& .MuiOutlinedInput-root': { borderRadius: '6px' }, '& .MuiInputLabel-root': { color: 'grey', fontFamily: 'Poppins', zIndex: 0 } }}
                                 id="outlined-basic" label="Name" variant="outlined" size='small' />
                              <TextField
                                 required={pageName === "/contact"}
                                 value={phone}
                                 onChange={(e) => setPhone(e.target.value)}
                                 sx={{
                                    borderRadius: '6px', '& .MuiFormLabel-asterisk': { color: 'red' }, '& .MuiOutlinedInput-root': { borderRadius: '6px' }, '& .MuiInputLabel-root': { color: 'grey', fontFamily: 'Poppins', zIndex: 0 }
                                 }}
                                 id="outlined-basic" label="Phone" variant="outlined" size='small' />
                              <TextField
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 sx={{
                                    borderRadius: '6px', '& .MuiOutlinedInput-root': { borderRadius: '6px' }, '& .MuiInputLabel-root': { color: 'grey', fontFamily: 'Poppins', zIndex: 0 }
                                 }}
                                 id="outlined-basic" label="Email" variant="outlined" size='small' />
                              {
                                 showDes ?
                                    <TextField
                                       fullWidth
                                       required={pageName === "/contact"}
                                       value={description}
                                       onChange={(e) => setDescription(e.target.value)}
                                       sx={{ mt: 2, borderRadius: '6px', '& .MuiFormLabel-asterisk': { color: 'red' }, '& .MuiOutlinedInput-root': { borderRadius: '6px' }, '& .MuiInputLabel-root': { color: 'grey', fontFamily: 'Poppins', zIndex: 0 } }}
                                       id="outlined-basic" multiline rows={5} label={pageName === "/" ? "Messsage" : "Message"} variant="outlined" size='small'
                                    /> : null
                              }
                              {/* <FeedbackQuestions
                              onChangeSetShow={setShowDes}
                              questions={questions}
                              answers={answers}
                              onChangeQuestions={setQuestions}
                              onChangeAnswers={setAnswers}
                           /> */}
                           </Stack>
                           {
                              !isLoading ? (
                                 <div className='mt-3 text-center'>
                                    <Button onClick={handleSubmit} variant="contained" size="small" sx={{ px: '40px', borderRadius: '8px', fontFamily: 'Poppins', backgroundColor: props.theme ? props.theme.primary_theme_color : 'blue', color: props.theme ? props.theme.secondary_text_color : 'white' }}>Send</Button>
                                 </div>
                              ) : (
                                 <Stack direction="row" justifyContent="center" alignItems="center">
                                    <InitialLoader />
                                 </Stack>
                              )
                           }
                        </Card>
                        : null
                  }
               </Stack>
               <br />
               <Stack width={1} direction="row" justifyContent="center" alignItems="center">
                  <Typography variant="caption">
                     Powered by: <a href="https://magicqr.in" target="_blank" rel="noopener noreferrer">
                        <img style={{ height: '50px' }} src={magicQrImg} alt="magic-r" />
                     </a>
                  </Typography>
               </Stack>
            </div>
         </Container>
      </>
   );
};

export default InitialFeedbackForm;
