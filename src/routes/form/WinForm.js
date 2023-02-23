import {useState, useEffect} from 'react';
import api from '../../api/axiosConfig'
import { Button, TextField, FormGroup, FormControlLabel, MenuItem, Select, InputLabel, Switch } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [impact, setImpact] = useState("")
  const [favorite, setFavorite] = useState(false)
  const [message, setMessage] = useState("")
  const [month, setMonth] = useState("")

  useEffect(() => {
    if(id){
      const getWinById = async () => {
        try {
          const res = await api.get(`/wins/${id}`);
          setTitle(res.data.title)
          setDescription(res.data.description)
          setImpact(res.data.impact)
          setFavorite(res.data.favorite)
        } catch (error) {
          console.log(error);
        }
      };
      getWinById()
    }
  })
  
  let navigate = useNavigate();
  const handleNavigate = id => {
    navigate(`/wins/${id}`)
  }

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
      console.log(message)
      setMessage("")
      handleNavigate(response.data._id)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
    <form style={{width: "80%", marginTop: "30px"}} onSubmit={handleSubmit}>
      <FormGroup>
        <TextField 
          id="standard-basic" 
          label="Title" 
          variant="standard" 
          type="text" 
          value={title}  
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField 
          id="standard-basic" 
          label="Description" 
          variant="standard" 
          type="text" 
          value={description} 
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
          multiline
          rows={4}
          onChange={(e) => setImpact(e.target.value)}
        />
        <FormControlLabel
          sx={{mt: 2}}
          control={
            <Switch
              checked={favorite}
              onChange={() => setFavorite(!favorite)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          } 
          label="Favorite" 
        />
        
        <TextField 
          sx={{mt: 2}}
          id="standard-basic" 
          label="Year" 
          variant="standard" 
          type="text" 
          value="2022"
          InputProps={{
            readOnly: true,
          }}
        />
        <InputLabel sx={{mt: 2}} id="month-select-label">Month</InputLabel>
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
      <Button sx={{mt: 2}} variant="contained" color="secondary" type="submit">Submit</Button>
    </form>
    </div>
  )
}

export default WinForm

