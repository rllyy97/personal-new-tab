import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, InputBase, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import { actions } from '../../app/data/slice'
import { NoteData } from '../../types'
import { NoteDiv } from './styles'
import { InvisibleInput, InvisibleInputMultiline } from '../../GlobalComponents';


export interface NoteTileProps {
  index: number;
  note: NoteData;
}

const NoteTile = (props: NoteTileProps) => {
  const { index, note } = props
  const { id, text } = note

  const dispatch = useDispatch()

  const [hasHover, setHasHover] = useState(false)

  return (
    <NoteDiv
      id={id}
      onMouseEnter={() => setHasHover(true)}
      onMouseLeave={() => setHasHover(false)}
    >
      <InputBase
        placeholder='Type note here ...'
        multiline
        value={text}
        size="small"
        onChange={(e) => dispatch(actions.updateNoteData({ id, text: e.target.value }))}
        style={{ 
          flexGrow: 1,
          padding: '0px',   
          fontWeight: 700,
          fontStyle: 'italic',
        }}
      />
      <IconButton onClick={() => dispatch(actions.removeNoteData({ id }))} size='small'>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </NoteDiv>
  )
}

export default NoteTile
