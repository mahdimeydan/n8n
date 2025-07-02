# 📂 راهنمای آپلود پروژه به GitHub

## بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ

این راهنما به شما کمک می‌کند تا پروژه وب سایت قرآن کریم را به GitHub آپلود کنید.

## 🚀 روش ساده (استفاده از اسکریپت)

### گام 1: اجرای اسکریپت آماده

```bash
chmod +x git_setup.sh
./git_setup.sh
```

این اسکریپت به طور خودکار:
- Git را راه‌اندازی می‌کند
- تمام فایل‌ها را اضافه می‌کند
- Commit اولیه ایجاد می‌کند
- دستورالعمل‌های بعدی را نمایش می‌دهد

## 🔧 روش دستی (گام به گام)

### گام 1: ایجاد Repository در GitHub

1. وارد [GitHub.com](https://github.com) شوید
2. روی "+" کلیک کنید و "New repository" را انتخاب کنید
3. نام repository: `quran-website`
4. توضیحات: `وب سایت جامع قرآن کریم با امکانات کامل`
5. Public را انتخاب کنید
6. **هیچ چیز اضافی (README, .gitignore, License) انتخاب نکنید**
7. "Create repository" کلیک کنید

### گام 2: راه‌اندازی Git محلی

```bash
# مقداردهی Git
git init

# اضافه کردن فایل‌ها
git add .

# Commit اولیه
git commit -m "Initial commit: Complete Quran website

✨ Features:
- Complete Quran with 114 Surahs
- Persian translations
- Online audio recitation
- Advanced search
- Modern responsive UI
- Dark/Light theme
- Mobile optimized
- cPanel ready

بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ"
```

### گام 3: اتصال به GitHub

```bash
# جایگزین کردن YOUR_USERNAME با نام کاربری GitHub شما
git remote add origin https://github.com/YOUR_USERNAME/quran-website.git

# تنظیم branch اصلی
git branch -M main

# آپلود به GitHub
git push -u origin main
```

## 🌐 فعال‌سازی GitHub Pages

پس از آپلود موفق:

1. در repository خود، وارد **Settings** شوید
2. در منوی سمت چپ، **Pages** را پیدا کنید
3. در بخش **Source**:
   - "Deploy from a branch" را انتخاب کنید
   - Branch: **main** را انتخاب کنید
   - Folder: **/ (root)** را انتخاب کنید
4. **Save** کلیک کنید

سایت شما در آدرس زیر در دسترس خواهد بود:
```
https://YOUR_USERNAME.github.io/quran-website
```

## 📱 نکات مهم

### تنظیم اطلاعات Git (اولین بار):

```bash
git config --global user.name "نام شما"
git config --global user.email "email@example.com"
```

### آپدیت فایل‌ها:

```bash
# اضافه کردن تغییرات جدید
git add .

# ایجاد commit
git commit -m "توضیح تغییرات"

# آپلود به GitHub
git push
```

### مشاهده وضعیت:

```bash
# بررسی فایل‌های تغییر یافته
git status

# مشاهده تاریخچه
git log --oneline
```

## 🔐 استفاده از Personal Access Token

اگر GitHub از شما password می‌خواهد:

1. به **GitHub Settings** بروید
2. **Developer settings** > **Personal access tokens** > **Tokens (classic)**
3. **Generate new token (classic)** کلیک کنید
4. **Scope**: `repo` را انتخاب کنید
5. Token ایجاد شده را کپی کنید
6. به جای password از این token استفاده کنید

## 🎯 بررسی نهایی

پس از آپلود موفق:

- ✅ Repository در GitHub ایجاد شده
- ✅ تمام فایل‌ها آپلود شده‌اند
- ✅ GitHub Pages فعال است
- ✅ سایت در دسترس است

## 🆘 عیب‌یابی

### خطای "repository already exists":
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/quran-website.git
```

### خطای "permission denied":
- از Personal Access Token استفاده کنید
- یا SSH key راه‌اندازی کنید

### خطای "nothing to commit":
```bash
git add .
git status
```

## 🌟 مراحل بعدی

1. **سفارشی‌سازی**: 
   - فایل `package.json` را ویرایش کنید
   - نام کاربری خود را جایگزین کنید

2. **مشارکت**:
   - دیگران را دعوت کنید
   - Issue و Pull Request بپذیرید

3. **بهبود**:
   - ویژگی‌های جدید اضافه کنید
   - UI را بهبود دهید

## 🤝 کمک و پشتیبانی

در صورت بروز مشکل:
1. مراحل را دوباره بررسی کنید
2. خطاها را با دقت بخوانید
3. از جامعه GitHub کمک بگیرید

---

## 🌙 دعا

> **بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ**
> 
> **وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ**
> 
> "و از قرآن آنچه را نازل می‌کنیم که شفا و رحمت برای مؤمنان است"
> - قرآن کریم، سوره اسراء، آیه 82

خداوند این تلاش را بپذیرد و به خیر و برکت ختم کند. 🤲

---

**موفق باشید! 🚀**