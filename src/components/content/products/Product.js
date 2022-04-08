import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../react-pagination/pagination";

let pageSize = 5;

const Product = (props) => {
  const { products } = props;
  const [itemToDelete, setItemToDelete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (itemToDelete.length > 0) {
      updateProductToDelete(itemToDelete);
    }
  }, [itemToDelete]);

  const myProducts = products.filter((val) => val.product_id > 0);

  function handleMultiSelect(event) {
    const hCheckbox = document.querySelector(`input[name="headerCheckbox"]`);
    const elementById = document.querySelectorAll(`input[type="checkbox"]`);
    if (hCheckbox.checked === true) {
      for (let i = 0; i < elementById.length; i++) {
        let element = elementById.item(i);
        element.checked = true;
      }
    } else {
      for (let i = 0; i < elementById.length; i++) {
        elementById.item(i).checked = false;
      }
    }
  }

  function addProduct() {
    navigate("/products/add-product");
  }

  const updateProductToDelete = async (items) => {
    await fetch(
      `http://localhost:8000/api/v1/remove-product?productId=${items}`,
      {
        method: "delete",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          if (true) {
            //navigate("/");
            window.location = "/";
          }
        }
      })
      .catch((error) => console.log(error.message));
  };

  const deleteProduct = async () => {
    if (
      window.confirm("Are you sure you want to delete the selected product(s)?")
    ) {
      const elementById = document.querySelectorAll(`input[type="checkbox"]`);

      for (let i = 0; i < elementById.length; i++) {
        const element = elementById.item(i);
        if (element.checked === true && element.id !== "0") {
          if (parseInt(element.id) > 0) {
            setItemToDelete((prev) => [...prev, element.id]);
          }
        }
      }
    }
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return myProducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, myProducts]);

  const product = currentTableData.map((item, index) => {
    return (
      <tr key={index}>
        <td className="checkbox-cell">
          <input
            type="checkbox"
            name={item.category_name}
            id={item.product_id}
          />
        </td>
        <td className="prod-id">{item.product_id}</td>
        <td className="prod-name">{item.product_name}</td>
        <td className="cat-id">{item.category_id}</td>
        <td>{item.category_name}</td>
        <td>{item.unit_price}</td>
        <td>{item.status}</td>
        <td>{item.available_since}</td>
      </tr>
    );
  });

  return (
    <div className="table">
      <table cellPadding="6" cellSpacing="0">
        <thead className="thead">
          <tr>
            <th>
              <input
                id="0"
                type="checkbox"
                name="headerCheckbox"
                onClick={handleMultiSelect}
              />
            </th>
            <th>Product Name</th>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Unit Price</th>
            <th>Status</th>
            <th>Available Since</th>
          </tr>
        </thead>
        <tbody>{product}</tbody>
      </table>
      <p>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={myProducts.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </p>

      <p className="ctrls"></p>
      <p className="action-p">
        <button type="button" className="action-btn" onClick={addProduct}>
          Add Product
        </button>{" "}
        <button type="button" className="action-btn" onClick={deleteProduct}>
          Delete Product
        </button>
      </p>
    </div>
  );
};
export default Product;
