const FeedBackAPI = async ({ ratings, name, phone, description, email }) => {
   try {
      const api_url = import.meta.env.VITE_API_URL;
      const business_id = localStorage.getItem("business_id");

      const response = await fetch(`${api_url}/add-public-feedback`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            business_id,
            rating_type: `${ratings}`,
            description,
            status: '1',
            name,
            mobile_number: phone,
            email
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
