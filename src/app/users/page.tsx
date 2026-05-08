"use client";

import { User, useUserStore } from "@/store/useUserStore";
import {
  Card,
  CardContent,
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Users() {
  const allUsers = useUserStore((state) => state.allUser);
  const getUsers = useUserStore((state) => state.getUsers);
  const page = useUserStore((state) => state.page);
  const setPage = useUserStore((state) => state.setPage);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);

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
          `https://dummyjson.com/users/search?q=${search}`,
        );
        setSearchResult(data.data.users);
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    };
    getSearch();
  }, [search]);

  // Change: single source used by table; no duplicate row JSX.
  // If user typed something, always show search results (including empty array).
  const rows = search.trim() ? searchResult : allUsers;

  return (
    <div>
      <Card
        sx={{
          margin: "40px auto",
          padding: 3,
        }}
      >
        <CardContent>
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
            <div>Users</div>
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

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 900 }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 900 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 900 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 900 }}>Gender</TableCell>
                  <TableCell sx={{ fontWeight: 900 }}>Company</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell
                      sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                      <img height={50} src={user.image} alt="user image" />
                      <div>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          border:
                            user.gender === "male"
                              ? "1px solid blue"
                              : "1px solid purple",
                          color: user.gender === "male" ? "blue" : "purple",
                          padding: "6px 10px 6px 10px",
                          borderRadius: 15,
                        }}
                      >
                        {user.gender}
                      </span>
                    </TableCell>
                    <TableCell>{user.company.name}</TableCell>
                  </TableRow>
                ))}
                {/* explicit empty state for "typed search but no match". */}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={2} sx={{ mt: 4 }}>
            <Pagination
              page={page}
              onChange={handlePagination}
              count={20}
              color="primary"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
