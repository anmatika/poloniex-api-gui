import React from 'react';
import ReactDataGrid from 'react-data-grid';

class Grid extends React.Component {
  rowGetter(i) {
    return this.state.rows[i];
  }

  handleGridSort(sortColumn, sortDirection) {
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

  render() {
    this.state = { originalRows: this.props.rows, rows: this.props.rows, columns: this.props.columns };
    return (
      <ReactDataGrid
        columns={this.state.columns}
        onGridSort={this.handleGridSort.bind(this)}
        rowGetter={this.rowGetter.bind(this)}
        rowsCount={this.state.rows.length}
        minHeight={500}
      />
    );
  }
}

export default Grid;
