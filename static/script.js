var elt = document.getElementById('calculator')
var calculator = Desmos.GraphingCalculator(elt, {expressions: false})

var func = document.getElementById('func')
var numb = document.getElementById('numb')

var checkBtn = document.getElementById('check')
var resField = document.getElementById('res')
var resText = document.getElementById('res-text')

var f, c

function draw() {
    if (elt.style.display === 'none') {
        elt.style.display = 'block'
        calculator.setExpression({ id: 'f', latex: f })
    } else {
        elt.style.display = 'none'
    }
}

async function connect() {
    const response = await fetch('/check', 
        {method: 'POST', 
         headers: {'Content-Type': 'application/json',}, 
         body: JSON.stringify({"function": f, "number": c})
        })
    const data = await response.json()
    return data
}

async function check() {
    f = func.value
    c = numb.value
    
    const data = await connect()
    console.log("response: ", data)

    const isContinuous = data.continuous === true ? "continuous" : "not continuous"

    checkBtn.style.display = 'none'
    resField.style.display = 'block'
    resText.innerHTML = `f is ${isContinuous} at ${c}`
}

function clearAll() {
    func.value = ""
    numb.value = ""
    resField.style.display = 'none'
    checkBtn.style.display = 'block'
    if (elt.style.display === 'block') {
        elt.style.display = 'none'
    }
}

function clearRes() {
    resField.style.display = 'none'
    checkBtn.style.display = 'block'
    if (elt.style.display === 'block') {
        elt.style.display = 'none'
    }
}

