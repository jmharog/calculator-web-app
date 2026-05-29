// Elementos del DOM
const displayActual = document.getElementById('operacion-actual')
const displayAnterior = document.getElementById('operacion-anterior')

// Estado de la calculadora
let numeroActual = '0'

// Botones numéricos
document.querySelectorAll('.btn-numero').forEach(boton => {
  boton.addEventListener('click', () => {
    const numero = boton.dataset.numero
    // Evitar múltiples puntos decimales
    if (numero === '.' && numeroActual.includes('.')) return
    // Reemplazar el 0 inicial o concatenar
    if (numeroActual === '0' && numero !== '.') {
      numeroActual = numero
    } else {
      numeroActual += numero
    }
    displayActual.textContent = numeroActual
  })
})

// Botón clear
document.getElementById('clear').addEventListener('click', () => {
  numeroActual = '0'
  displayActual.textContent = numeroActual
  displayAnterior.textContent = ''
})

// Botón delete
document.getElementById('delete').addEventListener('click', () => {
  if (numeroActual.length > 1) {
    numeroActual = numeroActual.slice(0, -1)
  } else {
    numeroActual = '0'
  }
  displayActual.textContent = numeroActual
})