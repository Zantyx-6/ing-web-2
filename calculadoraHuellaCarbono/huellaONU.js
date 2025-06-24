function calcularHuellaONU() {
  const resultado = document.getElementById("resultado");
  let totalCO2 = 0;
  let detalles = [];

  const tipoVivienda = document.querySelector('input[name="vivienda"]:checked').value;
  const kwh = parseInt(document.getElementById("kwh").value);
  const factorElectricidad = 0.42; // kg CO2 por kWh
  const emisionesElectricidad = kwh * 12 * factorElectricidad;
  let hogarCO2 = emisionesElectricidad;

  let factorVivienda = 1;
  if (tipoVivienda === "departamento") factorVivienda = 0.9;
  else if (tipoVivienda === "compartida") factorVivienda = 0.7;
  hogarCO2 *= factorVivienda;
  totalCO2 += hogarCO2;
  detalles.push({ categoria: "Energía eléctrica", valor: hogarCO2 });

  document.getElementById("kwh-value").textContent = `${kwh} kWh`;

  const horas = parseInt(document.getElementById("horasTransporte").value);
  const seleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  let transporteCO2 = 0;
  const factores = {
    auto: 2.3,
    moto: 1.2,
    bus: 0.8,
    metro: 0.6,
    bici: 0,
    aPie: 0,
  };

  seleccionados.forEach(medio => {
    transporteCO2 += horas * factores[medio];
  });
  totalCO2 += transporteCO2;
  detalles.push({ categoria: "Transporte", valor: transporteCO2 });

  document.getElementById("horasTransporte-value").textContent = `${horas} h`;


  const carne = document.querySelector('input[name="carne"]:checked').value;
  let carneCO2 = 0;
  if (carne === "alta") carneCO2 = 1600;
  else if (carne === "media") carneCO2 = 1000;
  else if (carne === "baja") carneCO2 = 400;
  else if (carne === "ninguna") carneCO2 = 0;
  totalCO2 += carneCO2;
  detalles.push({ categoria: "Consumo de carne", valor: carneCO2 });

  const reciclaje = document.querySelector('input[name="reciclaje"]:checked').value;
  let reciclajeAhorro = reciclaje === "si" ? 0 : 0; // Eliminado valor negativo
  totalCO2 += reciclajeAhorro;
  detalles.push({ categoria: "Reciclaje", valor: reciclajeAhorro });

  const ropa = document.querySelector('input[name="ropa"]:checked').value;
  let ropaCO2 = ropa === "frecuente" ? 500 : ropa === "ocasional" ? 300 : 100;
  totalCO2 += ropaCO2;
  detalles.push({ categoria: "Consumo de ropa", valor: ropaCO2 });

  // resultado
  let consejo = "";
  let mayor = detalles.reduce((prev, curr) => (curr.valor > prev.valor ? curr : prev));

  if (mayor.categoria === "Energía eléctrica") {
    consejo = "Reduce tu consumo energético. Opta por iluminación LED o desconecta aparatos inactivos.";
  } else if (mayor.categoria === "Transporte") {
    consejo = "Considera caminar, usar bicicleta o transporte público más eficiente.";
  } else if (mayor.categoria === "Consumo de carne") {
    consejo = "Reduce el consumo de carne roja. Opta por opciones vegetales o pescado.";
  } else if (mayor.categoria === "Consumo de ropa") {
    consejo = "Evita el fast fashion. Compra ropa de segunda mano o menos frecuentemente.";
  }

  const metaONU = 2000;
  const dentroMeta = totalCO2 <= metaONU;

  resultado.style.display = "block";
  resultado.innerHTML = `
    <h2>Resultado</h2>
    <p>Tu huella estimada anual es <strong>${Math.round(totalCO2)} kg CO₂</strong>.</p>
    <p>${dentroMeta ? "✅ Estás dentro del límite recomendado por la ONU." : "⚠️ Superas el límite de 2 toneladas anuales recomendado por la ONU."}</p>
    <p><strong>Área con mayor impacto:</strong> ${mayor.categoria}</p>
    <p><strong>Consejo:</strong> ${consejo}</p>
  `;
}

window.onload = () => {
  const kwhSlider = document.getElementById("kwh");
  const horasSlider = document.getElementById("horasTransporte");

  kwhSlider.addEventListener("input", () => {
    document.getElementById("kwh-value").textContent = `${kwhSlider.value} kWh`;
  });

  horasSlider.addEventListener("input", () => {
    document.getElementById("horasTransporte-value").textContent = `${horasSlider.value} h`;
  });
};
