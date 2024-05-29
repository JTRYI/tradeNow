import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './CandlestickChart.css';


const CandlestickChart = ({ ohlcData, cryptoTicker }) => {
    const options = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: `Candlestick Chart (${cryptoTicker})`,
            align: 'middle',
            style: {
                color: '#b386f1', // Custom color
                fontSize: '18px',
            }
        },
        xaxis: {
            type: 'datetime',
            
            labels: {
                style: {
                    colors: '#f4f4f4', // Custom color for x-axis labels
                    fontSize: '12px'
                }
            },

            title: {
                text: 'Date',
                style: {
                    color: '#b386f1', // Custom color for x-axis title
                    fontSize: '14px',
                    fontWeight: 'bold',
                    
                },
                offsetY: 8 // Adjust vertical spacing
            }
        },
        yaxis: {
            tooltip: {
                enabled: true
            },
            labels: {
                style: {
                    colors: '#f4f4f4', // Custom color for y-axis labels
                    fontSize: '12px'
                }
            },

            title: {
                text: 'Price (USD)',
                style: {
                    color: '#b386f1', // Custom color for y-axis title
                    fontSize: '14px',
                    fontWeight: 'bold',
                    
                },
                offsetX: -5 // Adjust horizontal spacing
            }
        }
    };

    const series = [{
        data: ohlcData
    }];

    return (
        <div id="candle-chart" className='candle-chart'>
            <ReactApexChart options={options} series={series} type="candlestick" height={350} />
        </div>
    );
};

export default CandlestickChart;

