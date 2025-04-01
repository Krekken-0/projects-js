const API_KEY = "jry62IkpcWTBdosIIFwqzNryMb7joeClE8djaHWB"
let url = "https://api.nasa.gov/planetary/apod"


/* Elements which will be used to search */
let date = document.getElementById("date")
let startDate = document.getElementById("start-date");
let endDate = document.getElementById("end-date");
let count = document.getElementById("count");
let button = document.getElementById("search")

/*Elements which will be used to display the result */
let content = document.getElementById("content");
let heading = document.getElementById("title");
let media = document.getElementById("media");
let description = document.getElementById("description");

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
           media.innerHTML += `<h2 class="text-xl font-semibold mb-2">${title}</h2>
           <div id="media" class="mb-4">
           <img src=${url} />
           </div>
           <p id="description" class="text-gray-300">${explanation}</p>`
        }else {
            media.innerHTML += `<h2 class="text-xl font-semibold mb-2">${title}</h2>
           <div id="media" class="mb-4">
           <img src=${thumbnail_url} />
           <span>${date}</span>
           </div>
           <p id="description" class="text-gray-300">${explanation}</p>`   
        }
    });
}