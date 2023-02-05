import {Pagination as MuiPagination} from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import { useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from "@mui/x-data-grid";

function Pagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      variant="outlined"
      shape="rounded"
      className="text-primary"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem className="!text-primary" {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default Pagination;
