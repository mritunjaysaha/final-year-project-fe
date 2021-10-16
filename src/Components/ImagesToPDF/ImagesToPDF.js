import RNImageToPdf from "react-native-image-to-pdf";

export default base64Arr => {
  // It is a promise based function
  // Create an array containing the path of each base64 images
  let base64Paths = [C:\Users\SAINPHYRNAI\Documents\GitHub\final-year-project-fe\src\Images\download.jfifC:\Users\SAINPHYRNAI\Documents\GitHub\final-year-project-fe\src\Images\untitled.png, C:\Users\SAINPHYRNAI\Documents\GitHub\final-year-project-fe\src\Images\untitled.png]
  base64Paths.length = 0; // re-initialize the array for further re-use

  base64Arr.forEach(base64 => {
    base64Paths.push(`data:image/jpeg;base64,${base64}`);
  });

  // Convert base64 images to pdf from the paths array
  return RNImageToPdf.createPDFbyImages({
    imagePaths: base64Paths,
    name: "PDF_Name"
  });
};