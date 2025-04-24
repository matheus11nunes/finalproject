const API_URL = 'https://api.reliefweb.int/v1/disasters?appname=helphub&limit=10';

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const disasters = data.data;
    const container = document.getElementById("disaster-data");
    container.innerHTML = "";

    disasters.forEach(disaster => {
      const { name, country, date } = disaster.fields;
      const countryNames = country ? country.map(c => c.name).join(", ") : "Location not specified";
      const div = document.createElement("div");
      div.className = "disaster-alert";
      div.innerHTML = `
        <strong>${name}</strong><br>
        ${countryNames}<br>
        <small>${new Date(date.created).toLocaleDateString()}</small>
        <hr>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error("Error fetching disaster data:", error);
    document.getElementById("disaster-data").innerText = "Could not load disaster data.";
  });
