// Script to import product and category data from src/data/products.ts to database
import { PrismaClient } from '@prisma/client';
import { products, categories } from '../src/data/products.js';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting data import process...');
    
    // Import categories first
    console.log('Importing categories...');
    const categoryMap = new Map(); // To store new category IDs
    
    for (const category of categories) {
      // Check if category already exists
      const existingCategory = await prisma.category.findFirst({
        where: { name: category.name }
      });
      
      if (existingCategory) {
        console.log(`Category ${category.name} already exists, using existing ID`);
        categoryMap.set(category.id, existingCategory.id);
      } else {
        // Create new category
        const newCategory = await prisma.category.create({
          data: {
            name: category.name
          }
        });
        console.log(`New category created: ${newCategory.name} with ID: ${newCategory.id}`);
        categoryMap.set(category.id, newCategory.id);
      }
    }
    
    // Import products
    console.log('\nImporting products...');
    for (const product of products) {
      // Check if product already exists based on name
      const existingProduct = await prisma.product.findFirst({
        where: { name: product.name }
      });
      
      if (existingProduct) {
        console.log(`Product ${product.name} already exists, skipping...`);
        continue;
      }
      
      // Get new category ID from map
      const categoryId = categoryMap.get(product.category);
      if (!categoryId) {
        console.log(`Category with ID ${product.category} not found, skipping product ${product.name}`);
        continue;
      }
      
      // Create new product
      const newProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          categoryId: categoryId,
          featured: product.featured,
          rating: product.rating,
          stock: product.stock
        }
      });
      
      console.log(`New product created: ${newProduct.name} with ID: ${newProduct.id}`);
    }
    
    console.log('\nImport process completed!');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();