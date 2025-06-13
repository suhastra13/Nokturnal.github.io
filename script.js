// ====== LANGKAH 5: JAVASCRIPT UNTUK KALKULATOR ======

// Menunggu sampai seluruh halaman HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mengambil elemen HTML yang kita butuhkan ---
    const serviceTypeSelect = document.getElementById('service-type');
    const serviceSpecSelect = document.getElementById('service-spec');
    const estimatedPriceSpan = document.getElementById('estimated-price');

    // --- 2. Data Harga dan Spesifikasi ---
    // Ini adalah "database" harga kita. Bisa diubah dan ditambah sesuai kebutuhan.
    
    const priceData = {
        ssd_upgrade: {
            '256 GB SATA': 450000,
            '512 GB SATA': 750000,
            '1 TB SATA': 1200000,
            '256 GB NVMe': 550000,
            '512 GB NVMe': 850000
        },
        ram_upgrade: {
            '8 GB DDR4': 400000,
            '16 GB DDR4': 750000,
            '8 GB DDR5': 500000,
            '16 GB DDR5': 950000
        },
        install_os: {
            'Windows 10/11 Original': 150000,
            'MacOS (versi terbaru)': 250000
        },
        // BARU DITAMBAHKAN
        keyboard_repair: {
            'Ganti Keyboard Tanam': 350000,
            'Ganti Keyboard Eksternal': 250000
        },
        hinge_repair: {
            'Servis Engsel Ringan': 200000,
            'Rekonstruksi Dudukan Baut': 350000
        },
        battery_replace: {
            'Baterai Tanam Standar': 450000,
            'Baterai Tanam Kualitas Original': 650000
        },
        dead_repair: {
            'Biaya Pengecekan Awal': 75000,
        }
        // AKHIR BAGIAN BARU
    };

    // --- 3. Fungsi untuk memperbarui pilihan di dropdown kedua ---
    function updateSpecOptions() {
        const selectedService = serviceTypeSelect.value;
        serviceSpecSelect.innerHTML = '<option value="">-- Pilih Spesifikasi --</option>'; // Reset pilihan

        if (selectedService && priceData[selectedService]) {
            const specs = Object.keys(priceData[selectedService]);
            specs.forEach(spec => {
                const option = document.createElement('option');
                option.value = spec;
                option.textContent = spec;
                serviceSpecSelect.appendChild(option);
            });
        }
        calculatePrice(); // Hitung ulang harga setelah pilihan spec di-update
    }

    // --- 4. Fungsi utama untuk menghitung dan menampilkan harga ---
    function calculatePrice() {
        const selectedService = serviceTypeSelect.value;
        const selectedSpec = serviceSpecSelect.value;

        let price = 0;
        if (selectedService && selectedSpec && priceData[selectedService][selectedSpec]) {
            price = priceData[selectedService][selectedSpec];
        }

        // Format harga ke dalam format Rupiah (Rp xxx.xxx)
        const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);

        estimatedPriceSpan.textContent = formattedPrice;
    }

    // --- 5. Menambahkan 'event listener' ---
    // Jalankan fungsi ketika pilihan di dropdown berubah
    serviceTypeSelect.addEventListener('change', updateSpecOptions);
    serviceSpecSelect.addEventListener('change', calculatePrice);
});

// --- Fungsi untuk Layanan Interaktif ---
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceValue = card.getAttribute('data-service');
        if (serviceValue) {
            // Update dropdown di kalkulator
            serviceTypeSelect.value = serviceValue;
            // Trigger fungsi untuk update spec dan harga
            updateSpecOptions();
            // Scroll ke kalkulator
            document.getElementById('kalkulator').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- Fungsi untuk Tombol Kembali ke Atas ---
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Tampilkan tombol setelah scroll 300px
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// ====== JAVASCRIPT UNTUK DARK MODE ======

const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Opsional: Simpan pilihan tema pengguna di browser
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.removeItem('theme');
    }
});

// Cek apakah pengguna sudah punya pilihan tema dari kunjungan sebelumnya
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}