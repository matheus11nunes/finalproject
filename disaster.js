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
      const fields = disaster.fields || {};
      const name = fields.name || "Unknown Disaster";
      const dateCreated = fields.date?.created || null;

      // Country extraction
      let countryNames = "";
      if (fields.country && Array.isArray(fields.country) && fields.country.length > 0) {
        countryNames = fields.country
          .map(c => c.name)
          .filter(name => name && name.trim())
          .join(", ");
      }

      let formattedDate = "";
      if (dateCreated) {
        const date = new Date(dateCreated);
        formattedDate = date.toLocaleString("en-US", { month: "short", year: "numeric" });
      }

      let line = "";
      if (countryNames) {
        line = `${countryNames}: ${name}`;
      } else {
        line = `${name}`;
      }
      
      if (formattedDate) {
        line += ` - ${formattedDate}`;
      }

      const div = document.createElement("div");
      div.className = "disaster-alert";
      div.textContent = line;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error("Error fetching disaster data:", error);
    document.getElementById("disaster-data").innerText = "Could not load disaster data.";
  });
