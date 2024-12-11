const GetBusinessIdByDomain = async (domain_name) => {
   
   try {
      const api_url = import.meta.env.VITE_API_URL;

      const response = await fetch(`${api_url}/search-connect-domain`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ domain_name })
      });

      const json_data = await response.json();
      return json_data;
   } catch (error) {
      return console.log(error);
   }
};

export default GetBusinessIdByDomain;
