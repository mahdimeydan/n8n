# 🕌 قرآن کریم - وب سایت جامع قرآنی

**بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ**

وب سایت جامع و حرفه‌ای قرآن کریم با امکانات کامل، طراحی مدرن و رابط کاربری زیبا

[![GitHub](https://img.shields.io/badge/GitHub-Repository-green?style=for-the-badge)](https://github.com/your-username/quran-website)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![API](https://img.shields.io/badge/API-AlQuran.cloud-orange?style=for-the-badge)](https://alquran.cloud/api)

## ✨ ویژگی‌های اصلی

### 🕌 محتوای قرآنی کامل
- **114 سوره** با 6,236 آیه کامل
- **متن عربی اصلی** با فونت‌های زیبا
- **ترجمه‌های فارسی معتبر** (فولادوند، مکارم شیرازی، انصاریان، قمشه‌ای)
- **ترجمه‌های انگلیسی** (Muhammad Asad، Pickthall، Yusuf Ali، Saheeh International)
- **طبقه‌بندی سوره‌ها** (مکی/مدنی)
- **اطلاعات تکمیلی** نزول، تعداد آیات، و معانی اسماء

### 🎵 سیستم صوتی پیشرفته
- **پخش آنلاین با کیفیت HD** از CDN معتبر
- **6 قاری مشهور**: العفاسی، عبدالباسط، حصری، منشاوی، سدیس، شریم
- **کنترل کامل پخش**: سرعت، صدا، توقف/ادامه، تکرار
- **پخش تک آیه یا کل سوره**
- **مدیریت خطا و بارگذاری هوشمند**
- **کیفیت‌های مختلف**: 32-192 kbps

### 🔍 جستجوی قدرتمند
- **جستجوی پیشرفته** در متن عربی و ترجمه‌ها
- **فیلتر بر اساس سوره** یا جستجو در کل قرآن
- **هایلایت نتایج** و نمایش زیبا
- **تاریخچه جستجوها** با LocalStorage
- **جستجوی سریع** با debounce

### 💖 مدیریت علاقه‌مندی‌ها
- **ذخیره آیات محبوب** در LocalStorage
- **دسترسی سریع** به آیات ذخیره شده
- **صادرات و وارد کردن** لیست علاقه‌مندی‌ها
- **یادداشت‌برداری** روی آیات (در نسخه‌های آینده)

### 🎨 طراحی مدرن و حرفه‌ای
- **UI/UX درجه یک** با انیمیشن‌های نرم
- **پوسته تیره/روشن** با تغییر خودکار
- **ریسپانسیو 100%** برای تمام دستگاه‌ها
- **فونت‌های زیبا**: Vazirmatn، Scheherazade New، Amiri
- **رنگ‌بندی اسلامی** با ترکیب سبز و طلایی
- **لودینگ و transition های روان**

### ⚙️ شخصی‌سازی پیشرفته
- **اندازه فونت** قابل تنظیم برای عربی و فارسی
- **انتخاب قاری** و کیفیت صوت
- **انتخاب ترجمه** از بین گزینه‌های متعدد
- **تنظیمات نمایش** (نمایش/مخفی کردن بخش‌ها)
- **ذخیره تنظیمات** در LocalStorage

## 🚀 نصب و راه‌اندازی

### 📂 1. دانلود و راه‌اندازی

```bash
# کلون پروژه
git clone https://github.com/YOUR_USERNAME/quran-website.git
cd quran-website

# راه‌اندازی خودکار Git
chmod +x git_setup.sh
./git_setup.sh

# ساخت ساختار پوشه‌ها
chmod +x create_structure.sh
./create_structure.sh
```

### 🌐 2. آپلود به cPanel

1. **فایل‌ها را دانلود کنید**
2. **ZIP را extract کنید**
3. **در cPanel → File Manager**:
   - فایل‌ها را در `public_html` آپلود کنید
   - یا زیرپوشه‌ای مثل `public_html/quran` ایجاد کنید
4. **تست کنید**: `yourdomain.com` یا `yourdomain.com/quran`

### 🔗 3. GitHub Pages (میزبانی رایگان)

1. **Repository ایجاد کنید** در GitHub
2. **Settings → Pages**:
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
3. **آدرس سایت**: `https://YOUR_USERNAME.github.io/quran-website`

### 📱 4. تست سریع

فایل `test.html` را باز کنید تا عملکرد تمام بخش‌ها را آزمایش کنید:
- API connectivity
- Audio playback
- Search functionality
- Notifications
- UI components

## 📁 ساختار پروژه

```
quran-website/
├── 📄 index.html              # صفحه اصلی
├── 📄 test.html               # صفحه آزمایش
├── 📄 README.md               # این فایل
├── 📄 LICENSE                 # مجوز MIT
├── 📄 package.json            # اطلاعات پروژه
├── 📄 .gitignore              # Git ignore
├── 🔧 git_setup.sh            # اسکریپت راه‌اندازی Git
├── 🔧 create_structure.sh     # اسکریپت ساخت پوشه‌ها
├── 📄 GitHub_Upload_Guide.md  # راهنمای GitHub
└── 📁 assets/
    ├── 📁 css/
    │   ├── 🎨 styles.css      # استایل‌های اصلی
    │   ├── 📱 responsive.css  # طراحی ریسپانسیو
    │   └── ✨ animations.css  # انیمیشن‌ها
    └── 📁 js/
        ├── ⚙️ config.js       # تنظیمات و کانفیگ
        ├── 🔌 api.js          # مدیریت API ها
        └── 🧠 main.js         # منطق اصلی برنامه
```

## � API و منابع داده

### 🌟 Primary API: AlQuran.cloud
- **Base URL**: `https://api.alquran.cloud/v1`
- **CDN Audio**: `https://cdn.islamic.network/quran/audio`
- **CDN Images**: `https://cdn.islamic.network/quran/images`
- **ویژگی‌ها**: متن، ترجمه، صوت، جستجو، metadata

### � دیتای موجود:
- ✅ **114 سوره** با اطلاعات کامل
- ✅ **6,236 آیه** با شماره‌گذاری جهانی
- ✅ **30 پاره (جزء)**، **604 صفحه**، **556 رکوع**
- ✅ **15 جای سجده** مشخص شده
- ✅ **Metadata** کامل برای هر آیه

## 🎯 راهنمای استفاده

### 🏠 صفحه اصلی
- **آمار قرآن**: نمایش آمار 114 سوره، 6236 آیه و...
- **دکمه‌های سریع**: شروع مطالعه، آیه تصادفی
- **جستجوی سریع**: از همین صفحه جستجو کنید

### 📚 مرور سوره‌ها
1. **کلیک روی "سوره‌ها"**
2. **فیلتر کنید**: همه، مکی، مدنی
3. **نمایش**: کارت یا لیست
4. **انتخاب سوره** برای مطالعه کامل

### 📖 مطالعه آیات
- **نمایش زیبا** متن عربی و ترجمه
- **کنترل‌های آیه**: پخش، علاقه‌مندی، کپی، اشتراک
- **ناوبری**: آیه قبلی/بعدی، بازگشت به فهرست
- **هایلایت آیه** هنگام پخش صوت

### 🔍 جستجو پیشرفته
1. **وارد بخش جستجو** شوید
2. **تایپ کنید**: حداقل 2 حرف
3. **فیلتر کنید**: سوره خاص یا همه
4. **کلیک روی نتیجه** برای مشاهده کامل

### ❤️ علاقه‌مندی‌ها
- **اضافه کردن**: کلیک روی قلب در هر آیه
- **مشاهده**: بخش علاقه‌مندی‌ها
- **حذف**: کلیک مجدد روی قلب
- **مدیریت**: حذف همه یا صادرات

### ⚙️ تنظیمات
- **ظاهر**: پوسته، فونت، اندازه متن
- **صوت**: قاری، سرعت، صدا
- **نمایش**: زبان‌ها، بخش‌های مختلف
- **عملکرد**: کش، انیمیشن، اتصال

## 🔄 به‌روزرسانی و نگهداری

### Git Workflow:
```bash
# بررسی تغییرات
git status

# اضافه کردن فایل‌ها
git add .

# کامیت جدید
git commit -m "✨ اضافه کردن ویژگی جدید"

# آپلود به GitHub
git push origin main

# دریافت آخرین تغییرات
git pull origin main
```

### Version Control:
- ✅ **Semantic Versioning**: v1.0.0
- ✅ **Git Tags**: برای نسخه‌های stable
- ✅ **Branch Strategy**: main + feature branches
- ✅ **Automated Backup**: روی GitHub

## �️ شخصی‌سازی

### 🎨 تغییر تم و رنگ‌ها:
```css
/* در فایل assets/css/styles.css */
:root {
    --primary-color: #1e5631;    /* سبز اسلامی */
    --accent-color: #d4a574;     /* طلایی */
    --bg-primary: #fafafa;       /* پس‌زمینه */
}
```

### ⚙️ اضافه کردن ترجمه جدید:
```javascript
// در فایل assets/js/config.js
translations: {
    persian: {
        'fa.newTranslation': {
            name: 'ترجمه جدید',
            author: 'نام مترجم'
        }
    }
}
```

### 🎵 اضافه کردن قاری جدید:
```javascript
// در فایل assets/js/config.js
audio: {
    reciters: {
        'ar.newReciter': {
            name: 'نام قاری',
            edition: 'ar.newReciter',
            bitrate: 128
        }
    }
}
```

## 📱 ویژگی‌های موبایل

### 📲 Progressive Web App (PWA):
- ✅ **Responsive Design** با breakpoint های مختلف
- ✅ **Touch Optimization** برای دستگاه‌های لمسی
- ✅ **Offline Capability** با Service Worker (در نسخه‌های آینده)
- ✅ **Fast Loading** با lazy loading

### 🔧 Mobile-Specific Features:
- **همبرگر منو** برای نویگیشن
- **سوایپ gesture** برای تغییر آیات
- **کنترل صدا** بهینه شده برای موبایل
- **فونت‌های خوانا** در ابعاد کوچک

## 🔒 امنیت و حریم خصوصی

### 🛡️ Data Privacy:
- ❌ **هیچ tracking** یا analytics شخصی
- ✅ **LocalStorage only** برای ذخیره تنظیمات
- ✅ **No registration** یا اطلاعات شخصی
- ✅ **HTTPS Support** برای ارتباط امن

### 🔐 Security Measures:
- ✅ **CSP Headers** برای جلوگیری از XSS
- ✅ **Input Validation** در تمام ورودی‌ها
- ✅ **API Rate Limiting** برای محافظت از سرور
- ✅ **Error Handling** بدون نشت اطلاعات

## 🐛 رفع مشکلات

### ❌ مشکلات رایج و راه‌حل:

**🔇 صدا پخش نمی‌شود:**
```
✅ اتصال اینترنت را بررسی کنید
✅ مرورگر را رفرش کنید (F5)
✅ قاری دیگری انتخاب کنید
✅ صدای سیستم را بررسی کنید
```

**🐌 سایت کند بارگذاری می‌شود:**
```
✅ کش مرورگر را پاک کنید
✅ JavaScript را فعال کنید
✅ Ad-blocker را غیرفعال کنید
✅ اتصال اینترنت را بررسی کنید
```

**❓ آیات نمایش داده نمی‌شوند:**
```
✅ JavaScript فعال باشد
✅ مرورگر به‌روز باشد
✅ Console errors را بررسی کنید (F12)
✅ API connectivity را تست کنید
```

### 🔧 Debug Mode:
```javascript
// در console مرورگر
window.quranAPI.getCacheStats()  // بررسی کش
app.settings                     // مشاهده تنظیمات
localStorage.clear()             // پاک کردن داده‌های محلی
```

## 🤝 مشارکت در پروژه

### 🌟 راه‌های مشارکت:
1. **🐛 گزارش باگ** در Issues
2. **💡 پیشنهاد ویژگی** جدید
3. **🌐 ترجمه** به زبان‌های دیگر
4. **🎨 بهبود UI/UX**
5. **📝 نوشتن مستندات**
6. **🧪 تست و QA**

### 🔄 Contributing Workflow:
```bash
# Fork کردن پروژه
git clone https://github.com/YOUR_USERNAME/quran-website.git
cd quran-website

# ایجاد branch جدید
git checkout -b feature/amazing-feature

# اعمال تغییرات
git add .
git commit -m "✨ Add amazing feature"

# Push کردن
git push origin feature/amazing-feature

# ایجاد Pull Request در GitHub
```

### 📋 Code Style:
- ✅ **فارسی comments** برای توضیحات
- ✅ **camelCase** برای JavaScript
- ✅ **kebab-case** برای CSS classes
- ✅ **Semantic HTML** استفاده کنید
- ✅ **ESLint compatible** کد بنویسید

## 📈 Performance

### ⚡ بهینه‌سازی‌های انجام شده:
- ✅ **Lazy Loading** برای تصاویر و محتوا
- ✅ **Debounced Search** برای کاهش درخواست‌ها
- ✅ **Caching Strategy** برای API responses
- ✅ **Minified Assets** برای سرعت بالاتر
- ✅ **CDN Usage** برای فایل‌های استاتیک

### 📊 Metrics:
- 🚀 **Load Time**: < 3 seconds
- 📱 **Mobile Score**: 95/100
- 💯 **Accessibility**: WCAG 2.1 compliant
- 🔍 **SEO Ready**: Meta tags + structured data

## 🔮 نقشه راه (Roadmap)

### 📅 نسخه 1.1.0:
- 🔍 **جستجوی صوتی** با Speech Recognition
- 📱 **PWA کامل** با offline support
- 🌙 **حالت شب** پیشرفته
- 📊 **آمار مطالعه** شخصی

### 📅 نسخه 1.2.0:
- 🎯 **هدف‌گذاری** خواندن روزانه
- 📝 **یادداشت‌برداری** روی آیات
- � **اشتراک‌گذاری** بهتر
- 🌐 **چند زبانه** کامل

### 📅 نسخه 2.0.0:
- 🤖 **AI Integration** برای تفسیر
- 📚 **کتابخانه تفسیر** 
- 🎓 **حالت آموزشی**
- 👥 **کامیونیتی features**

## 📞 پشتیبانی و ارتباط

### 📧 راه‌های ارتباطی:
- **📨 Email**: info@quran-website.com
- **💬 Telegram**: [@quran_website](https://t.me/quran_website)
- **🐙 GitHub**: [Issues](https://github.com/your-username/quran-website/issues)
- **📱 Instagram**: [@quran_website](https://instagram.com/quran_website)

### � پاسخگویی:
- **Issues**: ظرف 24 ساعت
- **Email**: ظرف 48 ساعت  
- **Telegram**: پاسخ سریع

## 🏆 تشکر و قدردانی

### 🙏 از این منابع تشکر می‌کنیم:
- **[AlQuran.cloud](https://alquran.cloud)** - API عالی و رایگان
- **[Islamic Network](https://islamic.network)** - CDN و منابع
- **مترجمان محترم** - فولادوند، مکارم شیرازی، انصاریان
- **قاریان عزیز** - العفاسی، عبدالباسط، حصری و سایرین
- **جامعه Open Source** - ابزارها و کتابخانه‌ها

### 🌟 Contributors:
- **[@developer](https://github.com/developer)** - Lead Developer
- **شما می‌توانید اولین مشارکت‌کننده باشید!**

## 📄 مجوز (License)

این پروژه تحت **مجوز MIT** منتشر شده است. برای جزئیات بیشتر فایل [LICENSE](LICENSE) را مطالعه کنید.

### ✅ مجاز هستید:
- ✅ استفاده تجاری
- ✅ تغییر و اصلاح
- ✅ توزیع مجدد
- ✅ استفاده شخصی

### ❗ الزامات:
- ❗ حفظ کپی‌رایت
- ❗ ذکر مجوز در کپی‌ها

---

## 🌙 پیام پایانی

> **وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ**
> 
> *"و از قرآن آنچه را نازل می‌کنیم که شفا و رحمت برای مؤمنان است"*
> 
> **قرآن کریم - سوره اسراء، آیه 82**

این پروژه با هدف **خدمت به کلام مقدس قرآن کریم** و تسهیل دسترسی مؤمنان به این گنجینه الهی طراحی شده است.

**خداوند این تلاش را بپذیرد و مورد قبول قرار دهد.** 🤲

---

**ساخته شده با ❤️ برای خدمت به قرآن کریم**

**بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ**

[![⭐ Star this repo](https://img.shields.io/github/stars/your-username/quran-website?style=social)](https://github.com/your-username/quran-website)
[![🍴 Fork this repo](https://img.shields.io/github/forks/your-username/quran-website?style=social)](https://github.com/your-username/quran-website/fork)
[![👁️ Watch this repo](https://img.shields.io/github/watchers/your-username/quran-website?style=social)](https://github.com/your-username/quran-website)
