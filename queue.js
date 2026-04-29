import './queue.css'
import {supabase }from '/supabaseClient.js'


const symptom = document.getElementById('symptom');
const searchButton = document.getElementById('searchButton')
const output = document.getElementById("output")

const map = L.map('map').setView([52.13, -106.67], 13)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
searchButton.addEventListener('click',getdoctors)

async function getdoctors() {

     const{data,error} = await supabase
     .from('docs.backend')
     .select('*')

     try{

     const  shortlist = data.filter(doctor => doctor.symptom === symptom.value)
      
        renderDoctors(shortlist)
      }
   
       

     catch(err){
        console.log("this was the error", err.message)
     }
};

function renderDoctors(list){
output.innerhtml = "";

for(let key of list){
    const newDiv= document.createElement('div')
  newDiv.textContent  = key.doctor_name
    newDiv.className="flex flex-col items-start border-2 p-6 bg-amber-200 w-48 rounded-2xl min-h-37.5 mb-4 shadow-md"
    output.appendChild(newDiv)
}
 
for(let key of list){
     L.marker([key.latitude,key.longitude]).addTo(map)
    
}


}

