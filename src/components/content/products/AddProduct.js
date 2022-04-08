import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isRequired: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const form = document.forms[0];
    const elements = form.elements;
    const formData = {};

    for (let i = 0; i < elements.length; i++) {
      const field = elements.item(i);
      formData[field.name] = field.value;
    }

    this.setState(
      (prev) => ({ isRequired: false, data: [...prev.data, formData] }),
      async () => {
        await fetch(`http://localhost:8000/api/v1/add-product`, {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              window.location = "/";
            }
          })
          .catch((error) => console.log(error));
      }
    );
  }
  render() {
    return (
      <div className="add-product">
        <fieldset className="add-fieldset">
          <legend>Product Capturing Form</legend>
          <form name="add-product">
            <p>
              <label htmlFor="product-name" className="pr-label">
                Product Name &nbsp;&nbsp;
                <input type="text" name="productName" id="product-name" />
              </label>
            </p>
            <p>
              <label htmlFor="category-name" className="pr-label category-id">
                Category ID{" "}
                <input type="text" name="categoryId" id="category-id" />
              </label>
            </p>
            <p>
              <label htmlFor="category-name" className="pr-label">
                Category Name{" "}
                <input type="text" name="categoryName" id="category-name" />
              </label>
            </p>
            <p>
              <label htmlFor="unit-price" className="pr-label">
                Unit
                Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" name="unitPrice" id="unit-price" />
              </label>
            </p>
            <p>
              <label htmlFor="status" className="pr-label">
                <span className="status">Status</span>
                <input type="text" name="status" id="status" />
              </label>
            </p>
            <p>
              <label htmlFor="available-since" className="pr-label">
                Available Since &nbsp;
                <input type="date" name="availableSince" id="available-since" />
              </label>
            </p>
            <p>
              <button
                type="button"
                className="create-prod"
                onClick={this.handleSubmit}
              >
                Add Product
              </button>
            </p>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default AddProduct;
