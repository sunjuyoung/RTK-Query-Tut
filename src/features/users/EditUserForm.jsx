import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useDeleteUserMutation, useUpdateUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from "../../config/roles"


const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EditUserForm = ({user}) => {

    const [updateUser,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    

    const [email,setEmail] = useState('')
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.grade)

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

    
    
    const navigate = useNavigate();

    const onNameChanged = (e) =>{setName(e.target.value)}
    const onPasswordChanged = (e) =>{setPassword(e.target.value)}
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }



    const onSaveUserClicked = async(e) =>{
        e.preventDefault();
        if(canSave){
            await updateUser({name,password,email})
        }
    }

    const onDeleteUserClicked = async(e) =>{
        await deleteUser({ id: user.id })
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validName ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const canSave = [validPassword,validName].every(Boolean) && !isLoading;

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const content = (
        <>
            {/* <p className={errClass}>{errContent}</p> */}

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                {/* <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label> */}

                <label className="form__label" htmlFor="roles">
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
                </select>

            </form>
        </>
    )

    return content
}

export default EditUserForm