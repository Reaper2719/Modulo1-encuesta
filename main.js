
function limpiarFormulario() {
    // Limpiar todos los checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.checked = false;
    });

    // Limpiar todos los radios
    document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
        radio.checked = false;
    });

    // Limpiar todos los textareas
    document.querySelectorAll('textarea').forEach(function(textarea) {
        textarea.value = '';
    });
    
    // Limpiar el área de JSON si está visible
    const container = document.getElementById('jsonContainer');
    if (container) {
        container.style.display = 'none';
    }
}
function guardarRespuestas() {
  // Obtener respuestas anteriores si existen
  let todasLasRespuestas = [];
  const respuestasAnteriores = localStorage.getItem("respuestas_modulo1");
  if (respuestasAnteriores) {
    todasLasRespuestas = JSON.parse(respuestasAnteriores);
  }

  // Crear nuevo objeto de respuestas
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

  // Agregar timestamp para identificar cada registro
  respuestas.timestamp = new Date().toISOString();
  
  // Agregar las nuevas respuestas al array
  todasLasRespuestas.push(respuestas);
  
  // Guardar todas las respuestas
  localStorage.setItem("respuestas_modulo1", JSON.stringify(todasLasRespuestas));
  alert("Respuestas guardadas localmente. Total de registros: " + todasLasRespuestas.length);
}

