# Prueba Tecnica AWS y NodeJS

Prueba tecnica para desarrollador Back.
Autor: Alexander Guzman Atachao.

## Local development setup

### Clonar el proyecto:

https://github.com/XDARKZEROX/ejercicio/tree/master

### Setup

- Instalar Docker para generar una imagen de Redis para el caso a desarrollar.
Una vez instalado ejecutar el comando:

```yaml
docker run --name some-redis -d redis
```

- Instalar redis commander GUI (OPCIONAL)

```yaml
npm install -g redis-commander

run:
redis-commander
```

- Instalar las dependencias del proyecto:
```yaml
npm install
```

- Ejecutar el proyecto con el comando:

```yaml
npm run dev
```

## Acerca de la aplicación

La aplicacion consume data de redis, la data de prueba se encuentra en el archivo sample-data-redis.txt dentro de la carpeta scripts

Nota: Cada arreglo viene a ser una colección diferente para redis, el valor de la key puede ser cualquiera.

La aplicación obtendra las keys de redis y recorrerá cada key para obtener su valor.

Este valor será enviado a un lambda que esta expuesto por medio de una AWS API rest LAMBDA_API_URL

Y se obtendrá el resultado del juego de LRC.

Pueden utilizar POSTMAN para hacer la llamada individual a este servicio, es un POST con este payload de prueba:

 ```
{
    "numOfPlayers": 2,
    "resultString": "LCR",
    "gameNumber": 1
}
```

El código del lambda se encuentra en la carpeta scripts con el nombre lambda.js.

Posteriormente, los valores obtenidos del lambda serán insertados a Dynamo, a una tabla llamada Logs.
El proceso de aqui en adelante esta relacionado enteramente al entorno de AWS, para ver el flujo de la aplicación pueden
revisar el video explicativo subido a youtube:

La tabla de Dynamo esta activada con la opcion de Dynamo Stream y además con un trigger que apunta a un lambda el cual almacenará los registros en Cloudwatch (ver video explicativo).


## Observaciones

Para el uso de AWS Event Bridge, AWS Event Bridge Rule y SQS se necesita de un lambda que se encargue de hacer las operaciones de insert, he tenido complicaciones tratando de configurar el lambda para que utilice el sdk de aws, por lo que esta parte se limitó a ser llamada por medio de la aplicación: vease la carpeta 'database'.





