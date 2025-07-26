# Title Animation - Hiệu ứng Animation cho Tiêu đề

Một thư viện JavaScript thuần để tạo hiệu ứng 3D spread animation cho các ký tự trong tiêu đề, được lấy cảm hứng từ website Boyd.

## Tính năng

- ✅ Hiệu ứng 3D spread animation
- ✅ **Hiệu ứng tập hợp lại (Reverse Mode)** - Mới!
- ✅ **Khoảng trắng được tính như ký tự** - Mới!
- ✅ **Opacity Control** - Ký tự ẩn khi lan tỏa - Mới!
- ✅ Tự động tách từng ký tự
- ✅ Scroll trigger tự động
- ✅ Tùy chỉnh các thông số animation
- ✅ Hỗ trợ jQuery (tùy chọn)
- ✅ Responsive design
- ✅ Không phụ thuộc thư viện bên ngoài

## Cài đặt

### 1. Thêm file JavaScript

```html
<script src="title-animation.js"></script>
```

### 2. HTML cơ bản

```html
<h1 id="my-title">Tiêu đề của bạn</h1>
```

### 3. Khởi tạo animation

```javascript
// Cách 1: Sử dụng JavaScript thuần
const titleAnimation = new TitleAnimation('#my-title', {
    trigger: 'scroll', // 'scroll' hoặc 'load'
    duration: 1.2,
    spreadX: 200,
    spreadY: 60,
    rotationY: -270,
    rotationZ: 8,
    reverse: true, // true = tập hợp lại, false = lan tỏa ra
    perspective: 1000
});

// Cách 2: Sử dụng jQuery (nếu có jQuery)
$('#my-title').titleAnimation({
    reverse: true,
    duration: 1.5
});
```

## Options

| Option | Type | Default | Mô tả |
|--------|------|---------|-------|
| `duration` | number | 1.2 | Thời gian animation (giây) |
| `ease` | string | 'cubic-bezier(0.31, 0.13, 0.11, 1)' | Easing function |
| `spreadX` | number | 200 | Khoảng cách lan tỏa theo trục X (px) |
| `spreadY` | number | 60 | Khoảng cách lan tỏa theo trục Y (px) |
| `rotationY` | number | -270 | Góc xoay Y (độ) |
| `rotationZ` | number | 8 | Góc xoay Z (độ) |
| `perspective` | number | 1000 | Độ sâu 3D (px) |
| `trigger` | string | 'scroll' | 'scroll' hoặc 'load' |
| `reverse` | boolean | false | **Mới!** true = tập hợp lại, false = lan tỏa ra |

## Tính năng mới

### 🎯 Reverse Mode (Tập hợp lại)
```javascript
const titleAnimation = new TitleAnimation('#title', {
    reverse: true // Chữ bắt đầu lan tỏa, tập hợp lại khi scroll vào
});
```

### 📝 Khoảng trắng được tính như ký tự
- Khoảng trắng được xử lý như một ký tự riêng biệt
- Đảm bảo không bị mất khoảng trắng khi tập hợp lại
- Tự động thêm khoảng trắng phía sau mỗi từ

### 👁️ Opacity Control
- Ký tự có `opacity = 0` khi ở trạng thái lan tỏa
- Ký tự có `opacity = 1` khi ở trạng thái bình thường
- Tạo hiệu ứng fade in/out mượt mà

## Methods

```javascript
// Khởi tạo animation
const animation = new TitleAnimation('#title', options);

// Chạy animation
animation.animate();

// Reset về trạng thái ban đầu
animation.reset();

// Tạo hiệu ứng lan tỏa
animation.animateSpread();

// Tạo hiệu ứng tập hợp lại
animation.animateReverse();
```

## Ví dụ sử dụng

### 1. Hiệu ứng cơ bản
```javascript
new TitleAnimation('#title', {
    trigger: 'scroll',
    duration: 1.2
});
```

### 2. Hiệu ứng tập hợp lại
```javascript
new TitleAnimation('#title', {
    reverse: true,
    duration: 1.5,
    spreadX: 300,
    spreadY: 80
});
```

### 3. Hiệu ứng tùy chỉnh
```javascript
new TitleAnimation('#title', {
    reverse: false,
    duration: 2.0,
    spreadX: 250,
    spreadY: 100,
    rotationY: -360,
    rotationZ: 15,
    perspective: 1200,
    trigger: 'load'
});
```

## Demo

Mở file `demo.html` để xem demo với controls tương tác.

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## License

MIT License - Tự do sử dụng cho mục đích thương mại và cá nhân. 