from pymongo import MongoClient
from urllib.parse import quote_plus

#crear y asignar credenciales

usuario = quote_plus("Juanmelo")
cluster="cluster0.cubxjza.mongodb.net"
clave=""
base_datos = "Primera_1"
coleccion="Juan"

uri=f"mongodb+srv://{usuario}:{clave}@{cluster}/{base_datos}?retryWrites=true&w=majority"

#conectar al mongoDB Atlas

cliente= MongoClient(uri)
db=cliente[base_datos]
col=db[coleccion]

#insertar documento

doc={
    "nombre":"Juan",
    "edad":19,
    "profesion":"profesor"
}

col.insert_one(doc)
print("documento insertado correctamente")

consulta = col.find()
for documento in consulta:
    print(documento)