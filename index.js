const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount-input');
const priceElement = document.querySelector('#price');
const lowPriceElement = document.querySelector('#low-price');
const highPriceElement = document.querySelector('#high-price');
const variationElement = document.querySelector('#change-24h');
const amountElement = document.querySelector('#amount');

/* async se utiliza para declarar una función asíncrona, lo que permite el uso de la palabra clave "await" dentro de 
esa función, lo que facilita la escritura de código asíncrono de manera más legible y estructurada*/
form.addEventListener('submit', async e => {
    e.preventDefault();
    //[...coin.children] se utiliza para convertir los elementos hijos de "coin" en un array, lo que permite métodos de array como "find", y es un tipo de valor: NodeList, que es una colección de nodos que se obtiene al seleccionar elementos del DOM. Al convertirlo en un array, se pueden utilizar métodos de array para manipular y acceder a los elementos de manera más flexible.
    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;

    try {
        // el doble await se utiliza para esperar a que se resuelva la promesa de la función fetch, y luego esperar a que se resuelva la promesa de la función json() que procesa la respuesta de la API. Esto permite obtener los datos de manera asíncrona y manejar la respuesta de la API de forma más sencilla.
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();

        const displayPrice = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const low24Hour = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const high24Hour = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const change24Hour = response.DISPLAY[cryptoSelected][coinSelected].CHANGE24HOUR;
        const rawPrice = response.RAW[cryptoSelected][coinSelected].PRICE;

        //Number() se utiliza para convertir el valor de amountValue a un número, porque lo que permite realizar cálculos matemáticos con él.
        const amountNumber = Number(amountValue);
        const result = amountValue === '' || Number.isNaN(amountNumber) || amountNumber === 0
            ? 0
            : (amountNumber / rawPrice).toFixed(6);

        priceElement.textContent = displayPrice;
        lowPriceElement.textContent = low24Hour;
        highPriceElement.textContent = high24Hour;
        variationElement.textContent = change24Hour;
        amountElement.textContent = result;

        /*catch se utiliza para manejar los errores que puedan ocurrir en el bloque try, 
        en este caso, si ocurre un error al hacer la solicitud a la API o al procesar la respuesta, 
        el error se captura y se muestra en la consola*/

    } catch (error) /*agarra todos los errores que puedan ocurrir en el bloque try */{
        console.log(error);
    }
});

// parte del boton oscuro/claro
const btnFondo = document.querySelector('#btn-fondo');
const coinContainer = document.querySelector('#coin-container');

btnFondo.addEventListener('click', () => {
    // el toggle hace esto: si la clase no esta, la pone, si ya esta, la quita.
    coinContainer.classList.toggle('modo-oscuro');
    
    // aki se cambia el texto del botón 
    if (coinContainer.classList.contains('modo-oscuro')) {
        btnFondo.textContent = 'Modo Claro';
    } else {
        btnFondo.textContent = 'Modo Oscuro';
    }
});

