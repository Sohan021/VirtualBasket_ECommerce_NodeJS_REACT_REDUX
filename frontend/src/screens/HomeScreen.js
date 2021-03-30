import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}
      <div className="container">
        <br />
        <br />
        <div className="row">

          <div className="col-2">

          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-8">
                <Form onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Input
                          type="text"
                          name="searchKeyword"
                          color="#6600ff"
                          onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <Button style={{
                        color: "#6600ff",
                        backgroundColor: "#ffb3d9"
                      }} outline color="primary" size="lg" block type="submit">
                        Search
                       </Button>
                    </div>
                  </div>
                </Form>
              </div>

              <div className="col-4">
                <Form>
                  <FormGroup>
                    <Input
                      style={{ color: "#6600ff", backgroundColor: "#fff" }}
                      type="select"
                      name="select"
                      id="exampleSelect"
                      size="lg"
                      onChange={sortHandler}
                    >
                      <option value="lowest">Lowest</option>
                      <option value="highest">Highest</option>
                    </Input>
                  </FormGroup>
                </Form>
              </div>
            </div>

            <div className="col-2">

            </div>
          </div>


        </div>
      </div>



      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (

            <div className="container">
              <br />
              <br />
              <br />
              <br />
              {products ? (
                <div className="row">
                  {products.map((product) => (
                    <div className="col-3">
                      <Card style={{ color: "#000", backgroundColor: "#fff" }} >
                        <Link to={'/product/' + product._id}>
                          <Card.Img variant="top" height="200px" src={product.image} />
                        </Link>

                        <Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem style={{ backgroundColor: "#fff", textAlign: "center" }}>
                              <b> {product.name} </b><p style={{ textAlign: "center", color: "#ff8000" }}>
                                <h4><b4>৳{product.price}</b4></h4></p>
                            </ListGroupItem>
                            <h6>
                              <Rating
                                value={product.rating}
                                text={product.numReviews + ' reviews'}
                              />
                            </h6>
                          </ListGroup>
                        </Card.Body>
                      </Card>
                      <br />
                      <br />
                    </div>
                  ))}
                </div>
              ) : (
                  <h1>You dont hv any paymnt yet</h1>
                )}
            </div>
          )}
    </>
  );
}
export default HomeScreen;
