import Plot from "react-plotly.js";
import { getPointColor } from "../../auxiliary/getPointColor";

const LineGraph3D = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  const groupedData = data.reduce((acc, row) => {
    const trackNum = row.TrackNum;
    if (!acc[trackNum]) {
      acc[trackNum] = [];
    }
    acc[trackNum].push(row);
    return acc;
  }, {});

  const traces = Object.keys(groupedData).map((trackNum) => {
    const trackData = groupedData[trackNum];

    trackData.sort((a, b) => parseFloat(a.Time) - parseFloat(b.Time));

    return {
      x: trackData.map((row) => parseFloat(row.X)),
      y: trackData.map((row) => parseFloat(row.Y)),
      z: trackData.map((row) => parseFloat(row.Z)),
      mode: "lines+markers",
      type: "scatter3d",
      name: `Track ${trackNum}`,
      line: {
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
        width: 2,
      },
      marker: {
        size: 5,
        color: trackData.map((row) => getPointColor(row.IMMconsistent)),
      },
      text: trackData.map(
        (row) =>
          `Track: ${trackNum}<br>X: ${parseFloat(row.X).toFixed(
            2
          )}<br>Y: ${parseFloat(row.Y).toFixed(2)}<br>Z: ${parseFloat(
            row.Z
          ).toFixed(2)}<br>Time: ${parseFloat(row.Time).toFixed(
            2
          )} sec<br>IMM Consistent: ${row.IMMconsistent}<br>Speed: ${
            row.speed !== "None" ? parseFloat(row.speed).toFixed(2) : "N/A"
          }<br>Probability: ${
            row.probability ? parseFloat(row.probability).toFixed(5) : "N/A"
          }<br>IMM Consistent Value: ${
            row.IMMconsistentValue !== "None"
              ? parseFloat(row.IMMconsistentValue).toFixed(2)
              : "N/A"
          }`
      ),
      hoverinfo: "text",
    };
  });

  return (
    <Plot
      data={traces}
      layout={{
        scene: {
          xaxis: { title: "X (km)" },
          yaxis: { title: "Y (km)" },
          zaxis: { title: "Z (km)" },
        },
        autosize: true,
      }}
      style={{ width: "100%", height: "600px" }}
    />
  );
};

export default LineGraph3D;
