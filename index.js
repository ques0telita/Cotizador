const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coininfo = document.querySelector('#coin-info');

/*async es para declarar una función asíncrona, lo que significa que la función puede contener operaciones asíncronas y 
 puede usar la palabra clave await para esperar a que se resuelvan esas operaciones antes de continuar con la ejecución del código*/
form.addEventListener('submit', async e => {
    e.preventDefault();
    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;
    /* "try" sirve para ejecutar un bloque de código y detectar errores en ese bloque, si ocurre un error, el control
      se transfiere al bloque catch para manejarlo*/
    try {
        coininfo.innerHTML = `
            <div class="loader"></div>
        `;
        /* await se utiliza para esperar a que se resuelva o rechace antes de continuar con la ejecución del código, 
         en este caso, espera a que la respuesta de la API de CoinGecko esté disponible antes de continuar*/

        /* se usan 2 veces await porque la primera espera a que se resuelva la promesa de fetch, y la segunda 
         espera a que se resuelva la promesa de json() para obtener los datos en formato JSON*/
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        /*fetch es una función que se utiliza para hacer solicitudes HTTP, en este caso, se hace una solicitud GET a 
        la API de CoinGecko para obtener los datos de precios de las criptomonedas seleccionadas en la moneda seleccionada*/

        //se usa fetch y no action porque se quiere obtener datos de una API externa y no enviar datos a un servidor
        const displayPrice = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const low24Hour = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const high24Hour = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const change24Hour = response.DISPLAY[cryptoSelected][coinSelected].CHANGE24HOUR;
        const rawPrice = response.RAW[cryptoSelected][coinSelected].PRICE;

        const amountNumber = Number(amountValue);
        const result = amountValue === '' || Number.isNaN(amountNumber) || amountNumber === 0
            ? 0
            : (amountNumber / rawPrice).toFixed(6);

        coininfo.innerHTML = `
            <p class="info">El valor es: <span class="price">${displayPrice}</span></p>
            <p class="info">El valor mas bajo es: <span class="price">${low24Hour}</span></p>
            <p class="info">El valor mas alto es: <span class="price">${high24Hour}</span></p>
            <p class="info">Variacion 24H: <span class="price">${change24Hour}</span></p>
            <p class="info">Puedes comprar: <span class="price">${result}</span></p>
        `;
        /*catch se utiliza para manejar los errores que puedan ocurrir en el bloque try, 
        en este caso, si ocurre un error al hacer la solicitud a la API o al procesar la respuesta, 
        el error se captura y se muestra en la consola*/

    } catch (error) /*agarra todos los errores que puedan ocurrir en el bloque try */{
        console.log(error);
    }
});

