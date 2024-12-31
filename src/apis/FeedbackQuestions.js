const FeedbackQuestionsAPI = async () => {
   const api_url = import.meta.env.VITE_API_URL;
   const business_id = localStorage.getItem("business_id");

   try {
      const res = await fetch(`${api_url}/get-public-feedback-questions-list`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            business_id
         })
      });

      const data = await res.json();
      return data;

   } catch (error) {
      console.log("Error in FeedbackQuestions", error);
      return null;
   }
}

export default FeedbackQuestionsAPI;