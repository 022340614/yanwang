import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号

# 1. 单组柱形图 - 电商平台5个品类月销售额
def exercise1():
    categories = ['电子产品', '服装鞋帽', '家居百货', '美妆个护', '食品生鲜']
    sales = [550, 420, 280, 390, 610]  # 万元
    
    plt.figure(figsize=(10, 6))
    bars = plt.bar(categories, sales, color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'])
    
    # 添加数值标签
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height,
                f'{height}万', ha='center', va='bottom')
    
    plt.title('电商平台各品类月销售额统计', fontsize=14, fontweight='bold')
    plt.xlabel('商品品类')
    plt.ylabel('销售额 (万元)')
    plt.grid(axis='y', alpha=0.3)
    plt.tight_layout()
    plt.show()

# 2. 多组条形图 - 4个城市两个季度的人均消费支出
def exercise2():
    cities = ['北京', '上海', '广州', '深圳']
    q1_spend = [12000, 11500, 9800, 10500]  # 元
    q2_spend = [13500, 12800, 10900, 11900]  # 元
    
    y_pos = np.arange(len(cities))
    bar_height = 0.35
    
    plt.figure(figsize=(10, 6))
    bars1 = plt.barh(y_pos - bar_height/2, q1_spend, bar_height, 
                     label='第一季度', color='#3498db', alpha=0.8)
    bars2 = plt.barh(y_pos + bar_height/2, q2_spend, bar_height, 
                     label='第二季度', color='#e74c3c', alpha=0.8)
    
    # 添加数值标签
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
    plt.show()

# 3. 箱形图 - 三组不同工艺下生产零件的质量分布
def exercise3():
    # 生成模拟数据
    np.random.seed(42)
    data_a = np.random.normal(100, 5, 50)  # 工艺A
    data_b = np.random.normal(105, 3, 50)  # 工艺B
    data_c = np.random.normal(95, 8, 48)  # 工艺C
    data_c = np.append(data_c, [130, 60])  # 添加异常值
    
    data = [data_a, data_b, data_c]
    labels = ['工艺A', '工艺B', '工艺C']
    
    plt.figure(figsize=(10, 6))
    box_plot = plt.boxplot(data, labels=labels, patch_artist=True,
                          showmeans=True, meanline=True,
                          meanprops={'color': 'red', 'linewidth': 1.5},
                          medianprops={'color': 'blue', 'linewidth': 2})
    
    # 设置箱体颜色
    colors = ['#FF9999', '#99FF99', '#9999FF']
    for patch, color in zip(box_plot['boxes'], colors):
        patch.set_facecolor(color)
        patch.set_alpha(0.7)
    
    plt.title('不同生产工艺下零件质量分布箱形图', fontsize=14, fontweight='bold')
    plt.xlabel('生产工艺')
    plt.ylabel('零件质量 (克)')
    plt.grid(axis='y', alpha=0.3)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    print("选择要运行的图表:")
    print("1. 单组柱形图 - 电商平台销售额")
    print("2. 多组条形图 - 城市消费支出对比")  
    print("3. 箱形图 - 零件质量分布")
    print("4. 运行所有图表")
    
    choice = input("请输入选择 (1-4): ")
    
    if choice == '1':
        exercise1()
    elif choice == '2':
        exercise2()
    elif choice == '3':
        exercise3()
    elif choice == '4':
        exercise1()
        exercise2()
        exercise3()
    else:
        print("无效选择")