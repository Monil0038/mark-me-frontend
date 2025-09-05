// src/lib/products.ts
import axios from "axios";

// ✅ API endpoint
const API_URL = "https://api.falcon.com/api/products";

// ✅ Normalizer to match your old product structure
const normalizeProduct = (apiProduct: any) => ({
    id: apiProduct.id,
    general: {
        name: apiProduct.name,
        description:
            apiProduct.description || "A versatile and stylish product for everyday use.",
        brand: apiProduct.brand || "Unknown",
        category: apiProduct.category || "Uncategorized",
    },
    details: {
        material: apiProduct.material || "",
        careInstructions: apiProduct.careInstructions || [],
        features: apiProduct.features || [],
    },
    variants: apiProduct.variants || [],
    promotion: apiProduct.promotion || {
        offer: apiProduct.offer || "No active offers",
        discountPercentage: apiProduct.discountPercentage || 0,
    },
});

// ✅ Fetch products from API
export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        if (Array.isArray(response.data)) {
            return response.data.map(normalizeProduct);
        }
        return [];
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        return [];
    }
};
