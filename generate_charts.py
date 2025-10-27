import matplotlib.pyplot as plt
import numpy as np
import os

# 创建输出目录
if not os.path.exists('charts'):
    os.makedirs('charts')

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 单组柱形图 - 电商平台5个品类月销售额
def create_bar_chart():
    categories = ['电子产品', '服装鞋帽', '家居百货', '美妆个护', '食品生鲜']
    sales = [550, 420, 280, 390, 610]
    
    plt.figure(figsize=(10, 6))
    bars = plt.bar(categories, sales, color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'])
    
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height,
                f'{height}万', ha='center', va='bottom')
    
    plt.title('电商平台各品类月销售额统计', fontsize=14, fontweight='bold')
    plt.xlabel('商品品类')
    plt.ylabel('销售额 (万元)')
    plt.grid(axis='y', alpha=0.3)
    plt.tight_layout()
    plt.savefig('charts/bar_chart.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("✓ 柱形图已保存为 charts/bar_chart.png")

# 2. 多组条形图 - 4个城市两个季度的人均消费支出
def create_grouped_bar_chart():
    cities = ['北京', '上海', '广州', '深圳']
    q1_spend = [12000, 11500, 9800, 10500]
    q2_spend = [13500, 12800, 10900, 11900]
    
    y_pos = np.arange(len(cities))
    bar_height = 0.35
    
    plt.figure(figsize=(10, 6))
    bars1 = plt.barh(y_pos - bar_height/2, q1_spend, bar_height, 
                     label='第一季度', color='#3498db', alpha=0.8)
    bars2 = plt.barh(y_pos + bar_height/2, q2_spend, bar_height, 
                     label='第二季度', color='#e74c3c', alpha=0.8)
    
    for bars in [bars1, bars2]:
        for bar in bars:
            width = bar.get_width()
            plt.text(width + 100, bar.get_y() + bar.get_height()/2,
                    f'{width}元', ha='left', va='center', fontsize=9)
    
    plt.yticks(y_pos, cities)
    plt.title('四个城市两个季度人均消费支出对比', fontsize=14, fontweight='bold')
    plt.xlabel('消费支出 (元)')
    plt.ylabel('城市')
    plt.legend()
    plt.grid(axis='x', alpha=0.3)
    plt.tight_layout()
    plt.savefig('charts/grouped_bar_chart.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("✓ 多组条形图已保存为 charts/grouped_bar_chart.png")

# 3. 箱形图 - 三组不同工艺下生产零件的质量分布
def create_box_plot():
    np.random.seed(42)
    data_a = np.random.normal(100, 5, 50)
    data_b = np.random.normal(105, 3, 50)
    data_c = np.random.normal(95, 8, 48)
    data_c = np.append(data_c, [130, 60])
    
    data = [data_a, data_b, data_c]
    labels = ['工艺A', '工艺B', '工艺C']
    
    plt.figure(figsize=(10, 6))
    box_plot = plt.boxplot(data, labels=labels, patch_artist=True,
                          showmeans=True, meanline=True,
                          meanprops={'color': 'red', 'linewidth': 1.5},
                          medianprops={'color': 'blue', 'linewidth': 2})
    
    colors = ['#FF9999', '#99FF99', '#9999FF']
    for patch, color in zip(box_plot['boxes'], colors):
        patch.set_facecolor(color)
        patch.set_alpha(0.7)
    
    plt.title('不同生产工艺下零件质量分布箱形图', fontsize=14, fontweight='bold')
    plt.xlabel('生产工艺')
    plt.ylabel('零件质量 (克)')
    plt.grid(axis='y', alpha=0.3)
    plt.tight_layout()
    plt.savefig('charts/box_plot.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("✓ 箱形图已保存为 charts/box_plot.png")

if __name__ == "__main__":
    print("正在生成前三个Matplotlib图表...")
    create_bar_chart()
    create_grouped_bar_chart()
    create_box_plot()
    print("\n所有图表已生成完成！")
    print("请查看 charts/ 目录下的图片文件：")
    print("- bar_chart.png (单组柱形图)")
    print("- grouped_bar_chart.png (多组条形图)")
    print("- box_plot.png (箱形图)")