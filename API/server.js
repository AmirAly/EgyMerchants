// modules =================================================
var express = require('express');
var app = express();
var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./app/api')(app, express);
var db = require('./config/config');
// test ===========================================
var user = require('./app/users');
var userschema = require('./app/models/user');
var store = require('./app/stores');
var expo = require('./app/expoes');
var exposchema = require('./app/models/expo');
var country = require('./app/countries');
var countryschema = require('./app/models/country');
var gallery = require('./app/galleries');
var galleryschema = require('./app/models/gallery');
var item = require('./app/items');
var itemschema = require('./app/models/item');
var category = require('./app/categories');
var categoryschema = require('./app/models/category');
var master = require('./app/masters');
var messageschema = require('./app/models/message');//not delete for socket.io
var message = require('./app/messages');//not delete for socket.io
var commentschema = require('./app/models/comment');
var comment = require('./app/comments');
var notificationschema = require('./app/models/notification');
var notification = require('./app/notifications');
var Helper = require('./app/helper');
// configuration ===========================================
// config files
// check data conection
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json({ limit: '50mb' }));
//app.use(bodyParser.json());
app.use(express.static(__dirname + '/images'));
var port = process.env.PORT || 8007;

mongoose.connect(db.url, function (err) {
    if (err) {
        console.log(err);

    }
    else {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.use(express.static('public'));
        app.use('/', api);

        //app.listen(port);
        server.listen(port, function () {
            console.log('listening on 8007');
        });
        console.log('connected to database and server is listeining ');
        // console.log(mongoose.Types.ObjectId('578df3efb618f5141202a196'));
        // console.log(new Date("1/9/2017 4:00:00").getTime());
        // console.log(new Date(  1506600924382));

        
    }
});








// userschema.find({"Country":  {"$regex":'?'}},'_id Name ProfilePicture Description Address Status Type Country',function(err,lst){
        
//     if(err)
//     {
// throw err;    }
//     else{
//  console.log(lst);    
// }
//    });

// store.search("all", "all", "all" ,".").then(function (result) {
//    console.log(result.data);
// }, function (err) {
//    console.log(err);
// });
// var _newMaster=new countryschema({

//     "Type": "master",
//     "Email": "ghgjh@mail.com",
//     "Name": "Adin",
//     "Password": "1234567",
//     "ProfilePicture": "https://res.cloudinary.com/dce2oozza/image/upload/v1504686324/txse2d6dsbmldxmj4cuv.jpg",
//     "Status": "Active",
//     "Address": "",
//     "City": "Cairo"
// });
// master.register(_newMaster).then(function (result) {
//    console.log(result);
// }, function (err) {
//    console.log(err);
// });
// store.editProfile("59427a4c734d1d235a9447e3", "Gamila@mail.com", "cairo", "addr", "Egypt", "your phone only here", ["hnfhnynhnhtjn"],  "https://res.cloudinary.com/dce2oozza/image/upload/v1501143473/zn8jnd2ef97tesrovqhm.gif", "https://res.cloudinary.com/dce2oozza/image/upload/v1501143474/wdofbrwfgeo4dgtr5qzd.png").then(function (result) {
//    console.log(result );
// }, function (err) {
//     console.log(err);
// });

// var _newitem = new itemschema({
   
    
      
//         "Name": "Black hair",
//         "Description": "knkngkfnhklfnhkgnhknkghn",
//         "Store": "59c7936090c6da00124050e6"
//         ,
//         "Gallery": "59c79bbc90c6da00124050f3"
//         ,
//         "Status": "Active",
//         "PriceBeforeSale": 0,
//         "Price": 55,
//         "Pictures": [
//             {
//                 "Title": "lklk",
//                 "URL": "https://res.cloudinary.com/dce2oozza/image/upload/v1506255372/xfohu6dqiz80y9sinrs7.jpg",
               
//             }
//         ],
      
    
  
