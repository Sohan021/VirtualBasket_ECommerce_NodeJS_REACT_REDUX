import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';


function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }

return(
  <>
  <br/>
   <div className="container" style={{paddingTop:"30px"}}>
          {
        loading ? <div>Loading...</div> :
         
        <Card style={{ backgroundColor: "#6600ff" }}>
          <Card.Body>
              
            <table className="table">
              <thead>
                 <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>USER</th>
                    <th>PAID</th>
                    <th>PAID AT</th>
                    <th>DELIVERED</th>
                    <th>DELIVERED AT</th>
                    <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                    <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                 <Link to={"/order/" + order._id}>
                 <Button
            style={{
              color: "#6600ff",
              backgroundColor: "#ccb3ff"
            }}
            size="lg"  type="submit">
            <b>Details</b>
          </Button>

          </Link>
             
                {' '}
 
                 <Button
                 onClick={() => deleteHandler(order)}
            style={{
              color: "#000",
              backgroundColor: "#ccb3ff"
            }}
            size="lg"  type="submit">
            <b>Delete</b>
          </Button>    
              </td>
                </tr>)}
              </tbody>
            </table>

          </Card.Body>

        </Card>
}
          </div>
  </>
)


  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;