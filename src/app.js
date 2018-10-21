class App {
    constructor() {
        this.characteristic = null;
    }
    init() {
        document.querySelector('button#init').addEventListener('pointerup', event => {
            navigator.bluetooth
                .requestDevice({
                    filters: [
                        {
                            name: 'ATMOTUBE'
                        }
                    ],
                    optionalServices: ['db450001-8e9a-4818-add7-6ed94a328ab2']
                })
                .then(device => device.gatt.connect())
                .then(server => {
                    // Getting Battery Service...
                    console.log(server);
                    return server.getPrimaryService('db450001-8e9a-4818-add7-6ed94a328ab2');
                })
                .then(service => {
                    // Getting Battery Level Characteristic...
                    return service.getCharacteristic('db450002-8e9a-4818-add7-6ed94a328ab2');
                })
                .then(characteristic => {
                    // Reading Battery Level...
                    this.characteristic = characteristic;
                    return characteristic.readValue();
                })
                .then(value => {
                    console.log(value);
                    console.log('VOC is ' + value.getInt16());
                })
                .catch(error => {
                    console.log(error);
                });
        });
        document.querySelector('button#refresh').addEventListener('click', event => {
            this.characteristic.readValue().then(console.log);
        });
    }
}

const instance = new App();

export default instance;
