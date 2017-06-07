import React from 'react';
import ReactDataGrid from 'react-data-grid';

const Grid = ({ rows, columns }) => {
  function rowGetter(i) {
    return rows[i];
  }

  function handleGridSort(sortColumn, sortDirection) {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
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
