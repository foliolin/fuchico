import ambientlib from 'ambient-attx4';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import tessel from 'tessel';

import productId from './config/product-id';
import xExositeCik from './config/x-exosite-cik';
import write from './write';

const ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', () => {
 // Get points of light and sound data.
  setInterval(function () {
    ambient.getLightLevel( function(err, lightdata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sounddata) {
        if (err) throw err;
        write({
          productId,
          xExositeCik,
          data: {
            ambientLight: lightdata.toFixed(8),
            ambientSound: sounddata.toFixed(8),
          },
        }).then(
          () => console.log('resolved'),
          () => console.log('rejected'),
        );
      });
    });
  }, 500); // The readings will happen every .5 seconds
});

ambient.on('error', function (err) {
  console.log(err);
});
