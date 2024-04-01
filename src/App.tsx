import './index.scss'
import './App.scss'

import { useEffect, useState } from 'react'
import {useTheme} from './hooks/use-theme.js'
import {api,
  IPaintingsResponse,
  IAuthor,
  base_url,
  ILocation,} from './api'


function App() {
  const [paintings, setPaintings] = useState<IPaintingsResponse[] | undefined>([]);
  const [authors , setAuthors] = useState<IAuthor[] | undefined>([]);
  const [locations ,setLocations] = useState<ILocation[] | undefined>([]);
  
  useEffect(() => {
    const fetchData = async () => {
         try {

         const paintingsData = await api.paintings();
        setPaintings(paintingsData);
          

        const authorsData = await api.authors();
        setAuthors(authorsData);

        const locationsData = await api.locations();
        setLocations(locationsData);
      } catch(error){console.error("err",error)}};
       fetchData();
    },[]);

    
  
  
  const getAuthorName = (authorId: number): string => {
    const author = authors?.find((a) => a.id === authorId);
    return author?.name || "Неизвестный художник";
  };

  const getLocationName = (locationId: number): string => {
    const location = locations?.find((loc) => loc.id === locationId);
    return location?.location || "Неизвестное место";
  };

{/* <img src={logo} alt="" width="91" height="20"></img> */}
const {theme,setTheme} = useTheme()

const switchTheme=() => {
  setTheme((cur)=> cur === "light" ? "dark": "light")
};
  return (
    
    <>
     
<div className="heads">
<nav className="navbar">
  <div className="container-fluid">
  <a className="navbar-brand" href="#" >
      <div  className="logos" style={{width:"91px",height:"20px",marginLeft:"150px"}} ></div>   
    </a>
  <a className='nav-livk'>  <label className='dom2'><input onChange={switchTheme}type="checkbox" id ="toggle-btn"></input><span></span></label></a>
    
  </div>
</nav>
<div className="content col-12">
{paintings && paintings.map((painting: IPaintingsResponse, index: number) => (
<div className="image-container col-3" >
  <img src={base_url+painting.imageUrl} ></img>
  <div className="text-overlay">
    <div className="title">{getAuthorName(painting.authorId)}</div>
    <div className="date">{getLocationName(painting.locationId)}</div>
  </div>
</div>
))}

</div>
</div>





      
    </>
  )
}

export default App
{/* <div className="artwork-container">
  <img src={art} alt="Cascate di Tivoli"></img>
  <div className="artwork-description">
    <div className="artwork-title">CASCATE DI TIVOLI</div>
    <div className="artwork-year">1761</div>
  </div>
</div> */}