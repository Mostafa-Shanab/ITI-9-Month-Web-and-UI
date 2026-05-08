import React from 'react';
import { Link, Outlet } from 'react-router';

const Tech = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="left-side bg-secondary-subtle col-2 mx-2 rounded-3 d-flex justify-content-center align-items-center" style={{height:'85vh'}}>
            <ul className='nav d-flex flex-column'>
              <li className='nav-item btn btn-danger my-2'><Link className='nav-link fw-bold text-dark' to='web'>Web</Link></li>
              <li className='nav-item btn btn-warning my-2'><Link className='nav-link fw-bold text-dark' to='mobile'>Mobile</Link></li>
            </ul>
          </div>
          <div className="right-side bg-primary-subtle col-9 mx-2 rounded-3" style={{height:'85vh'}}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tech;
