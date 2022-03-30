import BarChart from './chart/barChart.mjs';

class DataTable {
    constructor(data) {
        this.data = data;

        const serie = this.data.series.map(serie => {
            return serie.relativePL;
        })

        this.barChart = new BarChart(serie);
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

        for (const dataKey in rowData) {
            const cellData = rowData[dataKey];
            const isHeader = dataKey === 'header';

            rowEl.appendChild(this.cellEl(cellData, isHeader));
        }

        // add a bar chart at the end
        const chartCellEl = document.createElement('td');

        chartCellEl.classList.add('bleed');
        chartCellEl.appendChild(this.barChart.bars[index]);
        rowEl.appendChild(chartCellEl);

        return rowEl;
    }

    cellEl(cellData, isHeader = false) {   
        const cellEl = document.createElement(isHeader ? 'th' : 'td');

        cellEl.textContent = cellData;

        return cellEl;
    }
}

export default DataTable;