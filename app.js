// 数据定义 - 基于Jupyter Notebook原始数据
const datasets = {
    temperature: {
        name: "温度数据",
        description: "未来15天最高气温和最低气温数据",
        data: {
            days: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            maxTemp: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
            minTemp: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16]
        }
    },
    gmv: {
        name: "阿里巴巴GMV数据",
        description: "2013-2019财年淘宝和天猫平台GMV",
        data: [
            { year: "FY2013", gmv: 10770 },
            { year: "FY2014", gmv: 16780 },
            { year: "FY2015", gmv: 24440 },
            { year: "FY2016", gmv: 30920 },
            { year: "FY2017", gmv: 37670 },
            { year: "FY2018", gmv: 48200 },
            { year: "FY2019", gmv: 57270 }
        ]
    },
    online_shopping: {
        name: "网购替代率",
        description: "各商品种类的网购替代率",
        data: [
            { category: "家政、家教、保姆等生活服务", rate: 0.959 },
            { category: "飞机票、火车票", rate: 0.951 },
            { category: "家具", rate: 0.935 },
            { category: "手机、手机配件", rate: 0.924 },
            { category: "计算机及其配套产品", rate: 0.893 },
            { category: "汽车用品", rate: 0.892 },
            { category: "通信充值、游戏充值", rate: 0.865 },
            { category: "个人护理用品", rate: 0.863 }
        ]
    },
    logistics: {
        name: "物流费用统计",
        description: "物流公司月度物流费用",
        data: {
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            companyA: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
            companyB: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
            companyC: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288]
        }
    },
    alipay: {
        name: "支付宝月账单",
        description: "支付宝月度消费分类统计",
        data: [
            { category: "购物", amount: 800, percentage: 26.7 },
            { category: "人情往来", amount: 100, percentage: 3.3 },
            { category: "餐饮美食", amount: 1000, percentage: 33.3 },
            { category: "通信物流", amount: 200, percentage: 6.7 },
            { category: "生活日用", amount: 300, percentage: 10.0 },
            { category: "交通出行", amount: 200, percentage: 6.7 },
            { category: "休闲娱乐", amount: 200, percentage: 6.7 },
            { category: "其他", amount: 200, percentage: 6.7 }
        ]
    },
    car_braking: {
        name: "汽车制动距离",
        description: "汽车速度与制动距离关系",
        data: [
            { speed: 10, distance: 0.5 },
            { speed: 20, distance: 2.0 },
            { speed: 30, distance: 4.4 },
            { speed: 40, distance: 7.9 },
            { speed: 50, distance: 12.3 },
            { speed: 60, distance: 17.7 },
            { speed: 70, distance: 24.1 },
            { speed: 80, distance: 31.5 },
            { speed: 90, distance: 39.9 },
            { speed: 100, distance: 49.2 }
        ]
    }
};

// 颜色方案
const colorSchemes = {
    viridis: ['#440154', '#31688e', '#35b779', '#fde725'],
    plasma: ['#0d0887', '#7e03a8', '#cc4678', '#f0f921'],
    inferno: ['#000004', '#721f81', '#f1605d', '#fcfdbf'],
    category10: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
};

// 全局变量
let currentChartType = 'line';
let currentDataset = 'temperature';
let currentColorScheme = 'viridis';

// 初始化应用
function initApp() {
    setupEventListeners();
    renderChart();
    updateDataTable();
}

// 设置事件监听器
function setupEventListeners() {
    // 导航按钮
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentChartType = this.dataset.chart;
            renderChart();
        });
    });

    // 数据集选择
    document.getElementById('dataset-select').addEventListener('change', function() {
        currentDataset = this.value;
        renderChart();
        updateDataTable();
    });

    // 添加更多图表类型按钮
    const chartTypes = ['line', 'bar', 'pie', 'scatter', 'area', 'radar'];
    const navContainer = document.querySelector('nav');
    
    chartTypes.forEach(type => {
        if (!document.querySelector(`[data-chart="${type}"]`)) {
            const btn = document.createElement('button');
            btn.className = 'nav-btn';
            btn.dataset.chart = type;
            btn.textContent = getChartName(type);
            btn.addEventListener('click', function() {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentChartType = this.dataset.chart;
                renderChart();
            });
            navContainer.appendChild(btn);
        }
    });
    
    // 更新数据集选择器
    const datasetSelect = document.getElementById('dataset-select');
    datasetSelect.innerHTML = `
        <option value="temperature">温度数据</option>
        <option value="gmv">阿里巴巴GMV数据</option>
        <option value="online_shopping">网购替代率</option>
        <option value="logistics">物流费用统计</option>
        <option value="alipay">支付宝月账单</option>
        <option value="car_braking">汽车制动距离</option>
    `;

    // 颜色方案选择
    document.getElementById('color-scheme').addEventListener('change', function() {
        currentColorScheme = this.value;
        renderChart();
    });

    // 重置视图
    document.getElementById('reset-view').addEventListener('click', function() {
        renderChart();
    });
}

