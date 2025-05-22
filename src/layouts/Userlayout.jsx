import React from 'react';
import Navbar from '../components/Navbar';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
};

export default UserLayout;
