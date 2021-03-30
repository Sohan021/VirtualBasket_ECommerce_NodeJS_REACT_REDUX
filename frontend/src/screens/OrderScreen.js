import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'


function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;


  return (<div className="container">
        <br />
        <br />
        <br />
        <br />
        {order ? (
          <Card>
            <div className="row" style={{ justifyContent: "center" }}>
         
              <Card.Body>
                <Card style={{ textAlign: "center", color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b>Address:  {order.shipping.address}, {order.shipping.city},
                  {order.shipping.postalCode}, {order.shipping.country}</b></Card>
                <Card style={{ textAlign: "center", color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b>  Payment Method: {order.payment.paymentMethod}</b></Card>
                <Card style={{ textAlign: "center", color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b>  Item Price: {order.itemPrice}</b></Card>
                <Card style={{ textAlign: "center", color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b>Shipping Price: {order.shippingPrice}  </b></Card>
                <Card style={{ textAlign: "center", color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b>  Total Price: {order.totalPrice} </b></Card>
                <Card style={{ textAlign:"center", color: "#6600ff", backgroundColor: "#ffb3d9", height: "40px", justifyContent: "center" }}><b> {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}</b></Card>
              </Card.Body>
              
            </div>
            <Card>
               <Card.Body>
            <div className="row" style={{backgroundColor:"#ffb3d9"}}>
                  {order.orderItems.map((product) => (
                    <div className="col-2">
                                    <Card style={{ color: "#000", backgroundColor: "#ffb3d9" }} >
                                        <div className="row">
                                          <Card.Body>
                                            <Card.Img variant="top" height="150px"  src={product.image} />
                                          </Card.Body>
                                          <Card.Body>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem style={{ backgroundColor: "#fff", textAlign: "center" }}><h4> {product.name}<br/> Price: {product.price} Qty: {product.qty}</h4></ListGroupItem>       
                                                </ListGroup>
                                            </Card.Body>
                                        </div>
                                    </Card>                                   
                    </div>
                  ))}
            </div>  
            </Card.Body>
            </Card>
          </Card>
        ) : (
            <h1>You dont hv any paymnt yet</h1>
          )}
      </div>

  );

}

export default OrderScreen;