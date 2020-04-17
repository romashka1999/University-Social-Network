const fs = require('fs');
export const deleteFile = (url, folder) => {

    let reverseImgName = '';
    for (let i = url.length - 1; i >= 0; i--) {
        if (url[i] === '/') {
            break;
        }
        reverseImgName += url[i];
    }

    let imgName = '';
    for (let i = reverseImgName.length - 1; i >= 0; i--) {
        imgName += reverseImgName[i];
    }


    fs.unlink(process.env.PHYSIQUE_URL + folder + '/' + imgName, function (err) {
        if (err) console.log(err);
        // if no error, file has been deleted successfully
        console.log('file deleted');
    });

}