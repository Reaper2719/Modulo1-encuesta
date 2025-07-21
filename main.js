
// Función para limpiar el formulario
function limpiarFormulario() {
  // Limpiar todos los checkboxes del documento
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(input => { input.checked = false; });
  // Limpiar todos los radios del documento
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(input => { input.checked = false; });
  // Limpiar todos los campos de texto del documento
  const textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach(input => { input.value = ''; });
  // Limpiar todos los textareas del documento
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => { textarea.value = ''; });
  // Limpiar localStorage
  localStorage.removeItem("respuestas_modulo1");
  // Ocultar el textarea del JSON exportado si está visible
  const container = document.getElementById('jsonContainer');
  if (container) {
    container.style.display = 'none';
  }
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

