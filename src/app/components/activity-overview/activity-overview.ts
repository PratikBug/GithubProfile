import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MOCK_ACTIVITY_OVERVIEW } from '../../mock-data';
import { echarts } from '../../echarts-setup';

@Component({
  selector: 'app-activity-overview',
  standalone: true,
  imports: [],
  templateUrl: './activity-overview.html',
  styleUrl: './activity-overview.css',
})
export class ActivityOverviewComponent implements AfterViewInit, OnDestroy {
  readonly overview = MOCK_ACTIVITY_OVERVIEW;
  @ViewChild('chartEl') chartEl!: ElementRef<HTMLDivElement>;

  private chart: echarts.ECharts | null = null;

  ngAfterViewInit(): void {
    this.chart = echarts.init(this.chartEl.nativeElement);
    this.chart.setOption({
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Code review', max: 100 },
          { name: 'Issues', max: 100 },
          { name: 'Pull requests', max: 100 },
          { name: 'Commits', max: 100 },
        ],
        shape: 'polygon',
        radius: '65%',
        splitNumber: 3,
        axisName: { color: '#57606a', fontSize: 11 },
        splitLine: { lineStyle: { color: '#d0d7de' } },
        splitArea: { show: false },
        axisLine: { lineStyle: { color: '#d0d7de' } },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [
                this.overview.codeReviewPercent,
                this.overview.issuesPercent,
                this.overview.pullRequestsPercent,
                this.overview.commitsPercent,
              ],
              areaStyle: { color: 'rgba(45, 164, 78, 0.25)' },
              lineStyle: { color: '#2da44e' },
              itemStyle: { color: '#2da44e' },
            },
          ],
        },
      ],
    });
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
    this.chart?.dispose();
  }

  private handleResize = (): void => this.chart?.resize();
}
