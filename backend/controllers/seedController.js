import Product from '../models/productModel.js';

// fetch products from the dummyJSON API and save them to the database
const seedProducts = async (req, res, next) => {
    try {
        // Clear existing products if needed
        if (req.query.clear === 'true') {
            await Product.deleteMany({});
            console.log('Existing products cleared.');
        }

        // check if products already exist
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            return res.status(200).json({ 
                status: 'success',
                message: 'Products already exist in the database.',
            });
        }

        // Fetch products from the dummyJSON API
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        if (!data || !data.products || data.products.length === 0) {
            return res.status(404).json({ 
                status: 'error',
                message: 'No products found in the API response.',
            });
        }

        // Save products to the database
        const productsToInsert = data.products
          .filter(product =>
            product.title &&
            product.description &&
            typeof product.price === 'number' &&
            product.brand && // Ensure brand exists
            product.category &&
            product.thumbnail
          )
          .map(product => ({
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
            images: product.images,
          }));

        await Product.insertMany(productsToInsert);

        res.status(200).json({
            status: 'success',
            message: 'Products seeded successfully.',
        });
    } catch (error) {
        console.error('Error seeding products:', error);
        next(error); 
    }
}

export default { seedProducts };