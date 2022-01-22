import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useEffect,
  useState,
} from 'react';

function App() {
const [smth, setSmth] = useState(0);
  const [animeForChapter, setAnimeForChapter] = useState('');
  const [updateManga, setUpdateManga] = useState('');
  const [lastChapter, setLastChapter] = useState('');
  const [titleAnime, setTitleAnime] = useState([])
  const [typeAnime, setTypeAnime] = useState([]);
  const [dayAnime, setDayAnime] = useState([]);
  const [picAnime, setPicAnime] = useState([]);
  const [allArrs, setAllArrs] = useState([]);


 const getChapter = () => {

  const mangaurl = ' https://api.mangadex.org/manga?title='+ animeForChapter;
  fetch(mangaurl)
  .then((response)=>response.json())
  .then((data)=>{
    const date = new Date();

    for(let i=0; i<data.data.length; i++){
          const id = data.data[i].id; 
          setUpdateManga(data.data[i].attributes.updatedAt);
            const the_id = 'https://api.mangadex.org/manga/'+id + '/feed?order[chapter]=desc&limit=1';
            fetch(the_id)
              .then((response)=>response.json())
              .then((datas)=>{
                console.log(datas);
          
              for(let i=0; i<datas.data.length; i++){
                  setLastChapter(datas.data[i].attributes.chapter)
                }              
              }).catch((err)=>{console.log(err)});
      }

  }).catch((err)=>{console.log(err)})
};


useEffect(()=>{
  animeMonth()
},[titleAnime]);

  const animeMonth =()=>{
      //smth stupid for date
      let yourDate = new Date()
      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - (offset*60*1000));
      const date = yourDate.toISOString().split('T')[0];
    
      const monthAnimeUrl = 'https://api.jikan.moe/v3/search/anime?q=&status=airing&page=1';
      fetch(monthAnimeUrl)
      .then(res =>{ return res.json()})
      .then(data => {

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  
        //looping through the data to get type, name, pic, and titles array
        let arrTitle = [];  
        let arrTypes = [];
        let arrImgs = [];
        let arrDays = [];
        let dayName = '';
        for(let i=0; i<data.results.length; i++){
          
          arrTitle.push(data.results[i].title);
          arrTypes.push(data.results[i].type);
          arrImgs.push(data.results[i].image_url);
          const d = new Date(data.results[i].start_date);
          dayName = days[d.getDay()];
          arrDays.push(dayName);
    
        }
    
        setTitleAnime(arrTitle);
        setTypeAnime(arrTypes);
        setPicAnime(arrImgs);
        setDayAnime(arrDays);
    
        const combineArrs = [];
        titleAnime.map((value, i)=>{    
        combineArrs.push([value, typeAnime[i], picAnime[i], dayAnime[i]])
        });

        setAllArrs(combineArrs)

      }).catch((err)=>{console.log(err)})
    
  }
  return (
    <div className="App">
       <div className="auth">
       <ul>    
          <li><a href='/register'> <button className='btn btn-primary'> Login </button></a> </li>
          <li> <a href='/register'> <button className='btn btn-primary'> Register </button></a> </li>
        </ul>
       <h1 >serAnime</h1>
      </div >
      <div className='container' >
       {/* <button className="history" className='btn btn-primary'>Your History</button>*/}
       <div className="chapterNum">
         <h5>Enter the name of the manga to see the last realesed chapter</h5>
        <div className="btnChapter">
        <input type="text" placeholder="name of the manga"  
            className="form-control"  
            onChange={(e)=>{setAnimeForChapter(e.target.value)}} />
        <button className='btno' onClick={getChapter}>-></button>
          </div> 
          <div className="appearsOnFetch" >
            <p><i className="fa fa-angle-double-right" ></i>  The last update of the manga was on {updateManga}</p>
            <p><i className="fa fa-angle-double-right"></i>  Last chapter has been realesed of {animeForChapter} is {lastChapter}</p>
          </div>
        </div>
     
        <div className="same">
        <div className="form-outline form-white">
                  <input type="text" placeholder="name of anime"  className="form-control"/>
                  <input type="text" placeholder="enter the chapter"  className="form-control"/>
                </div>
                <button className="history" className='btn btn-primary'>Search</button>
        </div>
            

        <div className="airingAnime">
          <h3> == Airing Anime This Month ==</h3>
         
          <ul className='whole'>
              
                  {
                    allArrs.map((value, b)=>{
                      return(
                        <> 
                        <li className='inside'>
                       
                            <li className='outerImg'>
                              <div className='killIt'>
                                <div className='innerImg'>
                                  <img src={value[2]} />
                                </div>
                              </div>
                            </li>
                          
                          
                            <div className='containli'>
                  
                              <li className='li'><a className='colorIt'>Name: </a> {value[0]}</li>
                            <li className='li'> <a className='colorIt'>Type: </a>{value[1]} </li>
                            <li className='li'>      <a className='colorIt'>released Day: </a> {value[3]} </li>
                             
                            </div>
                  
                    
                       
                        </li>
                        
                        </>
                      );
                    })
                  }
 
          </ul>
              </div>
        </div>

    </div>
  );
}

export default App;

