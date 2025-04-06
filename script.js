// AOSアニメーションの初期化
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// スワイパーの初期化
const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// スクロール時のナビゲーションバーの挙動
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > lastScrollTop) {
    navbar.style.transform = 'translateY(-100px)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// サービスカードのホバーアニメーション
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// スクロール監視の設定
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

// セクションの表示制御
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // 一度表示したセクションは監視を停止
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 各セクションを監視対象に追加
sections.forEach(section => {
  observer.observe(section);
});

// スクロールイベントの最適化
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // スクロール時の処理をここに記述
      ticking = false;
    });
    ticking = true;
  }
});

// 初期表示時にヒーローセクションを表示
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('visible');
  }
}); 