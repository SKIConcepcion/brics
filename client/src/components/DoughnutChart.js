import React from 'react';
import {Chart as ChartD, ArcElement, Tooltip} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartD.register(ArcElement, Tooltip);
ChartD.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
// ChartD.defaults.plugins.legend.position = 'top';
// ChartD.defaults.plugins.legend.title.display = true;
// ChartD.defaults.plugins.legend.title.text = '60 of 100 Done';
// ChartD.defaults.plugins.legend.title.font = 'Helvetica Neue';

export default function DoughnutChart({data}) {

    const title = data.title;
    const labels = data.labels;
    const values = data.datasets[0].data;
    const backgroundColors = data.datasets[0].backgroundColor;

// Formatting the data and labels for display
    const formattedData = [];
    for (let i = 0; i < labels.length; i += 2) {
    const label1 = labels[i];
    const value1 = values[i];
    const valueStr1 = value1.toString().padStart(2, ' ');
    const color1 = backgroundColors[i]; // Get color from the chart dataset

    const label2 = labels[i + 1];
    const value2 = values[i + 1];
    const valueStr2 = value2.toString().padStart(2, ' ');
    const color2 = backgroundColors[i + 1]; // Get color from the chart dataset

    formattedData.push(
        <div key={i} className="" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
            <div className='text-center max-w-[40%] w-full flex' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginRight: '20px' }}>
                <div className='text-xl font-bold' style={{ color: color1 }}>{valueStr1}</div>
                <div style={{flexShrink: 1}}>{label1}</div>
                
            </div>
            <div className="max-w-[40%] w-full flex" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className='text-xl font-bold' style={{ color: color2 }}>{valueStr2}</span>
                <span>{label2}</span>
            </div>
        </div>
    );
    }
    
    const options = {
    plugins: {
        legend: false,
    },
    };

  return (
    <div className="flex flex-col item-center">
        <h2 className='font-satoshi-bold text-xl text-gray-500'>{title}</h2>
        <div><Doughnut data={data} options={options}/></div>
        <div style={{justifyContent: 'center'}}>{formattedData}</div>
    </div>
  );
}
