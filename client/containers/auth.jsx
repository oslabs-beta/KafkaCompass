import React from 'react';
import { useForm } from 'react-hook-form';

const Auth = ({authMode, setDisplayAuth, navigate, setDrawerButton}) => {
    const {register, handleSubmit } = useForm();
    // render either log in or sign up form
    const renderLogin = authMode === 'login' ? true : false;

    const onLogin = async data => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                })
            });
            if (response.ok) {
                setDrawerButton(true);
                setDisplayAuth('');
                return navigate('/dashboard');
            }
            console.log('Login failed: invalid password or username');
        } catch(err) {
            console.log('Network error occurred');
        }
    }

    const onSignup = async data => {
        const credentials = {username: data.username, 
                            password: data.password,
                            email: data.email};

        if (data.firstName) credentials.firstName = data.firstName;
        if (data.lastName) credentials.lastName = data.lastName;

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(credentials)
            });
            if (response.ok) {
                setDrawerButton(true);
                setDisplayAuth('');
                return navigate('/dashboard');
            }
            console.log('Sign up failed: this email or username is already taken');
        } catch(err) {
            console.log('Network error occurred');
    }}

    return(
    <>
        {renderLogin && 
        <form className='auth-form' onSubmit={handleSubmit(onLogin)} >
            <div className='wrapper shadow'>
                <input className="my-7 input input-bordered input-accent w-full max-w-xs" placeholder="Username..." {...register("username", { required: true })} name="username" type="text" />
                <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Password..." {...register("password", { required: true })} name="password" type="password" />
                <input className="btn my-7 btn-outline btn-accent auth-input" value="Log In" type="submit" />
            </div>
            <button onClick={() => {
                                    setDrawerButton(false);
                                    setDisplayAuth('');
                                    navigate('/');
                                    }} 
                                    className="btn btn-accent">Back to main</button>
        </form>}

        {!renderLogin && 
        <form className='auth-form' onSubmit={handleSubmit(onSignup)} >
          <div className='wrapper shadow'>
              <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Username..." {...register("username", { required: true })} name="username" type="text" />
              <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="First name..." {...register("firstName", { required: false })} name="firstName" type="text" />
              <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Last name..." {...register("lastName", { required: false })} name="lastName" type="text" />
              <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Email..." {...register("email", { required: true })} name="email" type="email" />
              <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Password..." {...register("password", { required: true })} name="password" type="password" />
              <input className="btn my-7 btn-outline btn-accent auth-input" value="Sign Up" type="submit" />
          </div>
          <button onClick={() => {
                                setDrawerButton(false);
                                setDisplayAuth('');
                                navigate('/');
                                }} 
                                className="btn btn-accent">Back to main</button>
        </form>}
    </>)
}

export default Auth;