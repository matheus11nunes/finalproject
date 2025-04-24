const API_URL = 'https://corsproxy.io/?https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries';

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('disaster-data');
    container.innerHTML = '';

    data.DisasterDeclarationsSummaries.slice(0, 5).forEach(disaster => {
      const div = document.createElement('div');
      div.classList.add('event');
      div.innerHTML = `
        <h4>${disaster.declarationTitle}</h4>
        <p><strong>State:</strong> ${disaster.state}</p>
        <p><strong>Type:</strong> ${disaster.incidentType}</p>
        <p><strong>Date:</strong> ${new Date(disaster.declarationDate).toLocaleDateString()}</p>
        <p><strong>Details:</strong> <a href="https://www.fema.gov/disaster/${disaster.disasterNumber}" target="_blank">More Info</a></p>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    document.getElementById('disaster-data').innerHTML = 'Could not load FEMA disaster data.';
    console.error('Error fetching disaster data:', error);
  });