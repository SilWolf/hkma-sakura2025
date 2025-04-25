"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

export default function StatChart({
  stat,
}: {
  stat: { atk: number; def: number; spd: number; luk: number };
}) {
  return (
    <Radar
      data={{
        labels: ["攻擊", "防禦", "速度", "運氣"],
        datasets: [
          {
            data: [stat.atk, stat.def, stat.spd, stat.luk],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
        ],
      }}
      options={{
        scales: {
          r: {
            animate: true,
            angleLines: {
              display: true,
            },
            pointLabels: {
              font: {
                size: 14,
              },
            },
            beginAtZero: true,
            min: 0,
            max: 5,
            ticks: {
              display: false,
              stepSize: 1,
            },
          },
        },
      }}
    />
  );
}
