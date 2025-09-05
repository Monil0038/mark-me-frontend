// src/lib/products.ts
import axios from "axios";

// ✅ API endpoint
const API_URL = "https://mark-me-backend.onrender.com/students";

// ✅ Normalizer to convert student data to product structure for display
const normalizeStudentToProduct = (student: any) => ({
    id:
        parseInt(student.id?.replace(/-/g, "").substring(0, 8), 16) ||
        Math.floor(Math.random() * 10000),
    general: {
        name:
            student.first_name && student.last_name
                ? `${student.first_name} ${student.last_name}`
                : student.first_name || student.last_name || "Unknown Student",
        description: student.course || "Student",
        brand: student.div || "Division",
        category: student.roll_no ? `Roll No: ${student.roll_no}` : "No Roll No",
        joiningDate: student.created_at ? new Date(student.created_at).toISOString() : null, // ✅ safe date
    },
    details: {
        material: student.enrollment_no || "",
        careInstructions: [
            student.phone_number ? `Phone: ${student.phone_number}` : "",
            student.email ? `Email: ${student.email}` : "",
        ].filter(Boolean),
        features: [
            student.course ? `Course: ${student.course}` : "",
            student.div ? `Division: ${student.div}` : "",
            student.roll_no ? `Roll No: ${student.roll_no}` : "",
            student.enrollment_no ? `Enrollment No: ${student.enrollment_no}` : "",
            student.created_at
                ? `Created At: ${new Date(student.created_at).toLocaleString()}`
                : "",
        ].filter(Boolean),
    },
    variants: [
        {
            size: "N/A",
            colors: [
                {
                    color: "Default",
                    price: 0,
                    originalPrice: 0,
                    stockStatus: "Active",
                },
            ],
        },
    ],
    promotion: {
        offer: "Student",
        discountPercentage: 0,
    },
});


// ✅ Fetch products from API
export const fetchProducts = async () => {
    try {
        // Get token from localStorage
        const token = localStorage.getItem("authToken");

        const response = await axios.get(API_URL, {
            headers: {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` }),
            },
        });

        if (Array.isArray(response.data)) {
            return response.data.map(normalizeStudentToProduct);
        }
        return [];
    } catch (error) {
        console.error("❌ Error fetching Students:", error);
        return [];
    }
};
