import React, { useState, useEffect } from 'react'
import axios from 'axios'
const host = process.env.NEXT_PUBLIC_HOST
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { Box, Container, Grid, Typography } from '@mui/material';

export default function Members() {
  function DataTable() {
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)

    const handleChangePage = (event, newPage) => {
      // 
    };

    const handleChangeRowsPerPage = (event) => {
      const l = parseInt(event.target.value)
      setLimit(l);
      setPage(0)
      load(0, l)
    };

    function TablePaginationActions(props) {
      const handleFirstPageButtonClick = (event) => {
        setPage(0);
      };

      const handleBackButtonClick = (event) => {
        setPage(page - 1);
        load(page * limit, limit)
      };

      const handleNextButtonClick = (event) => {
        setPage(page + 1);
        load(page * limit, limit)
      };

      const handleLastPageButtonClick = (event) => {
        setPage(Math.max(0, Math.ceil(total / limit) - 1));
      };

      return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {<FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
          >
            {<KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(total / limit) - 1}
            aria-label="next page"
          >
            {<KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(total / limit) - 1}
            aria-label="last page"
          >
            {<LastPageIcon />}
          </IconButton>
        </Box>
      );
    }

    function load(offset, limit) {
      setLoading(true);
      setItems([])

      axios.get(host + '/api/members/v1', { params: { offset, limit } })
        .then(res => {
          const { items, total } = res.data.successResult
          setItems(items)
          setTotal(total)
        })
        .catch((res) => {
          // 
        })
        .finally(() => setLoading(false))
    }

    useEffect(() => {
      load(page * limit, limit)
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!items.length) return <p>No data</p>

    return (
      <Container maxWidth={false}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Members
        </Typography>
        <Typography variant="subtitle1">
          Manage members list
        </Typography>
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"

          >
            <Grid item xs={12} lg={8}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      items.map(el => {
                        return (
                          <TableRow key={el.id}>
                            <TableCell align="center" component="th" scope="row">
                              {el.id}
                            </TableCell>
                            <TableCell align="center">{el.name}</TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        colSpan={3}
                        count={total}
                        rowsPerPage={limit}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }

  return (
    <div>
      <DataTable></DataTable >
    </div>
  )
}
