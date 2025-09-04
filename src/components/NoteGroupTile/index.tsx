import { useDispatch } from 'react-redux'
import { Button, IconButton } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { actions } from '../../app/data/slice'
import { useNotes } from '../../app/data/selectors';
import NoteTile from '../NoteTile';
import { NoteContainer } from './styles';
import { useEffect, useMemo, useState } from 'react';
import { FlexDiv } from '../../GlobalComponents';


const NoteGroupTile = () => {
  
  const dispatch = useDispatch()

  const addNote = () => {
    dispatch(actions.addNoteData())
  }

  const notes = useNotes()


  const [isFirstLoad, setIsFirstLoad] = useState(true)
  useEffect(() => {
    // wait for the first load animation to finish
    setTimeout(() => setIsFirstLoad(false), 200)
  }, [])

  const haveNotes = useMemo(() => notes.length > 0, [notes])

  ///

  return (
    <FlexDiv style={{
      gap: '24px',
      alignItems: 'flex-start',
      marginTop: '-20px',
      marginBottom: '8px',
    }}>
      <Button 
        onClick={addNote} 
        variant="contained"
        startIcon={<PostAddIcon />}
      >
        Add Note
      </Button>
      <NoteContainer className={isFirstLoad && 'first-load'}>
        {notes.filter(x => x != null).map((note, index) => (
          <NoteTile
            key={note.id}
            index={index}
            note={note}
          />
        ))}
      </NoteContainer>
    </FlexDiv>
  )
}

export default NoteGroupTile
