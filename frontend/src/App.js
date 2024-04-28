import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Accordion, AccordionItem, Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// import productData from "./products.json";
const productData = await fetch("http://localhost:8081/listProducts").then(
  (res) => res.json()
); // fetch product information, placed in productData variable


const ItemForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const validateRatingRate = (value) => {
    if (value === '') return true; // Allow empty value
    const rate = parseFloat(value);
    return !isNaN(rate) && rate >= 0 && rate <= 5;
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8081/addProduct", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log('Product added:', result);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 row">
        <div className="col-sm-2">
          <label htmlFor="id" className="form-label">ID:</label>
          <input type="text" className="form-control" {...register('id', { required: true })} />
          {errors.id && <span className="text-danger">ID is required</span>}
        </div>
        <div className="col-sm-7">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" {...register('title', { required: true })} />
          {errors.title && <span className="text-danger">Title is required</span>}
        </div>
        <div className="col-sm-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="text" className="form-control" {...register('price', { required: true })} />
          {errors.price && <span className="text-danger">Price is required</span>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea className="form-control" {...register('description', { required: true })}></textarea>
        {errors.description && <span className="text-danger">Description is required</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <input type="text" className="form-control" {...register('category', { required: true })} />
        {errors.category && <span className="text-danger">Category is required</span>}
      </div>

      <div className="mb-3 row">
        <div className="col-sm-8">

          <label htmlFor="imageUrl" className="form-label">Image URL:</label>
          <input type="text" className="form-control" {...register('image', { required: true })} />
          {errors.imageUrl && <span className="text-danger">Image URL is required</span>}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ratingRate" className="form-label">Rating Rate:</label>
          <input type="text" className="form-control" {...register('rating.rate', { validate: validateRatingRate })} />
          {errors.ratingRate && <span className="text-danger">Rating must be between 0 and 5</span>}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ratingCount" className="form-label">Rating Count:</label>
          <input type="text" className="form-control" {...register('rating.count')} />
          {errors.ratingCount && <span className="text-danger">Rating is required</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Submit Item</button>
    </form>
  );
};



const UpdateForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const validateRatingRate = (value) => {
    if (value === '') return true; // Allow empty value
    const rate = parseFloat(value);
    return !isNaN(rate) && rate >= 0 && rate <= 5;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 row">
        <div className="col-sm-2">
          <label htmlFor="id" className="form-label">ID:</label>
          <input type="text" className="form-control" {...register('id')} />
          {errors.id && <span className="text-danger">Id is required</span>}
        </div>
        <div className="col-sm-7">
          <label htmlFor="title" className="form-label">New Title:</label>
          <input type="text" className="form-control" {...register('title', { required: true })} />
          {errors.title && <span className="text-danger">Title is required</span>}
        </div>
        <div className="col-sm-3">
          <label htmlFor="price" className="form-label">New Price:</label>
          <input type="text" className="form-control" {...register('price', { required: true })} />
          {errors.price && <span className="text-danger">Price is required</span>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">New Description:</label>
        <textarea className="form-control" {...register('description', { required: true })}></textarea>
        {errors.description && <span className="text-danger">Description is required</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">New Category:</label>
        <input type="text" className="form-control" {...register('category', { required: true })} />
        {errors.category && <span className="text-danger">Category is required</span>}

      </div>

      <div className="mb-3 row">
        <div className="col-sm-8">
          <label htmlFor="imageUrl" className="form-label">New Image URL:</label>
          <input type="text" className="form-control" {...register('imageUrl')} />
          {errors.category && <span className="text-danger">Image URL is required</span>}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ratingRate" className="form-label">New Rating Rate:</label>
          <input type="text" className="form-control" {...register('ratingRate', { validate: validateRatingRate })} />
          {errors.ratingRate && <span className="text-danger">Rating must be between 0 and 5</span>}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ratingCount" className="form-label">New Rating Count:</label>
          <input type="text" className="form-control" {...register('ratingCount')} />
          {errors.ratingCount && <span className="text-danger">Rating is required</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
};


const DeleteProduct = () => {
  const [productId, setProductId] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8081/deleteProduct/${productId}`, {
        method: 'DELETE'
      });
      const deletedProduct = await response.json();
      console.log('Deleted product:', deletedProduct);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleChange = (event) => {
    setProductId(event.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="removeItemId" className="form-label">Remove item with ID:</label>
      <input type="text" className="form-control" id="removeItemId" value={productId} onChange={handleChange} />
      <button type="button" className="btn btn-danger mt-2" onClick={handleDelete}>Delete</button>
    </div>
  );
};

const App = () => {
  // State to manage the collapse status of each accordion item
  const [openItem, setOpenItem] = useState(null);

  // Function to toggle the collapse status of each accordion item
  const toggleCollapse = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  const ReadAccordionItem = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8081/listProducts");
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      if (openItem === 2) {
        fetchData();
      } else {
        setProducts([]);
      }
    }, [openItem]);

    return (
      <div className="accordion-body">
        {openItem === 2 && (
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <strong>ID:</strong> {product.id} <br />
                <strong>Title:</strong> {product.title} <br />
                <strong>Price:</strong> ${product.price} <br />
                <strong>Description:</strong> {product.description} <br />
                <strong>Category:</strong> {product.category} <br />
                <strong>Image URL:</strong> {product.image} <br />
                <strong>Rating Rate:</strong> {product.rating.rate} <br />
                <strong>Rating Count:</strong> {product.rating.count} <br />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };


  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <div className="accordion" id="accordionExample">

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                onClick={() => toggleCollapse(1)}
                aria-expanded={openItem === 1 ? 'true' : 'false'}
                aria-controls="collapseOne"
              >
                <strong>C</strong>reate: Add item to Database
              </button>
            </h2>
            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${openItem === 1 ? 'show' : ''}`}
              aria-labelledby="headingOne"
            >
              <div className="accordion-body">
                <ItemForm />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button"
                type="button"
                onClick={() => toggleCollapse(2)}
                aria-expanded={openItem === 2 ? 'true' : 'false'}
                aria-controls="collapseTwo"
              >
                <strong>R</strong>ead: Show all items
              </button>
            </h2>
            <div
              id="collapseTwo"
              className={`accordion-collapse collapse ${openItem === 2 ? 'show' : ''}`}
              aria-labelledby="headingTwo"
            >
              <div className="accordion-body">
                <ReadAccordionItem />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button"
                type="button"
                onClick={() => toggleCollapse(3)}
                aria-expanded={openItem === 3 ? 'true' : 'false'}
                aria-controls="collapseThree"
              >
                <strong>U</strong>pdate: Modify information about a product
              </button>
            </h2>
            <div
              id="collapseThree"
              className={`accordion-collapse collapse ${openItem === 3 ? 'show' : ''}`}
              aria-labelledby="headingThree"
            >
              <div className="accordion-body">

                <UpdateForm />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button"
                type="button"
                onClick={() => toggleCollapse(4)}
                aria-expanded={openItem === 4 ? 'true' : 'false'}
                aria-controls="collapseFour"
              >
                <strong>D</strong>elete: Remove a product from the Database
              </button>
            </h2>
            <div
              id="collapseFour"
              className={`accordion-collapse collapse ${openItem === 4 ? 'show' : ''}`}
              aria-labelledby="headingFour"
            >
              <div className="accordion-body">
                <DeleteProduct />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button"
                type="button"
                onClick={() => toggleCollapse(5)}
                aria-expanded={openItem === 5 ? 'true' : 'false'}
                aria-controls="collapseFive"
              >
                About: Student info
              </button>
            </h2>
            <div
              id="collapseFive"
              className={`accordion-collapse collapse ${openItem === 5 ? 'show' : ''}`}
              aria-labelledby="headingFive"
            >
              <div className="accordion-body">
                <strong>This is the fifth item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default App;