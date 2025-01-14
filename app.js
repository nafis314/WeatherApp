const apiKey ="159ace043e61ab61e4c76cf0541c435e";


document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    // Update the weather information
    const icon=data.weather[0].icon;
    const iurl='https://openweathermap.org/img/wn/'+icon+'@2x.png';

    document.getElementById("city").textContent = data.name;
    document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("feel").textContent = `Feels Like: ${data.main.feels_like}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} km/h`;
    document.getElementById("icn").src=iurl;

    const aiSuggestion = generateAISuggestion(data.weather[0].description, data.main.temp);
    document.getElementById("aiSuggestion").textContent = `Suggestion: ${aiSuggestion}`;
  }
    catch (error) {
    console.error(error);
    alert("Error fetching weather data. Please try again.");
  }
}

function generateAISuggestion(condition, temperature) {
  let suggestion = "";

  if (condition.includes("rain")) {
    suggestion = "It's rainy outside. Carry an umbrella and wear waterproof clothing.";
  } else if (condition.includes("clear")) {
    suggestion = "It's a sunny day! Wear sunscreen and sunglasses to protect yourself.";
  } else if (condition.includes("cloud")) {
    suggestion = "It's cloudy today. It might be a good idea to carry a light jacket.";
  } else if (condition.includes("snow")) {
    suggestion = "Snowy weather ahead! Dress warmly and be cautious of slippery roads.";
  } else if (condition.includes("thunderstorm")) {
    suggestion = "Thunderstorms are expected. Stay indoors and avoid open spaces.";
  } else {
    suggestion = "Weather looks moderate. Enjoy your day but stay prepared for sudden changes.";
  }

  // Add temperature-based precautions
  if (temperature < 10) {
    suggestion += " Also, it's quite cold. Dress warmly to stay comfortable.";
  } else if (temperature>10 && temperature<30) {
    suggestion += " It's warm . ";
  }
  else if (temperature>=30 && temperature<40) {
    suggestion += " It's hot outside. Stay hydrated and avoid prolonged sun exposure.";
  }
  else if (temperature>=40 && temperature<50) {
    suggestion += " It's very hot outside. Stay hydrated and avoid prolonged sun exposure.Heat stroke ALERT !!!";
  }

  return suggestion;
}
