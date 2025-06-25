import sqlite3

# Conexión a la base de datos
conn = sqlite3.connect('mi_base_de_datos.db')
cursor = conn.cursor()

# Crear tabla (si no existe)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS tabla_ejemplo (
        id INTEGER PRIMARY KEY,
        columna1 TEXT,
        columna2 INTEGER
    )
''')

# Insertar datos
cursor.execute("INSERT INTO tabla_ejemplo (columna1, columna2) VALUES (?, ?)", ('valor1', 123))
cursor.execute("INSERT INTO tabla_ejemplo (columna1, columna2) VALUES (?, ?)", ('valor2', 456))

# Confirmar cambios
conn.commit()

# Seleccionar datos
cursor.execute("SELECT * FROM tabla_ejemplo")
resultados = cursor.fetchall()
for fila in resultados:
    print(fila)

# Cerrar conexión
conn.close()

#flask
from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

@app.route('/enviar_datos', methods=['POST'])
def recibir_datos():
    if request.method == 'POST':
        nombre = request.form['nombre']
        email = request.form['email']

        conn = sqlite3.connect('mi_base_de_datos.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO usuarios (nombre, email) VALUES (?, ?)", (nombre, email))
        conn.commit()
        conn.close()

        return "Datos guardados exitosamente!"
    return render_template('formulario.html') #O la página que corresponda














from flask import Flask, request, render_template, redirect
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)

# Conexión a MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mi_base_de_datos']
usuarios = db['usuarios']

# Página de login
@app.route('/login', methods=['GET'])
def mostrar_login():
    return render_template('login.html')

# Procesar login
@app.route('/login', methods=['POST'])
def procesar_login():
    username = request.form['username']
    password = request.form['password'].encode('utf-8')

    user = usuarios.find_one({'username': username})

    if user and bcrypt.checkpw(password, user['password_hash']):
        return f"Bienvenido, {username}!"
    else:
        return "Usuario o contraseña incorrecta", 401

# Ruta para registrar un nuevo usuario (opcional)
@app.route('/register', methods=['POST'])
def registrar_usuario():
    username = request.form['username']
    password = request.form['password'].encode('utf-8')
    password_hash = bcrypt.hashpw(password, bcrypt.gensalt())

    if usuarios.find_one({'username': username}):
        return "Usuario ya existe", 400

    usuarios.insert_one({
        'username': username,
        'password_hash': password_hash
    })

    return "Usuario registrado correctamente"

if __name__ == '__main__':
    app.run(debug=True)
