import { useState, useEffect } from "react";

const getStorageValue = (key, defaultValue) => {
    const saved = sessionStorage.getItem(key);
    const initial = JSON.parse(saved);
        return initial || defaultValue;
}

export const useSessionStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    })

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}