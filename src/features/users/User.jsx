import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllUsers, selectUserById, selectUserIds } from './usersApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

const User = ({userId}) => {

    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()
    const cellStatus = user.active ? '' : 'table__cell--inactive'
    const userRolesString = user.grade.toString().replaceAll(',', ', ')
    const handleEdit = () => navigate(`/dash/users/${userId}`)

  return (
    <tr className="table__row user">
    <td className={`table__cell ${cellStatus}`}>{user.name}</td>
    <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
    <td className={`table__cell ${cellStatus}`}>{user.email}</td>
    <td className={`table__cell ${cellStatus}`}>
        <button
            className="icon-button table__button"
            onClick={handleEdit}
        >
            <FontAwesomeIcon icon={faPenToSquare} />
        </button>
    </td>
</tr>
  )
}

export default User