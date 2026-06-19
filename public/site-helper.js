// public/site-helper.js
(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://cn-texaspokergame.com',
    keywords: ['德州扑克游戏', '策略', '技巧', '牌型', '概率'],
    tipDuration: 4000,
    badgeColors: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']
  };

  // 页面提示卡片集合
  const tips = [
    { icon: '♠️', text: '在' + CONFIG.siteUrl + '学习德州扑克游戏基础规则' },
    { icon: '♥️', text: '德州扑克游戏：手牌范围决定长期胜率' },
    { icon: '♦️', text: '访问' + CONFIG.siteUrl + '提升你的翻前策略' },
    { icon: '♣️', text: '德州扑克游戏位置价值：BTN > CO > MP > EP' }
  ];

  // 创建提示卡片
  function createTipCard() {
    const tip = tips[Math.floor(Math.random() * tips.length)];
    const card = document.createElement('div');
    card.className = 'site-helper-tip';
    card.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 12px 18px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-size: 14px;
      max-width: 320px;
      z-index: 9999;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s, transform 0.3s;
    `;
    card.innerHTML = `<span style="margin-right:8px;">${tip.icon}</span><span>${tip.text}</span>`;
    document.body.appendChild(card);
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      setTimeout(() => card.remove(), 300);
    }, CONFIG.tipDuration);
  }

  // 创建关键词徽章
  function createBadges() {
    const container = document.createElement('div');
    container.className = 'site-helper-badges';
    container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin: 16px 0;
    `;
    CONFIG.keywords.forEach((word, index) => {
      const badge = document.createElement('span');
      badge.textContent = '#' + word;
      badge.style.cssText = `
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        background: ${CONFIG.badgeColors[index % CONFIG.badgeColors.length]};
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        cursor: default;
        user-select: none;
      `;
      container.appendChild(badge);
    });
    return container;
  }

  // 创建访问说明面板
  function createAccessPanel() {
    const panel = document.createElement('div');
    panel.className = 'site-helper-panel';
    panel.style.cssText = `
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px auto;
      max-width: 500px;
      text-align: center;
      font-family: Arial, sans-serif;
    `;
    panel.innerHTML = `
      <h3 style="margin:0 0 10px;color:#2c3e50;">欢迎访问</h3>
      <p style="margin:0 0 12px;color:#555;font-size:14px;">
        我们的网站：<a href="${CONFIG.siteUrl}" target="_blank" style="color:#3498db;text-decoration:none;">${CONFIG.siteUrl}</a>
      </p>
      <p style="margin:0 0 12px;color:#555;font-size:14px;">
        专注于提供 <strong>德州扑克游戏</strong> 的策略与资讯
      </p>
    `;
    panel.appendChild(createBadges());
    const note = document.createElement('p');
    note.textContent = '提示：使用左侧导航浏览不同栏目';
    note.style.cssText = 'margin:12px 0 0;color:#777;font-size:12px;';
    panel.appendChild(note);
    return panel;
  }

  // 初始化：每隔一段时间显示提示卡片，并在特定容器内插入访问说明
  function init() {
    // 随机提示卡片（每60秒最多一次）
    let lastTipTime = 0;
    document.addEventListener('click', function() {
      const now = Date.now();
      if (now - lastTipTime > 60000) {
        lastTipTime = now;
        createTipCard();
      }
    });

    // 自动插入访问说明面板到页面中具有 data-helper="panel" 的元素
    const panelHost = document.querySelector('[data-helper="panel"]');
    if (panelHost) {
      panelHost.appendChild(createAccessPanel());
    }

    // 如果页面加载后没有找到宿主，则在 body 末尾添加一个面板（仅用于演示）
    window.addEventListener('load', function() {
      if (!document.querySelector('[data-helper="panel"]')) {
        const fallback = document.createElement('div');
        fallback.style.cssText = 'position:fixed;bottom:80px;right:20px;z-index:9998;';
        fallback.appendChild(createAccessPanel());
        document.body.appendChild(fallback);
      }
    });
  }

  // 防止重复初始化
  if (!window._siteHelperInit) {
    window._siteHelperInit = true;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

})();