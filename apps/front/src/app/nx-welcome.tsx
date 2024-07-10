/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import { TextField, Button } from '@mui/material';

export function NxWelcome({ title }: { title: string }) {
  return (
    <div>
      <Button variant="contained">{title}</Button>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  );
}
