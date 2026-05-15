
import { AuthInvalidCredentialsError } from '@supabase/supabase-js/dist/index.cjs';
import './queue.css'
import {supabase }from '/supabaseClient.js'

import maplibregl, { Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

let Userlat;
let Userlog;

const symptom = document.getElementById('symptom');
const searchButton = document.getElementById('searchButton')
const output = document.getElementById("output")

const map = new maplibregl.Map({
    container:'map',
    style: 'https://tiles.openfreemap.org/styles/liberty',
     center: [-106.6334615,52.0886016],
    zoom: 13 



})
 navigator.geolocation.getCurrentPosition((position)=>{
(position.coords.latitude,position.coords.longitude)
 Userlat = position.coords.latitude
 Userlog = position.coords.longitude
 
 let marker  = new Marker({
 Color:"#5067ba",
 draggable:true
 }).setLngLat([Userlog,Userlat])
   .addTo(map)
} 
 )
 
searchButton.addEventListener('click',getdoctors)

async function getdoctors() {

     const{data,error} = await supabase
     .from('docs.backend')
     .select('*')

     try{
        if(error){
          console.log(error.message)
          return
        }
     const  shortlist = data.filter(doctor => doctor.symptom === symptom.value)
      
        renderDoctors(shortlist)
        
      }


     catch(err){
        console.log("this was the error", err.message)
     }
};

function renderDoctors(list){
output.innerHTML = "";

 

for(let key of list){
    const newDiv= document.createElement('div')
  newDiv.textContent  = key.doctor_name
    newDiv.className="flex flex-col items-start border-2 p-6 bg-amber-200 w-48 rounded-2xl min-h-37.5 mb-4 shadow-md"
    output.appendChild(newDiv)

    let marker  = new Marker({
 Color:"#5067ba",
 draggable:true
 }).setLngLat([key.longitude,key.latitude])
   .addTo(map)
}



const  radUserlat =Userlat*0.0174532925
  const  radUserlog = Userlog*0.0174532925 
 
  console.log(radUserlat,radUserlog)
for(let key of list){
    
      const delLat = radUserlat - key.rad_latitude
   const delLong = radUserlog-key.rad_longitude
  const R = 6371;
   
   const calcA = Math.pow(Math.sin(delLat/2),2)+Math.cos(key.rad_latitude)*Math.cos(key.rad_longitude)* Math.pow(Math.sin(delLong/2),2);

       const calcC = 2*Math.atan2(Math.sqrt(calcA),Math.sqrt(1-calcA))

       const distance  = R*calcC

       console.log(distance.toFixed(2))
}  
} 





   


