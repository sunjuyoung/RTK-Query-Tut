import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import EditNoteForm from './EditNoteForm';
import { selectAllNotes, selectNoteById } from './notesApiSlice';

const EditNote = () => {

  const {id} = useParams();

  const note = useSelector((state) => selectNoteById(state,id));


  const content = note? <EditNoteForm note={note}/> : <p>Loading...</p>


  return content
}

export default EditNote