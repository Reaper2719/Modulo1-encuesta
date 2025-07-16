function exportarDatos() {
  const data = localStorage.getItem("respuestas_modulo1");
  if (!data) return alert("No hay datos guardados.");
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "respuestas_modulo1.json";
  // Para iOS/iPadOS: intentar abrir en nueva pestaña si la descarga directa falla
  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
  // Fallback para navegadores que no soportan la descarga
  setTimeout(() => {
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
      window.open(url, '_blank');
    }
  }, 200);
}
