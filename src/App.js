import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import logo2 from "./logo.png";
// import productData from "./products.json";
const productData = await fetch("http://localhost:8081/listProducts").then(
  (res) => res.json()
); // fetch product information, placed in productData variable

const Header = ({
  onSearch,
  toggleAddForm,
  ToggleDeleteForm,
  ToggleAboutUs,
}) => {
  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      const searchInput = event.target
        .closest(".input-group")
        .querySelector("input").value;
      onSearch(searchInput);
    }
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
          <img
            src={logo2}
            minHeight="35"
            className="my-auto mx-3 py-2"
            alt="Logo"
          />
          <div className="col-12 col-lg-auto d-flex mb-3 mb-lg-0 me-lg-auto py-3">
            <div className="input-group">
              <input
                id="searchInput"
                type="search"
                className="form-control form-control-dark"
                style={{ width: "350px" }}
                placeholder="Search for products..."
                aria-label="Search"
                onKeyDown={handleSearch}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                style={{ backgroundColor: "#ff9900", borderColor: "#ff9900" }}
                onClick={handleSearch}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
            <button
              type="button"
              className="btn btn-outline-light ms-4 btn-lg border-1"
              onClick={toggleAddForm}
            >
              Add_Item
            </button>
            <button
              type="button"
              className="btn btn-outline-light ms-4 btn-lg border-1"
              onClick={toggleAddForm} // eventually a remove form
            >
              Remove_Item
            </button>
          </div>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-light me-2 btn-lg border-1"
              // onClick={clearCart} // toggle about us view
            >
              About us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

//Search by filters, located udner header
const FilterBar = ({ filterProducts }) => {
  const filterTitles = [
    "All",
    "Jewelery",
    "Men's clothing",
    "Women's clothing",
    "Electronics",
  ];

  const handleClick = (category) => {
    filterProducts(category);
  };

  return (
    <div className="bg-dark text-white">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="vr vr-blurry" />
        {filterTitles.map((title, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <div className="vr vr-blurry" />}
            <button
              type="button"
              className="btn btn-outline-light border-0 px-2 mx-1 my-1 flex-grow-1"
              onClick={() => handleClick(title.toLowerCase())}
            >
              {title}
            </button>
          </React.Fragment>
        ))}
        <div className="vr vr-blurry" />
      </div>
    </div>
  );
};

//Generate stars based on numerical rating
const generateStarIcons = (rating) => {
  const stars = [];
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < filledStars) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    } else if (hasHalfStar && i === filledStars) {
      stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
    } else {
      stars.push(<i key={i} className="bi bi-star text-warning"></i>);
    }
  }

  return stars;
};

//Contains the body that hold all cards
const ProductCard = ({ product }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 rounded-0 d-flex flex-column">
        <img
          src={product.image}
          className="card-img-top"
          alt="Product Image"
          style={{
            maxHeight: "200px",
            objectFit: "contain",
            minHeight: "150px",
          }}
        />
        <ProductCardBody product={product} />
      </div>
    </div>
  );
};

