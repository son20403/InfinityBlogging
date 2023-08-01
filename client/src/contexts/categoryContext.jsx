import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryService from "../services/category";


const CategoryContext = createContext();
const CategoryProvider = (props) => {
    return <CategoryContext.Provider value={{}} {...props}></CategoryContext.Provider>
}
const useCategory = () => {
    const context = useContext(CategoryContext);
    if (typeof context === 'undefined') throw new Error('useCategory must be used within CategoryProvider')
    return context
}
export { useCategory, CategoryProvider }