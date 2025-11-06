import matplotlib.pyplot as plt
import numpy as np
import os

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 创建charts目录
if not os.path.exists('charts'):
    os.makedirs('charts')

# 1. 温度变化折线图
plt.figure(figsize=(10, 6))
x = np.arange(4, 19)
y_max = np.array([32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31])
y_min = np.array([19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16])
plt.plot(x, y_max, label='最高温度', marker='o')
plt.plot(x, y_min, label='最低温度', marker='s')
plt.title('未来15天温度变化')
plt.xlabel('日期')
plt.ylabel('温度 (°C)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('charts/line_chart.png', dpi=300, bbox_inches='tight')
plt.close()

# 2. GMV柱形图
plt.figure(figsize=(10, 6))
x = np.arange(1, 8)
y = np.array([10770, 16780, 24440, 30920, 37670, 48200, 57270])
plt.bar(x, y, tick_label=["FY2013", "FY2014", "FY2015", "FY2016", "FY2017", "FY2018", "FY2019"], width=0.5)
plt.title('阿里巴巴GMV数据')
plt.ylabel('GMV (亿元)')
plt.grid(True, alpha=0.3)
plt.savefig('charts/bar_chart.png', dpi=300, bbox_inches='tight')
plt.close()

# 3. 网购替代率条形图
plt.figure(figsize=(12, 8))
x = np.array([0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863])
y = np.arange(1, 9)
labels = ["生活服务", "机票车票", "家具", "手机配件", "计算机", "汽车用品", "通信充值", "个人护理"]
plt.barh(y, x, tick_label=labels, align="center", height=0.6)
plt.title('网购替代率分析')
plt.xlabel('替代率')
plt.grid(True, alpha=0.3)
plt.savefig('charts/horizontal_bar_chart.png', dpi=300, bbox_inches='tight')
plt.close()

# 4. 物流费用面积图
plt.figure(figsize=(10, 6))
x = np.arange(1, 13)
y_a = np.array([198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290])
y_b = np.array([203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368])
y_c = np.array([185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288])
plt.stackplot(x, y_a, y_b, y_c, labels=['公司A', '公司B', '公司C'])
plt.title('物流费用统计')
plt.xlabel('月份')
plt.ylabel('费用 (万元)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('charts/area_chart.png', dpi=300, bbox_inches='tight')
plt.close()

# 5. 支付宝账单饼图
plt.figure(figsize=(10, 8))
kinds = ['购物', '人情往来', '餐饮美食', '通信物流', '生活日用', '交通出行', '休闲娱乐', '其他']
money = [800, 100, 1000, 200, 300, 200, 200, 200]
colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#ffb3e6', '#c4e17f', '#ffd700']
plt.pie(money, labels=kinds, autopct='%1.1f%%', colors=colors, startangle=90)
plt.title('支付宝月账单')
plt.savefig('charts/pie_chart.png', dpi=300, bbox_inches='tight')
plt.close()

# 6. 制动距离散点图
plt.figure(figsize=(10, 6))
x_speed = np.arange(10, 110, 10)
y_distance = np.array([0.5, 2.0, 4.4, 7.9, 12.3, 17.7, 24.1, 31.5, 39.9, 49.2])
plt.scatter(x_speed, y_distance, s=100, alpha=0.7)
plt.title('速度与制动距离关系')
plt.xlabel('速度 (km/h)')
plt.ylabel('制动距离 (m)')
plt.grid(True, alpha=0.3)
plt.savefig('charts/scatter_chart.png', dpi=300, bbox_inches='tight')
plt.close()

# 7. 成绩分布直方图
plt.figure(figsize=(10, 6))
scores = np.random.randint(0, 100, 68)
bins = [0, 20, 40, 60, 80, 100]
plt.hist(scores, bins=bins, edgecolor='black', alpha=0.7)
plt.title('成绩分布直方图')
plt.xlabel('分数区间')
plt.ylabel('学生人数')
plt.grid(True, alpha=0.3)
plt.savefig('charts/histogram_chart.png', dpi=300, bbox_inches='tight')
plt.close()

# 8. 发电量箱形图
plt.figure(figsize=(10, 6))
data_2018 = np.array([5200, 5254.5, 5283.4, 5107.8, 5443.3, 5550.6, 6400.2, 6404.9, 5483.1, 5330.2, 5543, 6199.9])
data_2017 = np.array([4605.2, 4710.3, 5168.9, 4767.2, 4947, 5203, 6047.4, 5945.5, 5219.6, 5038.1, 5196.3, 5698.6])
plt.boxplot([data_2018, data_2017], labels=('2018年', '2017年'), patch_artist=True)
plt.title('发电量统计箱形图')
plt.ylabel('发电量 (万千瓦时)')
plt.grid(True, alpha=0.3)
plt.savefig('charts/box_plot.png', dpi=300, bbox_inches='tight')
plt.close()

# 9. 职业兴趣雷达图
plt.figure(figsize=(10, 8))
dim_num = 6
data = np.array([0.40, 0.32, 0.35, 0.30, 0.30, 0.88])
angles = np.linspace(0, 2 * np.pi, dim_num, endpoint=False)
angles = np.concatenate((angles, [angles[0]]))
data = np.concatenate((data, [data[0]]))
radar_labels = ['研究型', '艺术型', '社会型', '企业型', '传统型', '现实型']
radar_labels = np.concatenate((radar_labels, [radar_labels[0]]))
ax = plt.subplot(111, polar=True)
ax.plot(angles, data, 'o-', linewidth=2)
ax.fill(angles, data, alpha=0.25)
ax.set_thetagrids(angles * 180/np.pi, radar_labels)
plt.title('职业兴趣测试')
plt.savefig('charts/radar_chart.png', dpi=300, bbox_inches='tight')
plt.close()

# 10. 生物量误差棒图
plt.figure(figsize=(10, 6))
x = np.arange(3)
y1 = np.array([2.04, 1.57, 1.63])
y2 = np.array([1.69, 1.61, 1.64])
y3 = np.array([4.65, 4.99, 4.94])
y4 = np.array([3.39, 2.33, 4.10])
error1 = [0.16, 0.08, 0.10]
error2 = [0.27, 0.14, 0.14]
error3 = [0.34, 0.32, 0.29]
error4 = [0.23, 0.23, 0.39]
bar_width = 0.15
plt.bar(x - 1.5*bar_width, y1, bar_width, label='树种A', yerr=error1, capsize=5)
plt.bar(x - 0.5*bar_width, y2, bar_width, label='树种B', yerr=error2, capsize=5)
plt.bar(x + 0.5*bar_width, y3, bar_width, label='树种C', yerr=error3, capsize=5)
plt.bar(x + 1.5*bar_width, y4, bar_width, label='树种D', yerr=error4, capsize=5)
plt.xticks(x, ["春季", "夏季", "秋季"])
plt.title('细根生物量误差棒图')
plt.ylabel('生物量 (g/m²)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('charts/errorbar_chart.png', dpi=300, bbox_inches='tight')
plt.close()

print("所有图表已生成完成！")