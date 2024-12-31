import React from 'react';

const CategoriesView = ({ category, selectedCategory, handleCategorySelect, products }) => {
   return (
      <div className='container'>
         <div className="accordion" >
            <div className="accordion-item">
               <h2 className="accordion-header" id={`heading${category.id}`}>
                  <button
                     className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"
                     onClick={() => handleCategorySelect(category.id)}
                  >
                     <div className="card updated-product-card">
                        <div className="row g-0">
                           <div className="col-md-10">
                              <div className="card-body">
                                 <h5 className="card-title updated-card-title">{category.name}</h5>
                                 <a href="#" className="btn btn-primary updated-details-btn">
                                    View Details
                                 </a>
                              </div>
                           </div>
                           <div className="col-md-2">

                           </div>
                        </div>
                     </div>
                  </button>
               </h2>
               <div
                  id={`collapse${category.id}`}
                  className={`accordion-collapse collapse ${selectedCategory === category.id ? 'show' : ''}`}
                  aria-labelledby={`heading${category.id}`}
               >
                  <div className="accordion-body">
                     {selectedCategory === category.id && (
                        products.map(product => (
                           <div key={product.id}>
                              <div className="card updated-sub-product-card">
                                 <div className="row g-0">
                                    <div className="col-md-1">
                                       <img
                                          style={{ objectFit: "contain" }}
                                          src={product.product_images[0].image}
                                          className="img-fluid updated-sub-product-img"
                                          alt="..."
                                       />
                                    </div>
                                    <div className="col-md-9">
                                       <div className="card-body">
                                          <h5 className="card-title updated-product-heading py-0">
                                             {product.name}
                                          </h5>
                                          <p className="card-text updated-product-sub-title mt-0">
                                             Our classic pizza sauce topped with onions,capsicum and
                                             tomatoes made with a blend of cheese
                                          </p>
                                       </div>
                                    </div>
                                    <div className="col-md-2">
                                       <div className="quantity-selector">
                                          <h5 style={{ color: "#FF4D2A" }} className="card-title updated-product-heading">
                                             RS. {product.mrp}
                                          </h5>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <hr />
                           </div>
                        ))
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CategoriesView;