// });
// item.add(_newitem).then(function (result) {
//     console.log(result);
// }, function (err) {
//     console.log(err);
// });
// item.edit("599d4633727a860011f8c950", "beauTiful dRess", "all colors here", [{"Title":"jgg","URL":"http://html.com/wp-content/uploads/very-large-flamingo.jpg"}], 300,10,"jbjjjh" ,"jghjff").then(function (result) {
//     console.log(result);
// }, function (err) {
//     console.log(err);
// });
// ItemLogic.edit(req.body._id, req.body.Name, req.body.Description, req.body.Imgs, req.body.Price, req.body.PriceBeforeSale, req.body.Badges,req.body.Tags).then(function (result) {
    
    
// gallery.edit("59466188734d1d59b789551e", "For WOMEN collection", "req.body.Description", "http://html.com/wp-content/uploads/very-large-flamingo.jpg").then(function (result) {
//     console.log(result);
// }, function (err) {
//     console.log(err);
// });
// var _newGallery = new galleryschema({
//      "59d257104dcbcb1a546be3c7",
//      "classic gallery",
//    "fgbgfbnfbgbf",
//     "594660e5734d1d59b7895502"
  
//  });
// // gallery.add(_newGallery).then(function (result) {
// //    console.log(result);
// // }, function (err) {
// //     console.log(err);
// // });
// // var _newExpo = new exposchema(
// //     {
// //         "Title": " ",


//     }
// );
// expo.add(_newExpo).then(function (result) {
//     console.log(result);
// }, function (err) {
//     console.log(err);
// });
// var _newCategory = new categoryschema({

//     "Name":"waTcheS",
//     "Country":"59067906734d1d32590f529b"
// });
// category.add(_newCategory).then(function (result) {
//     console.log(result);
// }, function (err) {
//     console.log(err);
// });
// category.edit("59072833f36d286835cb21e6", "WaTChes", "59067579734d1d32590f51dd").then(function (result) {
//     console.log(result);
// }, function (err) {
//     console.log(err);
// });
// notification.getTenNotifications("594660e5734d1d59b7895502",5).then(function (result) {
//    console.log(result);
// }, function (err) {
//    console.log(err);
// });


// user.setToActive('59d60b85392d3c0924eb690b').then(function (result) {
//     console.log(result);
// }, function (err) {
//     res.json(err);
// });


    // var _newstore = new userschema({"Name":"Ahmed elmonshareh3","Email":"AhmedelMonshareh3@gmail.com","Password":"hfhjfgh","ProfilePicture":"https://tammypatterson.files.wordpress.com/2011/09/img_2852c_lg.jpg","CoverPhoto":"https://tammypatterson.files.wordpress.com/2011/09/img_2852c_lg.jpg",
    // "Contacts": [
    //      {
    //     "Addresses":["78 hafez wahby street" ,"78 hafez wahby street"],
    //     "Others":[ "01090405045","234567"], 
    //     "Facebook":"ahmed elmonshareh@facebook.com",
    //     "Twitter": "ahmed elmonshareh@twitter.com"
    // }
    //     ]

    
// });
//    store.register(_newstore).then(function (result) {
//         console.log(result);
//     }, function (err) {
//         console.log(err);
//     });

    
    // Contacts:[
    //     {
    //     Addresses: [{ type: String, default: '',min:2}],
    //     Others:[{ type: String, default: ''}],
    //     Facebook:{type: String},
    //     Twitter:{type: String}
    //     }
    // ],

    // user.addRating(
    //   "59dddbef9693f520f4050cce",
    //  "59464b5aa7eee71550d33dc1",
    //  40
        
    // ).then(function (result) {
    //         console.log(result);
    //     }, function (err) {
    //         console.log(err);
    //     });

        // Rate: [{
        //     type: Schema.Types.ObjectId,
        //     default: 0,
        //     ref: 'User'
        // }]
  
// user.rateAverage(

//    "59464b5aa7eee71550d33db8"
   
      
          
//   ).then(function (result) {
//           console.log(result);
//       }, function (err) {
//           console.log(err);
    //   });
    
    
//     user.getAllRatedStores(

//    "59dddbbb41e1661e9827e816"
   
      
          
//   ).then(function (result) {
//           console.log(result);
//       }, function (err) {
//           console.log(err);
//       });


// item.getSimilarItems(

//    "59b12029ab49580011b54ad6"
   
      
          
//   ).then(function (result) {
//           console.log(result);
//       }, function (err) {
//           console.log(err);
//       });
    