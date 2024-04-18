const currency = {
  crc: {
    usd: 0.0019736214,
    arg: 1.6785676,
    crc: 1,
    simbolo: "₡",
  },
  usd: {
    crc: 506.68278,
    arg: 850.50128,
    usd: 1,
    simbolo: "$",
  },
  arg: {
    crc: 0.59574605,
    usd: 0.0011757772,
    arg: 1,
    simbolo: "$",
  },
};

const historial = [];
const form = document.getElementById("form");
const valor = document.getElementById("valor");

/* Se declaran las variables para obtener los elementos del resultado final y de la tabla */

const resultado_final = document.getElementById("resultado_final");
const tablaHistorial = document.getElementById("historial");

/* Crea un nuevo evento sobre el click del botón "Convertir" */

form.addEventListener("submit", obtenerValores);

/* Se obtiene los valores del input a través del evento "submit" */

function obtenerValores(event) {
  event.preventDefault(); /* No deja que se refresque la página */
  const data = new FormData(event.target); /* Recoge los valores del input */
  const valores = Object.fromEntries(
    data.entries()
  ); /* Toma los IDs de cada input para (definir cuáles valores se quieren utilizar */
  console.log(valores);
  realizarConversion(valores); /* Utiliza la función "realizarConversion" */
}

function realizarConversion(valores) {
  let tipoCambio =
    currency[valores.moneda_base][
      valores.moneda_a_convertir
    ]; /* Toma los valores anteriormente relacionados como parámetros */
  let resultado = valor.value * tipoCambio; /* Realiza la operación */

  historial.push({
    conversion: `${valores.moneda_base} - ${valores.moneda_a_convertir}` /* Genera un solo Strign para el "localStorage" para almacenar los valores */,
    resultado: `${
      currency[valores.moneda_a_convertir]["simbolo"]
    }${resultado.toFixed(
      2
    )}` /* Se toma el resultado convertido y se le agrega el símbolo correspondiente */,
  });

  /* Utiliza las siguientes funciones para guardar y mostrar el resultado en el historial */
  guardarHistorial(valores, resultado);
  mostrarResultado(resultado, valores);
}

/* Se toma del array "currency" tanto el símbolo correspondiente más el resultado "fixeado" con dos decimales */
function mostrarResultado(resultado, valores) {
  resultado_final.innerHTML = `${
    currency[valores.moneda_a_convertir]["simbolo"]
  }${resultado.toFixed(2)}`;
}

/* Se crea una variable para recoger los datos anteriormente almacenados del localStorage y cada elemento guardado se agrega adyacentemente a cada sección de la tabla del historial */
function mostartHistorial() {
  const obtenerHistorial = JSON.parse(localStorage.getItem("historial"));
  if (obtenerHistorial) {
    obtenerHistorial.forEach((element) => {
      let row = `<tr>
                    <td class="mdl-data-table__cell--non-numeric">${element.conversion.toUpperCase()}</td>
                    <td>${element.resultado}</td>
                  </tr>`;
      tablaHistorial.insertAdjacentHTML("afterbegin", row);
    });
  }
}

/* Se guardan los datos mostrados en el historial, dentro del localStorage, generando también una tabla para cada elemento */
function guardarHistorial(valores, resultado) {
  let obtenerHistorial = localStorage.getItem("historial");
  obtenerHistorial = JSON.parse(obtenerHistorial || "[]");
  let newHistorial = historial.concat(obtenerHistorial);
  localStorage.setItem("historial", JSON.stringify(newHistorial));
  let row = `<tr>
                    <td class="mdl-data-table__cell--non-numeric">${valores.moneda_base.toUpperCase()} - ${valores.moneda_a_convertir.toUpperCase()}</td>
                    <td>${`${
                      currency[valores.moneda_a_convertir]["simbolo"]
                    }${resultado.toFixed(2)}`}</td>
                  </tr>`;
  tablaHistorial.insertAdjacentHTML("afterbegin", row);
}

mostartHistorial(); /* Recoge los datos del pasado para que al refrescar, se vean en el historial */
