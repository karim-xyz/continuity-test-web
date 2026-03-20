var elt = document.getElementById('calculator')
var calculator = Desmos.GraphingCalculator(elt, {expressions: false})

var func = document.getElementById('func')
var numb = document.getElementById('numb')

var checkBtn = document.getElementById('check-btn')
var loader = document.getElementById('loader')
var resField = document.getElementById('res-field')
var resText = document.getElementById('res-text')
var graphBtn = document.getElementById('graph-btn')

var f, c

async function connect() {
    const response = await fetch('/check', 
        {method: 'POST', 
         headers: {'Content-Type': 'application/json',}, 
         body: JSON.stringify({'function': f, 'number': c})
        })
    if (!response.ok) {
        const error = await response.json()
        return JSON.stringify({'error': error})
    } else {
        const data = await response.json()
        return data
    }
}

async function check() {
    f = func.value
    c = numb.value
    
    loader.style.display = 'block'

    const resp = await connect()

    loader.style.display = 'none'
    checkBtn.style.display = 'none'
    resField.style.display = 'block'
    
    if ('error' in resp) {
        console.error(resp.error)

        if (resp.error === 'a field is missing' || resp.error === 'invalid function') {
            resText.innerHTML = resp.error
        } else {
            resText.innerHTML = "unknown error"
        }

    } else {
        console.log("Response: ", resp)

        const isContinuous = resp.continuous === true ? "continuous" : "not continuous"

        resText.innerHTML = `f is ${isContinuous} at ${c}`
        graphBtn.style.display = 'block'
    }
}

function draw() {
    if (elt.style.display === 'none') {
        elt.style.display = 'block'
        calculator.setExpression({ id: 'f', latex: f })
    } else {
        elt.style.display = 'none'
    }
}

function clearRes() {
    checkBtn.style.display = 'block'
    resField.style.display = 'none'
    graphBtn.style.display = 'none'
    elt.style.display = 'none'
}

function clearAll() {
    func.value = ""
    numb.value = ""
    clearRes()
}

