# 数据可视化项目 - 第二章 (Data Visualization Project - Chapter 2)

这是一个专注于图表类型详解的数据可视化项目，包含第二章的Jupyter笔记本，详细介绍了各种常见图表的绘制方法和应用场景。

## 项目结构

```
datavis24/
├── 第2章.ipynb          # 各种图表类型详解
├── 素材/                # 数据文件
│   ├── 2014_us_cities.csv
│   ├── health.xlsx
│   ├── mpg_ggplot2.csv
│   ├── population.xlsx
│   ├── USArrests.csv
│   └── USArrests.xlsx
└── README.md
```

## 第二章涵盖的图表类型

### 基础图表详解
- 折线图 (Line Plot) - 趋势分析和时间序列数据
- 柱形图 (Bar Chart) - 分类数据比较
- 条形图 (Barh Chart) - 水平方向的数据展示
- 饼图 (Pie Chart) - 比例和百分比数据
- 散点图 (Scatter Plot) - 变量关系分析

### 图表应用特点
- 每种图表类型的适用场景
- 数据格式要求和预处理
- 样式定制和美化技巧
- 实际业务应用案例

## 实际应用案例

项目包含多个实际应用场景的案例：
- 气温变化趋势分析
- 电商平台GMV统计
- 网购替代率分析
- 物流费用统计
- 支付宝月账单可视化
- 汽车速度与制动距离关系
- 发电量统计分析
- 职业兴趣测试雷达图
- 植物细根生物量研究

## 技术栈

- **编程语言**: Python 3
- **核心库**: 
  - matplotlib
  - numpy
  - pandas (数据文件处理)
- **开发环境**: Jupyter Notebook

## 快速开始

### 环境配置

1. 安装Python 3.8+
2. 安装必要的依赖包：

```bash
pip install numpy matplotlib jupyter pandas openpyxl
```

### 运行项目

1. 启动Jupyter Notebook：

```bash
jupyter notebook
```

2. 在浏览器中打开相应的`.ipynb`文件
3. 按顺序运行各个章节的代码单元格

## 学习重点

**第二章重点内容**：
- 各种图表类型的绘制原理和方法
- 图表选择的最佳实践
- 数据可视化的基本原则
- 实际案例的代码实现

## 数据文件说明

`素材/`目录包含项目使用的数据文件：
- CSV格式：通用数据表格
- Excel格式：结构化数据
- 涵盖经济、社会、科学等多个领域的数据

## 贡献指南

欢迎提交Issue和Pull Request来改进项目：
- 报告代码错误或改进建议
- 添加新的可视化案例
- 优化现有代码和文档

## 许可证

本项目采用MIT许可证，详见LICENSE文件。

## 联系方式

如有问题或建议，请通过GitHub Issues提交。

---

*最后更新: 2025年1月*