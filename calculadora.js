// Elementos del DOM
const displayActual = document.getElementById('operacion-actual')
const displayAnterior = document.getElementById('operacion-anterior')

// Estado
let numeroActual = '0'
let numeroAnterior = ''
let operador = null
let debeReset = false

function actualizarDisplay() {
  displayActual.textContent = numeroActual
  displayAnterior.textContent = numeroAnterior
}

function agregarNumero(numero) {
  if (debeReset) {
    numeroActual = '0'
    debeReset = false
  }
  if (numero === '.' && numeroActual.includes('.')) return
  if (numeroActual === '0' && numero !== '.') {
    numeroActual = numero
  } else {
    numeroActual += numero
  }
  actualizarDisplay()
}

function seleccionarOperador(op) {
  if (operador && !debeReset) calcular()
  operador = op
  numeroAnterior = numeroActual + ' ' + op
  debeReset = true
  actualizarDisplay()
}

function calcular() {
  if (!operador || debeReset) return
  const anterior = parseFloat(numeroAnterior)
  const actual = parseFloat(numeroActual)
  if (isNaN(anterior) || isNaN(actual)) return

  let resultado
  try {
    switch (operador) {
      case '+': resultado = anterior + actual; break
      case '-': resultado = anterior - actual; break
      case '×': resultado = anterior * actual; break
      case '÷':
        if (actual === 0) throw new Error('No se puede dividir por cero')
        resultado = anterior / actual
        break
      default: return
    }
    resultado = Math.round((resultado + Number.EPSILON) * 100000000) / 100000000
    numeroActual = resultado.toString()
    numeroAnterior = ''
    operador = null
    debeReset = true
  } catch (error) {
    mostrarError(error.message)
    return
  }
  actualizarDisplay()
}

function mostrarError(mensaje) {
  displayActual.textContent = 'Error'
  displayAnterior.textContent = mensaje
  setTimeout(() => limpiar(), 2000)
}

function limpiar() {
  numeroActual = '0'
  numeroAnterior = ''
  operador = null
  debeReset = false
  actualizarDisplay()
}

// Event listeners
document.querySelectorAll('.btn-numero').forEach(boton => {
  boton.addEventListener('click', () => agregarNumero(boton.dataset.numero))
})

document.querySelectorAll('.btn-operador').forEach(boton => {
  boton.addEventListener('click', () => seleccionarOperador(boton.dataset.operador))
})

document.getElementById('igual').addEventListener('click', calcular)
document.getElementById('clear').addEventListener('click', limpiar)
document.getElementById('delete').addEventListener('click', () => {
  if (numeroActual.length > 1) {
    numeroActual = numeroActual.slice(0, -1)
  } else {
    numeroActual = '0'
  }
  actualizarDisplay()
})