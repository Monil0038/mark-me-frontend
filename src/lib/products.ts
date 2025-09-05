// src/lib/products.ts
import axios from "axios";

// ✅ API endpoint
const API_URL = "https://mark-me-backend.onrender.com/faculties";

// ✅ Normalizer to convert faculty data to product structure for display
const normalizeFacultyToProduct = (faculty: any) => ({
    id: parseInt(faculty.id.replace(/-/g, '').substring(0, 8), 16) || Math.floor(Math.random() * 10000), // Convert UUID to number
    general: {
        name: faculty.firstname && faculty.lastname 
            ? `${faculty.firstname} ${faculty.lastname}` 
            : faculty.firstname || faculty.lastname || "Unknown Faculty",
        description: faculty.department || "Faculty member",
        brand: faculty.department || "Department",
        category: faculty.is_active ? "Active Faculty" : "Inactive Faculty",
    },
    details: {
        material: faculty.email || "",
        careInstructions: [
            faculty.phone_number ? `Phone: ${faculty.phone_number_country_code || ''}${faculty.phone_number}` : "",
            faculty.email ? `Email: ${faculty.email}` : ""
        ].filter(Boolean),
        features: [
            faculty.department ? `Department: ${faculty.department}` : "",
            faculty.is_active !== undefined ? `Status: ${faculty.is_active ? 'Active' : 'Inactive'}` : "",
            faculty.is_banned ? "Banned" : "Not Banned"
        ].filter(Boolean),
    },
    variants: [{
        size: "N/A",
        colors: [{
            color: "Default",
            price: 0,
            originalPrice: 0,
            stockStatus: faculty.is_active ? "Active" : "Inactive",
        }]
    }],
    promotion: {
        offer: "Faculty Member",
        discountPercentage: 0,
    },
});

// ✅ Fetch products from API
export const fetchProducts = async () => {
    try {
        // Get token from localStorage
        const token = localStorage.getItem("authToken");
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5OGI4NzU4LTU2ZmUtNDY4MC04YzcwLTA3ZDc0NWYzMDU5YiIsImVtYWlsIjoibW9uaWxzb2ppdHJhLndvcmtAZ21haWwuY29tIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaXNfYWN0aXZlIjp0cnVlLCJpc19iYW5uZWQiOmZhbHNlLCJleHAiOjE3NTcxNjkxNzcuMjExOTU4fQ.5Kw8J-rGpxeY2ROQyXU0WNnALrw6fUWHtXuV4TN6wgE";
        
        const response = await axios.get(API_URL, {
            headers: {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` }),
            },
        });
        
        if (Array.isArray(response.data)) {
            return response.data.map(normalizeFacultyToProduct);
        }
        return [];
    } catch (error) {
        console.error("❌ Error fetching faculties:", error);
        return [];
    }
};
