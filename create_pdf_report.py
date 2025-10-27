from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# 注册中文字体（使用系统默认字体）
try:
    # 尝试注册常见的中文字体
    pdfmetrics.registerFont(TTFont('SimHei', 'simhei.ttf'))
except:
    try:
        pdfmetrics.registerFont(TTFont('SimHei', 'C:/Windows/Fonts/simhei.ttf'))
    except:
        print("警告：无法找到SimHei字体，将使用默认字体")

def create_pdf_with_charts():
    # 创建PDF文档
    doc = SimpleDocTemplate("matplotlib_charts_report.pdf", pagesize=A4)
    story = []
    
    # 获取样式
    styles = getSampleStyleSheet()
    
    # 创建标题样式
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        spaceAfter=12,
        alignment=1  # 居中
    )
    
    # 创建副标题样式
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        spaceAfter=6,
        alignment=1  # 居中
    )
    
    # 添加主标题
    title = Paragraph("Matplotlib 图表练习报告", title_style)
    story.append(title)
    story.append(Spacer(1, 20))
    
    # 图表1：单组柱形图
    story.append(Paragraph("1. 单组柱形图 - 电商平台各品类月销售额统计", subtitle_style))
    story.append(Spacer(1, 10))
    
    if os.path.exists('charts/bar_chart.png'):
        img = Image('charts/bar_chart.png', width=6*inch, height=4*inch)
        story.append(img)
        story.append(Spacer(1, 15))
    
    # 图表2：多组条形图
    story.append(Paragraph("2. 多组条形图 - 四个城市两个季度人均消费支出对比", subtitle_style))
    story.append(Spacer(1, 10))
    
    if os.path.exists('charts/grouped_bar_chart.png'):
        img = Image('charts/grouped_bar_chart.png', width=6*inch, height=4*inch)
        story.append(img)
        story.append(Spacer(1, 15))
    
    # 图表3：箱形图
    story.append(Paragraph("3. 箱形图 - 不同生产工艺下零件质量分布", subtitle_style))
    story.append(Spacer(1, 10))
    
    if os.path.exists('charts/box_plot.png'):
        img = Image('charts/box_plot.png', width=6*inch, height=4*inch)
        story.append(img)
        story.append(Spacer(1, 15))
    
    # 添加说明
    story.append(Spacer(1, 20))
    note_style = ParagraphStyle(
        'NoteStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor='gray'
    )
    note = Paragraph("注：本报告包含根据PDF要求生成的三个Matplotlib图表练习", note_style)
    story.append(note)
    
    # 生成PDF
    doc.build(story)
    print("PDF报告已生成：matplotlib_charts_report.pdf")

if __name__ == "__main__":
    # 检查图表文件是否存在
    chart_files = ['charts/bar_chart.png', 'charts/grouped_bar_chart.png', 'charts/box_plot.png']
    missing_files = [f for f in chart_files if not os.path.exists(f)]
    
    if missing_files:
        print("警告：以下图表文件不存在：")
        for f in missing_files:
            print(f"  - {f}")
        print("请先运行 generate_charts.py 生成图表文件")
    else:
        create_pdf_with_charts()
        print("PDF创建完成！")