import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Card from '@/components/atoms/Card';
import { cn } from '@/utils/cn';

const TaskChart = ({ data, type = 'pie', title, className }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const chartOptions = {
    chart: {
      type: type,
      height: 300,
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: isDarkMode ? 'dark' : 'light',
    },
    colors: ['#5B47E0', '#F97316', '#10B981', '#EF4444'],
    labels: data.labels,
    legend: {
      position: 'bottom',
      labels: {
        colors: isDarkMode ? '#E5E7EB' : '#374151',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: [isDarkMode ? '#E5E7EB' : '#374151'],
      },
    },
    stroke: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(className)}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h3>
        <div className="w-full h-80">
          <Chart
            options={chartOptions}
            series={data.series}
            type={type}
            height={300}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskChart;