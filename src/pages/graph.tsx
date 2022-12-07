import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function graph() {
  const [isData, setIsData] = useState(false)

  const data = [
    {
      name: '02/09',
      americanas: 4000,
      pontofrio: 2400,
      casasbahia: 2800,
      magazineluiza: 2400,
    },
    {
      name: '03/09',
      americanas: 3000,
      pontofrio: 1398,
      casasbahia: 2700,
      magazineluiza: 2400,
    },
    {
      name: '04/09',
      americanas: 2000,
      pontofrio: 6000,
      casasbahia: 2900,
      magazineluiza: 2400,
    },
    {
      name: '05/09',
      americanas: 2780,
      pontofrio: 3908,
      casasbahia: 3200,
      magazineluiza: 2400,
    },
    {
      name: '06/09',
      americanas: 1890,
      pontofrio: 4800,
      casasbahia: 2500,
      magazineluiza: 2400,
    },
    {
      name: '07/09',
      americanas: 2390,
      pontofrio: 3800,
      casasbahia: 2000,
      magazineluiza: 2400,
    },
    {
      name: '08/09',
      americanas: 3490,
      pontofrio: 4300,
      casasbahia: 2100,
      magazineluiza: 2400,
    },
  ]

  useEffect(() => {
    setIsData(true)
  }, [])

  return (
    <div>
      {isData && (
        <ResponsiveContainer
          className="mt-24 w-full"
          debounce={10}
          height={250}
        >
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="coloramericanas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D33131" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D33131" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorpontofrio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ED981A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ED981A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorcasasbahia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0026AE" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0026AE" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="colormagazineluiza"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#4595DE" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4595DE" stopOpacity={0} />
              </linearGradient>

              {/* cor dos graficos acima */}
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend iconType={'circle'} />

            <Area
              name="Americanas"
              type="monotone"
              dataKey="americanas"
              stroke="#D33131"
              fillOpacity={1}
              fill="url(#coloramericanas)"
            />
            <Area
              name="Ponto Frio"
              type="monotone"
              dataKey="pontofrio"
              stroke="#ED981A"
              fillOpacity={1}
              fill="url(#colorpontofrio)"
            />
            <Area
              name="Casas Bahia"
              type="monotone"
              dataKey="casasbahia"
              stroke="#0026AE"
              fillOpacity={1}
              fill="url(#colorcasasbahia)"
            />
            <Area
              name="Magazine Luiza"
              type="monotone"
              dataKey="magazineluiza"
              stroke="#4595DE"
              fillOpacity={1}
              fill="url(#colormagazineluiza)"
            />
            {/* cor da area acima quadrado */}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
