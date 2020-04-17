export const uploadFile = async (file, folderName: string): Promise<string> => {
    const fileName: string = file.name;
    const fileExtension: string = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity));
    const fullFileName: string = Date.now() + fileExtension;

    file.mv('./uploads/' + folderName + '/' + fullFileName, function (err) {
        if (err) {
            return "ERROR";
        }
        else {
            console.log('image uploaded to the server');
        }
    });
    return fullFileName;
}