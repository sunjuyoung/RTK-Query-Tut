import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectNoteById } from './notesApiSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

const Note = ({noteId}) => {

    const note = useSelector(state=> selectNoteById(state,noteId));
    const navigate = useNavigate();

    const handleEdit = () => navigate(`/dash/notes/${noteId}`)
  return (
    <tr className="table__row">
                <td className="table__cell note__status">
                    {note.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created"></td>
                <td className="table__cell note__updated"></td>
                <td className="table__cell note__title">{note.title}</td>
                <td className="table__cell note__username">{note.content}</td>

                <td className="table__cell">
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

export default Note