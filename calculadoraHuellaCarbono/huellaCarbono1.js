document.getElementById("display-username").textContent =
  localStorage.getItem("carbonUsername") || "Usuario";

document.getElementById("car-usage").addEventListener("input", function () {
  document.getElementById("car-usage-value").textContent = `${this.value} km`;
});

document.getElementById("car-efficiency").addEventListener("input", function () {
  document.getElementById("car-efficiency-value").textContent = `${this.value} L/100km`;
});

document.getElementById("public-transport").addEventListener("input", function () {
  document.getElementById("public-transport-value").textContent = `${this.value} km`;
});

document.getElementById("energy").addEventListener("input", function () {
  document.getElementById("energy-value").textContent = `${this.value} kWh`;
});

document.getElementById("food").addEventListener("input", function () {
  document.getElementById("food-value").textContent = `${this.value} veces`;
});

document.getElementById("recycling").addEventListener("input", function () {
  document.getElementById("recycling-value").textContent = `${this.value}%`;
});


document.getElementById("calculate-btn").addEventListener("click", function () {

  const carKm = parseFloat(document.getElementById('car-usage').value);
  const carEfficiency = parseFloat(document.getElementById('car-efficiency').value);
  const publicTransportKm = parseFloat(document.getElementById('public-transport').value);
  
  const energy = parseInt(document.getElementById("energy").value);

  const food = parseInt(document.getElementById("food").value);
  

  const phoneChange = parseFloat(document.getElementById("phone-change").value);
  const recycling = parseFloat(document.getElementById("recycling").value) / 100;

  const transportFootprint = carKm * carEfficiency * 2.31 * 52; // Gasolina emite ~2.31 kg CO2 por litro
  const publicTransportFootprint = publicTransportKm * 0.1 * 52; // Transporte público emite ~0.1 kg CO2 por km
  const energyFootprint = energy * 0.5 * 12; // 0.5 kg CO2 por kWh, 12 meses
  const foodFootprint = food * 2 * 52; // 2 kg CO2 por comida con carne, 52 semanas
  const electronicsFootprint = (1 / phoneChange) * 200; // Aprox 200 kg CO2 por móvil
  const wasteFootprint = (1 - recycling) * 300; // Residuos no reciclados

  const totalFootprint = Math.round(
    transportFootprint + 
    publicTransportFootprint + 
    energyFootprint + 
    foodFootprint + 
    electronicsFootprint + 
    wasteFootprint
  );

  document.getElementById("carbon-footprint").textContent = totalFootprint;

  let ratingText = "";
  let ratingColor = "";

  if (totalFootprint <= 3000) {
    ratingText = "Excelente! Tu huella de carbono es muy baja.";
    ratingColor = "#2e7d32";
  } else if (totalFootprint <= 6000) {
    ratingText = "Buena. Estás por debajo del promedio.";
    ratingColor = "#7cb342";
  } else if (totalFootprint <= 10000) {
    ratingText = "Promedio. Hay espacio para mejorar.";
    ratingColor = "#fbc02d";
  } else if (totalFootprint <= 15000) {
    ratingText = "Alta. Considera hacer cambios para reducir tu impacto.";
    ratingColor = "#ff9800";
  } else {
    ratingText = "Muy Alta. Tu impacto ambiental es considerable.";
    ratingColor = "#d32f2f";
  }

  document.getElementById("rating").innerHTML = 
    `<p style="color: ${ratingColor}; font-weight: bold;">${ratingText}</p>`;

  const tipsList = document.getElementById("tips");
  tipsList.innerHTML = "";

  if (carKm > 300) {
    tipsList.innerHTML +=
      "<li><strong>Transporte:</strong> Considera usar transporte público, bicicleta o compartir auto. Cada 50 km menos que conduces a la semana reduces ~500 kg CO2 al año.</li>";
  }

  if (energy > 500) {
    tipsList.innerHTML +=
      "<li><strong>Energía:</strong> Apaga electrodomésticos cuando no los uses y considera cambiar a bombillas LED para reducir tu consumo.</li>";
  }

  if (food > 10) {
    tipsList.innerHTML +=
      "<li><strong>Alimentación:</strong> Reducir el consumo de carne, especialmente carne roja, puede disminuir significativamente tu huella.</li>";
  }

  if (phoneChange < 2) {
    tipsList.innerHTML +=
      "<li><strong>Electrónicos:</strong> Usa tu teléfono por más tiempo antes de cambiarlo. Producir un smartphone genera unos 200 kg de CO2.</li>";
  }

  if (recycling < 0.7) {
    tipsList.innerHTML +=
      `<li><strong>Reciclaje:</strong> Intenta reciclar más del ${Math.round(recycling * 100)}% que actualmente reciclas. El reciclaje reduce emisiones de vertederos.</li>`;
  }
  tipsList.innerHTML +=
    "<li><strong>Compensación:</strong> Considera compensar tu huella apoyando proyectos de reforestación o energía renovable.</li>";
  tipsList.innerHTML +=
    "<li><strong>Educación:</strong> Infórmate más sobre sostenibilidad y comparte lo que aprendas con otros.</li>";

  
  document.getElementById("result-container").classList.remove("hidden");
});

// Cerrar sesión
document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("carbonUsername");
  window.location.href = "login.html";
});