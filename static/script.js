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
    if (!response.ok) {
        const error = await response.json()
        return error
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
    
    if ('error' in resp) {
        console.error(resp.error)

        loader.style.display = 'none'

        checkBtn.style.display = 'none'
        resField.style.display = 'block'
        if (resp.error === '1') {
            resText.innerHTML = "a field is missing"
        } else if (resp.error === '2') {
            resText.innerHTML = "invalid function"
        }

    } else {
        console.log("Response: ", resp)

        loader.style.display = 'none'

        const isContinuous = resp.continuous === true ? "continuous" : "not continuous"

        checkBtn.style.display = 'none'
        resField.style.display = 'block'
        resText.innerHTML = `f is ${isContinuous} at ${c}`
        graphBtn.style.display = 'block'
    }
}

function clearAll() {
    func.value = ""
    numb.value = ""
    checkBtn.style.display = 'block'
    resField.style.display = 'none'
    graphBtn.style.display = 'none'
    elt.style.display = 'none'
}

function clearRes() {
    checkBtn.style.display = 'block'
    graphBtn.style.display = 'none'
    resField.style.display = 'none'
    elt.style.display = 'none'
}

