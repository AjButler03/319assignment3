import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Accordion, AccordionItem, Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// import productData from "./products.json";
const productData = await fetch("http://localhost:8081/listProducts").then(
  (res) => res.json()
); // fetch product information, placed in productData variable


const ItemForm = ({ onSubmit }) => {
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
        </div>
        <div className="col-sm-7">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" {...register('title', { required: true })} />
          {errors.title && <span className="text-danger">This field is required</span>}
        </div>
        <div className="col-sm-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="number" className="form-control" {...register('price', { required: true })} />
          {errors.price && <span className="text-danger">This field is required</span>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea className="form-control" {...register('description', { required: true })}></textarea>
        {errors.description && <span className="text-danger">This field is required</span>}
      </div>

      <div className="mb-3 row">
        <div className="col-sm-8">
          <label htmlFor="category" className="form-label">Category:</label>
          <input type="text" className="form-control" {...register('category', { required: true })} />
          {errors.category && <span className="text-danger">This field is required</span>}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ratingRate" className="form-label">Rating Rate:</label>
          <input type="text" className="form-control" {...register('ratingRate', { validate: validateRatingRate })} />
          {errors.ratingRate && <span className="text-danger">Rating must be between 0 and 5</span>}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ratingCount" className="form-label">Rating Count:</label>
          <input type="text" className="form-control" {...register('ratingCount')} />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
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
        </div>
        <div className="col-sm-7">
          <label htmlFor="title" className="form-label">New Title:</label>
          <input type="text" className="form-control" {...register('title', { required: true })} />
          {errors.title && <span className="text-danger">This field is required</span>}
        </div>
        <div className="col-sm-3">
          <label htmlFor="price" className="form-label">New Price:</label>
          <input type="number" className="form-control" {...register('price', { required: true })} />
          {errors.price && <span className="text-danger">This field is required</span>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">New Description:</label>
        <textarea className="form-control" {...register('description', { required: true })}></textarea>
        {errors.description && <span className="text-danger">This field is required</span>}
      </div>

      <div className="mb-3 row">
        <div className="col-sm-8">
          <label htmlFor="category" className="form-label">New Category:</label>
          <input type="text" className="form-control" {...register('category', { required: true })} />
          {errors.category && <span className="text-danger">This field is required</span>}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ratingRate" className="form-label">New Rating Rate:</label>
          <input type="text" className="form-control" {...register('ratingRate', { validate: validateRatingRate })} />
          {errors.ratingRate && <span className="text-danger">Rating must be between 0 and 5</span>}
        </div>
        <div className="col-sm-2">
          <label htmlFor="ratingCount" className="form-label">New Rating Count:</label>
          <input type="text" className="form-control" {...register('ratingCount')} />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
};

const App = () => {
  // State to manage the collapse status of each accordion item
  const [openItem, setOpenItem] = useState(null);

  // Function to toggle the collapse status of each accordion item
  const toggleCollapse = (item) => {
    setOpenItem(openItem === item ? null : item);
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
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
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

                <UpdateForm/>
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
                <div className="mb-3">
                  <label htmlFor="removeItemId" className="form-label">Remove item with ID:</label>
                  <input type="text" className="form-control" id="removeItemId" />
                </div>
                <button type="button" className="btn btn-danger">Delete</button>
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