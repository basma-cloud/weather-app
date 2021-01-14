/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'1'+ d.getDate()+'.'+ d.getFullYear();
//the variables that hold the and baseURL of the api
const key="30d75bee0a7f6f6fa581ba6e431d2b12";
const baseURL="http://api.openweathermap.org/data/2.5/weather?zip=";

//here we use event listener so when we click on the generate element it will do all the actions of performaction function
document.getElementById('generate').addEventListener('click', performAction);


function performAction(){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
  //we setup a condition so if the user doesn't enter zip code an alert would pop up
    if(zipCode==''){
        alert('Enter zip code');
    }else{
        //this function gets the temprature information from the api through sip code   
        getTempData(baseURL , zipCode , key)
        //here we chain another functionusing .then , this means that javascript will execute this function immediately after the previous one 
        .then(function(apiData){     
        postData('/temp', { temp:apiData.main.temp,date:newDate,feelings:feelings} );
         })
        .then(updateUI)
    }
};


const getTempData = async(baseURL, zipCode, key)=> {
    //this code will fetch the temprature data from the api    
    const request = await fetch( baseURL + zipCode + "&appid=" + key + "&units=metric")

    try{
        //code to convert data to json
        const apiData = await request.json()
        console.log(apiData.main.temp);
        return apiData ;
        
    }catch(error){
        //if code doesn't work then the app should return the error message istead of crashing
        console.log(error);
    }
};

  const postData = async ( url = '', data = {})=>{ //we put default parameters so it never returns an empty string
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
     
    }catch(error) {
    console.log("error", error);
    }
};

//this function uses the get route to get data from the endpoint and update UI elemnts according to this data
//it's an async function which means it is not executed untill other actions happen evev it's written before them
const updateUI = async ()=>{
    const request= await fetch('/temp');
try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feelings;

}catch(error){
    console.log("error" , error);
}
}

