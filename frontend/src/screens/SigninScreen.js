import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
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
    dispatch(signin(email, password));

  }
  return (
    <div className="content" style={{ backgroundColor: "#fff" }}>

      <div className="container" style={{ width: 475, height: 500, marginTop: 60, backgroundColor: "#9966ff" }}>
        <br />
        <br />
        <br />

        <h1 style={{ color: "#6600ff", textAlign: "center" }}>Sign In</h1>
        <p style={{ color: "#6600ff", textAlign: "center" }}>______________</p>

        <Form
          onSubmit={submitHandler}
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
          </div>

          <Button
            style={{
              color: "#6600ff",
              backgroundColor: "#ccb3ff"
            }}
            size="lg" block type="submit">
            <b>SignIn</b>

          </Button>
          <Button
            style={{
              color: "#fff",
              backgroundColor: "#ccb3ff"
            }}
            size="lg" block type="submit" >
            <a href="/register">Do not have any Account?</a>
          </Button>
        </Form>
      </div>
    </div >
  )

  // <div className="form">
  //   <form onSubmit={submitHandler} >
  //     <ul className="form-container">
  //       <li>
  //         <h2>Sign-In</h2>
  //       </li>
  //       <li>
  //         {loading && <div>Loading...</div>}
  //         {error && <div>{error}</div>}
  //       </li>
  //       <li>
  //         <label htmlFor="email">
  //           Email
  //         </label>
  //         <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
  //         </input>
  //       </li>
  //       <li>
  //         <label htmlFor="password">Password</label>
  //         <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
  //         </input>
  //       </li>
  //       <li>
  //         <button type="submit" className="button primary">Sign in</button>
  //       </li>
  //       <li>
  //         New to HelloBazar?
  //       </li>
  //       <li>
  //         <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your HelloBazar account</Link>
  //       </li>
  //     </ul>
  //   </form>
  // </div>
}
export default SigninScreen;