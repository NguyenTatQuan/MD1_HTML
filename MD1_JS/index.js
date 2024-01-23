// Khởi tạo kích thước của trò chơi
const kíchThước = 10;
let điểm = 0;

// Khởi tạo rắn
let rắn = [{ x: 1, y: 1 }];
let hướng = { x: 1, y: 0 };
let mồi = { x: 3, y: 3 };

// Lấy ra phần tử canvas để vẽ trò chơi
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Hàm vẽ rắn và mồi
function vẽ() {
    // Xóa toàn bộ canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ mồi
    ctx.fillStyle = 'red';
    ctx.fillRect(mồi.x * kíchThước, mồi.y * kíchThước, kíchThước, kíchThước);

    // Vẽ rắn
    ctx.fillStyle = 'green';
    rắn.forEach(segment => {
        ctx.fillRect(segment.x * kíchThước, segment.y * kíchThước, kíchThước, kíchThước);
    });
}

// Hàm cập nhật trạng thái trò chơi
function cậpNhật() {
    // Cập nhật vị trí mới của đầu rắn
    let đầuRắn = { x: rắn[0].x + hướng.x, y: rắn[0].y + hướng.y };
    rắn.unshift(đầuRắn);

    // Kiểm tra xem rắn có ăn mồi không
    if (đầuRắn.x === mồi.x && đầuRắn.y === mồi.y) {
        điểm++;
        mồi.x = Math.floor(Math.random() * kíchThước);
        mồi.y = Math.floor(Math.random() * kíchThước);
    } else {
        rắn.pop();
    }
}

// Hàm xử lý sự kiện phím bấm
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            hướng = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            hướng = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            hướng = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            hướng = { x: 1, y: 0 };
            break;
    }
});

// Hàm chạy trò chơi
function chạy() {
    cậpNhật();
    vẽ();
}

// Thiết lập vòng lặp game loop
setInterval(chạy, 100);
