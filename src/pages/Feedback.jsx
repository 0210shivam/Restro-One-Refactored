import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContextProvider';
import Header from '../components/Header';

const Feedback = () => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get('p'); 
   const { businessData } = useBusiness();
   const theme = businessData.theme[0];
   const business = businessData.business;
   const pages = businessData.pages.data;
   const settings = businessData.ecommerce_settings[0];
   const categories = businessData.categories;

   return (
      <div>
         {/* <Header categories={categories} theme={theme} business={business} pages={pages} settings={settings}/> */}
      </div>
   );
}

export default Feedback;
