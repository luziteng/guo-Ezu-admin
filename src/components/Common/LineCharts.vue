<template>
  <div :id="id" :style="styleObject" />
</template>
<script>
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import resize from "./mixins/resize";
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: "line_chart",
    },
    boxStyle: {
      type: Object,
      default: () => {
        return { width: "100", height: "300px" };
      },
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          xAxisData: [],
          yAxisData: [],
        };
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    styleObject: function () {
      const obj = this.boxStyle;
      for (const attr in this.boxStyle) {
        // var current = getComputedStyle(this.boxStyle)[attr]
        // 提取单位,若存在单位，得到数组。若不存在单位，得到%
        var unit = this.boxStyle[attr].match(/[a-z]+$/);
        unit = unit ? unit[0] : "%";

        obj[attr] =
          unit !== "%" ? this.boxStyle[attr] : this.boxStyle[attr] + unit;
      }
      return obj;
    },
  },
  watch: {
    chartData: function (val) {
      this.initChart();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    // this.charts.dispose()// 销毁实例
    this.charts = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      const series = [];
      this.chart.setOption({
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2023-7-31",
            "2023-8-01",
            "2023-8-02",
            "2023-8-03",
            "2023-8-04",
            "2023-8-05",
            "2023-8-06",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "盲盒订单",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "商品订单",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      });
    },
  },
};
</script>