// 获取图表名称
function getChartName(type) {
    const names = {
        'line': '折线图',
        'bar': '柱形图',
        'pie': '饼图',
        'scatter': '散点图',
        'area': '面积图',
        'radar': '雷达图'
    };
    return names[type] || type;
}

// 渲染图表
function renderChart() {
    const chartArea = document.getElementById('chart-area');
    chartArea.innerHTML = '';
    
    const dataset = datasets[currentDataset];
    const colors = colorSchemes[currentColorScheme];
    
    document.getElementById('chart-title').textContent = dataset.name;
    document.getElementById('chart-description').textContent = dataset.description;

    switch (currentChartType) {
        case 'line':
            renderLineChart(chartArea, dataset, colors);
            break;
        case 'bar':
            renderBarChart(chartArea, dataset, colors);
            break;
        case 'pie':
            renderPieChart(chartArea, dataset, colors);
            break;
        case 'scatter':
            renderScatterChart(chartArea, dataset, colors);
            break;
        case 'area':
            renderAreaChart(chartArea, dataset, colors);
            break;
        case 'radar':
            renderRadarChart(chartArea, dataset, colors);
            break;
    }
}

// 渲染折线图
function renderLineChart(container, dataset, colors) {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let xScale, yScale;

    if (currentDataset === 'temperature') {
        xScale = d3.scaleLinear()
            .domain([4, 18])
            .range([margin.left, width - margin.right]);

        yScale = d3.scaleLinear()
            .domain([0, 40])
            .range([height - margin.bottom, margin.top]);

        // 添加折线
        const line = d3.line()
            .x((d, i) => xScale(dataset.data.days[i]))
            .y(d => yScale(d))
            .curve(d3.curveMonotoneX);

        svg.append('path')
            .datum(dataset.data.maxTemp)
            .attr('fill', 'none')
            .attr('stroke', colors[0])
            .attr('stroke-width', 2)
            .attr('d', line);

        svg.append('path')
            .datum(dataset.data.minTemp)
            .attr('fill', 'none')
            .attr('stroke', colors[1])
            .attr('stroke-width', 2)
            .attr('d', line);
    } else if (currentDataset === 'car_braking') {
        xScale = d3.scaleLinear()
            .domain([0, 110])
            .range([margin.left, width - margin.right]);

        yScale = d3.scaleLinear()
            .domain([0, 60])
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x(d => xScale(d.speed))
            .y(d => yScale(d.distance))
            .curve(d3.curveMonotoneX);

        svg.append('path')
            .datum(dataset.data)
            .attr('fill', 'none')
            .attr('stroke', colors[0])
            .attr('stroke-width', 2)
            .attr('d', line);

        // 添加散点
        svg.selectAll('.dot')
            .data(dataset.data)
            .enter()
            .append('circle')
            .attr('class', 'line-point')
            .attr('cx', d => xScale(d.speed))
            .attr('cy', d => yScale(d.distance))
            .attr('r', 4)
            .attr('fill', colors[0])
            .on('mouseover', function(event, d) {
                showTooltip(event, `速度: ${d.speed} km/h<br>制动距离: ${d.distance} m`);
            })
            .on('mouseout', hideTooltip);
    }

    // 添加坐标轴
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    // 添加图例
    const legend = svg.append('g')
        .attr('transform', `translate(${width - 120},${margin.top})`);

    if (currentDataset === 'temperature') {
        legend.append('rect')
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', colors[0]);

        legend.append('text')
            .attr('x', 20)
            .attr('y', 10)
            .text('最高温度');

        legend.append('rect')
            .attr('y', 20)
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', colors[1]);

        legend.append('text')
            .attr('x', 20)
            .attr('y', 30)
            .text('最低温度');
    }
}

