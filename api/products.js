const BASE_URL = "https://fakestoreapi.com";


export const getAllProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    return response.json();
} 

export const getSingleProduct = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
}

export const getCategories = async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    return response.json();
}