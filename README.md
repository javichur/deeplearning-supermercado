# deeplearning-supermercado

Ejemplo de deep learning para predecir precios de productos de supermercado.
Versión web: <https://javiercampos.es/proyectos/deeplearning-supermercado/>
Más info: <https://javiercampos.es/blog/2020/04/22/deep-learning-para-predecir-el-precio-del-hummus-de-chocolate/>

## Resumen

Creación de una red neuronal paso a paso con TensorFlow 2 y Keras, con el objetivo de entrenarla con información de productos de supermercado y poder así predecir precios de productos desconocidos.

La idea surge como curiosidad para contestar a esto: sabiendo cuánto vale el hummus y cuánto vale el chocolate en un supermercado, **¿Cuánto valdría el hummus de chocolate?** ¿Cómo de buena puede ser una predicción del precio de productos no conocidos por la red neuronal?

Los datos iniciales no son todo lo buenos que nos gustaría, al contar solo para el entrenamiento con esta info de cada producto:

- Nombre del producto.
- Precio.
- Tipo de envase.
- Medida (en kilogramos, metros, litros o unidades).
- Si es agua o no.
- Si es para +18 años.

No se tiene info de los ingredientes de los productos (más allá de los que puedan aparecer en el nombre del producto), ni del proceso de fabricación, ni lugar de procedencia… a priori podemos pensar que no vamos a conseguir buenos resultados...

## Ejemplo de resultados obtenidos para productos que no existen:

- hummus de chocolate, tarrina 240gr, 1.95 euros
- hummus de chocolate hacendado, tarrina 240gr, 1.52 euros
- hummus de chocolate nestlé, tarrina 240gr, 2.27 euros
Hacendado el más barato (:

## Disclaimer y trabajo futuro

Es la primera red neuronal que hago, seguro que hay muchas cosas que se pueden mejorar y seguiré aprendiendo.

La base de datos de productos es de 2018 y se ha obtenido de internet. Contiene 6.000 productos aproximadamente.

Trabajo futuro (ToDo):

- Evitar el overfitting de la versión actual.
- Reducir el error obtenido durante la fase de test.
- Comparar resultados eliminando los productos anómalos que se "salen" de las gráficas de distribución (palillos en cajas de 800, jamón de 300 euros, etc...).
- Comparar resultados normalizando / no normalizando los datos de entrada.
- Comparar resultados preprocesando los nombres de los productos (ideas: quitar números, quitar palabras "de", "la", "el"...).
- Hacer pruebas con diferentes meta parámetros de la red neuronal.
- Aplicar *Data augmentation*, para crear productos derivados en el set de entrenamiento (ejemplo: crear productos "pack" con mayor peso y mayor precio).
- Tener en cuenta la semántica de las palabras del nombre del producto. Ahora mismo por ejemplo 'casera' y 'caseras' son 2 palabras diferentes en la codificación *one-hot encoding* que he usado. Idea: utilizar técnica *word embedding* con una red preentrenada que conozca semántica de las palabras.
