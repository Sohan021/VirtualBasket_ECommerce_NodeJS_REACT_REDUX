import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { logout } from './actions/userActions';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());

  }

  return (
    <BrowserRouter>

      <Navbar
        color="#fff"
        style={{ backgroundColor: "#ffb3d9", height: "90px" }}
        light
        className="navbar"
        expand="md"
        fixed="top"
      >


        <Collapse navbar>

          <Nav>
            <NavLink style={{ color: "#5500ff" }} href="/"><h1>Virtual Basket</h1></NavLink>
          </Nav>
          {userInfo && userInfo.isAdmin == false && (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={{
                  color: "#ffb3d9",
                  backgroundColor: "#6600ff",
                  borderRadius: 50,
                  width: "100px",
                  textAlign: "center"
                }} href="/profile"><h5>{userInfo.name}</h5></NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{
                  color: "#ffb3d9",
                  backgroundColor: "#6600ff",
                  borderRadius: 50,
                  width: "100px",
                  textAlign: "center"
                }} href="/cart" ><h5>Cart</h5></NavLink>
              </NavItem>
            </Nav>
          )}

          {userInfo ? (
            <div></div>
          ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    style={{
                      color: "#ffb3d9",
                      backgroundColor: "#6600ff",
                      borderRadius: 50,
                      width: "100px",
                      textAlign: "center"
                    }}
                    href="/signin" ><h5>SignIn</h5></NavLink>
                </NavItem>
              </Nav>
            )}

          {
            userInfo && userInfo.isAdmin && (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink style={{
                    color: "#ffb3d9",
                    backgroundColor: "#6600ff",
                    borderRadius: 50,
                    width: "100px",
                    textAlign: "center"
                  }}
                    href="/profile"><h5>{userInfo.name}</h5>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{
                    color: "#ffb3d9",
                    backgroundColor: "#6600ff",
                    borderRadius: 50,
                    width: "100px",
                    textAlign: "center"
                  }}
                    href="/orders" ><h5>Orders</h5>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{
                    color: "#ffb3d9",
                    backgroundColor: "#6600ff",
                    borderRadius: 50,
                    width: "100px",
                    textAlign: "center"
                  }} href="/products" >
                    <h5>Products</h5>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink style={{
                    color: "#fff",
                    backgroundColor: "#6600ff",
                    borderRadius: 50,
                    width: "180px",
                    textAlign: "center"
                  }} onClick={handleLogout} ><h5>{userInfo.name}_Logout</h5></NavLink>
                  {/* <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button> */}
                </NavItem>

              </Nav>
            )
          }

        </Collapse>
      </Navbar >






      <div className="grid-container">
        {/* <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">HelloBazar</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header> */}
        <aside className="sidebar">
          <h3>Shopping Types</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Pants">Pants</Link>
            </li>

            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        {/* <footer className="footer">All right reserved.</footer> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

