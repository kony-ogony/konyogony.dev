import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export const description = 'Commits over last 3 months';

const chartData = [
    { date: '2024-04-01', commits: 222 },
    { date: '2024-04-02', commits: 97 },
    { date: '2024-04-03', commits: 167 },
    { date: '2024-04-04', commits: 242 },
    { date: '2024-04-05', commits: 373 },
    { date: '2024-04-06', commits: 301 },
    { date: '2024-04-07', commits: 245 },
    { date: '2024-04-08', commits: 409 },
    { date: '2024-04-09', commits: 59 },
    { date: '2024-04-10', commits: 261 },
    { date: '2024-04-11', commits: 327 },
    { date: '2024-04-12', commits: 292 },
    { date: '2024-04-13', commits: 342 },
    { date: '2024-04-14', commits: 137 },
    { date: '2024-04-15', commits: 120 },
    { date: '2024-04-16', commits: 138 },
    { date: '2024-04-17', commits: 446 },
    { date: '2024-04-18', commits: 364 },
    { date: '2024-04-19', commits: 243 },
    { date: '2024-04-20', commits: 89 },
    { date: '2024-04-21', commits: 137 },
    { date: '2024-04-22', commits: 224 },
    { date: '2024-04-23', commits: 138 },
    { date: '2024-04-24', commits: 387 },
    { date: '2024-04-25', commits: 215 },
    { date: '2024-04-26', commits: 75 },
    { date: '2024-04-27', commits: 383 },
    { date: '2024-04-28', commits: 122 },
    { date: '2024-04-29', commits: 315 },
    { date: '2024-04-30', commits: 454 },
    { date: '2024-05-01', commits: 165 },
    { date: '2024-05-02', commits: 293 },
    { date: '2024-05-03', commits: 247 },
    { date: '2024-05-04', commits: 385 },
    { date: '2024-05-05', commits: 481 },
    { date: '2024-05-06', commits: 498 },
    { date: '2024-05-07', commits: 388 },
    { date: '2024-05-08', commits: 149 },
    { date: '2024-05-09', commits: 227 },
    { date: '2024-05-10', commits: 293 },
    { date: '2024-05-11', commits: 335 },
    { date: '2024-05-12', commits: 197 },
    { date: '2024-05-13', commits: 197 },
    { date: '2024-05-14', commits: 448 },
    { date: '2024-05-15', commits: 473 },
    { date: '2024-05-16', commits: 338 },
    { date: '2024-05-17', commits: 499 },
    { date: '2024-05-18', commits: 315 },
    { date: '2024-05-19', commits: 235 },
    { date: '2024-05-20', commits: 177 },
    { date: '2024-05-21', commits: 82 },
    { date: '2024-05-22', commits: 81 },
    { date: '2024-05-23', commits: 252 },
    { date: '2024-05-24', commits: 294 },
    { date: '2024-05-25', commits: 201 },
    { date: '2024-05-26', commits: 213 },
    { date: '2024-05-27', commits: 420 },
    { date: '2024-05-28', commits: 233 },
    { date: '2024-05-29', commits: 78 },
    { date: '2024-05-30', commits: 340 },
    { date: '2024-05-31', commits: 178 },
    { date: '2024-06-01', commits: 178 },
    { date: '2024-06-02', commits: 470 },
    { date: '2024-06-03', commits: 103 },
    { date: '2024-06-04', commits: 439 },
    { date: '2024-06-05', commits: 88 },
    { date: '2024-06-06', commits: 294 },
    { date: '2024-06-07', commits: 323 },
    { date: '2024-06-08', commits: 385 },
    { date: '2024-06-09', commits: 438 },
    { date: '2024-06-10', commits: 155 },
    { date: '2024-06-11', commits: 92 },
    { date: '2024-06-12', commits: 492 },
    { date: '2024-06-13', commits: 81 },
    { date: '2024-06-14', commits: 426 },
    { date: '2024-06-15', commits: 307 },
    { date: '2024-06-16', commits: 371 },
    { date: '2024-06-17', commits: 475 },
    { date: '2024-06-18', commits: 107 },
    { date: '2024-06-19', commits: 341 },
    { date: '2024-06-20', commits: 408 },
    { date: '2024-06-21', commits: 169 },
    { date: '2024-06-22', commits: 317 },
    { date: '2024-06-23', commits: 480 },
    { date: '2024-06-24', commits: 132 },
    { date: '2024-06-25', commits: 141 },
    { date: '2024-06-26', commits: 434 },
    { date: '2024-06-27', commits: 448 },
    { date: '2024-06-28', commits: 149 },
    { date: '2024-06-29', commits: 103 },
    { date: '2024-06-30', commits: 446 },
];

const chartConfig = {
    views: {
        label: 'Commits',
    },
    commits: {
        label: 'Commits',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

export function MyChart() {
    const [activeChart] = useState<keyof typeof chartConfig>('commits');

    return (
        <ChartContainer config={chartConfig} className='my-16 aspect-auto h-[250px] w-full'>
            <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid stroke='grey' vertical={false} style={{ opacity: 0.2 }} />
                <XAxis
                    dataKey='date'
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                        });
                    }}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            nameKey='views'
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                });
                            }}
                        />
                    }
                />
                <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
        </ChartContainer>
    );
}
