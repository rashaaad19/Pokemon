import ReactApexChart from "react-apexcharts";

const RadarChart = ({ series, options }) => {
  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radar"
          height={300}
        />
      </div>
    </>
  );
};

export default RadarChart;
