# bmf-to-json
Parser the BM&amp;FBovespa history data to Json.

```javascript
    const file = 'example/COTAHIST_M052017_2.TXT';
    const BMF = require('../index');
    this.bmfParser = new BMF(file);
    this.bmfParser.loadData()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('Error while loading data!', error);
    });
```

**Fields that will be extracted**

- tipoMercado;
- volumeTitulosNegociados;
- dataPregao;
- codigoAcao;
- empresa;
- precoAbertura;
- precoMaximo;
- precoMinimo;
- precoFechamento;
