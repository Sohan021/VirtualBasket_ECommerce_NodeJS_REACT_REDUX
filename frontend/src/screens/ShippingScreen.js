import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';


function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  }

  return (
    <div className="content" style={{ backgroundColor: "#fff" }}>
      <div className="container" style={{ width: 475, height: 650, marginTop: 60, backgroundColor: "#9966ff" }}>
        <br />
        <br />
        <br />
        <h1 style={{ color: "#6600ff", textAlign: "center" }}>Shipping Address</h1>
        <p style={{ color: "#6600ff", textAlign: "center" }}>______________</p>
        <Form
          onSubmit={submitHandler}
          className="rounded-pill" alt="150x75"
        >
          <div
            style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}
          >
            <FormGroup >
              <Label
                for="address"
                style={{ color: "#6600ff" }}
              >
                <h4>
                  Address
                </h4>
              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="text"
                name="name"
                color="#6600ff"
                placeholder="Enter Your Address"
                size="lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
            <FormGroup >
              <Label
                for="name"
                style={{ color: "#6600ff" }}
              >
                <h4>
                  City
                </h4>

              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="text"
                name="name"
                color="#6600ff"
                placeholder="Enter Your City"
                size="lg"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormGroup>
            <FormGroup >
              <Label
                for="Postal Code"
                style={{ color: "#6600ff" }}
              >
                <h4>
                  PostalCode
                </h4>
              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="text"
                name="name"
                color="#6600ff"
                placeholder="Enter Your Postal Code"
                size="lg"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </FormGroup>
            <FormGroup >
              <Label
                for="name"
                style={{ color: "#6600ff" }}
              >
                <h4>
                  City
                </h4>

              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="text"
                name="name"
                color="#6600ff"
                placeholder="Enter Your City"
                size="lg"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </FormGroup>

          </div>
          <br />
          <Button
            style={{
              color: "#6600ff",
              backgroundColor: "#ccb3ff"
            }}
            size="lg" block type="submit">
            <b>Continue</b>
          </Button>

        </Form>
      </div>
    </div >
  )

}
export default ShippingScreen;