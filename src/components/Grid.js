import React from 'react';
import ReactDataGrid from 'react-data-grid';

const Grid = ({ rows, columns }) => {
  function rowGetter(i) {
    return rows[i];
  }

  if (!rows) return (<div />);

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={rowGetter}
      rowsCount={rows.length}
      minHeight={500}
    />
  );
};

export default Grid;
