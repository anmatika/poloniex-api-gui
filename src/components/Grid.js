import React from 'react';
import ReactDataGrid from 'react-data-grid';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class Grid extends React.Component {

  getRows() {
    const newProps = {};
    newProps.filters = this.state.filters;
    newProps.rows = this.state.rows;
    return Selectors.getRows(newProps);
  }

  rowGetter(rowIdx) {
    const rows = this.getRows();
    return rows[rowIdx];
  }

  handleGridSort(sortColumn, sortDirection) {
    const comparer = (a, b) => {
      const parsedA = parseFloat(a[sortColumn]);
      const parsedB = parseFloat(b[sortColumn]);
      if (sortDirection === 'ASC') {
        if (isNaN(parsedA)) { return (a[sortColumn] > b[sortColumn]) ? 1 : -1; }
        return parsedA > parsedB ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        if (isNaN(parsedA)) { return (a[sortColumn] < b[sortColumn]) ? 1 : -1; }
        return parsedA < parsedB ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
  }
  handleFilterChange(filter) {
    const newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }

    this.setState({ filters: newFilters });
  }

  onClearFilters() {
    this.setState({ filters: {} });
  }

  render() {
    if (!this.state) {
      this.state = {
        filters: {},
      };
    }
    this.state.originalRows = this.props.rows;
    this.state.rows = this.props.rows;
    this.state.columns = this.props.columns;
    return (
      <ReactDataGrid
        columns={this.state.columns}
        enableCellSelect
        onGridSort={this.handleGridSort.bind(this)}
        rowGetter={this.rowGetter.bind(this)}
        rowsCount={this.getRows().length}
        toolbar={<Toolbar enableFilter />}
        onAddFilter={this.handleFilterChange.bind(this)}
        minHeight={500}
        onClearFilters={this.onClearFilters.bind(this)}
      />
    );
  }
}

export default Grid;
