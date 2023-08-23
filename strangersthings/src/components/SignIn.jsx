import { useState } from 'react'
import { SignInData } from "../API";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function SignInPage() {
    const [username, setUsername] = useLocalStorage("Username", "");
        useState(() => {
            const savedUser = localStorage.getItem("Username");
            const parsedUser = JSON.parse(savedUser);
            return parsedUser || "";
        });

    const [password, setPassword] = useLocalStorage("Password", "");
        useState(() => {
            const savedPass = localStorage.getItem("Password");
            const parsedPass = JSON.parse(savedPass);
            return parsedPass || "";
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        if (password !== setPassword) {
            return;
        }
        const response = await SignInData(username, password);
        event.preventDefault();
        if (response.success) {
            navigate("/posts");
        } else {
            setError(errors);
        }
   }

  return (

    <div className="signInApp">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='sign-up-form'>
            <label>
                Username 
            </label>
            <input 
            {...register("Username", {
                required: true,
            })}
                type="text"
                name="name"
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
                id="name"
                />
                {errors.username?.type === 'required' && <p>Invalid Username</p>}
                <br/>
                <br/>
            <label>
                Password 
            </label>
            <input
            {...register("Password", {
                required: true,
            })}
                type="password"
                name="password"
                value={password}
                placeholder="**********"
                onChange={(event) => setPassword(event.target.value)}
                id="password"
                />
                {errors.password?.type === 'required' && <p>Invalid Password</p>}
                <br/>
                <br/>

                <button onClick={(() => (setPassword(password)))}>Sign In</button>
       
                {/* <button onClick={setUserName === username && setPassword === password ? onClick="submit" : username && password}>Sign In</button> */}
        </form>
    </div>

    )
}
