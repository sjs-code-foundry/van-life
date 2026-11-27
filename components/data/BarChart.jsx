import * as d3 from "d3";

// Implement Bar Graph:
// https://d3-graph-gallery.com/graph/barplot_basic.html

export default function BarChart(props) {
  // Test data:
  const data = [
    { name: "Mark", value: 90 },
    { name: "Robert", value: 12 },
    { name: "Emily", value: 34 },
    { name: "Marion", value: 53 },
    { name: "Nicolas", value: 98 },
  ];
  const groups = props.data.map((dataPoint) => dataPoint.code);

  // Define margins
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const boundsWidth = props.width - margin.right - margin.left;
  const boundsHeight = props.height - margin.top - margin.bottom;

  // X axis (months)
  const scaleX = d3
    .scaleBand()
    .domain(groups)
    .range([0, boundsWidth])
    .padding(0.3); // Space between the bars

  // Y axis (income)
  const max = d3.max(props.data.map((dataPoint) => dataPoint.value)) ?? 10;
  const scaleY = d3
    .scaleLinear()
    .domain([max * 1.2, 0])
    .range([0, boundsHeight]); // Axis goes from 0 to 200

  // Build the shapes
  const allShapes = props.data.map((dataPoint, index) => {
    const x = scaleX(dataPoint.code);
    // Protect against invalid datapoints
    if (x === undefined) {
      return null;
    }

    return (
      <g key={index}>
        <rect
          className="host-income-graph-bar"
          x={x}
          y={scaleY(dataPoint.value)}
          width={scaleX.bandwidth()}
          height={boundsHeight - scaleY(dataPoint.value)}
        />
        <text
          x={x + scaleX.bandwidth() / 2}
          y={scaleY(dataPoint.value) - 10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={12}
        >
          {dataPoint.value}
        </text>
        <text
          x={x + scaleX.bandwidth() / 2}
          y={boundsHeight + 10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={12}
        >
          {dataPoint.code}
        </text>
      </g>
    );
  });

  // Build the grid
  const grid = scaleY.ticks(5).map((value, index) => {
    return (
      <g key={index}>
        <line
          className="host-income-graph-line"
          x1={0}
          x2={boundsWidth}
          y1={scaleY(value)}
          y2={scaleY(value)}
        />
        <text
          className="host-income-graph-line-label"
          x={-10}
          y={scaleY(value)}
        >
          {value}
        </text>
      </g>
    );
  });

  return (
    <div>
      <svg width={props.width} height={props.height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[margin.left, margin.top].join(",")})`}
        >
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  );
}
