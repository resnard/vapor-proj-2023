import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ProductSalesChart({ data }) {
    const pieColors =[
        '#88C0D0',
        '#5E81AC',
        '#81C7D4',
        '#BF616A',
        '#D08770',
        '#EBCB8B',
        '#A3BE8C',
        '#B48EAD',
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF",
        '#81A1C1',
 
    ]
    // console.log(data)
    
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${percent}%`} 
    </text>
  );
};
    return (
        <ResponsiveContainer width="90%" height={500} className='wrapper1'>
            <PieChart >
            {/* <Pie data={data} dataKey="percent" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" /> */}
                <Pie
                    dataKey="percent"
                    nameKey="name"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={200}
                    fill="#8884d8"
                    height="200px"
                    width="200px"
                    options={{ maintainAspectRatio: false }}
                    // label={renderCustomizedLabel}
                    // labelLine={false}
                    label
                >  {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend layout="vetical" verticalAlign="top" align="right"/>
            </PieChart>
        </ResponsiveContainer>


    );
}