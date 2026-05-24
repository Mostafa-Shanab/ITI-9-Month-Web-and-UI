import { Alert, Divider, LinearProgress } from '@mui/material'
import React from 'react'

export default function MyAlert() {
  return (
    <div>
        
        <Alert severity='success' variant='filled'>success</Alert>
        <Alert severity='success' variant='outlined'>success</Alert>
        <Alert severity='success' variant='standard'>success</Alert>

        <Alert severity='info' variant='filled'>info</Alert>
        <Alert severity='info' variant='outlined'>info</Alert>
        <Alert severity='info' variant='standard'>info</Alert>

        <Alert severity='warning' variant='filled'>warning</Alert>
        <Alert severity='warning' variant='outlined'>warning</Alert>
        <Alert severity='warning' variant='standard'>warning</Alert>

        <Alert severity='error' variant='filled'>error</Alert>
        <Alert severity='error' variant='outlined'>error</Alert>
        <Alert severity='error' variant='standard'>error</Alert>

        <Divider />

        <LinearProgress />

        {/* mahmoud -> ui from 1 -> 17   -> {3}
            omar -> ui from 18 -> 24 , mobile -> 1 -> 10   -> {2}
            yasser -> mobile -> 11 -> 26 */}

    </div>
  )
}