//Contains the card
const ProductCardBody = ({ product, toggleEditForm }) => {
  return (
    <div className="card-body flex-fill d-flex flex-column ">
      <h5 className="card-title" style={{ fontSize: "24px" }}>
        {product.title}
      </h5>
      <p
        className="card-text"
        style={{
          fontSize: "16px",
          lineHeight: "1.5",
          maxHeight: "3em",
          overflow: "hidden",
        }}
      >
        {product.description}
      </p>
      <div className="mt-auto d-flex flex-wrap justify-content-between align-items-center ">
        <div>
          <p
            className="card-text"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "3px",
              whiteSpace: "nowrap",
            }}
          >
            Price: ${product.price}
          </p>
          <p className="card-text mb-0" style={{ fontSize: "16px" }}>
            Rating: {generateStarIcons(product.rating.rate)} (
            {product.rating.count})
          </p>
        </div>
        <div>
          <div className="d-flex pt-2">
            <a
              className="btn btn-primary btn-lg btn-outline-secondary"
              // onClick={toggleEditForm} // go to edit form
              style={{
                backgroundColor: "#ff9900",
                borderColor: "#ff9900",
                padding: "0.5rem 1rem",
              }}
            >
              Edit Item
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddForm = ({
  isOpen,
  toggleAddForm,
  dataF,
  setDataF,
  viewer,
  setViewer,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function Payment() {
    const onSubmit = (data) => {
      setViewer(1);
      console.log(data); // log all data
      setDataF(data);
    };

    return (
      <div className="container mt-5 col-md-8">
        <div className="row-md-6">
          <h3>Your Order summary:</h3>
          <hr className="hr hr-blurry bg-dark m-0 mb-3 mt-3" />
          <hr className="hr hr-blurry  bg-dark m-0" />
          <hr className="hr hr-blurry  bg-dark m-0 mb-3" />
        </div>

        <div className="row-md-6">
          <form onSubmit={handleSubmit(onSubmit)} className="container mt-5 ">
            <h3>Product item Details:</h3>

            <hr className="hr hr-blurry  bg-dark m-0 mb-3 mt-3" />

          </form>
        </div>
      </div>
    );
  }

  function Confirmation() {
    const handleOrder = () => {
      setViewer(0);
      setDataF({});
      toggleAddForm();
    };

    return (
      <div className="container mt-5">
        <div>
          <h1>Shipping and payment summary:</h1>

          <hr className="hr hr-blurry bg-dark m-0 mt-3 mb-3" />
          <div className="ms-5">
            <h3>{dataF.fullName}</h3>
            <p>{dataF.email}</p>
            <p>XXXX-XXXX-XXXX-{dataF.creditCard.slice(-4)}</p>
            <p>
              {dataF.address} {dataF.address2}
            </p>
            <p>
              {dataF.city}, {dataF.state} {dataF.zip}{" "}
            </p>
            <h4>Thank You!</h4>
          </div>
        </div>

        <hr className="hr hr-blurry bg-dark m-0 mt-3 mb-3" />
        <button
          type="button"
          className="btn btn-primary btn-outline-secondary btn-lg"
          style={{ backgroundColor: "#ff9900", borderColor: "#ff9900" }}
          onClick={handleOrder}
        >
          Shop for more items
        </button>
      </div>
    );
  }

  return (
    <>
      {isOpen && <div className="overlayForm"></div>}
      <div className={`checkout-form ${isOpen ? "open" : ""}`}>
        <div className="header bg-dark text-white d-flex justify-content-between align-items-center px-4 py-3">
          <h2 className="m-0">Product Added</h2>
          <button
            type="button"
            className="btn btn-lg btn-outline-light"
            onClick={toggleAddForm}
          >
            Return to Shopping
          </button>
        </div>
        {viewer === 1 && <Confirmation />}
        {viewer === 0 && <Payment />}
      </div>
    </>
  );
};

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState(productData);
  // const [cartItems, setCartItems] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);

  const filterProducts = (category) => {
    if (category === "all") {
      setFilteredProducts(productData);
    } else {
      const filtered = productData.filter(
        (product) => product.category.toLowerCase() === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (searchQuery) => {
    const searchResults = productData.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    if (showSidebar) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  };

  const toggleAddForm = () => {
    setShowCheckoutForm(!showCheckoutForm);
    if (showCheckoutForm) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  };

  return (
    <div>
      <Header
        onSearch={handleSearch}
        toggleSidebar={toggleSidebar}
        toggleAddForm={toggleAddForm}
      />
      <hr className="hr hr-blurry bg-dark m-0" />
      <FilterBar filterProducts={filterProducts} />

      {/* <Sidebar
        isOpen={showSidebar}
        toggleSidebar={toggleSidebar}
        cartItems={cartItems}
        handleAdd={handleAdd}
        handleSubtract={handleSubtract}
        handleDelete={handleDelete}
        calculateTotal={calculateTotal}
        toggleCheckoutForm={toggleCheckoutForm}
      /> */}

      {/* <CheckoutForm
        isOpen={showCheckoutForm}
        toggleCheckoutForm={toggleCheckoutForm}
        dataF={dataF}
        setDataF={setDataF}
        viewer={viewer}
        setViewer={setViewer}
        cartItems={cartItems}
        handleAdd={handleAdd}
        handleSubtract={handleSubtract}
        handleDelete={handleDelete}
        calculateTotal={calculateTotal}
        clearCart={clearCart}
      /> */}

      <div className="container-fluid pt-4 overflow-auto">
        <div className="row">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // handleAdd={() => handleAdd(product.id)}
              // handleSubtract={() => handleSubtract(product.id)}
              // cartItems={cartItems[product.id] || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
