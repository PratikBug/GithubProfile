import * as echarts from 'echarts/core';
import { HeatmapChart, RadarChart } from 'echarts/charts';
import { CalendarComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([HeatmapChart, RadarChart, CalendarComponent, TooltipComponent, VisualMapComponent, CanvasRenderer]);

export { echarts };
