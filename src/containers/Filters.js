import React, {useState} from 'react'
import Datetime from 'react-datetime'
import {connect} from 'react-redux'
import {fetchEvents} from '../redux/actions'
import "react-datetime/css/react-datetime.css"
import PropTypes from "prop-types";

const Filters = ({fetchEvents}) => {
    const [text, setText] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [radius, setRadius] = useState('')
    const [startdate, setStartDate] = useState('')
    const [enddate, setEndDate] = useState('')

    const buildFilters = () => {
        let filters  = ''
        if(text){
            filters += `title=${text}&`
        }
        if(latitude){
            filters += `latitude=${latitude}&`
        }
        if(longitude){
            filters += `longitude=${longitude}&`
        }
        if(radius){
            filters += `radius=${radius}&`
        }
        if(startdate){
            filters += `startdate=${new Date(startdate).toISOString()}&`
        }
        if(enddate){
            filters += `enddate=${new Date(enddate).toISOString()}&`
        }
        fetchEvents(filters)
    }

    const reset = () => {
        fetchEvents()
        setText('')
        setLatitude('')
        setLongitude('')
        setRadius('')
        setStartDate('')
        setEndDate('')
    }

    const textBoxStyle = {width: 400, borderRadius: 5, height: 30, border: '1px solid lightgray',
        boxShadow: '1px 1px lightgray'}

 return (
   <div style={{display: 'flex', flexDirection: 'column'}}>
     <div style={{display: 'flex', marginLeft: 40, marginBottom: 20}}>
       <div style={{marginTop: 5, paddingRight: 10}}>
         Title
       </div>
       <input
         style={textBoxStyle}
         type='text' value={text} placeholder='Enter title' onChange={(e)=>{
       setText(e.target.value)
         }}
       />
     </div>
     <div style={{display: 'flex', marginLeft: 40, marginBottom: 20}}>
       <div style={{display: 'flex', paddingRight: 20}}>
         <div style={{marginTop: 5, paddingRight: 10}}>
           Latitude
         </div>
         <input
           style={{...textBoxStyle, width: 100}}
           type='text' value={latitude} placeholder='Enter Latitude' onChange={(e)=>{
               setLatitude(e.target.value)
           }}
         />
       </div>
       <div style={{display: 'flex'}}>
         <div style={{marginTop: 5, paddingRight: 10}}>
           Longitude
         </div>
         <input
           style={{...textBoxStyle, width: 100}}
           type='text' value={longitude} placeholder='Enter Longitude' onChange={(e)=>{
             setLongitude(e.target.value)
           }}
         />
       </div>
     </div>
     <div style={{display: 'flex', marginLeft: 40, marginBottom: 20}}>
       <div style={{display: 'flex', paddingRight: 20}}>
         <div style={{marginTop: 5, paddingRight: 10}}>
           Radius
         </div>
         <input
           style={{...textBoxStyle, width: 100}}
           type='text' value={radius} placeholder='(in km)' onChange={(e)=>{
                   setRadius(e.target.value)
           }}
         />
       </div>
     </div>
     <div style={{display: 'flex', marginLeft: 40, marginBottom: 20}}>
       <div style={{display: 'flex', paddingRight: 20}}>
         <div style={{paddingRight: 10}}>
           From
         </div>
         <Datetime value={startdate} onChange={(date)=>setStartDate(date)} />
       </div>
       <div style={{display: 'flex'}}>
         <div style={{paddingRight: 10}}>
           To
         </div>
         <Datetime value={enddate} onChange={(date)=>setEndDate(date)} />
       </div>
     </div>
     <div style={{display: 'flex', marginLeft: 40, marginBottom: 20}}>
       <div style={{display: 'flex', paddingRight: 20}}>
         <button
           style={{height: 25, width: 50,color: 'white', backgroundColor: 'rgb(26 115 232 / 1)', borderRadius: 2,
           border: 'none'}}
           onClick={()=>buildFilters()}
         >Filter
         </button>
       </div>
       <div style={{display: 'flex', paddingRight: 20}}>
         <button
           style={{height: 25, width: 50,color: 'white', backgroundColor: 'rgb(26 115 232 / 1)', borderRadius: 2,
                     border: 'none'}}
           onClick={()=>reset()}
         >Reset
         </button>
       </div>
     </div>
   </div>)

}
Filters.propTypes= {
    fetchEvents: PropTypes.func
}
export default connect(null, {fetchEvents})(Filters)
export {Filters as PureFilters}
