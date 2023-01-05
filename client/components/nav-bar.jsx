import React, { useContext } from 'react';
import { NavbarContext } from '../NavbarContext';


const Navbar = ({
  navigate,
  logUserOut,
}) => {
  const {renderDrawerButton, setRenderDrawerButton} = useContext(NavbarContext).drawerButtonsState;
  const {loggedIn, setLoggedIn} = useContext(NavbarContext).loggedState;
  const {setAuthMode} = useContext(NavbarContext).authModeState;
  
  let drawerButton = <></>;
  if (renderDrawerButton) {
    drawerButton = (
      <>
        <label htmlFor='my-drawer' className='btn drawer-button mr-10 my-7'>
          Select Metrics
        </label>
        <button
          onClick={() => {
            navigate('/cluster-history');
          }}
          className='btn btn-outline mr-10 my-7'
        >
          Cluster History
        </button>
        <label htmlFor='my-modal-4' className='btn btn-outline mr-10 my-7'>
          Add New Cluster
        </label>
      </>
    );
  }

  let logButtons = <></>;
  if (loggedIn === false) {
    logButtons = (
      <>
        <button
          onClick={() => {
            setAuthMode('signup');
            navigate('/auth');
          }}
          className='btn btn-outline mr-10 my-7'
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            setAuthMode('login');
            navigate('/auth');
          }}
          className='btn btn-accent btn-outline mr-10 my-7'
        >
          Log In{' '}
        </button>
      </>
    );
  } else {
    logButtons = (
      <>
        <button
          onClick={() => {
            setRenderDrawerButton(false);
            navigate('/');
          }}
          className='btn btn-outline mr-10 my-7'
        >
          Home
        </button>

        <button
          onClick={() => {
            logUserOut();
            setRenderDrawerButton(false);
            setLoggedIn(false);
            navigate('/');
          }}
          className='btn btn-outline mr-10 my-7'
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <div className='navbar'>
      <div className='flex-1 flex-wrap justify-around grow-[2]'>
        {drawerButton}
      </div>
      <div className='flex-1 justify-end overflow-auto flex-wrap'>
        {logButtons}
      </div>
    </div>
  );
};

export default Navbar;
