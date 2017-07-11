(function (){
    "use strict";

    const readline = require('linebyline');
    const CLEAR_ZERO_AT_BEGINNING_REGEX = /^[0]+/;

    class StockMarketBMF {

        constructor (file){
            this.dataHistory = [];
            this.file = file;
        }

        loadData (){
            return new Promise( (resolve, reject) => {
                var rl = readline(this.file);
                rl.on('line', (line, lineCount, byteCount) => {
                    this._extractInfoFromLine(line);
                });
                rl.on('error', (e) => {
                    reject(e);
                });
                rl.on('close', (e) => {
                     console.log('History Loaded!', this.dataHistory.length);
                     resolve(this.dataHistory);
                });
            });
        }

        _extractInfoFromLine(line){
            let historyLine = {};
            if(line.indexOf('COTAHIST') == -1){
                let tipoMercado = line.substring(24, 27);
                let volumeTitulosNegociados = Number(line.substring(170, 188).replace(CLEAR_ZERO_AT_BEGINNING_REGEX, ''));

                historyLine.dataPregao = new Date(line.substring(2, 6) + '-' + line.substring(6, 8) + '-' + line.substring(8, 10)); // FORMATO “AAAAMMDD”, formato javascript YYYY-MM-DD
                historyLine.codigoAcao = line.substring(12, 24).trim();
                historyLine.empresa = line.substring(27, 39).trim();
                historyLine.tipoMercado = tipoMercado;

                historyLine.precoAbertura = Number(line.substring(56, 67).replace(CLEAR_ZERO_AT_BEGINNING_REGEX, '') + '.' + line.substring(67, 69));
                historyLine.precoMaximo = Number(line.substring(69, 80).replace(CLEAR_ZERO_AT_BEGINNING_REGEX, '') + '.' + line.substring(80, 82));
                historyLine.precoMinimo = Number(line.substring(82, 93).replace(CLEAR_ZERO_AT_BEGINNING_REGEX, '') + '.' + line.substring(93, 95));
                historyLine.precoFechamento = Number(line.substring(108, 119).replace(CLEAR_ZERO_AT_BEGINNING_REGEX, '') + '.' + line.substring(119, 121));

                historyLine.volumeTitulosNegociados = volumeTitulosNegociados;
                historyLine.fatorCotacao = Number(line.substring(210, 217).replace(CLEAR_ZERO_AT_BEGINNING_REGEX, ''));

                this.dataHistory.push(historyLine);
            }
        }
    }

    module.exports = StockMarketBMF;

})();