// 网站健康检查脚本
class WebsiteHealthChecker {
    constructor() {
        this.checks = [
            this.checkChartJSLoad,
            this.checkImageLoad,
            this.checkConnectivity,
            this.checkPerformance
        ];
    }

    async runChecks() {
        const results = [];
        
        for (const check of this.checks) {
            try {
                const result = await check.call(this);
                results.push(result);
            } catch (error) {
                results.push({
                    name: check.name,
                    status: 'error',
                    message: error.message
                });
            }
        }
        
        return results;
    }

    async checkChartJSLoad() {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (typeof Chart !== 'undefined') {
                    resolve({
                        name: 'Chart.js加载',
                        status: 'success',
                        message: 'Chart.js库已成功加载'
                    });
                } else {
                    resolve({
                        name: 'Chart.js加载',
                        status: 'warning',
                        message: 'Chart.js库加载失败，使用备用方案'
                    });
                }
            }, 1000);
        });
    }

    async checkImageLoad() {
        const images = document.querySelectorAll('img');
        let loaded = 0;
        let failed = 0;

        const promises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    if (img.naturalHeight !== 0) loaded++;
                    else failed++;
                    resolve();
                } else {
                    img.addEventListener('load', () => {
                        loaded++;
                        resolve();
                    });
                    img.addEventListener('error', () => {
                        failed++;
                        resolve();
                    });
                }
            });
        });

        await Promise.all(promises);

        return {
            name: '图片加载',
            status: loaded === images.length ? 'success' : 'warning',
            message: `图片加载: ${loaded}/${images.length} 成功`
        };
    }

    async checkConnectivity() {
        const isOnline = navigator.onLine;
        return {
            name: '网络连接',
            status: isOnline ? 'success' : 'warning',
            message: isOnline ? '网络连接正常' : '当前处于离线状态'
        };
    }

    async checkPerformance() {
        const perf = performance.timing;
        const loadTime = perf.loadEventEnd - perf.navigationStart;
        
        return {
            name: '页面性能',
            status: loadTime < 3000 ? 'success' : loadTime < 5000 ? 'warning' : 'error',
            message: `页面加载时间: ${loadTime}ms`
        };
    }

    displayResults(results) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: white;
            border: 2px solid #333;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        const title = document.createElement('h3');
        title.textContent = '网站健康检查';
        title.style.margin = '0 0 10px 0';
        container.appendChild(title);

        results.forEach(result => {
            const div = document.createElement('div');
            div.style.cssText = `
                margin: 5px 0;
                padding: 5px;
                border-left: 3px solid ${
                    result.status === 'success' ? '#2ecc71' :
                    result.status === 'warning' ? '#f39c12' : '#e74c3c'
                };
            `;
            
            div.innerHTML = `
                <strong>${result.name}</strong><br>
                <span style="color: ${
                    result.status === 'success' ? '#27ae60' :
                    result.status === 'warning' ? '#f39c12' : '#e74c3c'
                };">${result.message}</span>
            `;
            
            container.appendChild(div);
        });

        document.body.appendChild(container);

        // 5秒后自动隐藏
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 5000);
    }
}

// 全局健康检查函数
window.runHealthCheck = function() {
    const checker = new WebsiteHealthChecker();
    checker.runChecks().then(results => {
        checker.displayResults(results);
    });
};

// 页面加载完成后自动运行健康检查
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(window.runHealthCheck, 2000);
    });
} else {
    setTimeout(window.runHealthCheck, 2000);
}