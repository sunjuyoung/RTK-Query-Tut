import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectCurrentToken } from '../features/auth/authSlice'



const DashHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathName} = useLocation();

    const crurrentToken  = useSelector(selectCurrentToken);


    const onLogoutClick = () =>{
        dispatch(logout());
        navigate("/")
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={onLogoutClick}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const content = (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dash">
                    <h1 className="dash-header__title">techNotes : {crurrentToken}</h1>
                </Link>
                <nav className="dash-header__nav">
                    {logoutButton}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader