import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditNoteForm = ({note}) => {
    const [title, setTitle] = useState(note.title)
    const [content_, setContent_] = useState(note.content)
    
    const navigate = useNavigate();

    const  [updateNote,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation();

    const [deleteNote,{
        isLoading:isDelLoading,
        isSuccess:isDelSuccess,
        isError:isDelError,
        error:delError,
    }] = useDeleteNoteMutation();

    useEffect(() => {
      navigate("/dash/notes")
    

    }, [isSuccess,navigate])

    useEffect(() => {
        navigate("/dash/notes")
    

    }, [isDelSuccess,navigate])
    


    const onSaveNoteClicked = async () =>{
        await updateNote({content:content_,title,id:note.id,});


    }
    const onDeleteNoteClicked = async(e) =>{
        await deleteNote();
    }

    const onTitleChanged = (e) =>{
        setTitle(e.target.value)
    }

    const onContentChanged = (e) =>{
        setContent_(e.target.value)
    }


    const errClass = isError ? "errmsg" : "offscreen"
    const canSave = true;

    const content = (
        <>
            <p className={errClass}>{error?.data[0]?.defaultMessage}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="form__title-row">
                    <h2>Edit Note #{note.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteNoteClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    title: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={note.title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="email">
                 content: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input`}
                    id="content_"
                    name="content_"
                    type="text"
                    autoComplete="off"
                    value={note.content}
                    onChange={onContentChanged}
                />

                
                <label className="form__label" htmlFor="email">
                 userName: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={note.name}

                />



            </form>
        </>
    )

    return content
}

export default EditNoteForm