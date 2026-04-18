import { supabase} from './supabaseClient.js';

const input = document.getElementById("symptom")
const searchButton = document.getElementById("searchButton")
const output = document.getElementById("output")
searchButton.addEventListener("click",getDoctors)

async function getDoctors() {
    const{data:databox,error}= await supabase
    .from('docs.backend')
    .select('*')

    if (error){
      console.log("rls didn't let us through",error.message)
    }

    if(databox){
        console.log("data fetching succesfull")
    }

    console.log("What is in databox?", databox);
   let data = databox.filter(item=>item.symptom ==String(input.value)) 
  if(data.length>0){for(let i=0; i<data.length;i++){
    output.textContent = `Doctor: ${data[i].doctor_name}\nAddress: ${data[i].clinic_Address}\nAvailable: ${data[i].is_available}`;
  }}
  else{
     output.textContent="couldn't find a doctor"
  }
};  

getDoctors();

