import React, { useState, useRef } from "react";
import { useForm } from 'react-hook-form'
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Navbar from '../components/nav-bar';
import '../static/styles.css'
import Navbar from "../components/nav-bar";


const LandingPage = (props) => {
    const navigate = useNavigate();
    const {register, handleSubmit } = useForm();
    const [username, setUsername] = useState('');
    const [displayLogin, setDisplayLogin] = useState(false);
    const nodeRef = useRef(null);

    function openDashboard () {
        navigate('/dashboard');
    }


    const onLogin = data => {
        setUsername(data.username);
    }

    const handleLogin = () => {
        setDisplayLogin(true);
    }
 
    return (
        <>
        <Navbar handleLogin={handleLogin}  renderDrawerButton={false}/>
        <main className='landing-container'>
            <article className='font-mono'>
                <h1 className='text-3xl'>Kafka Compass</h1>
                <p className='my-7'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </article>
            <button className="btn" onClick={openDashboard}>Navigate to Dashboard</button>

            {displayLogin &&
            <>
                <form ref={nodeRef} className='auth-form' onSubmit={handleSubmit(onLogin)} >
                        <div className='wrapper shadow'>
                            <input className="my-7 input input-bordered input-accent w-full max-w-xs" placeholder="Username..." {...register("username", { required: true })} name="username" type="text" />
                            <input className="my-2 input input-bordered input-accent w-full max-w-xs" placeholder="Password..." {...register("password", { required: true })} name="password" type="password" />
                            <input className="btn my-7 btn-outline btn-accent auth-input" value="Log In" type="submit" />
                        </div>
                        <button onClick={() => setDisplayLogin(false)} className="btn btn-accent">Back to main</button>
                </form>
            </>}
        </main>
        </>
    )
}

export default LandingPage