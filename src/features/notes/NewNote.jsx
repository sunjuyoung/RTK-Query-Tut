import React, { useEffect, useState } from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'


const NewNote = () => {

 // const users = useSelector(selectAllUsers);



const content =  <NewNoteForm /> 
    return content
}

export default NewNote