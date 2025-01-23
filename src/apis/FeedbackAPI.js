const FeedBackAPI = async ({ ratings, name, phone, description, email, questions = {}, answers = {} }) => {
   try {
      const api_url = import.meta.env.VITE_API_URL;
      const business_id = localStorage.getItem("business_id");

      // Prepare the feedback questions and answers to be sent
      const feedback = Object.keys(questions).reduce((acc, key) => {
         // Using `q1, q2, q3,...` as the question keys and `a1, a2, a3,...` for answers
         const questionKey = key;
         const answerKey = `a${key.replace('q', '')}`; // `a1, a2, a3,...` keys for answers

         // Ensure that both question and answer are converted to strings
         acc[questionKey] = String(questions[key]);
         acc[answerKey] = String(answers[answerKey]);

         return acc;
      }, {});

      // API request body including ratings, user details, and feedback questions/answers
      const response = await fetch(`${api_url}/add-public-feedback`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            business_id,
            rating_type: String(ratings),  // Ensure the rating is also a string
            description,
            status: '1',
            name,
            mobile_number: phone,
            email,
            business_url: window.location.hostname,
            ...(Object.keys(feedback).length > 0 && feedback) // Spread the feedback object to include the questions and answers
         })
      });

      const data = await response.json();
      return data;

   } catch (error) {
      console.log(error);
      return null;
   }
};

export default FeedBackAPI;
