const GetPublicBusinessDetails = async (b_id) => {
   try {
      const api_url = import.meta.env.VITE_API_URL;

      const business_id = b_id ? b_id : localStorage.getItem("business_id");

      const response = await fetch(`${api_url}/get-public-business-details-list`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ business_id })
      });

      const json_data = await response.json();
      return json_data;
   } catch (error) {
      return console.log(error);
   }
};

export default GetPublicBusinessDetails;
