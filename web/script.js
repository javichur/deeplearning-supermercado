const list_size_formats = ['kg', 'l', 'm', 'ud'];
const list_packagings = ['1/2 pieza', 'bandeja', 'barra', 'benjamín', 'bol', 'bolsa',
  'bote', 'botella', 'botellín', 'brick', 'caja', 'cubo', 'frasco',
  'garrafa', 'granel', 'lata', 'malla', 'manojo', 'otro', 'pack-10',
  'pack-12', 'pack-16', 'pack-2', 'pack-24', 'pack-3', 'pack-4',
  'pack-6', 'pack-8', 'pack-9', 'paquete', 'pastilla', 'pieza',
  'rollo', 'saco', 'sobre', 'spray', 'tableta', 'tarrina', 'tarrito',
  'tarro', 'tubo', 'vaso'];

let words = [];
let model = null;

/* Carga las palabras y los selectores del formulario. */
async function loadInfo() {
  // Cargar palabras
  words = await fetch('./model/words.js').then(async function (res) {
    const v = eval(await res.text());
    const ret = {};
    for (let i = 0; i < v.length; i++) {
      ret[v[i]] = i;
    }
    return ret;
  });

  // rellenar desplegables
  const opSizeFormat = document.getElementById("opSizeFormat");
  for (let i = 0; i < list_size_formats.length; i++) {
    var opt = document.createElement("option");
    opt.value = list_size_formats[i];
    opt.text = list_size_formats[i];

    opSizeFormat.add(opt);
  }

  const opPackaging = document.getElementById("opPackaging");
  for (let i = 0; i < list_packagings.length; i++) {
    var opt = document.createElement("option");
    opt.value = list_packagings[i];
    opt.text = list_packagings[i];

    opPackaging.add(opt);
  }

  document.getElementById("loading").style.display = "none";
}

/* Inicializa el array del producto con sus características y one-hot encoding 
de las palabras del nombre, size_format y packaging. */
async function initialize_product(product_name, size, current_size_format, isWater, requires_age_check, current_packaging) {

  let row = new Array(Object.keys(words).length).fill(0.0);

  product_name = product_name.toLowerCase();

  const productNameWords = product_name.split(' ');
  for (let one of productNameWords) {
    if (words[one] !== undefined) {
      row[words[one]] = 1.0;
    }
  }

  row.splice(0, 0, isWater);
  row.splice(1, 0, requires_age_check);
  row.splice(2, 0, size);

  let j = 3;
  for (i of list_size_formats) {
    var val = (current_size_format == i) * 1.0;
    row.splice(j, 0, val);
    j++;
  }

  for (i of list_packagings) {
    var val = (current_packaging == i) * 1.0;
    row.splice(j, 0, val);
    j++;
  }

  return row;
}

/* Infiere el precio del producto con el modelo de red neuronal previamente entrenado. */
async function predict(product_name, size, current_size_format, isWater, requires_age_check, current_packaging) {
  document.getElementById("loading").style.display = "inline";

  if (!model) { // cargar el modelo solo la primera vez
    model = await tf.loadLayersModel('./model/model.json');
    console.log(model.summary());
  }

  let row = await initialize_product(product_name, size, current_size_format, isWater, requires_age_check, current_packaging);

  const inputTensorX = tf.tensor1d(row).expandDims();
  const predictionX = model.predict(inputTensorX);

  document.getElementById("loading").style.display = "none";

  alert(`Predicción precio para ${product_name}, ${size} ${current_size_format}, presentado en ${current_packaging}: ${predictionX.asScalar()} €`);
}

async function predictFromForm() {
  await predict(document.getElementById('txtProductName').value,
    parseFloat(document.getElementById('txtSize').value),
    document.getElementById('opSizeFormat').value,
    (document.getElementById('cbIsWater').checked) ? 1 : 0,
    (document.getElementById('cbRequiresAgeCheck').checked) ? 1 : 0,
    document.getElementById('opPackaging').value);
}