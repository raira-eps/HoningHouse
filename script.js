// AOSアニメーションの初期化
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// 画像の読み込み完了を待つ関数
function waitForImages(selector, callback) {
  const images = document.querySelectorAll(selector);
  let loadedImages = 0;
  
  images.forEach(img => {
    if (img.complete) {
      loadedImages++;
    } else {
      img.addEventListener('load', () => {
        loadedImages++;
        if (loadedImages === images.length) {
          callback();
        }
      });
    }
  });
  
  if (loadedImages === images.length) {
    callback();
  }
}

// スワイパーの初期化
document.addEventListener('DOMContentLoaded', function() {
  // ギャラリー画像の読み込みを待つ
  waitForImages('.gallery-swiper img', function() {
    const gallerySwiper = new Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
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
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      preloadImages: true,
      lazy: true,
      on: {
        init: function() {
          // Lightbox機能の実装
          const lightbox = document.getElementById('imageLightbox');
          const lightboxImg = document.getElementById('lightboxImage');
          const closeBtn = document.querySelector('.lightbox-close');
          const gallerySection = document.querySelector('.gallery');

          // 画像クリック時の処理
          const slides = document.querySelectorAll('.gallery-swiper .swiper-slide');
          slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
              slide.addEventListener('click', function(e) {
                e.preventDefault();
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                
                // ギャラリーセクションの位置に合わせて表示
                const galleryRect = gallerySection.getBoundingClientRect();
                lightbox.style.top = `${galleryRect.top + window.scrollY}px`;
                lightbox.style.height = `${galleryRect.height}px`;
                
                // 自動再生を一時停止
                gallerySwiper.autoplay.stop();
              });
            }
          });

          // 閉じるボタンクリック時の処理
          closeBtn.addEventListener('click', function() {
            lightbox.classList.remove('active');
            // 自動再生を再開
            gallerySwiper.autoplay.start();
          });

          // モーダル外クリック時の処理
          lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
              lightbox.classList.remove('active');
              // 自動再生を再開
              gallerySwiper.autoplay.start();
            }
          });

          // ESCキー押下時の処理
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
              lightbox.classList.remove('active');
              // 自動再生を再開
              gallerySwiper.autoplay.start();
            }
          });
        }
      }
    });
  });
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