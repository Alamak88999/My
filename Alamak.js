// Fungsi untuk menghasilkan 4 angka acak
function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000); 
}

// Fungsi untuk memutar suara notifikasi
function playNotificationSound() {
    const audio = new Audio('2.mp3'); 
    audio.play().catch(error => {
        console.error("Gagal memutar suara: ", error);
    });
}

// Tampilkan pop-up notifikasi saat halaman dimuat
window.onload = () => {
    const notification = document.getElementById('notification');
    notification.style.display = 'block'; // Tampilkan pop-up
    playNotificationSound(); // Memutar suara notifikasi
};

// Fungsi untuk membuat QR Code
document.getElementById('generate-btn').addEventListener('click', function () {
    const input = document.getElementById('qr-input').value.trim();
    const qrCodeDiv = document.getElementById('qr-code');
    const downloadBtn = document.getElementById('download-btn');
    const sizeSelect = document.getElementById('size-select');
    const selectedSize = parseInt(sizeSelect.value);

    qrCodeDiv.innerHTML = '';

    if (input === '') {
        alert('Masukkan teks atau URL terlebih dahulu!');
        return;
    }

    new QRCode(qrCodeDiv, {
        text: input,
        width: selectedSize,
        height: selectedSize,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    downloadBtn.style.display = 'block';
});

// Fungsi untuk mengunduh QR Code dengan border putih
document.getElementById('download-btn').addEventListener('click', function () {
    const qrCodeDiv = document.getElementById('qr-code');
    const sizeSelect = document.getElementById('size-select');
    const selectedSize = parseInt(sizeSelect.value);
    const fileNameInput = document.getElementById('file-name-input').value.trim();

    // Buat nama file
    let fileName = fileNameInput || generateRandomNumber().toString(); // Gunakan input atau angka acak
    fileName += '.png'; // Tambahkan ekstensi .png

    // Buat canvas dengan ukuran yang lebih besar untuk menampung border
    const borderSize = 20; // Ukuran border putih (dalam piksel)
    const canvasWidth = selectedSize + borderSize * 2; // Lebar canvas termasuk border
    const canvasHeight = selectedSize + borderSize * 2; // Tinggi canvas termasuk border

    // Buat canvas baru dengan ukuran yang lebih besar
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    // Isi canvas dengan warna putih (background border)
    ctx.fillStyle = '#ffffff'; // Warna putih
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Gambar QR Code di tengah canvas
    html2canvas(qrCodeDiv, {
        scale: 2, // Meningkatkan resolusi gambar (2x lebih besar)
        width: selectedSize,
        height: selectedSize,
        windowWidth: selectedSize,
        windowHeight: selectedSize
    }).then(qrCanvas => {
        // Gambar QR Code di tengah canvas dengan border
        ctx.drawImage(qrCanvas, borderSize, borderSize, selectedSize, selectedSize);

        // Konversi canvas ke gambar PNG
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = fileName; // Nama file yang akan diunduh
        link.click(); // Trigger download
    });
});