import React from 'react'
import { Chip } from '@mui/material';

export default function MyChip() {
  return (
    <div>
        <Chip label="filter 1" color='primary' onClick={() => alert("clicked")}></Chip>
        <Chip label="filter 2" color='primary' onClick={() => alert("clicked")}></Chip>
        <Chip label="filter 3" color='primary' onClick={() => alert("clicked")}></Chip>
        <Chip label="filter 4" color='primary' onClick={() => alert("clicked")}></Chip>
        <Chip label="filter 5" color='error' onDelete={() => alert("deleted")}></Chip>
    </div>
  )
}
