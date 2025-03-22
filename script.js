const searchInput = document.querySelector("#search");
const getImageButton = document.querySelector(".getImageButton");

getImageButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;
  searchInput.value = "";
  const apiKey = "BDNZ6FSQE7KL9EFRRJ9NEKYX2";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchValue}?key=${apiKey}`;
  fetch(
    url,
    { mode: "cors" }
  ).then(response => {
    if (!response.ok) {
        throw new Error("response not ok");
    }
    return response.json();
  }).then(data => {
    console.log(data);

    const day = data.days;
    console.log(day[0]);
    console.log(day[1]);

    const todaysWeather = document.querySelector(".todaysWeather");
    todaysWeather.style.display = "";
    const location = document.querySelector(".location");
    location.textContent = data.resolvedAddress;
    const leftPart = document.querySelector(".leftPart");
    leftPart.innerHTML = `
      <p style="font-size: 30px">${day[0].temp}</p>
      <p>${day[0].conditions}</p>
    `
    const rightPart = document.querySelector(".rightPart");
    rightPart.innerHTML = `
      <p>Feelslike: ${day[0].feelslike}</p>
      <p>${day[0].tempmax}  ${day[0].tempmin}</p>
      <p>Windspeed: ${day[0].windspeed}</p>
      <p>Humidity: ${day[0].humidity}</p>
    `

    
  })
  .catch(error => {
    console.error("fetch error");
  });
});
