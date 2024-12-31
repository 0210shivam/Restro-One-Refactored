import { createContext, useContext, useEffect, useState } from "react";
import FetchBusiness from "../global/utils/FetchBusiness";
import { Suspense, lazy } from "react";
import "./BusinessContextProvider.css"; // Custom CSS for transitions
import getAuthKey from "../global/authKey/GetAuthKey";

const FirstLoader = lazy(() => import("../components/FirstLoader"));

export const BusinessContext = createContext();

export const BusinessContextProvider = ({ children }) => {
   const [businessData, setBusinessData] = useState({
      isAuthenticated: false,
      isEMenu: true,
      business: [],
      pages: [],
      ecommerce_settings: [],
      banners: [],
      seo: [],
      theme: [],
      categories: [],
   });
   const [isReady, setIsReady] = useState(0);
   const [isTransitioning, setIsTransitioning] = useState(false);
   const [showChildren, setShowChildren] = useState(false);

   useEffect(() => {
      const fetchBusinessData = async () => {
         const res = await FetchBusiness();
         console.log("Business Data:", res);
         
         if (res) {
            setBusinessData((prev) => ({
               ...prev,
               ...res.res_business,
               pages: res.res_page,
               categories: res.res_category.data.category,
               isAuthenticated: !!getAuthKey(),
               isEMenu: res.res_category.data.category?.length > 0,
            }));
            setIsReady(1);
         }
      };
      fetchBusinessData();
   }, []);

   useEffect(() => {
      if (isReady === 1) {
         setIsTransitioning(true);
         setTimeout(() => {
            setIsTransitioning(false);
            setShowChildren(true);
         }, 500); // Match CSS transition
      }
   }, [isReady]);

   const contextValue = {
      businessData,
      setBusinessData,
   };

   if (!showChildren) {
      return (
         <Suspense fallback={<div>Loading...</div>}>
            <div className={`fade-transition ${isTransitioning ? "fade-out" : "fade-in"}`}>
               <FirstLoader />
            </div>
         </Suspense>
      );
   }

   return (
      <BusinessContext.Provider value={contextValue}>
         <div className="fade-transition fade-in">{children}</div>
      </BusinessContext.Provider>
   );
};

export const useBusiness = () => useContext(BusinessContext);
