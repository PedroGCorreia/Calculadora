const calculadora = document.querySelector('.calculadora')
const teclas = calculadora.querySelector('.teclas')
const visor = calculadora.querySelector('.visor')

teclas.addEventListener('click', (e) => {
    if(!e.target.closest('button')){
        return
    }

    const tecla = e.target
    const { tipoTecla } = tecla.dataset
    const { tipoTeclaAnterior } = calculadora.dataset
    const valorTecla = tecla.textContent
    const valorVisor = visor.textContent

    if(tipoTecla === 'numero'){
        if(valorVisor === '0' || tipoTeclaAnterior === 'operador'){
            visor.textContent = valorTecla
        } else {
            visor.textContent = valorVisor + valorTecla
        }
    } 

    if (tipoTecla === 'operador') {
        const operadores = teclas.querySelectorAll('[data-tipo-tecla="operador"]')
        operadores.forEach((operador) => {
            operador.dataset.estado = ''
        })
        tecla.dataset.estado = 'selecionado'
    
        calculadora.dataset.primeiroNumero = valorVisor
        calculadora.dataset.operador = tecla.dataset.tecla
      }

    if(tipoTecla === 'igual'){
        const primeiroNumero = parseFloat(calculadora.dataset.primeiroNumero)
        const operador = calculadora.dataset.operador
        const segundoNumero = parseFloat(valorVisor)

        let resultado = ''

        if(operador == 'somar'){
            resultado = primeiroNumero+segundoNumero
        }
        if(operador == 'subtrair'){
            resultado = primeiroNumero-segundoNumero
        }
        if(operador == 'multiplicar'){
            resultado = primeiroNumero*segundoNumero
        }
        if(operador == 'dividir'){
            resultado = primeiroNumero/segundoNumero
        }

        visor.textContent = resultado
    }

    if(tipoTecla == "clear"){
        visor.textContent = 0
    }

    calculadora.dataset.tipoTeclaAnterior = tipoTecla
})