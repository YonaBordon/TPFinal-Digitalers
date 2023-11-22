function validateBase64Image(base64Image) {
	// Check if the string starts with the data URI prefix
	if (!base64Image.startsWith('data:image/')) {
		return false;
	}

	// Extract the image format and data
	const parts = base64Image.split(',');
	const imageFormat = parts[0].split('/')[1];
	const base64Data = parts[1];

	// Check if the image format is supported
	const supportedFormats = ['png', 'jpeg', 'gif'];
	if (!supportedFormats.includes(imageFormat)) {
		return false;
	}

	// Validate the base64 data
	try {
		Buffer.from(base64Data, 'base64');
	} catch (err) {
		return false;
	}

	return true;
}

module.exports = validateBase64Image;
