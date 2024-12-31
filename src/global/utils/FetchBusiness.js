import GetBusinessIdByDomain from "../../apis/GetBusinessIdByDomain";
import GetPageList from "../../apis/GetPageList";
import GetPublicBusinessDetails from "../../apis/GetPublicBusinessDetails";
import GetPublicCategories from "../../apis/GetPublicCategories";

const FetchBusiness = async () => {
   try {
      const domain_name = window.location.hostname;

      // Determine the business ID
      let business_id;

      if (domain_name === "links.magicqr.in" || domain_name === "https://links.magicqr.in") {
         const queryParams = new URLSearchParams(window.location.search);
         const id = queryParams.get("m");

         if (!id) throw new Error("Business ID missing from query parameters.");
         business_id = id;
      } else {
         const res = await GetBusinessIdByDomain(domain_name);

         if (!res.status) throw new Error("Failed to fetch business ID by domain.");
         business_id = res.data.business_id;
      }

      // Save the business ID in local storage
      if (!business_id) throw new Error("Invalid business ID.");
      localStorage.setItem("business_id", business_id);

      // Fetch business details, pages, and categories in parallel
      const [res_business, res_page, res_category] = await Promise.all([
         GetPublicBusinessDetails(business_id),
         GetPageList(business_id),
         GetPublicCategories(business_id),
      ]);

      if (!res_business.status) throw new Error("Failed to fetch business details.");

      // Store responses in localStorage
      localStorage.setItem("business_data", JSON.stringify(res_business.data));
      localStorage.setItem("pages", JSON.stringify(res_page.data));
      localStorage.setItem("categories", JSON.stringify(res_category.data.category));

      // Return consolidated data
      return {
         res_business: res_business.data,
         res_page: res_page.data,
         res_category,
      };
   } catch (error) {
      console.error("Error in FetchBusiness:", error.message);
      return false;
   }
};

export default FetchBusiness;
