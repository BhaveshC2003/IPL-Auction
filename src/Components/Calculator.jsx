import React,{useState,useEffect} from 'react'
import '../styles/Calculator.css'
import Card from './Card'
import FunctionsIcon from '@mui/icons-material/Functions';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function Calculator() {
  const [score, setScore] = useState(0)
  const [teamPlayers, setTeamPlayers] = useState([])
  const [ppl, setppl] = useState([])
  const [mo, setmo] = useState([])
  const [dth, setdth] = useState([])
  const navigate = useNavigate()
  const calculate = () => {
    let sc=0;
    
      ppl.forEach((player)=>{
        sc+=Number(player.batStat.ppl)
      })
      mo.forEach((player)=>{
        sc+=Number(player.batStat.mo)
      })
      dth.forEach((player)=>{
        sc+=Number(player.batStat.dth)
      })
    setScore(sc)
  }

  const remove = (player,type) =>{

      if (type==='ppl') {
        const index = ppl.findIndex((p)=>p.playerName===player.playerName)
        const removedCard = ppl.splice(index,1)[0];
        score !== 0 ? setScore(prev=>prev - removedCard.batStat.ppl) : setScore(0)
      }else if(type==='mo'){
        const index = mo.findIndex((p)=>p.playerName===player.playerName)
        const removedCard = mo.splice(index,1)[0];
        score !== 0 ? setScore(prev=>prev - removedCard.batStat.mo) : setScore(0)
      }
      else{
        const index = dth.findIndex((p)=>p.playerName===player.playerName)
        const removedCard = dth.splice(index,1)[0];
        score !== 0 ? setScore(prev=>prev - removedCard.batStat.dth) : setScore(0)
      }
    
   
    
    const arr = [player,...teamPlayers].filter((value,index,self)=>{
      return self.indexOf(value) === index;
    })
    setTeamPlayers(arr)
  }
  const set = (player,type) => {
    let arr = [];
    if (type==='ppl') {
       arr = [...ppl,player].filter((value,index,self)=>{
        return self.indexOf(value) === index;
      })
      setppl(arr)
    }
    else if(type === 'mo'){
      const arr = [...mo,player].filter((value,index,self)=>{
        return self.indexOf(value) === index;
      })    
      setmo(arr)
    }
    else{
      const arr = [...dth,player].filter((value,index,self)=>{
        return self.indexOf(value) === index;
      })
      setdth(arr)
    }
  
  
    const index = teamPlayers.findIndex((p)=>p.playerName===player.playerName)
    teamPlayers.splice(index,1);
  }
  const submit = ()=>{
    const name = localStorage.getItem("name")
    const slot = localStorage.getItem("slot")
    axios.put(`http://localhost:9000/score/${name}?slot=${slot}`,{score:score},{headers:{"Content-Type":"application/json"}})
    .then(({data})=>{
      alert(data.message)
      navigate("/dashboard")
    })
    .catch(({data})=>{
      alert(data.message)
    })
  }
  const leftScroll = () => {
    const left = document.getElementById('scrollable-div')
    left.scrollBy(-400,0)
  }
  const rightScroll = () => {
    const right = document.getElementById('scrollable-div')
    right.scrollBy(400,0)
  }
  
  useEffect(()=>{
    const name = localStorage.getItem("name")
    const slot = localStorage.getItem("slot")
    axios.get(`http://localhost:9000/team/${name}?slot=${slot}`)
    .then(({data})=>{
      setTeamPlayers(data.teamDetails.players)
    })
  },[])
  
  return (
    <>
    <Navbar/>
    <div className='calculator'>
        <div className='calculator-container'>
          <div className='calculate'>
            <span>Total Points:</span>
            <div className="points-container"><FunctionsIcon style={{'transform':'scale(1.8)'}} />{score}</div>
            <button onClick={calculate}>Calculate</button>
            <button onClick={submit}>Submit</button>
          </div>
        </div>
        <div className='calculator-player-container'>
          {
            
            <>
              <div className='calculator-type-player-container'>
                <p>PPL:</p>
                {
                  ppl.map((player,i)=>{
                    return <div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                    <button className='remove-button' onClick={()=>{remove(player,'ppl')}}>Remove</button>
                    </div>
                  })
                }
              </div>
              <div className='calculator-type-player-container'>
                <p>MO:</p>
                {
                  mo.map((player,i)=>{
                    return<div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0} />
                    <button className='remove-button' onClick={()=>{remove(player,'mo')}}>Remove</button>
                    </div>
                  })
                }
              </div>
              <div className='calculator-type-player-container'>
                <p>DTH:</p>
                {
                  dth.map((player,i)=>{
                    return <div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                    <button className='remove-button' onClick={()=>{remove(player,'dth')}}>Remove</button>
                    </div>
                  })
                }
                </div>
            </>
            
            
          }
          <div className="calculator-team-players-container">
              <div className='scroll-buttons-container'><p>Team Players:</p><div className='scroll-buttons'><button onClick={leftScroll}>{"<"}</button><button onClick={rightScroll}>{">"}</button></div></div>
              <div className="calculator-individual-team-player-container" id="scrollable-div">
                {
                  teamPlayers.map((player,i)=>{
                   return <div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                    <div className='calculator-card-buttons-container'>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'ppl')}} style={{borderRadius:'0px 0px 0px 20px'}}>PPL</button>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'mo')}}>MO</button>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'dth')}} style={{borderRadius:'0px 0px 20px 0px'}}>DTH</button>
                      </div>
                   </div>
                  })
                }
              </div>
          </div>
        </div>
    </div>
    </>
  )
}
