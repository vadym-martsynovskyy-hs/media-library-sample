'use strict';

var express = require('express');
var path = require('path');
var axios = require('axios');
var app = express();

// Unsplash API
const API_URL = 'https://api.unsplash.com/photos/search';
const TOS_URL = 'https://unsplash.com/terms';
const CLIENT_ID = '3c4787225ca79319cbfabaf469c1331c01ceb356c56de022215dccd454da1586';

app.use('/v1/media', function (req, res, next) {
  // Call 3rd party API to retrieve content
  axios({
    method:'get',
    url: API_URL,
    params: {
      client_id: CLIENT_ID,
      page: req.query.cursor ? 2 : 1, //this line is added so that adding a cursor to the request will return different results
                                      //developers should have more refined logic for their implementation of a cursor
      query: req.query.query || 'owls',
      per_page: req.query.pageSize || 25
    }
  }).then(response => {
    // Map response items from 3rd party to meet our API Spec
    var mediaItems = response.data.map(function(r) {
      return {
        id: r.id,
        name: 'temp'+r.id+'.jpg',
        mediaType: 'Image',
        mimeType: 'image/jpeg',
        original: {
          url: r.urls.raw,
          width: r.width,
          height: r.height,
          sizeInBytes: r.width * r.height * 3,
        },
          thumbnail: {
          url: r.urls.thumb,
          width: parseInt(r.urls.thumb.match(/w=([^&]*)/)[1]),
          height: parseInt((r.urls.thumb.match(/w=([^&]*)/)[1] * r.height) / r.width) // only given thumb width,
        }
      }
    });

    // Build complete response object
    var mediaResponse = {
      data: mediaItems,
      metadata: {
        cursor: {
          // These are mock values used to demonstrate paging
          next: 'encodedu93j3jdf8j3jdyhqnnhhpg=2',
          previous: 'encodedxjatcd83nn39d99093kkprev'
        }
      }
    }

    // Return result
    res.json(mediaResponse);
  });
});

// Status endpoint for determining App responsiveness
app.use('/v1/status', (req, res) => {
  res.json('OK');
});


// Default error handling
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err.message);
});

app.listen(process.env.PORT || 8080, function () {
    console.log(`Example app listening on port ${process.env.PORT || 8080}!`);
});
