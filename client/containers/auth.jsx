import React from 'react';

const Auth = ({setDisplayAuth, handleSubmit, onLogin, onSignup, register, mode}) => {

    // render either log in or sign up form
    const renderLogin = mode === 'login' ? true : false;

    return(
    <>
        {renderLogin && 
        <form className='auth-form' onSubmit={handleSubmit(onLogin)} >
            <div className='wrapper shadow'>
                <input className="my-7 input input-bordered input-accent w-full max-w-xs" placeholder="Username..." {...register("username", { required: true })} name="username" type="text" />
                <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Password..." {...register("password", { required: true })} name="password" type="password" />
                <input className="btn my-7 btn-outline btn-accent auth-input" value="Log In" type="submit" />
            </div>
            <button onClick={() => setDisplayAuth(false)} className="btn btn-accent">Back to main</button>
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
          <button onClick={() => setDisplayAuth(false)} className="btn btn-accent">Back to main</button>
        </form>}
    </>)
}

export default Auth;