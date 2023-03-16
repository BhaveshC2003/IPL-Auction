import React,{useState,useRef} from 'react'
import '../styles/Admin.css'
import axios from 'axios'

export default function Admin() {
    const [name, setName] = useState()
    const [slot, setSlot] = useState()
    const [deductedAmount, setDeductedAmount] = useState(0)
    const [playerName, setPlayerName] = useState()     
    const buttonRef = useRef(null)
    const submit = async()=>{
        try{
          const payload = {
            playerName,
            amount:deductedAmount,
            slot
          }
          buttonRef.current.disabled = true
          const {data} = await axios.put(`http://localhost:9000/team/${name}`,payload,{headers:{"Content-Type":"application/json"}})
          alert(data.message)
        }catch(e){
          alert(e.response.data.message)
        }
        buttonRef.current.disabled = false
    }
  return (
    <div className='admin'>
        <div className='admin-container'>
          <div>
            <label htmlFor="name">Team Name</label>
            <input id='name' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Team Name'  className='input' />
          </div>
          <div>
            <label htmlFor="slot">Slot</label>
            <input id='slot' type="text" value={slot} onChange={(e)=>{Number(setSlot(e.target.value))}} placeholder='Slot' className='input' />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input id='amount' type="text" value={deductedAmount} onChange={(e)=>{Number(setDeductedAmount(e.target.value))}} placeholder='Enter amount (in Cr)' className='input' />
          </div>
          <div>
            <label htmlFor="player-name">Player Name</label>
            <input id='player-name' type="text" value={playerName} onChange={(e)=>{setPlayerName(e.target.value)}} placeholder='Enter player name' className='input'/>
          </div>
            <button ref={buttonRef} className='button' onClick={submit}>Submit</button>
        </div>  
    </div>
  )
}
