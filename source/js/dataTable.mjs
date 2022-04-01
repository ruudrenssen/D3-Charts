import BarChart from './chart/barChart';

class DataTable {
  constructor(data) {
    this.data = data;

    const series = this.data.series.map((serie) => serie.relativePL);

    this.barChart = new BarChart(series);
  }

  tableEl(tableData = this.data) {
    const tableEl = document.createElement('table');

    tableData.series.forEach((rowData, index) => {
      tableEl.appendChild(this.rowEl(rowData, index));
    });

    return tableEl;
  }

  rowEl(rowData, index) {
    const rowEl = document.createElement('tr');

    Object.keys(rowData).forEach((cell) => {
      rowEl.appendChild(DataTable.cellEl(rowData[cell], cell === 'header'));
    });

    // add a bar chart at the end
    const chartCellEl = document.createElement('td');

    chartCellEl.classList.add('bleed');
    chartCellEl.appendChild(this.barChart.bars[index]);
    rowEl.appendChild(chartCellEl);

    return rowEl;
  }

  static cellEl(cellData, isHeader = false) {
    const cellEl = document.createElement(isHeader ? 'th' : 'td');

    cellEl.textContent = cellData;

    return cellEl;
  }
}

export default DataTable;
