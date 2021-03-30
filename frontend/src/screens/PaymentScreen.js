import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };


  return (
    <div className="content" style={{ backgroundColor: "#fff" }}>
      <div className="container" style={{ width: 475, height: 350, marginTop: 60, backgroundColor: "#9966ff" }}>
        <br />
        <br />
        <br />
        <h1 style={{ color: "#6600ff", textAlign: "center" }}>Payment method</h1>

        <Form
          onSubmit={submitHandler}
          className="rounded-pill" alt="150x75"
        >
          <div
            style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}
          >
            <FormGroup >
              <Label
                for="name"
                style={{ color: "#6600ff" }}
              >

              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="radio"
                name="name"
                size="lg"
                value="Mobile Banking"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

            </FormGroup>
            <h4><b>Mobile Banking</b></h4>
          </div>
          <br />
          <br />
          <Button
            style={{
              color: "#6600ff",
              backgroundColor: "#ccb3ff"
            }}
            size="lg" block type="submit">
            <b>Submit</b>
          </Button>
        </Form>
      </div>
    </div >
  )


  // return (
  //   <div>
  //     <CheckoutSteps step1 step2 step3></CheckoutSteps>
  //     <div className="form">
  //       <form onSubmit={submitHandler}>
  //         <ul className="form-container">
  //           <li>
  //             <h2>Payment</h2>
  //           </li>

  //           <li>
  //             <div>
  //               <input
  //                 type="radio"
  //                 name="paymentMethod"
  //                 id="paymentMethod"
  //                 value="paypal"
  //                 onChange={(e) => setPaymentMethod(e.target.value)}
  //               ></input>
  //               <label for="paymentMethod">Mobile Banking</label>
  //             </div>
  //           </li>

  //           <li>
  //             <button type="submit" className="button primary">
  //               Continue
  //             </button>
  //           </li>
  //         </ul>
  //       </form>
  //     </div>
  //   </div>
  // );
}
export default PaymentScreen;