// 渲染柱形图
function renderBarChart(container, dataset, colors) {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let xScale, yScale, data;

    if (currentDataset === 'gmv') {
        xScale = d3.scaleBand()
            .domain(dataset.data.map(d => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.3);

        yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset.data, d => d.gmv)])
            .range([height - margin.bottom, margin.top]);

        data = dataset.data;
    } else if (currentDataset === 'online_shopping') {
        // 水平条形图
        xScale = d3.scaleLinear()
            .domain([0, 1])
            .range([margin.left, width - margin.right]);

        yScale = d3.scaleBand()
            .domain(dataset.data.map(d => d.category))
            .range([margin.top, height - margin.bottom])
            .padding(0.3);

        data = dataset.data;
    }

    // 添加坐标轴
    if (currentDataset === 'gmv') {
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        // 添加柱形
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.year))
            .attr('y', d => yScale(d.gmv))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - margin.bottom - yScale(d.gmv))
            .attr('fill', (d, i) => colors[i % colors.length])
            .on('mouseover', function(event, d) {
                showTooltip(event, `${d.year}: ${d.gmv} 亿元`);
            })
            .on('mouseout', hideTooltip);
    } else if (currentDataset === 'online_shopping') {
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        // 添加水平条形
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', margin.left)
            .attr('y', d => yScale(d.category))
            .attr('width', d => xScale(d.rate) - margin.left)
            .attr('height', yScale.bandwidth())
            .attr('fill', (d, i) => colors[i % colors.length])
            .on('mouseover', function(event, d) {
                showTooltip(event, `${d.category}: ${(d.rate * 100).toFixed(1)}%`);
            })
            .on('mouseout', hideTooltip);
    }
}

