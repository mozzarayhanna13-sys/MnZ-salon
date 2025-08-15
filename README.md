# MnZ Salon — Static Website

Stack: HTML + CSS + JavaScript (vanilla).

## Fitur
- Slider produk terlaris (maksimal 5 item)
- Tombol booking + form booking (disimpan di LocalStorage)
- Alamat: JL. Orchid 09, Bali
- Skema warna: hijau pastel, pink, kuning
- Kritik & saran (LocalStorage)
- Testimoni pelanggan + input testimoni (LocalStorage)
- SVG assets (ikon produk) — ringan untuk GitHub Pages

## Struktur Folder
```
mnz-salon/
├─ index.html
└─ assets/
   ├─ css/styles.css
   ├─ js/script.js
   └─ svg/
      ├─ scissors.svg
      ├─ hairdryer.svg
      ├─ comb.svg
      ├─ nailpolish.svg
      └─ spa.svg
```

## Cara Deploy ke GitHub Pages
1. Buat repo baru bernama `mnz-salon` (atau bebas).
2. Upload seluruh isi folder ini.
3. Di Settings → Pages → Source: pilih **Deploy from a branch** → branch `main` → folder `/root` (jika ada).
4. Simpan. Tunggu beberapa menit, lalu akses URL yang diberikan GitHub Pages.

> Catatan: Form menyimpan data di browser (LocalStorage) sehingga tidak butuh backend.
