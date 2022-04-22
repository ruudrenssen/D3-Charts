import DataTable from './dataTable';

const barChartData = [{
    header: 'Equity & Mutual Funds',
    positions: 15,
    currency: 'SAR',
    costValue: 8000,
    marketValue: 9999999.99,
    pL: -7777.77,
    relativePL: -0.44,
  },
  {
    header: 'Fixed Income',
    positions: 15,
    currency: 'SAR',
    costValue: 18000,
    marketValue: 9999999.99,
    pL: 7777.77,
    relativePL: 0.202,
  },
  {
    header: 'Money markets',
    positions: 15,
    currency: 'SAR',
    costValue: 28000,
    marketValue: 9999999.99,
    pL: -7.77,
    relativePL: -0.022,
  },
  {
    header: 'Total',
    positions: 80,
    currency: 'SAR',
    costValue: 9000,
    marketValue: 9999999.99,
    pL: 777.77,
    relativePL: 0.303,
  }];

const table = new DataTable(barChartData);

document.body.appendChild(table.table);