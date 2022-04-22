import BarChart from './chart/barChart';

class DataTable {
  constructor(data) {
    this.barChart = new BarChart(data);
    this.table = this.tableEl(data);
  }

  tableEl(tableData) {
    const el = document.createElement('table');

    tableData.forEach((rowData, index) => {
      el.appendChild(this.rowEl(rowData, index));
    });

    return el;
  }

  rowEl(rowData, index) {
    const el = document.createElement('tr');

    Object.keys(rowData).forEach((cell) => {
      el.appendChild(DataTable.cellEl(rowData[cell], cell === 'header'));
    });

    // add a bar chart at the end
    const chartCellEl = document.createElement('td');
    chartCellEl.appendChild(this.barChart.bars[index]);
    chartCellEl.classList.add('full-bleed');
    el.appendChild(chartCellEl);

    return el;
  }

  static cellEl(cellData, isHeader = false) {
    const el = document.createElement(isHeader ? 'th' : 'td');

    el.textContent = cellData;

    return el;
  }
}

export default DataTable;
