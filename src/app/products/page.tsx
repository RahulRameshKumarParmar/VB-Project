"use client";

import { Product, useProductStore } from "@/store/useProductStore";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Products() {
  const allProducts = useProductStore((state) => state.allProducts);
  const getUsers = useProductStore((state) => state.getProducts);
  const page = useProductStore((state) => state.page);
  const setPage = useProductStore((state) => state.setPage);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  useEffect(() => {
    getUsers();
  }, [page]);

  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const getSearch = async () => {
      // when search is empty, clear searchResult and use paginated allUsers.
      if (!search.trim()) {
        setSearchResult([]);
        return;
      }

      try {
        const data = await axios.get(
          `https://dummyjson.com/products/search?q=${search}`,
        );
        setSearchResult(data.data.products);
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    };
    getSearch();
  }, [search]);

  const rows = search.trim() ? searchResult : allProducts;

  return (
    <div className="p-5 mx-5">
      <Typography
        sx={{
          marginBottom: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        variant="h5"
        gutterBottom
      >
        <div>Products</div>
        <div>
          <TextField
            variant="outlined"
            placeholder="Search any user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
      </Typography>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 m-5">
        {rows.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: "22vw",
              height: "fit",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardMedia
              sx={{ width: "15vw", margin: "auto" }}
              component="img"
              image={product.thumbnail}
              alt={product.title}
            />

            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography sx={{ marginBottom: 2 }}>
                <span className="border border-blue-400 text-blue-400 px-3 py-1 rounded-2xl">
                  {product.tags[0]}
                </span>
              </Typography>
              <Typography
                sx={{ textAlign: "center", height: 50 }}
                variant="h6"
                gutterBottom
              >
                {product.title}
              </Typography>

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "2px 5px 2px 5px",
                }}
              >
                <span className="text-2xl font-bold">${product.price}</span>
                <span>{product.rating}</span>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Pagination
          page={page}
          onChange={handlePagination}
          count={20}
          color="primary"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}
