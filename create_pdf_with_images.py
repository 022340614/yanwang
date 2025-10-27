from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from PIL import Image as PILImage
import os

def create_pdf():
    # 创建PDF文档
    doc = SimpleDocTemplate("charts_report.pdf", pagesize=A4)
    story = []
    
    # 获取样式
    styles = getSampleStyleSheet()
    
    # 创建标题样式
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=colors.darkblue,
        spaceAfter=30,
        alignment=1  # 居中
    )
    
    # 创建图表标题样式
    chart_title_style = ParagraphStyle(
        'ChartTitleStyle',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.darkred,
        spaceAfter=10,
        alignment=0  # 左对齐
    )
    
    # 添加主标题
    title = Paragraph("Matplotlib 图表练习报告", title_style)
    story.append(title)
    story.append(Spacer(1, 20))
    
    # 检查图表文件并添加
    chart_files = [
        ('charts/bar_chart.png', '1. 单组柱形图 - 电商平台各品类月销售额统计'),
        ('charts/grouped_bar_chart.png', '2. 多组条形图 - 四个城市两个季度人均消费支出对比'),
        ('charts/box_plot.png', '3. 箱形图 - 不同生产工艺下零件质量分布')
    ]
    
    for chart_file, title_text in chart_files:
        if os.path.exists(chart_file):
            # 添加图表标题
            chart_title = Paragraph(title_text, chart_title_style)
            story.append(chart_title)
            story.append(Spacer(1, 10))
            
            # 调整图片大小以适应页面
            try:
                # 使用PIL获取图片尺寸
                with PILImage.open(chart_file) as img:
                    width, height = img.size
                
                # 计算缩放比例以适应页面宽度
                max_width = 6 * inch
                scale_factor = min(max_width / width, 1.0)
                img_width = width * scale_factor
                img_height = height * scale_factor
                
                # 添加图片
                img = Image(chart_file, width=img_width, height=img_height)
                story.append(img)
                story.append(Spacer(1, 20))
                
            except Exception as e:
                print(f"处理图片 {chart_file} 时出错: {e}")
                # 添加错误信息
                error_style = ParagraphStyle(
                    'ErrorStyle',
                    parent=styles['Normal'],
                    fontSize=10,
                    textColor=colors.red
                )
                error_msg = Paragraph(f"无法加载图片: {chart_file}", error_style)
                story.append(error_msg)
                story.append(Spacer(1, 20))
        else:
            print(f"图表文件不存在: {chart_file}")
    
    # 添加页脚说明
    footer_style = ParagraphStyle(
        'FooterStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.gray,
        alignment=1  # 居中
    )
    footer = Paragraph("生成时间: 2025年 - Matplotlib图表练习", footer_style)
    story.append(Spacer(1, 30))
    story.append(footer)
    
    # 生成PDF
    try:
        doc.build(story)
        print("PDF报告已成功生成: charts_report.pdf")
        return True
    except Exception as e:
        print(f"生成PDF时出错: {e}")
        return False

def create_simple_pdf():
    """创建一个更简单的PDF版本"""
    c = canvas.Canvas("simple_charts_report.pdf", pagesize=A4)
    width, height = A4
    
    # 添加标题
    c.setFont("Helvetica-Bold", 18)
    c.drawString(100, height - 50, "Matplotlib 图表练习报告")
    
    y_position = height - 100
    
    # 添加图表
    chart_files = [
        ('charts/bar_chart.png', '1. 单组柱形图'),
        ('charts/grouped_bar_chart.png', '2. 多组条形图'),
        ('charts/box_plot.png', '3. 箱形图')
    ]
    
    for chart_file, title in chart_files:
        if os.path.exists(chart_file):
            # 添加标题
            c.setFont("Helvetica-Bold", 14)
            c.drawString(100, y_position, title)
            y_position -= 20
            
            try:
                # 添加图片
                c.drawImage(chart_file, 100, y_position - 200, width=400, height=200)
                y_position -= 250
            except:
                c.setFont("Helvetica", 10)
                c.drawString(100, y_position - 100, f"无法加载图片: {chart_file}")
                y_position -= 120
        
        # 检查是否需要新页面
        if y_position < 100:
            c.showPage()
            y_position = height - 50
    
    c.save()
    print("简单版PDF报告已生成: simple_charts_report.pdf")

if __name__ == "__main__":
    print("正在生成PDF报告...")
    
    # 检查图表文件是否存在
    chart_files_exist = all(os.path.exists(f) for f in ['charts/bar_chart.png', 'charts/grouped_bar_chart.png', 'charts/box_plot.png'])
    
    if not chart_files_exist:
        print("警告：图表文件不存在，请先运行 generate_charts.py")
        # 重新生成图表
        print("正在重新生成图表文件...")
        os.system("python generate_charts.py")
    
    # 生成PDF
    if create_pdf():
        print("PDF生成成功！")
    else:
        print("尝试生成简单版PDF...")
        create_simple_pdf()