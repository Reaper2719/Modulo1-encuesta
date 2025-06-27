
function exportarDatos() {
  const data = localStorage.getItem("respuestas_modulo1");
  if (!data) return alert("No hay datos guardados.");

  // Crear área si no existe
  let area = document.getElementById("json-output");
  if (!area) {
    area = document.createElement("textarea");
    area.id = "json-output";
    area.style.width = "100%";
    area.style.height = "300px";
    area.readOnly = true;
    area.style.marginTop = "20px";
    document.querySelector("main").appendChild(area);
  }
  area.value = JSON.stringify(JSON.parse(data), null, 2);
}
