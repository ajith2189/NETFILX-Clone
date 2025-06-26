import React ,{useEffect, useState}from 'react'
import '../Player/Playes.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams,useNavigate } from 'react-router-dom'


export const Player = () => {

  //why the id is in object 
  const {id} = useParams()
  const navigate = useNavigate()

  const[apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMThlOGJjZmQ5OGFlNDllYTZkZDg2ZjQwZGRkMmY1ZCIsIm5iZiI6MTc1MDUxMTI5NC43NjMsInN1YiI6IjY4NTZhZWJlY2YyY2E5MzQwMjdlNzg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pmgKGYDi_OVm_MsQJ3sc9KKbt1N30W4_bJt0kdOh8qA'
    }
  };
  useEffect(()=> {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])

  return (
    <div className='player'>
       <iframe width='90%' height= '90%'  src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0"
      title='Trailer' allowFullScreen ></iframe>
      
      <div className="player-info">
        <p>{apiData.published_at.slice(1,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>

    </div>
  )
}
