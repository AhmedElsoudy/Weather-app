

//  =========== today ==========

let today = document.getElementById("day")
let todayNumber = document.getElementById("dayNum")
let todayMonth = document.getElementById("month")
let todayLocation = document.getElementById("city")
let todayTemp = document.getElementById("temp")
let todayTempImg = document.getElementById("tempImg")
let todayTempText = document.getElementById("tempText")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection")

//  =========== next day ==========

let nextDay =document.getElementsByClassName("next-day")
let nextDayMaxTemp = document.getElementsByClassName("next-max-temp")
let nextDayImg = document.getElementsByClassName("next-img")
let nextDayMinTemp = document.getElementsByClassName("next-min-temp")
let nextDayText = document.getElementsByClassName("next-day-text")

//  ================ Search Input ==================

let searchInput = document.getElementById("btn")

//  fetch API

async function getData(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=756295618e574c8c906162634241101&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}
// getData()

function displayTodayData(data){
    let todayDate = new Date()
    today.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c + "&deg;c"
    todayTempImg.setAttribute("src",data.current.condition.icon)
    todayTempText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph +"km/h"
    windDirection.innerHTML = data.current.wind_dir


}

function displayNextDayData(data){
    let Data = data.forecast.forecastday
    for(let i =0; i<2; i++){
        let nextDate = new Date(Data[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextDayMaxTemp[i].innerHTML = Data[i+1].day.maxtemp_c
        nextDayMinTemp[i].innerHTML = Data[i+1].day.mintemp_c 
        nextDayImg[i].setAttribute("src",Data[i+1].day.condition.icon)
        nextDayText[i].innerHTML = Data[i+1].day.condition.text
    }
}

async function runProject(cityName="cairo"){
    let weatherData = await getData(cityName)
    // console.log(weatherData)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextDayData(weatherData)
    }
}
runProject()


searchInput.addEventListener("input", function(){
    console.log(searchInput.value)
    runProject(searchInput.value)
})




