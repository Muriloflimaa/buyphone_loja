import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
      magazineluiza: 1800,
    },
    {
      name: '03/09',
      americanas: 3000,
      pontofrio: 1398,
      casasbahia: 2700,
      magazineluiza: 1500,
    },
    {
      name: '04/09',
      americanas: 2000,
      pontofrio: 6000,
      casasbahia: 2900,
      magazineluiza: 3200,
    },
    {
      name: '05/09',
      americanas: 2780,
      pontofrio: 3908,
      casasbahia: 3200,
      magazineluiza: 3000,
    },
    {
      name: '06/09',
      americanas: 1890,
      pontofrio: 4800,
      casasbahia: 2500,
      magazineluiza: 1800,
    },
    {
      name: '07/09',
      americanas: 2390,
      pontofrio: 3800,
      casasbahia: 2000,
      magazineluiza: 2600,
    },
    {
      name: '08/09',
      americanas: 3490,
      pontofrio: 4300,
      casasbahia: 2100,
      magazineluiza: 2400,
    },
  ]

  const renderColorfulLegendText = (value: string) => {
    return <span className="text-info-content">{value}</span>
  }

  useEffect(() => {
    setIsData(true)
  }, [])

  return (
    <div>
      {isData && (
        <div className="mt-24" style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="coloramericanas"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#D33131" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorpontofrio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ED981A" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient
                  id="colorcasasbahia"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#0026AE" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient
                  id="colormagazineluiza"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4595DE" stopOpacity={0.2} />
                </linearGradient>

                {/* cor dos graficos acima */}
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid vertical={false} strokeDasharray="0" />

              <Tooltip
                wrapperStyle={{ outline: 'none' }}
                labelStyle={{ color: 'black' }}
                labelFormatter={function (value) {
                  return `Dia: ${value}`
                }}
              />

              <Legend
                iconType={'circle'}
                formatter={renderColorfulLegendText}
              />

              <Area
                strokeWidth={3}
                name="Americanas"
                type="monotone"
                dataKey="americanas"
                stroke="#D33131"
                fillOpacity={1}
                fill="url(#coloramericanas)"
              />
              <Area
                strokeWidth={3}
                name="Ponto Frio"
                type="monotone"
                dataKey="pontofrio"
                stroke="#ED981A"
                fillOpacity={1}
                fill="url(#colorpontofrio)"
              />
              <Area
                strokeWidth={3}
                name="Casas Bahia"
                type="monotone"
                dataKey="casasbahia"
                stroke="#0026AE"
                fillOpacity={1}
                fill="url(#colorcasasbahia)"
              />
              <Area
                strokeWidth={3}
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
        </div>
      )}
    </div>
  )
}
