# GitHub上传指南

## 方法一：通过GitHub网页直接上传（推荐新手）

### 步骤1：创建GitHub仓库
1. 访问 https://github.com
2. 登录您的GitHub账号
3. 点击右上角"+" → "New repository"
4. 填写仓库信息：
   - **Repository name**: `datavis24`
   - **Description**: `数据可视化项目 - 包含9个章节的matplotlib和pyecharts教程`
   - **Visibility**: 选择"Public"（公开）
   - 勾选"Add a README file"
   - 点击"Create repository"

### 步骤2：上传项目文件
1. 在新建的仓库页面，点击"Add file" → "Upload files"
2. 打开文件资源管理器，导航到 `d:\D盘\datavis24`
3. 选择所有文件和文件夹：
   - 9个 `.ipynb` 文件
   - `素材` 文件夹
   - `README.md` 文件
4. 拖拽到GitHub上传区域
5. 填写提交信息："Initial commit: Complete data visualization project"
6. 点击"Commit changes"

## 方法二：使用Git命令行（如果已安装Git）

### 步骤1：初始化Git仓库
```bash
cd d:\D盘\datavis24
git init
git add .
git commit -m "Initial commit: Data visualization project with 9 chapters"
```

### 步骤2：连接到GitHub
```bash
git remote add origin https://github.com/你的用户名/datavis24.git
git push -u origin main
```

## 方法三：使用GitHub Desktop

### 步骤1：下载GitHub Desktop
- 访问 https://desktop.github.com/
- 下载并安装GitHub Desktop

### 步骤2：设置仓库
1. 打开GitHub Desktop
2. 点击"File" → "Add Local Repository"
3. 选择项目文件夹 `d:\D盘\datavis24`
4. 点击"Create Repository"

### 步骤3：发布到GitHub
1. 填写提交信息
2. 点击"Commit to main"
3. 点击"Publish repository"
4. 输入仓库名称和描述
5. 点击"Publish Repository"

## 项目结构说明

```
datavis24/
├── 第1章.ipynb          # matplotlib基础图表绘制
├── 第2章.ipynb          # 各种图表类型详解
├── 第3章.ipynb          # 图表样式和美化
├── 第4章.ipynb          # 高级可视化技巧
├── 第5章.ipynb          # 交互式可视化
├── 第6章.ipynb          # 数据预处理与可视化
├── 第7章.ipynb          # 多图表组合
├── 第8章.ipynb          # 实际应用案例
├── 第9章.ipynb          # 项目总结与扩展
├── 素材/                # 数据文件
│   ├── 2014_us_cities.csv
│   ├── health.xlsx
│   ├── mpg_ggplot2.csv
│   ├── population.xlsx
│   ├── USArrests.csv
│   └── USArrests.xlsx
├── README.md            # 项目说明文档
└── GITHUB_UPLOAD_GUIDE.md  # 本指南
```

## 注意事项

1. **文件编码**: 确保所有文件使用UTF-8编码
2. **数据文件**: 素材文件夹包含所有必要的数据文件
3. **依赖包**: 项目需要安装以下Python包：
   ```bash
   pip install numpy matplotlib jupyter pandas openpyxl pyecharts
   ```
4. **Jupyter Notebook**: 建议使用Jupyter Lab或Jupyter Notebook打开文件

## 成功验证

上传完成后，您的GitHub仓库应该包含：
- ✅ 9个Jupyter Notebook文件
- ✅ 素材文件夹（6个数据文件）
- ✅ README.md文档
- ✅ 项目能够正常运行

## 问题解决

如果遇到问题：
1. **文件太大**: GitHub单个文件限制100MB，本项目文件都很小
2. **权限问题**: 确保您有GitHub仓库的写入权限
3. **网络问题**: 检查网络连接，或尝试使用GitHub Desktop

## 联系方式

如有问题，可以通过GitHub Issues提交问题。