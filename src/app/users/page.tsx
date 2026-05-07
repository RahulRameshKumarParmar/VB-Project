"use client";

import { useUserStore } from "@/store/useUserStore";
import {
  Card,
  CardContent,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";


export default function Users() {
  const allUsers = useUserStore((state) => state.allUser);
  const getUsers = useUserStore((state) => state.getUsers);
  const page = useUserStore((state) => state.page);
  const setPage = useUserStore((state) => state.setPage);
  
  useEffect(() => {
    getUsers();
  }, [page]);
  
  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return (
    <div>
      <Card
        sx={{
          margin: "40px auto",
          padding: 3,
        }}
      >
        <CardContent>
          <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
            Users
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
                {allUsers.map((user) => (
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
                      <span style={{border: user.gender === 'male' ? '1px solid blue' : '1px solid purple', color: user.gender === 'male' ? 'blue' : 'purple', padding: '6px 10px 6px 10px', borderRadius: 15}}>{user.gender}</span>
                    </TableCell>
                    <TableCell>{user.company.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={2} sx={{ mt: 4 }}>
            <Pagination
              page={page}
              onChange={handlePagination}
              count={20}
              color="primary"
              shape="rounded" />
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
