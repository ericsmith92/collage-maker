const Jimp = require('jimp');

exports.stitchImages = async (req, res) => {
  const imageSrcs = Object.values(req.body.sources);
  const jimps = [`public/images/canvas/canvas-large.png`, ...imageSrcs].map(img => Jimp.read(img));

  Promise.all(jimps).then( _ => {
    return Promise.all(jimps);
  })
  .then( data => {

    let pixelX = 0;
    let pixelY = 0;
    
    for(let i = 0; i < data.length - 1; i++){
      data[0].composite(data[i + 1].resize(400, 400), pixelX, pixelY);

      pixelX = (i + 1) % 3 !== 0 ? pixelX + 400 : 0;

      if( (i + 1) % 3 === 0){
        pixelY = pixelY + 400;
      }
    }

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