// 渲染饼图
function renderPieChart(container, dataset, colors) {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width/2},${height/2})`);

    let pieData;
    if (currentDataset === 'alipay') {
        pieData = dataset.data;
    } else {
        return; // 其他数据集不支持饼图
    }

    const pie = d3.pie()
        .value(d => d.amount);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const arcs = svg.selectAll('arc')
        .data(pie(pieData))
        .enter()
        .append('g')
        .attr('class', 'pie-slice');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => colors[i % colors.length])
        .on('mouseover', function(event, d) {
            showTooltip(event, `${d.data.category}: ${d.data.amount}元 (${d.data.percentage}%)`);
        })
        .on('mouseout', hideTooltip);

    // 添加标签
    arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text(d => d.data.category.substring(0, 4));
}

// 渲染散点图
function renderScatterChart(container, dataset, colors) {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    if (currentDataset === 'car_braking') {
        const xScale = d3.scaleLinear()
            .domain([0, 110])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, 60])
            .range([height - margin.bottom, margin.top]);

        // 添加坐标轴
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d => d + ' km/h'));

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale).tickFormat(d => d + ' m'));

        // 添加散点
        svg.selectAll('.dot')
            .data(dataset.data)
            .enter()
            .append('circle')
            .attr('class', 'line-point')
            .attr('cx', d => xScale(d.speed))
            .attr('cy', d => yScale(d.distance))
            .attr('r', 6)
            .attr('fill', colors[0])
            .attr('opacity', 0.7)
            .on('mouseover', function(event, d) {
                showTooltip(event, `速度: ${d.speed} km/h<br>制动距离: ${d.distance} m`);
            })
            .on('mouseout', hideTooltip);
    }
}
        .attr('fill', (d, i) => colors[i % colors.length])
        .on('mouseover', function(event, d) {
            showTooltip(event, `${d.manufacturer || d.state}\nX: ${d.displ || d.assault}\nY: ${d.hwy || d.rape}`);
        })
        .on('mouseout', hideTooltip);
}

// 渲染面积图
function renderAreaChart(container, dataset, colors) {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    if (currentDataset === 'logistics') {
        const xScale = d3.scaleLinear()
            .domain([1, 12])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, 400])
            .range([height - margin.bottom, margin.top]);

        // 创建面积生成器
        const area = d3.area()
            .x((d, i) => xScale(i + 1))
            .y0(height - margin.bottom)
            .y1(d => yScale(d))
            .curve(d3.curveMonotoneX);

        // 添加堆积面积
        const companies = ['companyA', 'companyB', 'companyC'];
        let cumulative = Array(12).fill(0);

        companies.forEach((company, i) => {
            const data = dataset.data[company];
            
            svg.append('path')
                .datum(data)
                .attr('fill', colors[i])
                .attr('opacity', 0.7)
                .attr('d', area);

            // 添加折线
            const line = d3.line()
                .x((d, i) => xScale(i + 1))
                .y(d => yScale(d + cumulative[i]))
                .curve(d3.curveMonotoneX);

            svg.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', colors[i])
                .attr('stroke-width', 2)
                .attr('d', line);

            // 更新累积值
            cumulative = cumulative.map((val, idx) => val + data[idx]);
        });

        // 添加坐标轴
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d => d + '月'));

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));
    }
}

// 渲染雷达图
function renderRadarChart(container, dataset, colors) {
    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 30 };

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // 简化版雷达图 - 使用多边形表示
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // 创建雷达图背景
    const angles = [0, 90, 180, 270];
    const points = angles.map(angle => {
        const radian = angle * Math.PI / 180;
        return {
            x: centerX + radius * Math.cos(radian),
            y: centerY + radius * Math.sin(radian)
        };
    });

    // 添加雷达图网格
    svg.append('polygon')
        .attr('points', points.map(p => `${p.x},${p.y}`).join(' '))
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1);

    // 添加坐标轴
    angles.forEach((angle, i) => {
        const radian = angle * Math.PI / 180;
        const x = centerX + radius * Math.cos(radian);
        const y = centerY + radius * Math.sin(radian);
        
        svg.append('line')
            .attr('x1', centerX)
            .attr('y1', centerY)
            .attr('x2', x)
            .attr('y2', y)
            .attr('stroke', '#ccc')
            .attr('stroke-width', 1);
    });
}

// 显示工具提示
function showTooltip(event, content) {
    let tooltip = d3.select('.tooltip');
    if (tooltip.empty()) {
        tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);
    }

    tooltip.html(content)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px')
        .transition()
        .duration(200)
        .style('opacity', 1);
}

// 隐藏工具提示
function hideTooltip() {
    d3.select('.tooltip')
        .transition()
        .duration(200)
        .style('opacity', 0);
}

// 更新数据表格
function updateDataTable() {
    const container = document.getElementById('table-container');
    const dataset = datasets[currentDataset];
    
    let html = '<table><thead><tr>';
    
    if (currentDataset === 'temperature') {
        html += '<th>天数</th><th>最高温度</th><th>最低温度</th></tr></thead><tbody>';
        dataset.data.days.forEach((day, i) => {
            html += `<tr><td>${day}</td><td>${dataset.data.maxTemp[i]}°C</td><td>${dataset.data.minTemp[i]}°C</td></tr>`;
        });
    } else if (currentDataset === 'logistics') {
        html += '<th>月份</th><th>公司A</th><th>公司B</th><th>公司C</th></tr></thead><tbody>';
        dataset.data.months.forEach((month, i) => {
            html += `<tr><td>${month}月</td><td>${dataset.data.companyA[i]}</td><td>${dataset.data.companyB[i]}</td><td>${dataset.data.companyC[i]}</td></tr>`;
        });
    } else {
        const keys = Object.keys(dataset.data[0]);
        html += keys.map(key => `<th>${key}</th>`).join('') + '</tr></thead><tbody>';
        dataset.data.forEach(item => {
            html += '<tr>' + keys.map(key => {
                let value = item[key];
                if (key === 'gmv') value = value.toLocaleString() + ' 亿元';
                if (key === 'rate') value = (value * 100).toFixed(1) + '%';
                if (key === 'amount') value = value + ' 元';
                if (key === 'percentage') value = value + '%';
                if (key === 'distance') value = value + ' m';
                if (key === 'speed') value = value + ' km/h';
                return `<td>${value}</td>`;
            }).join('') + '</tr>';
        });
    }
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp);