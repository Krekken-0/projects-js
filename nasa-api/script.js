const API_KEY = "jry62IkpcWTBdosIIFwqzNryMb7joeClE8djaHWB"
let url = "https://api.nasa.gov/planetary/apod"


/* Elements which will be used to search */
let date = document.getElementById("date")
let startDate = document.getElementById("start-date");
let endDate = document.getElementById("end-date");
let count = document.getElementById("count");
let button = document.getElementById("search")

/*Div element which will be used to display the result */
let container = document.getElementById("container");


/*function to fetch data */
async function fetchData( startDate, endDate = getToday(), count = 1){
    let apiData;
    let data;
    let dataArray;
    if(startDate){
        apiData = await fetch(`${url}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}&thumbs=true`);
        data = await apiData.json()
    } else {
        apiData = await fetch(`${url}?api_key=${API_KEY}&count=${count}&thumbs=true`);
        data = await apiData.json()
    }
    dataArray = Array.isArray(data) ? data : [data]
    return dataArray
}

/*get todays date */
// function getToday(){
//     const date = new Date()
//     dateToday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
//     return dateToday
// }
//console.log(getToday())

button.addEventListener("click",  async (e) => {
    e.preventDefault();
    let response = await fetchData(startDate.value, endDate.value, count.value);
    console.log(response)
    display(response)
})

function display(data){
    data.forEach(element => {
       let { title, media_type, url, explanation, date, thumbnail_url  } = element;

       if(media_type === "image"){
           container.innerHTML += `<div
          id="content"
          class="mt-6 flex-col space-y-4 items-center justify-center">
        <h2 class="text-xl font-semibold mb-2">${title}</h2>
        <img src=${url} />
        <p class="text-gray-500">${date}</p>
        <p id="description" class="text-gray-300">${explanation}</p>
        </div>`
        } else {
            container.innerHTML += `<div
          id="content"
          class="mt-6 flex-col space-y-4 items-center justify-center">
        <h2 class="text-xl font-semibold mb-2">${title}</h2>
        <img src=${thumbnail_url} />
        <p class="text-gray-500">${date}</p>
        <p id="description" class="text-gray-300">${explanation}</p>
        </div>`
        }
    });
}