// 服务工作者 - 离线缓存策略
const CACHE_NAME = 'datavis-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/chapter2-visualization.html',
  '/charts/line_chart.png',
  '/charts/bar_chart.png',
  '/charts/horizontal_bar_chart.png',
  '/charts/area_chart.png',
  '/charts/pie_chart.png',
  '/charts/scatter_chart.png',
  '/charts/histogram_chart.png',
  '/charts/box_plot.png',
  '/charts/radar_chart.png',
  '/charts/errorbar_chart.png',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://unpkg.com/chart.js'
];

// 安装阶段 - 缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('缓存失败:', error);
      })
  );
});

// 激活阶段 - 清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求 - 缓存优先策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 返回缓存或网络请求
        return response || fetch(event.request);
      })
      .catch(() => {
        // 网络失败时返回离线页面
        return caches.match('/index.html');
      })
  );
});