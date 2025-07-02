// ===== WEBSITE CONFIGURATION =====

const CONFIG = {
    // API Configuration - AlQuran.cloud
    api: {
        // Primary API endpoint - AlQuran.cloud
        baseURL: 'https://api.alquran.cloud/v1',
        
        // CDN endpoints
        audioCDN: 'https://cdn.islamic.network/quran/audio',
        imageCDN: 'https://cdn.islamic.network/quran/images',
        
        // Endpoints
        endpoints: {
            edition: '/edition',
            quran: '/quran',
            surah: '/surah',
            ayah: '/ayah',
            search: '/search',
            meta: '/meta'
        },
        
        // Request timeout (milliseconds)
        timeout: 15000,
        
        // Retry attempts
        retryAttempts: 3,
        
        // Delay between retries (milliseconds)
        retryDelay: 1000,
        
        // Default editions for AlQuran.cloud
        editions: {
            arabic: 'quran-uthmani',
            persian: 'fa.fooladvand',
            english: 'en.asad',
            audio: 'ar.alafasy'
        }
    },
    
    // Audio Configuration - AlQuran.cloud CDN
    audio: {
        // Reciters (using AlQuran.cloud editions)
        reciters: {
            'ar.alafasy': {
                name: 'مشاری راشد العفاسی',
                nameEn: 'Mishary Rashid Alafasy',
                edition: 'ar.alafasy',
                bitrate: 128
            },
            'ar.abdulsamad': {
                name: 'عبدالباسط عبدالصمد',
                nameEn: 'Abdul Basit Abdul Samad',
                edition: 'ar.abdulsamad',
                bitrate: 128
            },
            'ar.husary': {
                name: 'محمود خلیل الحصری',
                nameEn: 'Mahmoud Khalil Al-Hussary',
                edition: 'ar.husary',
                bitrate: 128
            },
            'ar.minshawi': {
                name: 'محمد صدیق المنشاوی',
                nameEn: 'Mohammad Siddiq Al-Minshawi',
                edition: 'ar.minshawi',
                bitrate: 128
            },
            'ar.sudais': {
                name: 'عبدالرحمن السدیس',
                nameEn: 'Abdul Rahman Al-Sudais',
                edition: 'ar.sudais',
                bitrate: 128
            },
            'ar.shuraim': {
                name: 'سعود الشریم',
                nameEn: 'Saud Al-Shuraim',
                edition: 'ar.shuraim',
                bitrate: 128
            }
        },
        
        // Default settings
        defaultReciter: 'ar.alafasy',
        defaultBitrate: 128,
        defaultVolume: 0.7,
        defaultSpeed: 1.0,
        autoplay: false,
        preload: 'metadata'
    },
    
    // Translation Configuration
    translations: {
        persian: {
            'fa.fooladvand': {
                name: 'فولادوند',
                nameEn: 'Fooladvand',
                author: 'محمد مهدی فولادوند'
            },
            'fa.makarem': {
                name: 'مکارم شیرازی',
                nameEn: 'Makarem Shirazi',
                author: 'ناصر مکارم شیرازی'
            },
            'fa.ansarian': {
                name: 'انصاریان',
                nameEn: 'Ansarian',
                author: 'حسین انصاریان'
            },
            'fa.ghomshei': {
                name: 'قمشه‌ای',
                nameEn: 'Ghomshei',
                author: 'محمدعلی قمشه‌ای'
            }
        },
        
        english: {
            'en.asad': {
                name: 'محمد اسد',
                nameEn: 'Muhammad Asad',
                author: 'Muhammad Asad'
            },
            'en.pickthall': {
                name: 'پیکتال',
                nameEn: 'Pickthall',
                author: 'Mohammed Marmaduke William Pickthall'
            },
            'en.yusufali': {
                name: 'یوسف علی',
                nameEn: 'Yusuf Ali',
                author: 'Abdullah Yusuf Ali'
            },
            'en.sahih': {
                name: 'صحیح انترنشنال',
                nameEn: 'Saheeh International',
                author: 'Saheeh International'
            }
        },
        
        // Default translations
        defaultPersian: 'fa.fooladvand',
        defaultEnglish: 'en.asad'
    },
    
    // Quran Structure
    quran: {
        totalSurahs: 114,
        totalVerses: 6236,
        totalJuzs: 30,
        totalPages: 604,
        totalManzils: 7,
        totalRukus: 556,
        
        // Meccan and Medinan surahs
        meccanSurahs: [1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 55, 56, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114],
        
        medinanSurahs: [2, 3, 4, 5, 8, 9, 13, 22, 24, 33, 47, 48, 49, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 98, 110],
        
        // Verses count per surah
        versesCount: [7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6]
    },
    
    // UI Configuration
    ui: {
        // Animation settings
        animations: {
            duration: {
                fast: 300,
                normal: 600,
                slow: 1000
            },
            easing: 'ease-in-out',
            enabled: true
        },
        
        // Pagination
        pagination: {
            surahs: 12,
            verses: 10,
            search: 20,
            favorites: 15
        },
        
        // Font sizes (rem)
        fontSizes: {
            arabic: {
                min: 1,
                max: 3,
                default: 1.5
            },
            persian: {
                min: 0.8,
                max: 1.8,
                default: 1
            },
            english: {
                min: 0.7,
                max: 1.5,
                default: 0.9
            }
        },
        
        // Themes
        themes: {
            light: 'light',
            dark: 'dark',
            auto: 'auto'
        },
        
        // Loading delays
        loadingDelays: {
            short: 500,
            medium: 1000,
            long: 2000
        }
    },
    
    // Local Storage Keys
    storage: {
        theme: 'quran_theme',
        language: 'quran_language',
        favorites: 'quran_favorites',
        lastRead: 'quran_last_read',
        settings: 'quran_settings',
        audioSettings: 'quran_audio_settings',
        searchHistory: 'quran_search_history',
        readingProgress: 'quran_reading_progress',
        bookmarks: 'quran_bookmarks',
        notes: 'quran_notes'
    },
    
    // Default Settings
    defaults: {
        theme: 'light',
        language: 'fa',
        persianTranslation: 'fa.fooladvand',
        englishTranslation: 'en.asad',
        showEnglish: false,
        reciter: 'ar.alafasy',
        audioSpeed: 1.0,
        volume: 0.7,
        autoplay: true,
        arabicFontSize: 24,
        persianFontSize: 16,
        englishFontSize: 14,
        showVerseNumbers: true,
        savePosition: true,
        darkMode: false
    },
    
    // Feature Flags
    features: {
        search: true,
        audio: true,
        favorites: true,
        notes: true,
        bookmarks: true,
        sharing: true,
        offline: false,
        notifications: true,
        analytics: false
    },
    
    // Error Messages
    errors: {
        network: 'خطا در اتصال به اینترنت. لطفاً اتصال خود را بررسی کنید.',
        apiError: 'خطا در دریافت اطلاعات از سرور. لطفاً دوباره تلاش کنید.',
        audioError: 'خطا در پخش صوت. لطفاً دوباره تلاش کنید.',
        notFound: 'آیه یا سوره مورد نظر یافت نشد.',
        invalidInput: 'ورودی نامعتبر است.',
        localStorage: 'خطا در ذخیره اطلاعات محلی.',
        unsupported: 'این ویژگی در مرورگر شما پشتیبانی نمی‌شود.',
        timeout: 'درخواست منقضی شد. لطفاً دوباره تلاش کنید.'
    },
    
    // Success Messages
    messages: {
        favoriteAdded: 'آیه به علاقه‌مندی‌ها اضافه شد',
        favoriteRemoved: 'آیه از علاقه‌مندی‌ها حذف شد',
        settingsSaved: 'تنظیمات ذخیره شد',
        bookmarkAdded: 'نشانک اضافه شد',
        bookmarkRemoved: 'نشانک حذف شد',
        copied: 'کپی شد',
        shared: 'با موفقیت به اشتراک گذاشته شد'
    },
    
    // Version and Credits
    app: {
        name: 'قرآن کریم',
        nameEn: 'Holy Quran',
        version: '1.0.0',
        author: 'Quran Website Developer',
        description: 'وب سایت جامع قرآن کریم با امکانات کامل',
        descriptionEn: 'Comprehensive Holy Quran website with complete features',
        url: 'https://quran-website.com',
        contact: 'info@quran-website.com',
        social: {
            telegram: '@quran_website',
            instagram: '@quran_website',
            twitter: '@quran_website'
        }
    },
    
    // Performance Settings
    performance: {
        // Lazy loading
        lazyLoading: true,
        lazyLoadingOffset: 100,
        
        // Caching
        cacheEnabled: true,
        cacheExpiry: 24 * 60 * 60 * 1000, // 24 hours
        
        // Image optimization
        imageOptimization: true,
        webpSupport: true,
        
        // Preloading
        preloadNextVerse: true,
        preloadPreviousVerse: true,
        
        // Debounce delays
        searchDebounce: 300,
        scrollDebounce: 100,
        resizeDebounce: 250
    },
    
    // Accessibility
    accessibility: {
        // Screen reader support
        screenReader: true,
        
        // High contrast mode
        highContrast: false,
        
        // Focus management
        focusManagement: true,
        
        // Keyboard navigation
        keyboardNavigation: true,
        
        // ARIA labels
        ariaLabels: true,
        
        // Reduced motion
        respectReducedMotion: true
    },
    
    // SEO Configuration
    seo: {
        siteName: 'قرآن کریم - وب سایت جامع قرآنی',
        description: 'مطالعه و گوش دادن به قرآن کریم با ترجمه فارسی و امکانات کامل',
        keywords: 'قرآن، قرآن کریم، ترجمه قرآن، تلاوت قرآن، Quran, Holy Quran',
        author: 'Quran Website',
        language: 'fa',
        direction: 'rtl',
        ogImage: 'assets/images/og-image.jpg',
        twitterCard: 'summary_large_image'
    }
};

