import {useState, useEffect, useContext} from 'react';
import api from '../../api/axiosConfig'
import { Button, TextField, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TokenContext from '../../TokenContext';

const WinForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [impact, setImpact] = useState("")
  const [favorite, setFavorite] = useState(false)
  const [message, setMessage] = useState("")
  const [winDate, setWinDate] = useState("")

  const { token } = useContext(TokenContext)

  useEffect(() => {
    if(id){
      const getWinById = async () => {
        try {
          const res = await api({
            method: "GET",
            url: `/wins/${id}`,
            headers: {
              Authorization: 'Bearer ' + token
            }
          })

          setTitle(res.data.title)
          setDescription(res.data.description)
          setImpact(res.data.impact)
          setFavorite(res.data.favorite)
          setWinDate(res.data.winDate)
        } catch (error) {
          console.log(error);
        }
      };
      getWinById()
    }
  }, [id])
  
  let navigate = useNavigate();
  const handleNavigate = id => {
    navigate(`/wins/${id}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response
      if(id){
        response = await api({
          method: "PUT",
          url: `/wins/${id}`,
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: {
            title,
            description,
            impact,
            favorite,
            winDate
          }
        })
      } else {
        response = await api({
          method: "POST",
          url: "/wins",
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: {
            title,
            description,
            impact,
            favorite,
            winDate
          }
        })
      }
      if (response.status === 201 || response.status === 200) {
        setTitle("")
        setDescription("")
        setImpact("")
        setFavorite("")
        setWinDate("")
        setMessage("Win created successfully");
      } else {
        setMessage("Some error occured");
      }
      console.log(message)
      setMessage("")
      console.log(response.data)
      handleNavigate(response.data.id)
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
          label="Favorite" 
          control={
            <Switch
              checked={favorite}
              onChange={() => setFavorite(!favorite)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          } 
          
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Career Win Date"
            value={winDate}
            onChange={(newValue) => {
              setWinDate(newValue.format("MM-DD-YYYY"));
            }}
            renderInput={(params) => <TextField sx={{mt: 2}} {...params} />}
          />
        </LocalizationProvider>
      </FormGroup>
      <Button sx={{mt: 2}} variant="contained" color="secondary" type="submit">Submit</Button>
    </form>
    </div>
  )
}

export default WinForm

