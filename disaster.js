const API_URL = 'https://corsproxy.io/?https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries';

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const disasters = data.DisasterDeclarationsSummaries.slice(0, 10);
    const container = document.getElementById("disaster-data");
    container.innerHTML = "";

    disasters.forEach(disaster => {
      const div = document.createElement("div");
      div.className = "disaster-alert";
      div.innerHTML = `
        <strong>${disaster.state}</strong> – ${disaster.declarationTitle}<br>
        <small>${new Date(disaster.declarationDate).toLocaleDateString()}</small>
        <hr>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error("Error fetching FEMA data:", error);
    document.getElementById("disaster-data").innerText = "Could not load FEMA disaster data.";
  });