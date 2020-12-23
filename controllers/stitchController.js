const Jimp = require('jimp');
const fs = require('fs');

exports.resizeAndWriteThumbnails = async (req, res, next) => {
  
  const imageSrcs = Object.values(req.body.sources);
  
  for(let i = 0; i < imageSrcs.length; i++){
    await Jimp.read(imageSrcs[i])
              .then(img => {
                  return img
                  .resize(300, 300)
                  .write(`public/images/user-images/${req.body.term}/${i}.jpg`);
              })
              .catch( err => {
                  console.error(err);
    });
  }

  next();
}

exports.stitchImages = async (req, res) => {

  const urls = fs.readdirSync(`public/images/user-images/${req.body.term}/`).map(file => `public/images/user-images/${req.body.term}/${file}`);
  const sortedUrls = sortUrls(urls);
  const jimps = [`public/images/canvas/canvas.png`, ...sortedUrls].map(img => Jimp.read(img));

  Promise.all(jimps).then( _ => {
    return Promise.all(jimps);
  })
  .then( data => {


    /*
    let pixelX = 0;
    let pixelY = 0;
    
    for(let i = 0; i < data.length - 1; i++){
      data[0].composite(data[i + 1], pixelX, pixelY);

      pixelX = (i + 1) % 3 !== 0 ? pixelX + 300 : 0;

      if( (i + 1) % 3 === 0){
        pixelY = pixelY + 300;
      }
    }
    */
   data[0].composite(data[1],0, 0);
   data[0].composite(data[2],300, 0);
   data[0].composite(data[3],600, 0);
   data[0].composite(data[4],0, 300);
   data[0].composite(data[5],300, 300);
   data[0].composite(data[6],600, 300);
   data[0].composite(data[7],0, 600);
   data[0].composite(data[8],300, 600);
   data[0].composite(data[9],600, 600);
   data[0].composite(data[10],0, 900);
   data[0].composite(data[11],300, 900);
   data[0].composite(data[12],600, 900);
    
    const term = req.body.term;
    const stitchedImagePath = `public/images/user-images/${term}/${Date.now()}.png`
    
   data[0].write(stitchedImagePath, _ => {
        res.json({
          term,
          stitchedImagePath
        });
   });
})
.catch(err => console.log(err));
}

sortUrls = (urls) => {
  
  const sortedUrls = urls.sort((a, b) => {
    
    const intA = parseInt(a.slice(a.lastIndexOf('/') + 1, a.indexOf('.')));
    const intB = parseInt(b.slice(b.lastIndexOf('/') + 1, b.indexOf('.')));

      if (intA < intB) {
        return -1;
      }
      if (intA > intB) {
        return 1;
      }
    
      return 0;
  });

  return sortedUrls;
}
