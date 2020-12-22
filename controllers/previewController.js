exports.renderPreview = (req, res) => {
    
    const term = req.query.term;
    const decodedSrcs = req.query.srcs.split(',').map(url => decodeURIComponent(url));
    const previewObj = {
        term,
        imageSources: decodedSrcs
    };

    res.render('preview', { previewObj });
}
