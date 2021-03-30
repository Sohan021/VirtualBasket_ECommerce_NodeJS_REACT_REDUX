import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Button, Input } from 'reactstrap';

function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  
  // if (!shipping.address) {
  //   props.history.push("/shipping");
  // } else if (!payment.paymentMethod) {
  //   props.history.push("/payment");
  // }

  
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = 60;
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

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
                    <Card.Img variant="top" height="110px" width="110px" src={item.image} />
                    <b><h3 style={{ color: "#ffb3d9" }}>{item.name}</h3></b>
                  </Card.Body>
                </div>
                <div className="col-8">
                  <div className="row" style={{ paddingTop: "50px" }} >
                    <Card.Body>
                      <Card style={{ color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b>Qty: {item.qty}</b></Card>
                    </Card.Body>
                    <Card.Body>
                      <Card style={{ color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b>{item.price * item.qty}</b></Card>
                    </Card.Body>
                  </div>
                </div>
              </div>

            ))}

          </div>
          <div className="col-4">

            <Card.Body>
              <ListGroup className="list-group-flush">
                <br />
                <br />
                <br />
                <ListGroupItem style={{ color: "#6600ff", backgroundColor: "#ffb3d9", textAlign: "center" }}>
                  <h3 style={{ color: "#6600ff" }}>Order Summary</h3>
                </ListGroupItem>
                <br />
                <br />
                <ListGroupItem style={{ color: "#6600ff", backgroundColor: "#ffb3d9", textAlign: "center" }}>
                  <h6 style={{ color: "#6600ff" }}>
                    Address:
                    {cart.shipping.address}, {cart.shipping.city},
                    {cart.shipping.postalCode}, {cart.shipping.country},
                  </h6>
                </ListGroupItem>
                <ListGroupItem style={{ color: "#6600ff", backgroundColor: "#ffb3d9", textAlign: "center" }}>
                  <h6 style={{ color: "#6600ff" }}>
                    Payment Method: {cart.payment.paymentMethod}
                  </h6>
                </ListGroupItem>
                <br />

                <ListGroupItem style={{ color: "#6600ff", backgroundColor: "#ffb3d9", textAlign: "center" }}>
                  <h4>Total Item: {cartItems.reduce((a, c) => a + c.qty * 1, 0)} items</h4>
                </ListGroupItem>
                <ListGroupItem style={{ color: "#6600ff", backgroundColor: "#ffb3d9", textAlign: "center" }}>
                  <h4>TotalPrice: {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}Taka</h4>
                </ListGroupItem>
                {/* <ListGroupItem style={{ color: "#000", backgroundColor: "#fff", textAlign: "center" }}>
                  <h4>Main Account Will Have: {fund.mainAccount - cartItems.reduce((a, c) => a + c.price * c.qty, 0)} Taka</h4>
                </ListGroupItem> */}
                {/* <ListGroupItem style={{ color: "#000", backgroundColor: "#fff", textAlign: "center" }}>
                  <h4>Shipping Address: </h4>
                  <h5>Shop Name: {userInfo.item1.agentShopName}</h5>
                  <h5>Market: {userInfo.item1.marketName}</h5>
                  <h5>Union / Ward: {userInfo.item1.unionName}</h5>
                  <h5>Upozila: {userInfo.item1.upozilaName}</h5>
                  <h5>District: {userInfo.item1.districtName}</h5>
                </ListGroupItem> */}


                <br />
                <ListGroupItem style={{ color: "#000", backgroundColor: "#ffb3d9", textAlign: "center" }}>
                  <Button
                    style={{ color: "#ffb3d9", backgroundColor: "#6600ff" }}
                    size="lg" block type="submit"
                    onClick={placeOrderHandler}
                  >
                    <b>Confirm Order</b>
                  </Button>
                </ListGroupItem>


              </ListGroup>

            </Card.Body>
          </div>
        </div>

      </Card>

    ) : (
        <h1></h1>
      )}
  </div >)

  // return <div>
  //   <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
  //   <div className="placeorder">
  //     <div className="placeorder-info">
  //       <div>
  //         <h3>
  //           Shipping
  //         </h3>
  //         <div>
  //           {cart.shipping.address}, {cart.shipping.city},
  //         {cart.shipping.postalCode}, {cart.shipping.country},
  //         </div>
  //       </div>
  //       <div>
  //         <h3>Payment</h3>
  //         <div>
  //           Payment Method: {cart.payment.paymentMethod}
  //         </div>
  //       </div>
  //       <div>
  //         <ul className="cart-list-container">
  //           <li>
  //             <h3>
  //               Shopping Cart
  //         </h3>
  //             <div>
  //               Price
  //         </div>
  //           </li>
  //           {
  //             cartItems.length === 0 ?
  //               <div>
  //                 Cart is empty
  //         </div>
  //               :
  //               cartItems.map(item =>
  //                 <li>
  //                   <div className="cart-image">
  //                     <img src={item.image} alt="product" />
  //                   </div>
  //                   <div className="cart-name">
  //                     <div>
  //                       <Link to={"/product/" + item.product}>
  //                         {item.name}
  //                       </Link>

  //                     </div>
  //                     <div>
  //                       Qty: {item.qty}
  //                     </div>
  //                   </div>
  //                   <div className="cart-price">
  //                     ${item.price}
  //                   </div>
  //                 </li>
  //               )
  //           }
  //         </ul>
  //       </div>


  //     </div>
  //     <div className="placeorder-action">
  //       <ul>
  //         <li>
  //           <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
  //         </li>
  //         <li>
  //           <h3>Order Summary</h3>
  //         </li>
  //         <li>
  //           <div>Items</div>
  //           <div>${itemsPrice}</div>
  //         </li>
  //         <li>
  //           <div>Shipping</div>
  //           <div>${shippingPrice}</div>
  //         </li>
  //         <li>
  //           <div>Tax</div>
  //           <div>${taxPrice}</div>
  //         </li>
  //         <li>
  //           <div>Order Total</div>
  //           <div>${totalPrice}</div>
  //         </li>
  //       </ul>



  //     </div>

  //   </div>
  // </div>

}

export default PlaceOrderScreen;