from flask import Flask, render_template
import sqlite3
app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/aprende')
def aprende():
    return render_template('aprende.html')

@app.route('/juga')
def juga():
  return render_template('juga.html')
  
@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/quiz')
def quiz():
  conn = sqlite3.connect('test.db')
  a = conn.execute("""SELECT preguntas_ods
                           FROM Quiz;""")
  pregs = []
  for i in range(10):
    pregs.append(a.__next__()[0])

  a = conn.execute("""SELECT respuesta_correcta
                           FROM Quiz;""")
  corrects = []
  for i in range(10):
    corrects.append(a.__next__()[0])
    
  return render_template('quiz.html',
                        preguntas = pregs,
                        correctas = corrects
                        )
  
@app.route('/verdadero_o_falso')
def VerdaderoFalso():
  conn = sqlite3.connect('test.db')
  pregunta = conn.execute("""SELECT pregunta
                           FROM Preguntas;""")
  respuestaPre = conn.execute("""SELECT respuesta
                               FROM Preguntas;""")
  conn.close()
  return render_template('VerdaderoFalso.html',
                        preguntaVF = pregunta,
                        respuestaVF = respuestaPre)

@app.route('/completar_oracion')
def CompletarOracion():
  conn = sqlite3.connect('test.db')
  oracion = conn.execute("""SELECT oracion
                         FROM CompletarOracion;""")
  respuestaOra = conn.execute("""SELECT respuesta
                               FROM CompletarOracion;""")
  conn.close()
  return render_template('completarOracion',
                        oracionCO = oracion,
                        respuestaCO = respuestaOra)

app.run(host='0.0.0.0', port=81)




