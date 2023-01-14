import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from '../../config/grades'
import { useAddNewUserMutation } from './usersApiSlice'


const USER_REGEX = /^[A-z0-9]{4,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation();
    

    const [email,setEmail] = useState('')
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
      setValidPassword(PWD_REGEX.test(password))
    }, [password])
    useEffect(() => {
        setValidName(USER_REGEX.test(name))
    }, [name])
    
    useEffect(() => {
      if(isSuccess){
        setEmail('')
        setName('')
        setPassword('')
        navigate('/dash/users')
      }
   
    }, [isSuccess, navigate])
    

    const onNameChanged = (e) =>{setName(e.target.value)}
    const onPasswordChanged = (e) =>{setPassword(e.target.value)}
    const onEmailChanged = (e) =>{setEmail(e.target.value)}

    const onSaveUserClicked = async (e) =>{
        e.preventDefault();
        if(canSave){
            await addNewUser({name,password,email})
        }
    }
    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validName ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

    const canSave = [validPassword,validName].every(Boolean) && !isLoading;

    const content = (
        <>
            <p className={errClass}>{error?.data[0]?.defaultMessage}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="email">
                 email: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                {/* <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select> */}

            </form>
        </>
    )

    return content
}

export default NewUserForm