import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
  Stack,
  TextField,
  CircularProgress,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const host = process.env.NEXT_PUBLIC_HOST
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

/**
 * Capitalize
 * @param {String} str 
 * @returns 
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Members() {
  function DataTable() {
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const [typeFilter, setType] = useState('')
    const [dateFilter, setDate] = useState(null)
    const [loadingError, setLoadingError] = useState('')

    const handleChangePage = (event, newPage) => {
      // 
    };

    const handleChangeRowsPerPage = (event) => {
      const newValue = parseInt(event.target.value)
      setLimit(newValue);
      setPage(0)
      load(0, newValue)
    };

    function TablePaginationActions(props) {
      const handleFirstPageButtonClick = (event) => {
        setPage(0);
        load(0, limit)
      };

      const handleBackButtonClick = (event) => {
        const newValue = page - 1
        setPage(newValue);
        load(newValue * limit, limit)
      };

      const handleNextButtonClick = (event) => {
        const newValue = page + 1
        setPage(newValue);
        load(newValue * limit, limit)
      };

      const handleLastPageButtonClick = (event) => {
        const newValue = Math.max(0, Math.ceil(total / limit) - 1)
        setPage(newValue);
        load(newValue * limit, limit)
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

    /**
     * Get absences data from API and set it to state
     * @param {Number} offset 
     * @param {Number} limit 
     * @param {String} type 
     * @param {Date} date 
     */
    function load(offset, limit, type, date) {
      setLoading(true);
      setItems([])
      const filters = {
        ...type && { type },
        ...date && dayjs(date).isValid() && { date: dayjs(date).format('YYYY-MM-DD') },
      }

      axios.get(host + '/api/absences/v1', { params: { offset, limit, ...filters } })
        .then(res => {
          const { items, total } = res.data.successResult
          setItems(items)
          setTotal(total)
        })
        .catch((res) => {
          console.log(res)
          setLoadingError('error')
        })
        .finally(() => setLoading(false))
    }


    function calcPeriod(start, end) {
      const date1 = dayjs(start)
      const date2 = dayjs(end)
      const diff = date2.diff(date1, 'day')

      return dayjs.duration(diff, 'day').days();
    }

    function computeStatus(item) {
      const { confirmedAt, rejectedAt } = item
      if (confirmedAt) return 'Confirm'
      else if (rejectedAt) return 'Rejected'
      else return 'Requested'
    }

    function handleTypeFilterChange(event) {
      setType(event.target.value);

      load(0, limit, event.target.value, dateFilter)
    }

    function handleDateFilterChange(newValue) {
      setDate(newValue);
      load(0, limit, typeFilter, newValue)
    }

    function clearFilters() {
      setType('')
      setDate(null)
      load(0, limit)
    }

    useEffect(() => {
      load(page * limit, limit)
    }, [])

    /**
     * Render loading spinner
     * @returns {jsx}
     */
    function Loader() {
      return (
        <Grid container justifyContent="center">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress data-testid="circular-loader" />
          </Box>
        </Grid>
      )
    }

    /**
     * Render no data status
     * @returns {jsn}
     */
    function NoData() {
      return (
        <Grid container justifyContent="center">
          <Box sx={{ display: 'flex' }}>
            No data ..
          </Box>
        </Grid>
      )
    }

    /**
     * Render error status
     * @returns {jsx}
     */
    function DataError() {
      return (
        <Grid container justifyContent="center">
          <Box sx={{ display: 'flex' }}>
            An error occured, list could not be loaded :(
          </Box>
        </Grid>
      )
    }

    /**
     * Render data table
     * @returns {jsx}
     */
    function DataTable() {
      return (
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"

          >
            <Grid item xs={12} lg={10}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"> Member </TableCell>
                      <TableCell align="center"> Type </TableCell>
                      <TableCell align="center"> Period (days) </TableCell>
                      <TableCell align="center"> Member note </TableCell>
                      <TableCell align="center"> Status </TableCell>
                      <TableCell align="center"> Admitter note </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      items.map(el => {
                        return (
                          <TableRow key={el._id}>
                            <TableCell align="center">{el.userId.name}</TableCell>
                            <TableCell align="center">{capitalize(el.type)}</TableCell>
                            <TableCell align="center">{calcPeriod(el.startDate, el.endDate)}</TableCell>
                            <TableCell align="center">{el.memberNote}</TableCell>
                            <TableCell align="center">{computeStatus(el)}</TableCell>
                            <TableCell align="center">{el.admitterNote}</TableCell>
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
      )
    }

    return (
      <Container maxWidth={false}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Absences
        </Typography>
        <Typography variant="subtitle1">
          Manage and view absences list of the members
        </Typography>
        <Typography variant="body2" sx={{
          mt: 2, mb: 4
        }}>
          Total absences: {total}
        </Typography>

        <Grid container justifyContent="end" alignContent="center" spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="type-filter-select">Type filter</InputLabel>
              <Select
                labelId="type-filter-select"
                data-testid="type-filter-select"
                value={typeFilter}
                label="Filter by type"
                onChange={handleTypeFilterChange}
              >
                <MenuItem value="sickness">Sickness</MenuItem>
                <MenuItem value="vacation">Vacation</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} lg={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Filter by date"
                  InputProps={{ 'data-testid': 'date-filter-select' }}
                  inputFormat="DD/MM/YYYY"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                  renderInput={(params) => <TextField {...params} />}
                />

              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} lg={2}>
            <Button disabled={!typeFilter && !dateFilter} onClick={clearFilters} sx={{
              mt: 1
            }}>
              Clear
            </Button>
          </Grid>
        </Grid>

        {isLoading && <Loader></Loader>}
        {!isLoading && !items.length && !loadingError && <NoData></NoData>}
        {!isLoading && items.length && !loadingError && <DataTable></DataTable>}
        {!isLoading && loadingError && <DataError></DataError>}

      </Container>
    )
  }

  return (
    <div>
      <DataTable></DataTable >
    </div>
  )
}
