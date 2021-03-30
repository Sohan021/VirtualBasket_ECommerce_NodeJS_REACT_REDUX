import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';


function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };


  return (
    <div className="container"
      style={{ width: "676px", backgroundColor: "#fff", justifyContent: "left", alignItems: "center", textAlign: "center", marginTop: "30px" }}>
      { product ? (
        <Card style={{ color: "#fff", backgroundColor: "#6600ff", borderColor: "#000", justifyContent: "left", alignItems: "center", textAlign: "center" }} >
          <div className="row">
            <Card.Body >
              <Card.Img  variant="top" src={product.image} height="300px" width="200px" />
            </Card.Body>
            <br/>
            <Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem style={{ backgroundColor: "#ffb3d9", textAlign: "center" }}>
                  <b style={{ color: "#6600ff" }}> <h3>{product.name}</h3> </b>
                  <p style={{ textAlign: "center", color: "#ff8000" }}>
                    <h4><b4>৳{product.price}</b4></h4>
                  </p>
                  <b style={{ color: "#6600ff" }}><h3><p>{product.category}  {product.brand}</p></h3></b>
                  <b style={{ color: "#6600ff" }}><h3>{product.countInStock}</h3></b>
                </ListGroupItem>

                <ListGroupItem style={{ color: "#000", backgroundColor: "#6600ff", textAlign: "center" }}>
                  <Input
                    style={{ color: "#6600ff", backgroundColor: "#ffb3d9" }}
                    type="select"
                    name="select"
                    id="exampleSelect"
                    placeholder="Select Quantity"
                    size="lg"
                    onChange={(e) => { setQty(e.target.value) }}
                  >
                    <option>Select Quantity</option>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Input>
                </ListGroupItem>
              </ListGroup>
              {product.countInStock > 0 && (
                <Button
                  style={{ color: "#6600ff", backgroundColor: "#ffb3d9" }}
                  outline color="primary" size="lg" block type="submit"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>)}
            </Card.Body>
          </div>







          <div className="row">
            <Card.Body>
              {userInfo ? (
                <Form
                  onSubmit={submitHandler}
                >
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Input
                          style={{ color: "#6600ff", backgroundColor: "#fff" }}
                          type="select"
                          name="select"
                          id="exampleSelect"
                          size="lg"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >

                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        ))
                      </Input>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup >
                        <Input
                          style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                          type="text"
                          name="name"
                          color="#6600ff"
                          placeholder="Enter Your Comment"
                          size="lg"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </FormGroup>
                    </div>
                   
                   
                  </div>
                  <Button
                    style={{
                      color: "#6600ff",
                      backgroundColor: "#ccb3ff"
                    }}
                    size="lg" block type="submit">
                    <b>Submit</b>
                  </Button>

                </Form>
              ) : (
                  <div>
                    <Button
                      style={{
                        color: "#fff",
                        backgroundColor: "#ccb3ff"
                      }}
                      size="lg" block type="submit" >
                      <a href="/signin">Sign In</a>
                    </Button>
                  </div>
                )}

            </Card.Body>
          </div>
          <div className="row">    
            {!product.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              </ul>
          </div>
        </Card>

      ) : (
          <h1></h1>
        )}
    </div >
  );


  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
            <>
              <div className="details">
                <h2>Reviews</h2>
                {!product.reviews.length && <div>There is no review</div>}
                <ul className="review" id="reviews">
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <div>{review.name}</div>
                      <div>
                        <Rating value={review.rating}></Rating>
                      </div>
                      <div>{review.createdAt.substring(0, 10)}</div>
                      <div>{review.comment}</div>
                    </li>
                  ))}
                  <li>
                    <h3>Write a customer review</h3>
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <ul className="form-container">
                          <li>
                            <label htmlFor="rating">Rating</label>
                            <select
                              name="rating"
                              id="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very Good</option>
                              <option value="5">5- Excelent</option>
                            </select>
                          </li>
                          <li>
                            <label htmlFor="comment">Comment</label>
                            <textarea
                              name="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </li>
                          <li>
                            <button type="submit" className="button primary">
                              Submit
                        </button>
                          </li>
                        </ul>
                      </form>
                    ) : (
                        <div>
                          Please <Link to="/signin">Sign-in</Link> to write a review.
                        </div>
                      )}
                  </li>
                </ul>
              </div>
            </>
          )}
    </div>
  );
}
export default ProductScreen;
