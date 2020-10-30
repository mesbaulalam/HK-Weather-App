var data;
var forecast;
var click = false;

function refreshPage() {
  window.location.reload();
}

function warningMsgclick() {
  console.log("LOL");
  if (click === false) {
    let abc = document.getElementsByClassName("warningMsg");
    let button = document.getElementsByClassName("warning");
    button[0].style.borderBottomLeftRadius = "0px";
    button[0].style.borderBottomRightRadius = "0px";
    abc[0].style.display = "block";
    click = true;
  } else {
    let abc = document.getElementsByClassName("warningMsg");
    let button = document.getElementsByClassName("warning");
    button[0].style.borderBottomLeftRadius = "20px";
    button[0].style.borderBottomRightRadius = "20px";
    abc[0].style.display = "none";
    click = false;
  }
}

async function start() {
  try {
    let response = await fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
    );
    if (response.status === 200) {
      data = await response.json();
    } else {
      console.log(data);
    }
  } catch (err) {
    console.log("Error!");
  }
}

async function start2() {
  try {
    let response = await fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en"
    );
    if (response.status === 200) {
      forecast = await response.json();
    } else {
      console.log(forecast);
    }
  } catch (err) {
    console.log("Error!");
  }
}

async function render2() {
  let execute = await start();
  let execute2 = await start2();
  const forecastList = forecast.weatherForecast;
  console.log(forecast);
  tempOption.classList.remove("currentOption");
  forecastOption.classList.add("currentOption");
  forecastOption.removeEventListener("click", render2);
  tempOption.addEventListener("click", refreshPage);
  weatherImage.src =
    "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" +
    data.icon[0] +
    ".png";
  temp.innerHTML = data.temperature.data[1].value + "\u2103";
  humid.innerHTML = data.humidity.data[0].value + "%";
  rain.innerHTML = data.rainfall.data[13].max + "mm";
  if (data.uvindex.length != 0) {
    UV.innerHTML = data.uvindex.data[0].value;
    UVIcon.style.display = "block";
  } else {
    UVIcon.style.display = "none";
  }
  if (data.warningMessage.length != 0) {
    warning.style.display = "block";
    warningMsg.innerHTML = data.warningMessage[0];
  } else {
    warning.style.display = "none";
  }
  warningMsg.style.display = "none";
  lastUpdate.innerHTML = "Last Update: " + data.updateTime.substring(11, 16);
  while(flexContainer.firstChild) {
    flexContainer.removeChild(flexContainer.firstChild)
  }
  forecastList.forEach((element) => {
    let forecastItem = document.createElement("div");
    let forecastWeather = document.createElement("img");
    let forecastdate = document.createElement("div");
    let forecastDay = document.createElement("div");
    let forecastTemp = document.createElement("div");
    let forecastHumid = document.createElement("div");
    forecastItem.classList.add("forecastItem");
    forecastWeather.classList.add("forecastWeather");
    forecastdate.classList.add("forecastdate");
    forecastDay.classList.add("forecastDay");
    forecastTemp.classList.add("forecastTemp");
    forecastHumid.classList.add("forecastHumid");
    forecastWeather.src =
      "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" +
      element.ForecastIcon +
      ".png";
    forecastdate.appendChild(
      document.createTextNode(
        element.forecastDate.slice(
          element.forecastDate.length - 2,
          element.forecastDate.length
        ) + "/" + 
        element.forecastDate.slice(
          element.forecastDate.length - 4,
          element.forecastDate.length -2
          )
      )
    );
    forecastDay.appendChild(document.createTextNode(element.week));
    forecastTemp.appendChild(
      document.createTextNode(
        element.forecastMintemp.value +
          "\u2103" +
          " | " +
          element.forecastMaxtemp.value +
          "\u2103"
      )
    );
    forecastHumid.appendChild(document.createTextNode(element.forecastMinrh.value + "%" + " - " + element.forecastMaxrh.value + "%"));
    forecastItem.appendChild(forecastWeather);
    forecastItem.appendChild(forecastdate);
    forecastItem.appendChild(forecastDay);
    forecastItem.appendChild(forecastTemp);
    forecastItem.appendChild(forecastHumid);
    flexContainer.appendChild(forecastItem);
  });
}
 

