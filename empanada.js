const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;
    // try sirve para ejecutar un bloque de código y detectar errores en ese bloque, si ocurre un error, el control se transfiere al bloque catch para manejarlo
    try {
        // await se utiliza para esperar a que se resuelva o rechace antes de continuar con la ejecución del código, en este caso, espera a que la respuesta de la API de CoinGecko esté disponible antes de continuar
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        console.log(response.DISPLAY[cryptoSelected][coinSelected].PRICE);
        console.log(response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR);
        console.log(response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR);
        console.log(response.DISPLAY[cryptoSelected][coinSelected].CHANGE24HOUR);
        
    } catch (error) /*agarra todos los errores que puedan ocurrir en el bloque try */{
        console.log(error);
    }
});