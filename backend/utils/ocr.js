const Tesseract = require('tesseract.js');

const processImage = async (imagePath) => {
  const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
  return text;
};

module.exports = { processImage };