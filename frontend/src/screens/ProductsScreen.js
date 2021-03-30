import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';
import { Button, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };


  return (
    <>
      <div className="container" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <br />

        {1 && (
          //#region 
          <div className="container" style={{ width: "100%", backgroundColor: "#fff" }}>
            <Card style={{ borderColor: "#000" }}>
              <h1 style={{ color: "#000", textAlign: "center" }}>Upload Product</h1>
              <Form onSubmit={submitHandler}>
                <div className="row">
                  <div className="col col-lg-4">
                    <FormGroup>
                      <Label
                        for="name"
                        style={{ color: "#000" }}
                      >
                        Name
                    </Label>
                      <Input
                        style={{ color: "#000", backgroundColor: "#fff" }}
                        type="text"
                        name="name"
                        color="06E2FF"
                        placeholder="Enter Product Name"
                        size="lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className="col col-lg-4">
                    <FormGroup>
                      <Label
                        for="price"
                        style={{ color: "#000" }}
                      >
                        Price
                                    </Label>
                      <Input
                        style={{ color: "#000", backgroundColor: "#fff" }}
                        type="text"
                        name="price"
                        id="price"
                        placeholder="Enter Product Price"
                        size="lg"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className="col col-lg-4">
                    <FormGroup>
                      <Label
                        for="countInStock"
                        style={{ color: "#000" }}
                      >
                        In Stock
                                    </Label>
                      <Input
                        style={{ color: "#000", backgroundColor: "#fff" }}
                        type="text"
                        name="countInStock"
                        id="countInStock"
                        placeholder="Enter Count in Stock"
                        size="lg"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-lg-4">
                    <FormGroup>
                      <Label
                        for="countInStock"
                        style={{ color: "#000" }}
                      >
                        Category
                                    </Label>
                      <Input
                        style={{ color: "#000", backgroundColor: "#fff" }}
                        type="text"
                        name="countInStock"
                        id="countInStock"
                        placeholder="Enter Product Category"
                        size="lg"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className="col col-lg-4">
                    <FormGroup>
                      <Label
                        for="countInStock"
                        style={{ color: "#000" }}
                      >
                        Description
                                    </Label>
                      <Input
                        style={{ color: "#000", backgroundColor: "#fff" }}
                        type="text"
                        name="countInStock"
                        id="countInStock"
                        placeholder="Enter Product Description"
                        size="lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className="col col-lg-4">
                    <FormGroup>
                      <Label
                        for="countInStock"
                        style={{ color: "#000" }}
                      >
                        Brand
                                    </Label>
                      <Input
                        style={{ color: "#000", backgroundColor: "#fff" }}
                        type="text"
                        name="countInStock"
                        id="countInStock"
                        placeholder="Enter Product Brand"
                        size="lg"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-lg-12">
                    <FormGroup>
                      <Label
                        for="image"
                        style={{ color: "#000" }}
                      >
                        Image Name
                      </Label>

                      <Input
                        style={{ color: "#000", backgroundColor: "#fff" }}
                        type="text"
                        name="image"
                        id="image"
                        placeholder="Image Name"
                        size="lg"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                      <Input
                        style={{ color: "#06E2FF", backgroundColor: "#fff" }}
                        type="file"
                        label="Yo, pick a file!"
                        onChange={uploadFileHandler}
                      />
                    </FormGroup>
                  </div>
                </div>

                <Button style={{
                  color: "#6600ff",
                  backgroundColor: "#ccb3ff"
                  
                }} size="lg" block type="submit">
                  <b>Submit</b> 
                       </Button>

              </Form>
            </Card>
          </div>
          //#endregion
        )

        }

        <br />
        <br />
      </div >
      <div className="container">

        <Card style={{ backgroundColor: "#6600ff" }}>
          <Card.Body>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                     
                        <Button
                          onClick={() => openModal(product)}
                          style={{
                            color: "#6600ff",
                            backgroundColor: "#ccb3ff"
                          }}
                          size="lg" type="submit">
                        <b>Update</b>
                        </Button>
     
                      {' '}
                      <Button
                        onClick={() => deleteHandler(product)}
                        style={{
                          color: "#000",
                          backgroundColor: "#ccb3ff"
                        }}
                        size="lg" type="submit">
                        <b>Delete</b>
                      </Button>   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>
    </>
  );

  // return (
  //   <div className="content content-margined">
  //     <div className="product-header">
  //       <h3>Products</h3>
  //       <button className="button primary" onClick={() => openModal({})}>
  //         Create Product
  //       </button>
  //     </div>
  //     {modalVisible && (
  //       <div className="form">
  //         <form onSubmit={submitHandler}>
  //           <ul className="form-container">
  //             <li>
  //               <h2>Create Product</h2>
  //             </li>
  //             <li>
  //               {loadingSave && <div>Loading...</div>}
  //               {errorSave && <div>{errorSave}</div>}
  //             </li>

  //             <li>
  //               <label htmlFor="name">Name</label>
  //               <input
  //                 type="text"
  //                 name="name"
  //                 value={name}
  //                 id="name"
  //                 onChange={(e) => setName(e.target.value)}
  //               ></input>
  //             </li>
  //             <li>
  //               <label htmlFor="price">Price</label>
  //               <input
  //                 type="text"
  //                 name="price"
  //                 value={price}
  //                 id="price"
  //                 onChange={(e) => setPrice(e.target.value)}
  //               ></input>
  //             </li>
  //             <li>
  //               <label htmlFor="image">Image</label>
  //               <input
  //                 type="text"
  //                 name="image"
  //                 value={image}
  //                 id="image"
  //                 onChange={(e) => setImage(e.target.value)}
  //               ></input>
  //               <input type="file" onChange={uploadFileHandler}></input>
  //               {uploading && <div>Uploading...</div>}
  //             </li>
  //             <li>
  //               <label htmlFor="brand">Brand</label>
  //               <input
  //                 type="text"
  //                 name="brand"
  //                 value={brand}
  //                 id="brand"
  //                 onChange={(e) => setBrand(e.target.value)}
  //               ></input>
  //             </li>
  //             <li>
  //               <label htmlFor="countInStock">CountInStock</label>
  //               <input
  //                 type="text"
  //                 name="countInStock"
  //                 value={countInStock}
  //                 id="countInStock"
  //                 onChange={(e) => setCountInStock(e.target.value)}
  //               ></input>
  //             </li>
  //             <li>
  //               <label htmlFor="name">Category</label>
  //               <input
  //                 type="text"
  //                 name="category"
  //                 value={category}
  //                 id="category"
  //                 onChange={(e) => setCategory(e.target.value)}
  //               ></input>
  //             </li>
  //             <li>
  //               <label htmlFor="description">Description</label>
  //               <textarea
  //                 name="description"
  //                 value={description}
  //                 id="description"
  //                 onChange={(e) => setDescription(e.target.value)}
  //               ></textarea>
  //             </li>
  //             <li>
  //               <button type="submit" className="button primary">
  //                 {id ? 'Update' : 'Create'}
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 type="button"
  //                 onClick={() => setModalVisible(false)}
  //                 className="button secondary"
  //               >
  //                 Back
  //               </button>
  //             </li>
  //           </ul>
  //         </form>
  //       </div>
  //     )}

  //     <div className="product-list">



  //     </div>
  //   </div>
  // );
}
export default ProductsScreen;
