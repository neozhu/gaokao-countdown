const CACHE_NAME = 'gaokao-countdown-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

const DYNAMIC_CACHE_URLS = [
  '/api/quote',
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// 获取事件 - 网络优先，缓存回退策略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url, method } = request;

  // 只处理 GET 请求
  if (method !== 'GET') {
    return;
  }

  // 跳过非同源请求
  if (!url.startsWith(self.location.origin)) {
    return;
  }

  // API 请求策略：网络优先，缓存回退
  if (url.includes('/api/')) {
    event.respondWith(
      networkFirstStrategy(request)
    );
    return;
  }

  // 静态资源策略：缓存优先，网络回退
  if (isStaticResource(url)) {
    event.respondWith(
      cacheFirstStrategy(request)
    );
    return;
  }

  // 页面请求策略：网络优先，缓存回退
  event.respondWith(
    networkFirstStrategy(request)
  );
});

// 网络优先策略
async function networkFirstStrategy(request) {
  try {
    // 尝试从网络获取
    const networkResponse = await fetch(request);
    
    // 成功则缓存并返回
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache', error);
    
    // 网络失败，尝试从缓存获取
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 如果是页面请求且缓存中没有，返回离线页面
    if (request.mode === 'navigate') {
      return caches.match('/');
    }
    
    // 其他情况返回网络错误
    throw error;
  }
}

// 缓存优先策略
async function cacheFirstStrategy(request) {
  // 先尝试从缓存获取
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // 缓存中没有，从网络获取
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Failed to fetch from network', error);
    throw error;
  }
}

// 判断是否为静态资源
function isStaticResource(url) {
  const staticExtensions = ['.js', '.css', '.ico', '.png', '.jpg', '.jpeg', '.svg', '.woff', '.woff2'];
  return staticExtensions.some(ext => url.includes(ext));
}

// 后台同步事件
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-quote-sync') {
    event.waitUntil(syncQuotes());
  }
});

// 同步语录数据
async function syncQuotes() {
  try {
    console.log('Service Worker: Syncing quotes in background');
    
    const response = await fetch('/api/quote?category=motivation');
    
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put('/api/quote?category=motivation', response.clone());
      console.log('Service Worker: Quotes synced successfully');
    }
  } catch (error) {
    console.error('Service Worker: Failed to sync quotes', error);
  }
}

// 推送通知事件
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || '高考倒计时提醒',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'gaokao-reminder',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: '查看详情',
        icon: '/favicon.ico'
      },
      {
        action: 'close',
        title: '关闭',
        icon: '/favicon.ico'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('高考倒计时', options)
  );
});

// 通知点击事件
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 消息事件 - 与主线程通信
self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_QUOTE':
      if (data?.quote) {
        cacheQuote(data.quote);
      }
      break;
      
    case 'GET_CACHE_SIZE':
      getCacheSize().then((size) => {
        event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
      });
      break;
      
    case 'CLEAR_CACHE':
      clearCache().then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
      break;
  }
});

// 缓存语录
async function cacheQuote(quote) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const quoteResponse = new Response(JSON.stringify(quote), {
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(`/api/quote/${quote.id}`, quoteResponse);
  } catch (error) {
    console.error('Service Worker: Failed to cache quote', error);
  }
}

// 获取缓存大小
async function getCacheSize() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    return keys.length;
  } catch (error) {
    console.error('Service Worker: Failed to get cache size', error);
    return 0;
  }
}

// 清理缓存
async function clearCache() {
  try {
    await caches.delete(CACHE_NAME);
    console.log('Service Worker: Cache cleared');
  } catch (error) {
    console.error('Service Worker: Failed to clear cache', error);
  }
}
