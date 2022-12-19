import React from 'react';

const AuthForm = ({handleSubmit, register, onSubmit, type, setDrawerButton, setDisplayAuth, navigate}) => {
    const login = type === 'Log In';

    return (
            <form className='auth-form' onSubmit={handleSubmit(onSubmit)} >
                <div className='wrapper shadow'>
                    <input className="mt-7 mb-2 input input-bordered input-accent w-full max-w-xs" placeholder="Username..." {...register("username", { required: true })} name="username" type="text" />
                    {!login && <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="First name..." {...register("firstName", { required: false })} name="firstName" type="text" />}
                    {!login && <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Last name..." {...register("lastName", { required: false })} name="lastName" type="text" />}
                    {!login && <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Email..." {...register("email", { required: true })} name="email" type="email" />}
                    <input className="mb-7 mt-2 input input-bordered input-accent w-full max-w-xs" placeholder="Password..." {...register("password", { required: true })} name="password" type="password" />
                    <input className="btn my-2 btn-outline btn-accent auth-input" value={type} type="submit" />
                </div>
                <button onClick={() => {
                                        setDrawerButton(false);
                                        setDisplayAuth('');
                                        navigate('/');
                                        }} 
                                        className="btn btn-accent">Back to main</button>
            </form>
    )
}

export default AuthForm;