from flask import Flask, render_template, request, jsonify
from continuity import verif, is_latex

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/check", methods=["POST"])
def check():
    req = request.get_json()
    
    f = req.get('function')
    c = req.get('number')

    if f == '' or c == '':
        return jsonify({'error': '1'}), 400

    c = float(c)

    if not is_latex(f):
        return jsonify({'error': '2'}), 400

    print(f"request recieved successfully f = {f} c = {c}")
    
    is_continuous = verif(f, c)
    
    return jsonify({
        'function': f,
        'number': c,
        'continuous': is_continuous
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

