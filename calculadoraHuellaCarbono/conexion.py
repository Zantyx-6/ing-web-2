from pymongo import MongoClient
from urllib.parse import quote_plus
from flask import *
import bcrypt

app = Flask(__name__)

usuario = quote_plus("Juanmelo")
clave = quote_plus("registros")
cluster = "cluster0.cubxjza.mongodb.net"
base_datos = "Registros"

uri = f"mongodb+srv://{usuario}:{clave}@{cluster}/{base_datos}?retryWrites=true&w=majority&appName=Cluster0"


# Acceder a base y colección


@app.route('/')
def formulario_registro():
    return render_template('registro.html')

@app.route('/registrar', methods=['POST'])
def registrar():
    nombre = request.form['nombre']
    email = request.form['email']
    password = request.form['password']

    # Verificar si el email ya está registrado
    if coleccion.find_one({'email': email}):
        return "El email ya está registrado"

    # Hashear contraseña
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Guardar usuario
    coleccion.insert_one({
        'nombre': nombre,
        'email': email,
        'password': hashed_pw
    })

    return "Registro exitoso. <a href='/'>Volver</a>"

# coleccion.insert_one(coleccion)

# Conexión a MongoDB
client = MongoClient(uri, serverSelectionTimeoutMS=5500)
db = client[base_datos]
coleccion = db["Registros"]

# Verificación de conexión
print("Base conectada a MongoDB")

# Imprimir documentos existentes
for documento in coleccion.find():
    print(documento)

