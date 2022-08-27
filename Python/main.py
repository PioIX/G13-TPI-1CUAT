from flask import Flask, render_template, request
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


@app.route('/irAIngresar')
def irAIngresar():
  return render_template('registrarse.html')


@app.route('/crear_cuenta')
def crear_cuenta():
  return render_template('crear_nueva_cuenta.html')


@app.route('/quiz')
def quiz():
  conn = sqlite3.connect('test.db')
  a = conn.execute("""SELECT preguntas_ods, id
                      FROM Quiz;""")
  pregs = []
  for i in range(10):
      pregs.append(a.__next__()[0])

  a = conn.execute("""SELECT respuesta_correcta, id
                      FROM Quiz;""")
  corrects = []
  for i in range(10):
      corrects.append(a.__next__()[0])

  a = conn.execute("""SELECT respuesta_incorrecta1, id
                      FROM Quiz;""")
  incs1 = []
  for i in range(10):
      incs1.append(a.__next__()[0])

  a = conn.execute("""SELECT respuesta_incorrecta2, id
                      FROM Quiz;""")

  incs2 = []
  for i in range(10):
      incs2.append(a.__next__()[0])

  a = conn.execute("""SELECT respuesta_incorrecta3, id
                      FROM Quiz;""")

  incs3 = []
  for i in range(10):
      incs3.append(a.__next__()[0])

  conn.close()
  return render_template('quiz.html',
                         preguntas=pregs,
                         correctas=corrects,
                         incorrectas1=incs1,
                         incorrectas2=incs2,
                         incorrectas3=incs3)


@app.route('/verdadero_o_falso')
def VerdaderoFalso():
  conn = sqlite3.connect('test.db')

  pregunta = []
  a = conn.execute("""SELECT pregunta, id
                      FROM VF;""")
  for i in range(10):
      pregunta.append(a.__next__()[0])

  respuestaPre = []
  a = conn.execute("""SELECT respuesta, id
                      FROM VF;""")
  for i in range(10):
      respuestaPre.append(a.__next__()[0])
  conn.close()
  return render_template('verdadero_o_falso.html',
                         preguntaVF=pregunta,
                         respuestaVF=respuestaPre)


@app.route('/completar_oracion')
def CompletarOracion():
  conn = sqlite3.connect('test.db')
  oracion = []
  a = conn.execute("""SELECT oracion, id
                      FROM CompletarOracion;""")
  for i in range(10):
      oracion.append(a.__next__()[0])

  respuestaOra = []
  a = conn.execute("""SELECT respuesta, id
                      FROM CompletarOracion;""")
  for i in range(10):
      respuestaOra.append(a.__next__()[0])
  conn.close()
  return render_template('completar_oracion.html',
                         oracionCF=oracion,
                         respuestaCF=respuestaOra)


@app.route('/ingresar', methods=['GET', 'POST'])
def registrarse():
  conn = sqlite3.connect('test.db')
  data = []
  usuario = request.form.get("usuario")
  contraseña = request.form.get("contraseña")

  a = conn.execute("""SELECT count(*)
                      FROM LogIn;""")

  b = conn.execute("""SELECT usuario, id
                      FROM LogIn;""")

  c = conn.execute("""SELECT contraseña, id
                      FROM LogIn;""")

  d = conn.execute("""SELECT puntajeQuiz, id
                      FROM LogIn;""")

  e = conn.execute("""SELECT puntajeVF, id
                      FROM LogIn;""")

  f = conn.execute("""SELECT puntajeCF, id
                      FROM LogIn;""")

  cant = a.__next__()[0]

  if usuario != "" and contraseña != "":
      for i in range(cant):
          data.append({
              "nombre": b.__next__()[0],
              "contra": c.__next__()[0],
              "pun_quiz": d.__next__()[0],
              "pun_vf": e.__next__()[0],
              "pun_cf": f.__next__()[0]
          })

  print(data)

  for i in range(cant):
      if usuario != data[i]["nombre"]:
          print("el us ta mal")
      else:
          print("el us ta bien")
          if contraseña != data[i]["contra"]:
              print("la con ta mal")
              break
          else:
              print("la con ta bien")
              print("conexion exitosa")
              j = data[i]
              print(j)
              break

  conn.close()
  return render_template('juga.html', jugador=j)


@app.route('/registrarse', methods=['GET', 'POST'])
def crear_nueva_cuenta():
  conn = sqlite3.connect('test.db')
  usuario = request.form.get("usuario")
  contraseña = request.form.get("contraseña")
  usuarios = []
  print(usuario)
  print(contraseña)
  a = conn.execute("""SELECT count(*)
                      FROM LogIn;""")
  b = conn.execute("""SELECT usuario
                    FROM LogIn;""")
  cant = a.__next__()[0]
  for i in range(cant):
      usuarios.append(b.__next__()[0])

  if usuario not in usuarios:
      conn.execute(
          f"""INSERT INTO LogIn (contraseña, usuario, puntajeQuiz, puntajeVF, puntajeCF)
                   VALUES ('{contraseña}', '{usuario}', 0, 0, 0);""")
  else:
      print("el us ya existe")

  conn.commit()

  conn.close()
  return render_template('crear_nueva_cuenta.html')


app.run(host='0.0.0.0', port=81)
