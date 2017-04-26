var store = require('./models/stores');
var product = require('./models/products');
var gallery = require('./models/galleries');
module.exports = function (app) {
    // use res.render to load up an ejs view file
    // index page 

    app.get('/', function (req, res) {
        return res.redirect('/eg/Home');
    })
    app.get('/eg/Home', function (req, res) {
        store.getStoreByPlacement(null).then(function (_data) {
            console.log(_data);
            var featuredStores1 = _data.Featured1;
            var onSaleStores = _data.OnSale;
            var editorChoise = [
                { id: 1, FeaturedPhoto: 'http://www.dwellingdecor.com/wp-content/uploads/2015/12/interior-living-room.jpg', StoreName: 'Polly Top Notion', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
                { id: 2, FeaturedPhoto: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
                { id: 3, FeaturedPhoto: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', StoreName: 'Polly Top Notion', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
                { id: 4, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' }
            ];
            var bestActiveStores = [
                { id: 1, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', StoreName: 'Polly Top Notion' },
                { id: 2, FeaturedPhoto: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' },
                { id: 3, FeaturedPhoto: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', StoreName: 'Polly Top Notion' },
                { id: 4, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' }
            ];
            var topRatedStores = [
                { id: 1, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', StoreName: 'Polly Top Notion' },
                { id: 2, FeaturedPhoto: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' },
                { id: 3, FeaturedPhoto: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', StoreName: 'Polly Top Notion' },
                { id: 4, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' }
            ];
            var featuredStores2 = _data.Featured2;
            var otherStores = [
                { id: 1, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', StoreName: 'Polly Top Notion' },
                { id: 2, FeaturedPhoto: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' },
                { id: 3, FeaturedPhoto: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', StoreName: 'Polly Top Notion' },
                { id: 4, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' },
                { id: 5, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', StoreName: 'Polly Top Notion' },
                { id: 6, FeaturedPhoto: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' },
                { id: 7, FeaturedPhoto: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', StoreName: 'Polly Top Notion' },
                { id: 8, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' },
                { id: 9, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', StoreName: 'Polly Top Notion' },
                { id: 10, FeaturedPhoto: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' },
                { id: 11, FeaturedPhoto: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', StoreName: 'Polly Top Notion' },
                { id: 12, FeaturedPhoto: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', StoreName: 'Raglan Sleeve Tee Maison Scotch' }
            ];
            res.render('pages/index', {
                featuredStores1: featuredStores1,
                onSaleStores: onSaleStores,
                editorChoise: editorChoise,
                bestActiveStores: bestActiveStores,
                topRatedStores: topRatedStores,
                featuredStores2: featuredStores2,
                otherStores: otherStores
            });
        });
        
    });

    // store page   /eg/store/almaksoud
    app.get('/eg/store/:storeName', function (req, res) {
        var _scope = {};
        store.getStoreByName(req.params.storeName).then(function (_data) {
            _scope.Store = _data;
            gallery.getGalleries(_data._id).then(function (_flst) {
                _scope.Galleries = _flst;
                console.log(_scope);
                product.getStoreBestSeller(_data._id).then(function (_blst) {
                    _scope.BestSeller = _blst;
                    console.log(_scope);
                    res.render('pages/store', _scope);

                }).catch(function (_err) { console.log(_err) })


            }).catch(function (_err) { console.log(_err) })
        }).catch(function (_err) {console.log(_err) });
        
    });
    
    // gallery page   /eg/g/home-furniture/1
    app.get('/eg/g/:galleryName/:galleryId', function (req, res) {
        var _scope = {};
        gallery.getGallery(req.params.galleryId).then(function (_blst) {
            _scope.gallery = _blst;
            product.getByGalleryId(req.params.galleryId).then(function (_plst) {
                _scope.products = _plst;
                console.log(_scope);
                res.render('pages/gallery', _scope);

            }).catch(function (_err) { console.log(_err) })

        }).catch(function (_err) { console.log(_err) })

    }); 

    // product page 
    app.get('/eg/p/:productName/:productId', function (req, res) {

        product.getById(req.params.productId).then(function (_plst) {
            console.log(_plst);
            res.render('pages/product', _plst);

        }).catch(function (_err) { console.log(_err) })

    }); 

    // contacts page 
    app.get('/eg/contactus', function (req, res) {
        res.render('pages/contactus');
    });


}