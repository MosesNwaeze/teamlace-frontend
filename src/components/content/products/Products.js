import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };

    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    const actualURL = `http://localhost:8000/api/v1/products`;
    fetch(actualURL)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState(
            (prev) => ({ products: [prev, ...result.data] }),
            () => {
              //this.props.update(this.state.products);
            }
          );
        }
      });
  }

  render() {
    return (
      <div className="products">
        <Product products={this.state.products} />
      </div>
    );
  }
}

export default Products;