// Surah Names in Arabic and Persian
CONFIG.surahNames = [
    { number: 1, arabic: "الفاتحة", persian: "فاتحه", transliteration: "Al-Fatiha", meaning: "گشایش", verses: 7, type: "meccan" },
    { number: 2, arabic: "البقرة", persian: "بقره", transliteration: "Al-Baqarah", meaning: "گاو ماده", verses: 286, type: "medinan" },
    { number: 3, arabic: "آل عمران", persian: "آل عمران", transliteration: "Aal-E-Imran", meaning: "خاندان عمران", verses: 200, type: "medinan" },
    { number: 4, arabic: "النساء", persian: "نساء", transliteration: "An-Nisa", meaning: "زنان", verses: 176, type: "medinan" },
    { number: 5, arabic: "المائدة", persian: "مائده", transliteration: "Al-Ma'idah", meaning: "خوان", verses: 120, type: "medinan" },
    { number: 6, arabic: "الأنعام", persian: "انعام", transliteration: "Al-An'am", meaning: "چهارپایان", verses: 165, type: "meccan" },
    { number: 7, arabic: "الأعراف", persian: "اعراف", transliteration: "Al-A'raf", meaning: "اعراف", verses: 206, type: "meccan" },
    { number: 8, arabic: "الأنفال", persian: "انفال", transliteration: "Al-Anfal", meaning: "غنائم", verses: 75, type: "medinan" },
    { number: 9, arabic: "التوبة", persian: "توبه", transliteration: "At-Tawbah", meaning: "توبه", verses: 129, type: "medinan" },
    { number: 10, arabic: "يونس", persian: "یونس", transliteration: "Yunus", meaning: "یونس", verses: 109, type: "meccan" },
    { number: 11, arabic: "هود", persian: "هود", transliteration: "Hud", meaning: "هود", verses: 123, type: "meccan" },
    { number: 12, arabic: "يوسف", persian: "یوسف", transliteration: "Yusuf", meaning: "یوسف", verses: 111, type: "meccan" },
    { number: 13, arabic: "الرعد", persian: "رعد", transliteration: "Ar-Ra'd", meaning: "رعد", verses: 43, type: "medinan" },
    { number: 14, arabic: "إبراهيم", persian: "ابراهیم", transliteration: "Ibrahim", meaning: "ابراهیم", verses: 52, type: "meccan" },
    { number: 15, arabic: "الحجر", persian: "حجر", transliteration: "Al-Hijr", meaning: "حجر", verses: 99, type: "meccan" },
    { number: 16, arabic: "النحل", persian: "نحل", transliteration: "An-Nahl", meaning: "زنبور", verses: 128, type: "meccan" },
    { number: 17, arabic: "الإسراء", persian: "اسراء", transliteration: "Al-Isra", meaning: "اسراء", verses: 111, type: "meccan" },
    { number: 18, arabic: "الكهف", persian: "کهف", transliteration: "Al-Kahf", meaning: "غار", verses: 110, type: "meccan" },
    { number: 19, arabic: "مريم", persian: "مریم", transliteration: "Maryam", meaning: "مریم", verses: 98, type: "meccan" },
    { number: 20, arabic: "طه", persian: "طه", transliteration: "Ta-Ha", meaning: "طه", verses: 135, type: "meccan" },
    { number: 21, arabic: "الأنبياء", persian: "انبیاء", transliteration: "Al-Anbiya", meaning: "پیغمبران", verses: 112, type: "meccan" },
    { number: 22, arabic: "الحج", persian: "حج", transliteration: "Al-Hajj", meaning: "حج", verses: 78, type: "medinan" },
    { number: 23, arabic: "المؤمنون", persian: "مؤمنون", transliteration: "Al-Mu'minun", meaning: "مؤمنان", verses: 118, type: "meccan" },
    { number: 24, arabic: "النور", persian: "نور", transliteration: "An-Nur", meaning: "نور", verses: 64, type: "medinan" },
    { number: 25, arabic: "الفرقان", persian: "فرقان", transliteration: "Al-Furqan", meaning: "فرقان", verses: 77, type: "meccan" },
    { number: 26, arabic: "الشعراء", persian: "شعراء", transliteration: "Ash-Shu'ara", meaning: "شاعران", verses: 227, type: "meccan" },
    { number: 27, arabic: "النمل", persian: "نمل", transliteration: "An-Naml", meaning: "مورچه", verses: 93, type: "meccan" },
    { number: 28, arabic: "القصص", persian: "قصص", transliteration: "Al-Qasas", meaning: "داستان‌ها", verses: 88, type: "meccan" },
    { number: 29, arabic: "العنكبوت", persian: "عنکبوت", transliteration: "Al-Ankabut", meaning: "عنکبوت", verses: 69, type: "meccan" },
    { number: 30, arabic: "الروم", persian: "روم", transliteration: "Ar-Rum", meaning: "روم", verses: 60, type: "meccan" },
    // Continue for all 114 surahs...
];

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}