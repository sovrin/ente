const primus = Primus.connect();

primus.on('data', function message(data) {
    console.log('debug: ', data);
});