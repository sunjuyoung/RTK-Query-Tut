import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'




const Login = () => {
    const userRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login,{isLoading}] =  useLoginMutation();

    useEffect(() => {
        userRef.current.focus()
    }, [])
    
    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>


    const handleUserInput = (e) =>{
        setUsername(e.target.value)
    }
    const handlePwdInput = (e) =>{
        setPassword(e.target.value)
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()

        try {
            const { token,email,name,id } = await login({email:username,password}).unwrap()
            console.log({token,email,name,id})
            dispatch(setCredentials({accessToken:token}))
            setUsername('')
            setPassword('')
            navigate('/dash')
    
        } catch (error) {
            console.log(error);
        }


    }
    if (isLoading) return <p>Loading...</p>


    const content = (
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p  className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>
                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default Login