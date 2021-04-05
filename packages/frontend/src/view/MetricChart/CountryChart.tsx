import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useTheme } from '@material-ui/core';

const COUNTRIES = [
  { country: 'France', count: 10 },
  { country: 'Germany', count: 20 },
  { country: 'Egypt', count: 13 },
  { country: 'Ukraine', count: 50 },
  { country: 'Spain', count: 26 },
  { country: 'Denmark', count: 3 },
  { country: 'USA', count: 47 },
  { country: 'China', count: 51 },
  { country: 'Poland', count: 5 },
  { country: 'Other', count: 113 },
];

export const CountryChart: React.FC = () => {
  const { palette } = useTheme();

  const COLORS = [
    palette.primary.main,
    palette.secondary.main,
    palette.success.main,
    palette.error.main,
    palette.primary.light,
    palette.secondary.light,
    palette.success.light,
    palette.error.light,
    palette.primary.dark,
    palette.secondary.dark,
    palette.success.dark,
    palette.error.dark,
  ];

  return (
    <>
      <ResponsiveContainer height={400}>
        <PieChart>
          <Pie
            data={COUNTRIES}
            dataKey="count"
            nameKey="country"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {COUNTRIES.map(({ country }, idx) => {
              return (
                <Cell
                  key={country}
                  fill={COLORS[idx % COLORS.length]}
                  stroke="transparent"
                />
              );
            })}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
