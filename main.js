
// Función para limpiar el formulario
function limpiarFormulario() {
  const form = document.getElementById('formularioModulo');
  if (form) {
    form.reset();
  }
  // Limpiar checkboxes manualmente (por si hay arrays)
  const inputs = document.querySelectorAll('input[type="checkbox"]');
  inputs.forEach(input => { input.checked = false; });
  // Limpiar campos de texto
  const textInputs = document.querySelectorAll('input[type="text"], textarea');
  textInputs.forEach(input => { input.value = ''; });
  // Limpiar localStorage si se desea
  // localStorage.removeItem("respuestas_modulo1");
}
function guardarRespuestas() {
  const respuestas = {};
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    if (input.type === "radio" && input.checked) {
      respuestas[input.name] = input.value;
    } else if (input.type === "checkbox") {
      if (!respuestas[input.name]) respuestas[input.name] = [];
      if (input.checked) respuestas[input.name].push(input.value);
    } else if (input.tagName === "TEXTAREA" || input.type === "text") {
      if (input.value.trim() !== "") {
        if (respuestas[input.name]) {
          if (Array.isArray(respuestas[input.name])) {
            respuestas[input.name].push(input.value);
          } else {
            respuestas[input.name] = [respuestas[input.name], input.value];
          }
        } else {
          respuestas[input.name] = input.value;
        }
      }
    }
  });
  localStorage.setItem("respuestas_modulo1", JSON.stringify(respuestas));
  alert("Respuestas guardadas localmente.");
}

function exportarDatos() {
  const data = localStorage.getItem("respuestas_modulo1");
  if (!data) return alert("No hay datos guardados.");
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "respuestas_modulo1.json";
  a.click();
  URL.revokeObjectURL(url);
}
