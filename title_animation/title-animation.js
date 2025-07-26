/**
 * Title Animation - Hiệu ứng animation cho tiêu đề
 * Tạo hiệu ứng 3D spread animation cho các ký tự trong tiêu đề
 */
class TitleAnimation {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.options = {
            duration: options.duration || 1.2,
            ease: options.ease || 'cubic-bezier(0.31, 0.13, 0.11, 1)',
            spreadX: options.spreadX || 200,
            spreadY: options.spreadY || 60,
            rotationY: options.rotationY || -270,
            rotationZ: options.rotationZ || 8,
            perspective: options.perspective || 1000,
            trigger: options.trigger || 'scroll', // 'scroll', 'load', hoặc 'scrollWheel'
            reverse: options.reverse || false, // true = tập hợp lại, false = lan tỏa ra
            scrollWheelTrigger: options.scrollWheelTrigger || false, // true = trigger theo scroll wheel
            ...options
        };
        
        this.isAnimating = false;
        this.init();
    }

    init() {
        if (!this.element) {
            console.error('TitleAnimation: Element not found');
            return;
        }

        // Tách text thành các từ và ký tự
        this.prepareText();
        
        // Thêm CSS styles
        this.addStyles();
        
        // Khởi tạo animation
        if (this.options.trigger === 'load') {
            this.animate();
        } else if (this.options.trigger === 'scrollWheel' || this.options.scrollWheelTrigger) {
            this.initScrollWheelTrigger();
        } else {
            this.initScrollTrigger();
        }
    }

    prepareText() {
        const text = this.element.textContent.trim();
        const words = text.split(' ');
        
        // Xóa nội dung cũ
        this.element.innerHTML = '';
        
        // Tạo cấu trúc HTML mới
        words.forEach((word, wordIndex) => {
            const wordElement = document.createElement('div');
            wordElement.className = 'title-anim-word';
            wordElement.style.cssText = `
                position: relative;
                display: inline-block;
                perspective: ${this.options.perspective}px;
            `;
            
            // Tách từng ký tự
            const chars = word.split('');
            chars.forEach((char, charIndex) => {
                const charElement = document.createElement('div');
                charElement.className = 'title-anim-char';
                charElement.textContent = char;
                
                // Nếu reverse = true, bắt đầu từ trạng thái lan tỏa với opacity = 0
                const initialTransform = this.options.reverse ? 
                    this.getSpreadTransform(charIndex, chars.length) : 
                    'translate(0px, 0px) rotate(0deg) rotateY(0deg)';
                
                const initialOpacity = this.options.reverse ? '0' : '1';
                
                charElement.style.cssText = `
                    position: relative;
                    display: inline-block;
                    will-change: transform, opacity;
                    transform: ${initialTransform};
                    opacity: ${initialOpacity};
                    transition: transform ${this.options.duration}s ${this.options.ease}, opacity ${this.options.duration}s ${this.options.ease};
                `;
                
                wordElement.appendChild(charElement);
            });
            
            // Thêm khoảng trắng như một phần tử con của từ (trừ từ cuối cùng)
            if (wordIndex < words.length - 1) {
                const spaceElement = document.createElement('div');
                spaceElement.className = 'title-anim-char title-anim-space';
                spaceElement.textContent = ' ';
                
                // Khoảng trắng luôn ở vị trí bình thường khi tập hợp lại
                const initialSpaceTransform = this.options.reverse ? 
                    this.getSpreadTransform(chars.length, chars.length + 1) : // Vị trí sau ký tự cuối cùng
                    'translate(0px, 0px) rotate(0deg) rotateY(0deg)';
                
                const initialSpaceOpacity = this.options.reverse ? '0' : '1';
                
                spaceElement.style.cssText = `
                    position: relative;
                    display: inline-block;
                    will-change: transform, opacity;
                    transform: ${initialSpaceTransform};
                    opacity: ${initialSpaceOpacity};
                    transition: transform ${this.options.duration}s ${this.options.ease}, opacity ${this.options.duration}s ${this.options.ease};
                `;
                
                wordElement.appendChild(spaceElement);
            }
            
            this.element.appendChild(wordElement);
        });
    }

    addStyles() {
        if (!document.getElementById('title-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'title-animation-styles';
            style.textContent = `
                .title-anim-word {
                    position: relative;
                    display: inline-block;
                }
                
                .title-anim-char {
                    position: relative;
                    display: inline-block;
                    will-change: transform, opacity;
                }
                
                .title-anim-char.animated {
                    transform: var(--char-transform);
                }
            `;
            document.head.appendChild(style);
        }
    }

    calculateTransform(charIndex, totalChars) {
        const isEven = totalChars % 2 === 0;
        const centerIndex = Math.ceil(totalChars / 2) - 1;
        
        let distanceFromCenter;
        if (isEven) {
            distanceFromCenter = Math.abs(centerIndex - charIndex);
        } else {
            distanceFromCenter = charIndex < centerIndex ? 
                centerIndex - charIndex : 
                charIndex - centerIndex;
        }
        
        const xOffset = this.options.spreadX * distanceFromCenter * (charIndex < totalChars / 2 ? -1 : 1);
        const yOffset = this.options.spreadY * distanceFromCenter;
        const rotationZ = this.options.rotationZ * distanceFromCenter * (charIndex < totalChars / 2 ? 1 : -1);
        
        return {
            x: xOffset,
            y: yOffset,
            rotationZ: rotationZ,
            rotationY: this.options.rotationY
        };
    }

    getSpreadTransform(charIndex, totalChars) {
        const transform = this.calculateTransform(charIndex, totalChars);
        return `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotationZ}deg) rotateY(${transform.rotationY}deg)`;
    }

    animate() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const words = this.element.querySelectorAll('.title-anim-word');
        let charIndex = 0;
        
        words.forEach((word, wordIndex) => {
            const chars = word.querySelectorAll('.title-anim-char');
            const totalChars = chars.length;
            
            chars.forEach((char, charIndexInWord) => {
                // Delay animation cho từng ký tự
                setTimeout(() => {
                    if (this.options.reverse) {
                        // Tập hợp lại - hiển thị với opacity = 1
                        char.style.transform = 'translate(0px, 0px) rotate(0deg) rotateY(0deg)';
                        char.style.opacity = '1';
                    } else {
                        // Lan tỏa ra - ẩn với opacity = 0
                        if (char.classList.contains('title-anim-space')) {
                            // Khoảng trắng lan tỏa ít hơn
                            const transform = this.calculateTransform(charIndexInWord, totalChars);
                            char.style.transform = `
                                translate(${transform.x * 0.5}px, ${transform.y * 0.5}px) 
                                rotate(${transform.rotationZ * 0.5}deg) 
                                rotateY(${transform.rotationY}deg)
                            `;
                        } else {
                            // Ký tự bình thường
                            const transform = this.calculateTransform(charIndexInWord, totalChars);
                            char.style.transform = `
                                translate(${transform.x}px, ${transform.y}px) 
                                rotate(${transform.rotationZ}deg) 
                                rotateY(${transform.rotationY}deg)
                            `;
                        }
                        char.style.opacity = '0';
                    }
                }, charIndex * 50);
                charIndex++;
            });
        });

        // Reset animation flag sau khi hoàn thành
        setTimeout(() => {
            this.isAnimating = false;
        }, charIndex * 50 + this.options.duration * 1000);
    }

    reset() {
        const words = this.element.querySelectorAll('.title-anim-word');
        
        words.forEach((word) => {
            const chars = word.querySelectorAll('.title-anim-char');
            const totalChars = chars.length;
            
            chars.forEach((char, charIndexInWord) => {
                if (this.options.reverse) {
                    // Reset về trạng thái lan tỏa với opacity = 0
                    if (char.classList.contains('title-anim-space')) {
                        // Khoảng trắng lan tỏa ít hơn
                        const transform = this.calculateTransform(charIndexInWord, totalChars);
                        char.style.transform = `
                            translate(${transform.x * 0.5}px, ${transform.y * 0.5}px) 
                            rotate(${transform.rotationZ * 0.5}deg) 
                            rotateY(${transform.rotationY}deg)
                        `;
                    } else {
                        // Ký tự bình thường
                        char.style.transform = this.getSpreadTransform(charIndexInWord, totalChars);
                    }
                    char.style.opacity = '0';
                } else {
                    // Reset về trạng thái bình thường với opacity = 1
                    char.style.transform = 'translate(0px, 0px) rotate(0deg) rotateY(0deg)';
                    char.style.opacity = '1';
                }
            });
        });
    }

    initScrollTrigger() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate();
                    // Nếu reverse = true, không unobserving để có thể trigger lại
                    if (!this.options.reverse) {
                        observer.unobserve(entry.target);
                    }
                } else if (this.options.reverse && entry.target === this.element) {
                    // Khi scroll ra khỏi viewport, reset về trạng thái lan tỏa
                    this.reset();
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(this.element);
    }

    // Phương thức để trigger theo scroll wheel
    initScrollWheelTrigger() {
        let isAnimating = false;
        let lastScrollY = window.scrollY;
        let animationProgress = 0;
        
        const handleScroll = () => {
            if (isAnimating) return;
            
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;
            const elementRect = this.element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Tính toán vị trí của element trong viewport
            const elementTop = elementRect.top;
            const elementBottom = elementRect.bottom;
            const elementHeight = elementRect.height;
            
            // Chỉ trigger khi element trong viewport
            if (elementTop < viewportHeight && elementBottom > 0) {
                // Tính toán progress dựa trên vị trí scroll
                const scrollProgress = Math.max(0, Math.min(1, 
                    (viewportHeight - elementTop) / (viewportHeight + elementHeight)
                ));
                
                // Cập nhật animation progress
                if (this.options.reverse) {
                    // Reverse mode: từ lan tỏa về tập hợp
                    animationProgress = scrollProgress;
                } else {
                    // Normal mode: từ tập hợp về lan tỏa
                    animationProgress = 1 - scrollProgress;
                }
                
                // Áp dụng animation progress
                this.applyScrollProgress(animationProgress);
            }
            
            lastScrollY = currentScrollY;
        };
        
        // Thêm event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Lưu reference để có thể remove sau này
        this.scrollWheelHandler = handleScroll;
    }

    // Phương thức áp dụng progress từ scroll wheel
    applyScrollProgress(progress) {
        const words = this.element.querySelectorAll('.title-anim-word');
        
        words.forEach((word) => {
            const chars = word.querySelectorAll('.title-anim-char');
            const totalChars = chars.length;
            
            chars.forEach((char, charIndexInWord) => {
                if (this.options.reverse) {
                    // Reverse mode: từ lan tỏa về tập hợp
                    if (char.classList.contains('title-anim-space')) {
                        // Khoảng trắng lan tỏa ít hơn
                        const transform = this.calculateTransform(charIndexInWord, totalChars);
                        const currentX = transform.x * 0.5 * (1 - progress);
                        const currentY = transform.y * 0.5 * (1 - progress);
                        const currentRotationZ = transform.rotationZ * 0.5 * (1 - progress);
                        const currentRotationY = transform.rotationY * (1 - progress);
                        
                        char.style.transform = `
                            translate(${currentX}px, ${currentY}px) 
                            rotate(${currentRotationZ}deg) 
                            rotateY(${currentRotationY}deg)
                        `;
                        char.style.opacity = progress;
                    } else {
                        // Ký tự bình thường
                        const transform = this.calculateTransform(charIndexInWord, totalChars);
                        const currentX = transform.x * (1 - progress);
                        const currentY = transform.y * (1 - progress);
                        const currentRotationZ = transform.rotationZ * (1 - progress);
                        const currentRotationY = transform.rotationY * (1 - progress);
                        
                        char.style.transform = `
                            translate(${currentX}px, ${currentY}px) 
                            rotate(${currentRotationZ}deg) 
                            rotateY(${currentRotationY}deg)
                        `;
                        char.style.opacity = progress;
                    }
                } else {
                    // Normal mode: từ tập hợp về lan tỏa
                    if (char.classList.contains('title-anim-space')) {
                        // Khoảng trắng lan tỏa ít hơn
                        const transform = this.calculateTransform(charIndexInWord, totalChars);
                        const currentX = transform.x * 0.5 * progress;
                        const currentY = transform.y * 0.5 * progress;
                        const currentRotationZ = transform.rotationZ * 0.5 * progress;
                        const currentRotationY = transform.rotationY * progress;
                        
                        char.style.transform = `
                            translate(${currentX}px, ${currentY}px) 
                            rotate(${currentRotationZ}deg) 
                            rotateY(${currentRotationY}deg)
                        `;
                        char.style.opacity = 1 - progress;
                    } else {
                        // Ký tự bình thường
                        const transform = this.calculateTransform(charIndexInWord, totalChars);
                        const currentX = transform.x * progress;
                        const currentY = transform.y * progress;
                        const currentRotationZ = transform.rotationZ * progress;
                        const currentRotationY = transform.rotationY * progress;
                        
                        char.style.transform = `
                            translate(${currentX}px, ${currentY}px) 
                            rotate(${currentRotationZ}deg) 
                            rotateY(${currentRotationY}deg)
                        `;
                        char.style.opacity = 1 - progress;
                    }
                }
            });
        });
    }

    // Phương thức để dừng scroll wheel trigger
    stopScrollWheelTrigger() {
        if (this.scrollWheelHandler) {
            window.removeEventListener('scroll', this.scrollWheelHandler);
            this.scrollWheelHandler = null;
        }
    }

    // Phương thức để tạo hiệu ứng ngược lại (từ spread về normal)
    animateReverse() {
        const chars = this.element.querySelectorAll('.title-anim-char');
        chars.forEach(char => {
            char.style.transform = 'translate(0px, 0px) rotate(0deg) rotateY(0deg)';
            char.style.opacity = '1';
        });
    }

    // Phương thức để tạo hiệu ứng lan tỏa
    animateSpread() {
        const words = this.element.querySelectorAll('.title-anim-word');
        let charIndex = 0;
        
        words.forEach((word, wordIndex) => {
            const chars = word.querySelectorAll('.title-anim-char');
            const totalChars = chars.length;
            
            chars.forEach((char, charIndexInWord) => {
                setTimeout(() => {
                    if (char.classList.contains('title-anim-space')) {
                        // Khoảng trắng lan tỏa ít hơn
                        const transform = this.calculateTransform(charIndexInWord, totalChars);
                        char.style.transform = `
                            translate(${transform.x * 0.5}px, ${transform.y * 0.5}px) 
                            rotate(${transform.rotationZ * 0.5}deg) 
                            rotateY(${transform.rotationY}deg)
                        `;
                    } else {
                        // Ký tự bình thường
                        const transform = this.calculateTransform(charIndexInWord, totalChars);
                        char.style.transform = `
                            translate(${transform.x}px, ${transform.y}px) 
                            rotate(${transform.rotationZ}deg) 
                            rotateY(${transform.rotationY}deg)
                        `;
                    }
                    char.style.opacity = '0';
                }, charIndex * 50);
                charIndex++;
            });
        });
    }
}

// Phiên bản jQuery (nếu bạn muốn sử dụng jQuery)
if (typeof jQuery !== 'undefined') {
    jQuery.fn.titleAnimation = function(options = {}) {
        return this.each(function() {
            new TitleAnimation(this, options);
        });
    };
}

// Export cho module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TitleAnimation;
}

// Export cho ES6 modules
if (typeof window !== 'undefined') {
    window.TitleAnimation = TitleAnimation;
} 