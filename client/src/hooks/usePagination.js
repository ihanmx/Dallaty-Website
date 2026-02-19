import React from "react";
import { useState } from "react";

const usePagination = (initialPageSize = 10) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: initialPageSize,
  });

  const [rowCount, setRowCount] = useState(0);

  const resetPagination = () => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  return {
    paginationModel,
    setPaginationModel,
    rowCount,
    setRowCount,
    resetPagination,
  };
};

export default usePagination;
