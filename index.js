const axios = require('axios');
const http = require('http');

// 1. DANH SÁCH LINK CỦA BẠN
const urls = [
    'https://gachthenhanh.myz.info/cron/gachthefast.php?token=jd82ijd90qkdj9jjsiqo92jpalcjaouriwj8c',
    'https://gachthenhanh.myz.info/cron/cron.php'
];

// 2. HÀM CHẠY CRON 1 GIÂY
function startCron() {
    console.log(`🚀 Tool đang chạy với ${urls.length} links...`);
    setInterval(async () => {
        urls.forEach(async (url) => {
            try {
                await axios.get(url, { timeout: 5000 });
                console.log(`[${new Date().toLocaleTimeString()}] Gọi thành công: ${url}`);
            } catch (err) {
                console.log(`[${new Date().toLocaleTimeString()}] Lỗi: ${url}`);
            }
        });
    }, 1000);
}

// 3. TẠO SERVER GIẢ (Để Render không tắt app)
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Tool is running...');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    startCron(); // Bắt đầu chạy tool khi server khởi động
});
