import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Account = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) return <p>Please log in to view your account.</p>;

  return (
    <div className="account">
      <h2>Welcome, {user.username}!</h2>
      <p>You have 0 books checked out. (Feature placeholder)</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Account;
