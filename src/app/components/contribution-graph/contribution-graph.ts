import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ContributionsResponse } from '../../models/github.models';
import { echarts } from '../../echarts-setup';

@Component({
  selector: 'app-contribution-graph',
  standalone: true,
  imports: [],
  templateUrl: './contribution-graph.html',
  styleUrl: './contribution-graph.css',
})
export class ContributionGraphComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: ContributionsResponse | null = null;
  @Input() year = new Date().getFullYear();
  @Input() loading = false;
  @Input() years: number[] = [];
  @Output() yearChange = new EventEmitter<number>();
  @ViewChild('chartEl') chartEl!: ElementRef<HTMLDivElement>;

  private chart: echarts.ECharts | null = null;

  get totalContributions(): number {
    if (!this.data) return 0;
    return Object.values(this.data.total).reduce((a, b) => a + b, 0);
  }

  ngAfterViewInit(): void {
    this.chart = echarts.init(this.chartEl.nativeElement);
    this.render();
    window.addEventListener('resize', this.handleResize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data'] || changes['year']) && this.chart) {
      this.render();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
    this.chart?.dispose();
  }

  private handleResize = (): void => this.chart?.resize();

  selectYear(y: number): void {
    if (y !== this.year) {
      this.yearChange.emit(y);
    }
  }

  private render(): void {
    if (!this.chart || !this.data) return;

    const values = this.data.contributions.map((d) => [d.date, d.count]);
    const year = this.year;

    this.chart.setOption({
      tooltip: {
        formatter: (params: any) => `${params.value[1]} contributions on ${params.value[0]}`,
      },
      visualMap: {
        show: false,
        min: 0,
        max: 10,
        calculable: false,
        inRange: {
          color: ['#eff2f5', '#aceebb', '#4ac26b', '#2da44e', '#116329'],
        },
      },
      calendar: {
        top: 30,
        left: 30,
        right: 10,
        cellSize: ['auto', 13],
        range: String(year),
        itemStyle: {
          borderWidth: 3,
          borderColor: 'transparent',
          color: '#eff2f5',
        },
        splitLine: { show: false },
        yearLabel: { show: false },
        dayLabel: {
          firstDay: 0,
          nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
          color: '#7d8590',
          fontSize: 10,
        },
        monthLabel: {
          color: '#7d8590',
          fontSize: 10,
        },
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: values,
        },
      ],
    });
  }
}
