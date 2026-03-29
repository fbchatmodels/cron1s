const axios = require('axios');
const http = require('http');

// 1. CẤU HÌNH TÊN MIỀN
const domain = 'https://dvfast.site';

// 2. DANH SÁCH FILE CẦN CHẠY (Đã cập nhật theo yêu cầu mới)
const files = [
    'sending_email.php',
    'cron.php',
    'doithe1s.php',
    'gachthefast.php',
    'UpdateRateService.php',
    'UpdateHistoryService.php',
    'service-otp/create.php',
    'service-otp/history.php',
    'checklivefb.php'
];

// Tự động tạo mảng URL đầy đủ
const urls = files.map(file => `${domain}/cron/${file}`);

// 3. HÀM CHẠY CRON
function startCron() {
    console.log(`🚀 Đang chạy Cron cho ${urls.length} files...`);

    // Thiết lập chạy mỗi 2 giây (2000ms)
    setInterval(() => {
        urls.forEach(async (url) => {
            try {
                // Timeout 8s để tránh treo nếu server phản hồi chậm
                await axios.get(url, { timeout: 8000 });
                
                const fileName = url.split('/').pop();
                console.log(`[${new Date().toLocaleTimeString()}] ✅ Hoàn tất: ${fileName}`);
            } catch (err) {
                const fileName = url.split('/').pop();
                console.log(`[${new Date().toLocaleTimeString()}] ❌ Lỗi tại: ${fileName}`);
            }
        });
    }, 2000); 
}

// 4. SERVER GIỮ APP SỐNG (Dùng cho Render/Replit hoặc các hosting tương tự)
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Đang thực hiện Cron cho ${urls.length} files trên hệ thống ${domain}`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌐 Server đang lắng nghe tại port: ${PORT}`);
    startCron();
});
