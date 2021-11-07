import React from 'react';
import './style.css';

import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ProductList = ({
  products,
  title,
}) => {
  const [addCart, { error }] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const handleAddCart = async ( productId ) => {
    try {
      const { data } = await addCart({
          variables: { productId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!products.length) {
    return <h3>No Products Yet</h3>;
  }

  return (
    <div className="row">
      {<h3 className="col-12 product-heading">{title}</h3>}
      <div className="row">
      {products &&
        products.map((products) => (
          <div key={products._id} className="col-lg-6">
          <div className="mb-3 col-lg-12">
            <div className="product-card d-flex flex-column align-items-center">
            <img
               className="mainImage"
               alt="productimage"
               src={products.imageUrl}
              />
              <p className="product-text">{products.productName}</p>
              <p className="product-text">{products.price}</p>
              {Auth.loggedIn() ? (
                <button className="product-button" onClick={() => handleAddCart(products._id)}>Add to cart</button>
              ):(
                <p className="product-text">Login in to purchase</p>
              )}
            </div>
          </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default ProductList;
