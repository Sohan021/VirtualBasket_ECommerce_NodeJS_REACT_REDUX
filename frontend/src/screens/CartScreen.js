import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Button, Input } from 'reactstrap';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return (<div className="container" style={{ width: "876px", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "60px" }}
  >
    { cartItems ? (
      <Card style={{ color: "#000", backgroundColor: "#6600ff", borderColor: "#5cb85c" }} >
        <div className="row">
          <div className="col-8">
            {cartItems.map((item) => (
              <div className="row">
                <div className="col-4">
                  <Card.Body>
                    <Card.Img variant="top" height="110px" width="60px" src={item.image} />
                    <b><h3 style={{ color: "#ffb3d9" }}>{item.name}</h3></b>
                  </Card.Body>
                </div>
                <div className="col-8">
                  <div className="row" style={{ paddingTop: "50px" }}>
                    <Card.Body style={{ width: "50px" }}>
                      <Input
                        style={{ color: "#6600ff", backgroundColor: "#ffb3d9" }}
                        type="select"
                        name="select"
                        id="exampleSelect"
                        size="lg"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map(x =>
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        )}
                      </Input>
                    </Card.Body>
                    <Card.Body>
                      <Card style={{ color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b>{item.price * item.qty}</b></Card>
                    </Card.Body>
                    <Card.Body style={{ width: "50px" }}>
                      <Button
                        style={{ color: "#fff", }}
                        color="danger" size="lg" block type="submit"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Delete?
                          </Button>
                    </Card.Body>
                  </div>
                </div>
              </div>
            ))}

          </div>
          <div className="col-4">
            <Card.Body style={{ paddingTop: "60px" }}>
              <h3 style={{ color: "#ffb3d9", backgroundColor: "#" }}>Total Item: {cartItems.reduce((a, c) => a + c.qty * 1, 0)} items</h3>
              <h3 style={{ color: "#ffb3d9", backgroundColor: "#" }}>Total Price: {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}Taka</h3>
              <Button
                style={{ color: "#6600ff", backgroundColor: "#ffb3d9", marginTop: "25px" }}
                color="success" size="lg" block type="submit"
                onClick={checkoutHandler}
              >
                <b> Proceed to Checkout</b>
              </Button>
            </Card.Body>
          </div>
        </div>
      </Card>
    ) : (
        <h1></h1>
      )}
  </div >)
}

export default CartScreen;