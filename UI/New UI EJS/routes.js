module.exports = function (app) {
    // use res.render to load up an ejs view file
    // index page 

    app.get('/', function (req, res) {
        return res.redirect('/eg/Home');
    })
    app.get('/eg/Home', function (req, res) {
     
        var featuredStores1 = [
            { id: 1, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 2, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
        ];
        var onSaleStores = [
            { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
        ];
        var editorChoise = [
            { id: 1, img: 'http://www.dwellingdecor.com/wp-content/uploads/2015/12/interior-living-room.jpg', title: 'Polly Top Notion', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
            { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
            { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
            { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' }
        ];
        var bestActiveStores = [
            { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
        ];
        var topRatedStores = [
            { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
        ];
        var featuredStores2 = [
            { id: 1, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 2, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
        ];
        var otherStores = [
            { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 5, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 6, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 7, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 8, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 9, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 10, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 11, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 12, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
        ];
        res.render('pages/index', {
            featuredStores1: featuredStores1,
            onSaleStores: onSaleStores,
            editorChoise: editorChoise,
            bestActiveStores:bestActiveStores,
            topRatedStores:topRatedStores,
            featuredStores2: featuredStores2,
            otherStores: otherStores
        });
    });

    // store page   /eg/store/almaksoud
    app.get('/eg/store/:storeName', function (req, res) {
        console.log(req.query);
        res.render('pages/store');
    });

    // gallery page   /eg/g/home-furniture/1
    app.get('/eg/g/:galleryName/:galleryId', function (req, res) {
        res.render('pages/gallery');
    });

    // product page 
    app.get('/eg/p/:productName/:productId', function (req, res) {
        res.render('pages/product');
    });

    // contacts page 
    app.get('/eg/contactus', function (req, res) {
        res.render('pages/contactus');
    });


}