module.exports = function (app) {
    // use res.render to load up an ejs view file
    // index page 
    app.get('/eg/Home', function (req, res) {
        var drinks = [
            { name: 'Juice', drunkness: 3 },
            { name: 'Tea', drunkness: 5 },
            { name: 'Coffee', drunkness: 10 }
        ];
        var text = "Hi I'm Samar.";
        var user = { name: 'samar', age: 28 };
        res.render('pages/index', {
            drinks: drinks,
            tagline: text,
            user: user
        });
    });

    // store page 
    app.get('/eg/store/:id', function (req, res) {
        console.log(req.query);
        res.render('pages/store');
    });

    // items page 
    app.get('/items', function (req, res) {
        res.render('pages/items');
    });

    // product page 
    app.get('/product', function (req, res) {
        res.render('pages/product');
    });

    // contacts page 
    app.get('/eg/contactus', function (req, res) {
        res.render('pages/contactus');
    });

}