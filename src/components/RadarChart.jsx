import ReactApexChart from "react-apexcharts";

const RadarChart = ({ series, options }) => {
  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radar"
          width={450}
          height={400}
        />
      </div>
    </>
  );
};

export default RadarChart;
