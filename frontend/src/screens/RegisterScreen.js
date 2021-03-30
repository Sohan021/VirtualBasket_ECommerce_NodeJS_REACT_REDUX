import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
    props.history.push('/')
  }
  return (
    <div className="content" style={{ backgroundColor: "#fff" }}>
      <div className="container" style={{ width: 475, height: 650, marginTop: 60, backgroundColor: "#9966ff" }}>
        <br />
        <br />
        <br />
        <h1 style={{ color: "#6600ff", textAlign: "center" }}>Create Account</h1>
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
                for="name"
                style={{ color: "#6600ff" }}
              >
                <h4>
                  Name
                </h4>
              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="text"
                name="name"
                color="#6600ff"
                placeholder="Enter Your Name"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup >
              <Label
                for="name"
                style={{ color: "#6600ff" }}
              >
                <h4>
                  Email
                </h4>

              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="text"
                name="name"
                color="#6600ff"
                placeholder="Enter Your Email Address"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup >
              <Label
                for="password"
                style={{ color: "#6600ff" }}
              >
                <h4>
                  Password
                </h4>
              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="password"
                name="name"
                color="#6600ff"
                placeholder="Enter Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup >
              <Label
                for="password"
                style={{ color: "#6600ff" }}
              >
                <h4>
                  Re Enter Password
                </h4>
              </Label>
              <Input
                style={{ color: "#fff", backgroundColor: "#ccb3ff" }}
                type="password"
                name="name"
                color="#6600ff"
                placeholder="Re Enter Password"
                size="lg"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </FormGroup>
          </div>
          <Button
            style={{
              color: "#6600ff",
              backgroundColor: "#ccb3ff"
            }}
            size="lg" block type="submit"

          >
            <b>Register</b>
          </Button>
          <Button
            style={{
              color: "#fff",
              backgroundColor: "#ccb3ff"
            }}
            size="lg" block type="submit" >
            <a href="/signin">Already have an account Account?</a>
          </Button>
        </Form>
      </div>
    </div >
  )

}
export default RegisterScreen;