const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
	// Create destination if it doesn't exist
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	const files = fs.readdirSync(src);
	files.forEach(file => {
		const srcPath = path.join(src, file);
		const destPath = path.join(dest, file);
		const stat = fs.statSync(srcPath);

		if (stat.isDirectory()) {
			copyDirSync(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	});
}

try {
	const srcDir = path.join(__dirname, 'src', 'resources');
	const destDir = path.join(__dirname, 'out', 'resources');

	if (fs.existsSync(srcDir)) {
		copyDirSync(srcDir, destDir);
		console.log(`✓ Resources copied from ${srcDir} to ${destDir}`);
	} else {
		console.log(`⚠ Resources directory not found at ${srcDir}`);
	}
} catch (err) {
	console.error('✗ Error copying resources:', err);
	process.exit(1);
}
