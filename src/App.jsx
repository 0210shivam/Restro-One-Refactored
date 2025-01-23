import React, { useEffect, useState } from "react";
import './App.css';
import { useBusiness } from "./context/BusinessContextProvider";
import Header from "./components/Header";
import Banners from "./components/Banners";
import { IconButton, Typography } from "@mui/material";
import menuView from '../public/menu-view.svg';
import Footer from "./components/Footer";
import { useNavigate } from "react-router";
import CategoriesView from "./components/CategoriesView";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { checkFirstLetter } from "./utils/alphabetImages";
import DialogPopUp from "./components/DialogPopUp";
import MobileFooter from "./components/MobileFooter";
import ScrollToTop from "react-scroll-to-top";

function App() {
  const { businessData } = useBusiness();
  const router = useNavigate();
  const theme = businessData.theme[0];
  const business = businessData.business;
  const pages = businessData.pages.data;
  const settings = businessData.ecommerce_settings[0];
  const banners = businessData.banners;
  const categories = businessData.categories;

  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedShowImg, setSelectedShowImg] = useState(null);
  const [selectedShowName, setSelectedShowName] = useState("");
  const [selectedShowPrice, setSelectedShowPrice] = useState("");
  const [selectedShowDescription, setSelectedShowDescription] = useState("");
  const itemsPerPage = 14;

  useEffect(() => {
    // console.log("Business Data: ", businessData);
    
    if (businessData?.isEMenu && settings?.store_status === "1") {
      router("/e-menu");
    } else {
      router('/')
    }
  }, [businessData]);


  const closeOffcanvasModal = () => {
    const offcanvasElement = document.getElementById('offcanvasBottom');
    const offcanvasModal = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasModal) {
      offcanvasModal.hide();
    }
  };

  const scrollToCategoryModal = (categoryId) => {
    const categoryTitle = document.getElementById(`category-${categoryId}`);
    if (categoryTitle) {
      categoryTitle.scrollIntoView({ behavior: 'smooth' });
      closeOffcanvasModal();
    }
  };

  const scrollToCategory = (categoryId) => {
    const categoryTitle = document.getElementById(`category-${categoryId}`);
    if (categoryTitle) {
      const offset = -30;
      const elementPosition = categoryTitle.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < categories.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const extractText = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.charAt(0).toUpperCase() + textContent.slice(1);
  };

  const handleClickOpen = (img, p_name, p_price, description) => {
    setSelectedShowImg(img);
    setSelectedShowName(p_name);
    setSelectedShowPrice(p_price);
    setSelectedShowDescription(description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasPTag = (description) => {
    const capitalizedDescription = description?.charAt(0)?.toUpperCase() + description?.slice(1);
    return /<[a-zA-Z][^>]*>/.test(capitalizedDescription);
  };

  return (
    <>
      <Header categories={categories} theme={theme} business={business} pages={pages} settings={settings} />
      <Banners banners={banners} />
      <div className="container mt-4">
        <div className='d-none d-lg-flex justify-content-center align-items-center'>
          <IconButton style={{ cursor: 'pointer' }} onClick={handlePrevious} disabled={startIndex === 0}>
            <ArrowBackIos />
          </IconButton>
          <div className='overflow-hidden d-flex'>
            {
              categories && categories?.length > 0 ?
                categories
                  .slice(startIndex, startIndex + itemsPerPage)
                  .map((category) => (
                    <div
                      onClick={() => scrollToCategory(category?.id)}
                      style={{ cursor: 'pointer', textAlign: 'center', width: '90px' }} key={category?.id}
                    >
                      <img className="img-thumbnail rounded-circle"
                        style={{ width: '60px', height: '60px' }}
                        src={category.image === "https://testapi.arbsindia.com/public/default.png" ? checkFirstLetter(category?.name.trim().charAt(0).toUpperCase()) : category.image}
                        alt="..." />
                      <p style={{ fontSize: '12px' }} className='text-center mt-3'>
                        {category?.name}
                      </p>
                    </div>
                  )) : null
            }
          </div>
          <IconButton onClick={handleNext} disabled={startIndex + itemsPerPage >= categories?.length}>
            <ArrowForwardIos />
          </IconButton>
        </div>
        {categories && categories?.length > 0 ? categories?.map(category => (
          <div key={category.id}>
            <div className='mt-3'>
              <div className="text-center">
                <h2 style={{ color: theme.primary_theme_color, fontSize: '22px' }} id={`category-${category?.id}`} >{category?.name}</h2>
              </div>
              {category?.product_details.length > 0 && category.product_details.map(product => (
                <div key={product.id}>
                  <div style={{ alignItems: 'center' }} className="row mt-3">
                    <div style={{ padding: '6px' }} className="col-md-2 col-2 text-center" >
                      {
                        product?.product_images.length > 0 ?
                          <img style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(product.product_images[0]?.image, product.name.charAt(0).toUpperCase() + product.name.slice(1), product.selling_price, extractText(product.description))} className="img-thumbnail rounded"
                            src={`${product.product_images[0]?.image}?tr=w-140,h-140`}
                            alt="..." />
                          : <img style={{ width: '50px', height: '50px' }}
                            className="img-thumbnail rounded-circle"
                            src={checkFirstLetter(product?.name.trim().charAt(0).toUpperCase())}
                            alt="..." />
                      }
                    </div>
                    <div style={{ padding: '6px' }} className="col-md-7 col-7 align-content-center">
                      <span className='product-title'>{product?.name.charAt(0).toUpperCase() + product?.name.slice(1)}</span>
                      {/* Description */}
                      {
                        product?.description !== null &&
                        hasPTag(product?.description) &&
                        // (
                        // 	<div style={{ color: theme ? theme.primary_text_color : 'black', opacity: 0.5, fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: product?.description }} />
                        // <i className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Ullam provident quo optio quibusdam Lorem, ipsum dolor.Lorem ipsum dolor sit amet consectetur adipisicing elit. </i>
                        // ) : (
                        <div style={{ color: theme ? theme.primary_text_color : "black", opacity: 0.5, fontSize: '14px' }}>{extractText(product?.description)}</div>
                        // ) : null
                      }
                    </div>
                    {/* TODO: Check the mrp and selling prc */}
                    <div className="col-md-2 col-3 align-content-md-center">
                      <h3 style={{ color: theme ? theme.primary_text_color : 'black' }} className='selling-price'> &#8377; {product?.selling_price}</h3>
                      {
                        product.selling_price !== product.mrp ?
                          <span style={{ color: theme ? theme.primary_text_color : 'black', opacity: 0.5 }} className='mrp'> &#8377; {product?.mrp} </span> : null
                      }
                    </div>
                    {/* {
															settings?.accept_order === "1" ?
																<div className='col-md-1 d-none d-md-block'>
																	<Button variant='contained' onClick={() => handleChangeValues(product.id)}>
																		{settings?.cart_button_name}
																	</Button>
																</div> : null
														}
													 */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) : null}
        <div className='d-md-none' style={{ position: 'fixed', bottom: '5%', right: '35px', transform: 'translateY(-50%)', zIndex: '10', cursor: 'pointer' }}>
          <img
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 10px 0px, rgba(93, 141, 213, 0.2) 0px 2px 1px 0px',
              transition: 'transform 0.25s ease-in-out 0s',
            }}
            src={menuView} alt="Menu"
          />
        </div>
        <div className="offcanvas offcanvas-bottom rounded-top h-75" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasBottomLabel">Select Category</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body small">
            {
              categories ? categories?.map((category) => (
                <div onClick={() => scrollToCategoryModal(category?.id)} style={{ cursor: 'pointer' }} key={category?.id} >
                  <h6 className='mt-4'>
                    {category?.name}
                  </h6>
                </div>
              )) : null
            }
          </div>
        </div>
      </div>
      <br />
      <div className='d-flex justify-content-center'>
        <Typography variant="caption" style={{ color: theme ? theme.primary_theme_color : 'grey', fontFamily: 'Poppins', textDecoration: 'none' }}>Powered By: <a style={{ textDecoration: 'none', color: 'inherit' }} href='https://magicqr.in/' target='_blank'>MagicQr.in</a></Typography>
      </div>

      <div className='d-block'>
        <br /><br /><br />
      </div>
      <div className='d-block d-lg-none d-md-none position-fixed bottom-0'>
        <MobileFooter settings={settings} categories={categories} theme={theme} />
      </div>
      <div className='d-none d-lg-block d-md-block'>
        <Footer business={business} theme={theme} />
      </div>
      <div className='d-none d-md-block'>
        <ScrollToTop style={{ backgroundColor: theme ? theme.primary_theme_color : 'white' }} svgPath='M17.71,9.88l-4.3-4.29a2,2,0,0,0-2.82,0L6.29,9.88a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0L11,8V19a1,1,0,0,0,2,0V8l3.29,3.29a1,1,0,1,0,1.42-1.41Z' onClick={() => {
          // Customize the behavior here
          window.scrollTo({ top: 600, behavior: 'smooth' }); // Scrolls to 500 pixels from the top
        }} viewBox='0 0 24 24' color={theme ? theme.secondary_text_color : 'black'} smooth />
      </div>
      <DialogPopUp open={open} handleClose={handleClose} img={selectedShowImg} name={selectedShowName} price={selectedShowPrice} theme={theme} description={selectedShowDescription} />
    </>
  );
}

export default App;
