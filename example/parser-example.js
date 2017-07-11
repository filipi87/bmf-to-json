(function() {
    "use strict";

    const file = 'example/COTAHIST_M052017_2.TXT';
    const BMF = require('../index');

    class SMLoad {

        constructor(){
            this.bmfParser = new BMF(file);
            this.loadData();
        }

        loadData(){
            this.bmfParser.loadData()
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log('Error while loading data!', error);
            });
        }

    }

    new SMLoad();
})();