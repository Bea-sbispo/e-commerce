"use client";

import { fetchCategories } from "@/lib/api";
import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    }

    fetchData();
  }, []);

  return { categories };
}
