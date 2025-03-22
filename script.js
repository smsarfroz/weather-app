const searchInput = document.querySelector("#search");
const getImageButton = document.querySelector(".getImageButton");
const todaysWeather = document.querySelector(".todaysWeather");
todaysWeather.style.display = "none";

const toggleScale = document.querySelector(".toggleScale");

toggleScale.addEventListener('click', () => {
  if (toggleScale.textContent === "Fahrenheit") {
    toggleScale.textContent = "Celcius";
  } else {
    toggleScale.textContent = "Fahrenheit";
  }
});
getImageButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetchWeatherData();
});

const fetchWeatherData = () => {
  const searchValue = searchInput.value;
  searchInput.value = "";
  const apiKey = "BDNZ6FSQE7KL9EFRRJ9NEKYX2";
  let scale = "unitGroup=us";
  if (toggleScale.textContent === "Celcius") {
    scale = "unitGroup=metric";
  }
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchValue}?${scale}&key=${apiKey}&contentType=json`;
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
      <p>max:${day[0].tempmax}    min:${day[0].tempmin}</p>
      <p>Windspeed: ${day[0].windspeed}</p>
      <p>Humidity: ${day[0].humidity}</p>
    `

    console.log(day[0].icon);
    const gifURL = `https://api.giphy.com/v1/gifs/translate?api_key=NXnIWDAYjvO47OEb58eZBQqRdBvfhMNv&s=${day[0].icon}`;

    fetch(
      gifURL,
      { mode: "cors" }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("gif response not ok");
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          console.log("Empty data array");
        }
        const imgSection = document.querySelector(".gif");
        imgSection.src = data.data.images.original.url;
        console.log(data);
        console.log(data.data);
        console.log(data.data.images.original.url);
      })
      .catch(error => {
        console.error(`Gif Fetch error: ${error}`);
      })
  })
  .catch(error => {
    console.error(`fetch error: ${error}`);
  });
};