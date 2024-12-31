const FetchFromLocal = () => {
   const data = localStorage.getItem("business_data");
   const pages = localStorage.getItem("pages");

   const theme = data.theme;
   const banners = data.banners;
   const business = data.business[0];
   const ecommerce_settings = data.ecommerce_settings;
   const seo = data.seo;

   return { theme, banners, business, ecommerce_settings, seo, pages };
};

export default FetchFromLocal;
