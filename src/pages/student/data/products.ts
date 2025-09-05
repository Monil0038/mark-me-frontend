function generateRandomProducts(count : any) {
  const categories = ["Tops", "Bottoms", "Shoes", "Accessories"];
  const brands = ["ComfortWear", "StylePro", "ActiveFit", "UrbanTrend"];
  const colors = ["White", "Black", "Blue", "Red", "Green"];
  const sizes = ["S", "M", "L", "XL"];
  const materialOptions = ["100% Cotton", "Polyester Blend", "Wool", "Silk"];
  const careInstructionsOptions = [
    ["Machine wash cold", "Tumble dry low"],
    ["Hand wash", "Dry clean only"],
    ["Do not bleach", "Iron on low heat"]
  ];
  const featuresOptions = [
    ["Breathable fabric", "Ribbed crew neck", "Short sleeves"],
    ["Water-resistant", "Stretch fabric", "Zipper closure"],
    ["Slim fit", "Quick-dry", "Reflective details"]
  ];
  
  const generateRandomNumber = (min : any, max : any) => Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomElement = (arr : any) => arr[generateRandomNumber(0, arr.length - 1)];

  const products = [];

  for (let i = 1; i <= count; i++) {
    const randomName = `Product ${i}`;
    const randomCategory = getRandomElement(categories);
    const randomBrand = getRandomElement(brands);
    const randomMaterial = getRandomElement(materialOptions);
    const randomCareInstructions = getRandomElement(careInstructionsOptions);
    const randomFeatures = getRandomElement(featuresOptions);

    const variants = sizes.map(size => ({
      size,
      colors: colors.map(color => ({
        color,
        price: parseFloat((generateRandomNumber(15, 30) + Math.random()).toFixed(2)),
        originalPrice: parseFloat((generateRandomNumber(25, 50) + Math.random()).toFixed(2)),
        stockStatus: ["In Stock", "Out of Stock", "Low Stock"][generateRandomNumber(0, 2)]
      }))
    }));

    const promotion = {
      offer: "Buy 2, Get 1 Free",
      discountPercentage: generateRandomNumber(10, 30)
    };

    products.push({
      id: i,
      general: {
        name: randomName,
        description: "A versatile and stylish product for everyday use.",
        brand: randomBrand,
        category: randomCategory,
      },
      details: {
        material: randomMaterial,
        careInstructions: randomCareInstructions,
        features: randomFeatures,
      },
      variants,
      promotion
    });
  }

  return products;
}

export const products = generateRandomProducts(100);

