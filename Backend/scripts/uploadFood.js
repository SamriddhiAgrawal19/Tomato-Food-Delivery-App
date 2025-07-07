import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { food_list } from '../assests/Food_data.js';

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFood = async () => {
  for (const item of food_list) {
    try {
      const form = new FormData();

      // ✅ Correct image path resolution
      const imagePath = path.join(__dirname, '..', 'assests', 'images', item.image);
      const imageStream = fs.createReadStream(imagePath);

      // Append fields to form
      form.append('name', item.name);
      form.append('description', item.description);
      form.append('price', item.price);
      form.append('category', item.category);
      form.append('image', imageStream);

      const response = await axios.post('http://localhost:4000/api/food/add', form, {
        headers: {
          ...form.getHeaders()
        }
      });

      console.log(`✅ Uploaded: ${item.name} → ${response.data.message || 'Success'}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${item.name}:`, err.message);
    }
  }

  console.log("✅ All done!");
};

uploadFood();
