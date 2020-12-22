const stitchBtn = document.querySelector('.btn.stitch');
const axios = require('axios');
import { addLoader } from './loader';

const postJson = () => {
    const stitchImgSrcs = Array.from(document.querySelectorAll('.preview_img')).map(img => img.src);
    const imgSrcsJson = Object.assign({}, stitchImgSrcs);
    const term = stitchBtn.dataset.term;

    addLoader();
    
    axios({
        method: 'post',
        url: '/stitch',
        data: {
          sources: imgSrcsJson,
          term
        }
      })
      .then((res) => {
        window.location.assign(`/download?src=${res.data.stitchedImagePath}&term=${res.data.term}`);
      })
      .catch((error) => {
        console.log(error);
      });
}

export { stitchBtn, postJson };
