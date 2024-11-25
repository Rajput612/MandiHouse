import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function downloadDahiImage() {
  const relativePath = 'dairy/curd';
  const url = 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?w=800'; // Fresh bowl of dahi/yogurt

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download dahi image`);
    }

    const imageBuffer = await response.arrayBuffer();
    const dir = join(process.cwd(), 'public', 'images', 'products', 'dairy');
    const filePath = join(process.cwd(), 'public', 'images', 'products', 'dairy', 'curd.jpg');

    // Create directory if it doesn't exist
    await mkdir(dir, { recursive: true });

    // Delete existing file if it exists
    if (existsSync(filePath)) {
      await unlink(filePath);
      console.log(`Removed existing curd.jpg`);
    }

    // Save the new image
    await writeFile(filePath, Buffer.from(imageBuffer));
    console.log(`Successfully updated dahi image`);
  } catch (error) {
    console.error(`Error updating dahi image:`, error);
  }
}

// Run the download
downloadDahiImage()
  .then(() => console.log('Dahi image update completed'))
  .catch(error => console.error('Error:', error));
