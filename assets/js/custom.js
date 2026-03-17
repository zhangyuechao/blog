// OpenClaw 博客高级动画效果

document.addEventListener('DOMContentLoaded', function() {
  // 1. 滚动显示动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 观察所有文章卡片
  document.querySelectorAll('article, .card, .card-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // 2. 添加 CSS 动画类
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    // 交错动画
    article:nth-child(1) { animation-delay: 0s; }
    article:nth-child(2) { animation-delay: 0.1s; }
    article:nth-child(3) { animation-delay: 0.2s; }
    article:nth-child(4) { animation-delay: 0.3s; }
    article:nth-child(5) { animation-delay: 0.4s; }
    article:nth-child(6) { animation-delay: 0.5s; }
  `;
  document.head.appendChild(style);

  // 3. 阅读进度条
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // 4. 鼠标跟随光效
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.1s ease;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // 5. 图片视差效果
  document.querySelectorAll('article img').forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // 6. 打字机效果 - 首页标题
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    setTimeout(typeWriter, 500);
  }

  // 7. 返回顶部按钮
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    z-index: 9997;
  `;
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.transform = 'translateY(0)';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.transform = 'translateY(20px)';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 8. 链接悬停音效（视觉反馈）
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // 9. 卡片3D倾斜效果
  document.querySelectorAll('.card, article').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  console.log('✨ OpenClaw 博客动画效果已加载');
});
