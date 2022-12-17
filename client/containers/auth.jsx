import React from 'react';

const Auth = ({setDisplayLogin, handleSubmit, onLogin, register}) => {
    return(
    <form className='auth-form' onSubmit={handleSubmit(onLogin)} >
        <div className='wrapper shadow'>
            <input className="my-7 input input-bordered input-accent w-full max-w-xs" placeholder="Username..." {...register("username", { required: true })} name="username" type="text" />
            <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Password..." {...register("password", { required: true })} name="password" type="password" />
            <input className="btn my-7 btn-outline btn-accent auth-input" value="Log In" type="submit" />
        </div>
        <button onClick={() => setDisplayLogin(false)} className="btn btn-accent">Back to main</button>
    </form>)
}

export default Auth;