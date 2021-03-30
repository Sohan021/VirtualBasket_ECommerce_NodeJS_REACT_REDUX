

{
    userInfo ? (
        <Link to="/profile">{userInfo.name}</Link>
    ) : (
            <Link to="/signin">Sign In</Link>
        )
}
{
    userInfo && userInfo.isAdmin && (
        <div className="dropdown">
            <a href="#">Admin</a>
            <ul className="dropdown-content">
                <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                </li>
            </ul>
        </div>
    )
}