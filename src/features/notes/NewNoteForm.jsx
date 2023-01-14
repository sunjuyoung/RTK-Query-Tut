import React, { useEffect, useState } from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'


const NewNoteForm = () => {

  const [title, setTitle] = useState('')
  const [content_, setContent_] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate();
  const [addNewNote,{
    isLoading,
    isSuccess,
    isError,
    error
  }]
   = useAddNewNoteMutation();

   useEffect(() => {
    if(isSuccess){
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

   const onTitleChanged = (e) =>{
    setTitle(e.target.value)

   }
   const onContentChanged = (e) =>{
      setContent_(e.target.value)
   }
   const onSaveUserClicked = async(e) =>{
      e.preventDefault();
        await addNewNote({title,content:content_,product_id:1,member_id:1});
   }

   const errClass = isError ? "errmsg" : "offscreen"
   const canSave = title && content_;


const content = (
        <>
            <p className={errClass}>{error?.data[0]?.defaultMessage}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New Note</h2>
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
                    title: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
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
                    value={content_}
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
                    value={name}
                    onChange={onContentChanged}
                />



            </form>
        </>
    )

    return content
}

export default NewNoteForm