async function render() {
  let execute = await start();
  const temperatureList = data.temperature.data;
  console.log(temperatureList);
  container = document.createElement("div");
  reload = document.createElement("span");
  header = document.createElement("div");
  headerRow = document.createElement("div");
  weatherIcon = document.createElement("div");
  weatherImage = document.createElement("img");
  tempIcon = document.createElement("div");
  tempImage = document.createElement("img");
  temp = document.createElement("span");
  humidIcon = document.createElement("div");
  humidImage = document.createElement("img");
  humid = document.createElement("span");
  rainIcon = document.createElement("div");
  rainImage = document.createElement("img");
  rain = document.createElement("span");
  UVIcon = document.createElement("div");
  UVImage = document.createElement("img");
  UV = document.createElement("span");
  warning = document.createElement("button");
  warningImg = document.createElement("img");
  warningMsg = document.createElement("div");
  lastUpdate = document.createElement("span");
  options = document.createElement("div");
  tempOption = document.createElement("span");
  forecastOption = document.createElement("span");
  flexContainer = document.createElement("div");

  //Creation of classes
  reload.classList.add("reload");
  container.classList.add("container");
  header.classList.add("header");
  headerRow.classList.add("headerRow");
  weatherIcon.classList.add("weatherIcon");
  weatherImage.classList.add("weatherImage");
  tempIcon.classList.add("tempIcon");
  tempImage.classList.add("tempImage");
  temp.classList.add("metrics");
  humidIcon.classList.add("humidIcon");
  humidImage.classList.add("humidImage");
  humid.classList.add("metrics");
  rainIcon.classList.add("rainIcon");
  rainImage.classList.add("rainImage");
  rain.classList.add("metrics");
  UVIcon.classList.add("UVIcon");
  UVImage.classList.add("UVImage");
  UV.classList.add("UV");
  warning.classList.add("warning");
  warningImg.classList.add("warningImg");
  warningMsg.classList.add("warningMsg");
  lastUpdate.classList.add("lastUpdate");
  options.classList.add("options");
  tempOption.classList.add("currentOption");
  flexContainer.classList.add("flexContainer");
  //Adding attributes to certain elements
  reload.addEventListener("click", refreshPage);
  weatherImage.src =
    "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" +
    data.icon[0] +
    ".png";
  tempImage.src = "images/thermometer.png";
  humidImage.src = "images/drop.png";
  rainImage.src = "images/rain.png";
  UVImage.src = "images/UVindex.png";
  warningImg.src = "images/arrow.png";
  warning.addEventListener("click", warningMsgclick);
  forecastOption.addEventListener("click", render2);
  //   Adding childs to parent
  reload.appendChild(document.createTextNode("↻"));
  header.appendChild(document.createTextNode("Weather in Hong Kong"));
  temp.appendChild(
    document.createTextNode(data.temperature.data[1].value + "\u2103")
  );
  humid.appendChild(document.createTextNode(data.humidity.data[0].value + "%"));
  rain.appendChild(document.createTextNode(data.rainfall.data[13].max + "mm"));
  if (data.uvindex.length != 0) {
    UV.appendChild(document.createTextNode(data.uvindex.data[0].value));
    UVIcon.style.display = "block";
  } else {
    UVIcon.style.display = "none";
  }
  warning.appendChild(document.createTextNode("Warning"));
  warning.appendChild(warningImg);
  if (data.warningMessage.length != 0) {
    warning.style.display = "block";
    warningMsg.appendChild(document.createTextNode(data.warningMessage[0]));
  } else {
    warning.style.display = "none";
  }
  warningMsg.style.display = "none";
  lastUpdate.appendChild(
    document.createTextNode("Last Update: " + data.updateTime.substring(11, 16))
  );
  tempOption.appendChild(document.createTextNode("Temperature"));
  forecastOption.appendChild(document.createTextNode("Forecast"));
  temperatureList.forEach((element, index) => {
    let flexItem = document.createElement("div");
    let cross = document.createElement("img");
    let district = document.createElement("div");
    let temperature = document.createElement("div");
    flexItem.classList.add("flexItem");
    cross.classList.add("cross");
    district.classList.add("district");
    temperature.classList.add("temperature");
    cross.src = "images/cancel.ico";
    district.appendChild(document.createTextNode(element.place));
    temperature.appendChild(document.createTextNode(element.value + "\u2103"));
    flexItem.appendChild(cross);
    flexItem.appendChild(district);
    flexItem.appendChild(temperature);
    flexContainer.appendChild(flexItem);

    cross.onclick = function () {
      flexContainer.childNodes[index].style.display = "none";
    };
  });
  weatherIcon.appendChild(weatherImage);
  tempIcon.appendChild(tempImage);
  tempIcon.appendChild(temp);
  humidIcon.appendChild(humidImage);
  humidIcon.appendChild(humid);
  rainIcon.appendChild(rainImage);
  rainIcon.appendChild(rain);
  UVIcon.appendChild(UVImage);
  UVIcon.appendChild(UV);
  headerRow.appendChild(weatherIcon);
  headerRow.appendChild(tempIcon);
  headerRow.appendChild(humidIcon);
  headerRow.appendChild(rainIcon);
  headerRow.appendChild(UVIcon);
  container.appendChild(header);
  container.appendChild(reload);
  container.appendChild(headerRow);
  container.appendChild(warning);
  container.appendChild(warningMsg);
  container.appendChild(lastUpdate);
  options.appendChild(tempOption);
  options.appendChild(forecastOption);
  document.body.appendChild(container);
  document.body.appendChild(options);
  document.body.appendChild(flexContainer);
}

window.onload = function () {
  //Creation of elements
  render();
};
