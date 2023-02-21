import {useState} from 'react';
import api from '../../api/axiosConfig'
import { Button, TextField, FormGroup, FormControlLabel, MenuItem, Select, Checkbox, InputLabel } from '@mui/material';

const currentYear = new Date().getFullYear()
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const generateYearMonth = (currentYear, monthName) => {
  let monthNumber = monthNames.indexOf(monthName)+1
  if (monthNumber.toString().length === 1){
    monthNumber = "0"+String(monthNumber)
  } else {
    monthNumber = String(monthNumber)
  }
  return currentYear + "-" + monthNumber
}

const WinForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [impact, setImpact] = useState("")
  const [favorite, setFavorite] = useState(false)
  const [message, setMessage] = useState("")
  const [month, setMonth] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/wins", {
        title,
        description,
        impact,
        favorite,
        yearMonth: generateYearMonth(currentYear, month)
      })
      if (response.status === 201) {
        setTitle("")
        setDescription("")
        setImpact("")
        setFavorite("")
        setMonth("")
        setMessage("Win created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    console.log(message)
    setMessage("")
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField 
          id="standard-basic" 
          label="Title" 
          variant="standard" 
          type="text" 
          value={title} 
          placeholder="Title" 
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField 
          id="standard-basic" 
          label="Description" 
          variant="standard" 
          type="text" 
          value={description} 
          placeholder="Description"
          multiline
          rows={4} 
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField 
          id="standard-basic" 
          label="Impact" 
          variant="standard" 
          type="text" 
          value={impact} 
          placeholder="Impact" 
          multiline
          rows={4}
          onChange={(e) => setImpact(e.target.value)}
        />
        <FormControlLabel control={
          <Checkbox 
            onClick={() => setFavorite(!favorite)}
          />
        } label="Favorite" />
        <TextField 
          id="standard-basic" 
          label="Year" 
          variant="standard" 
          type="text" 
          value="2022"
          InputProps={{
            readOnly: true,
          }}
        />
        <InputLabel id="month-select-label">Month</InputLabel>
        <Select
          labelId="month-select-label"
          id="month-select"
          value={month}
          label="Month"
          onChange={(e) => setMonth(e.target.value)}
        >
          {
            monthNames.map(m => {
              return <MenuItem key={m} value={m}>{m}</MenuItem>
            })
          }
        </Select>
      </FormGroup>
      <Button variant="contained" color="secondary" type="submit">Submit</Button>
    </form>
  )
}

export default WinForm

