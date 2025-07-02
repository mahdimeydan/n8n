// ===== MAIN APPLICATION =====

class QuranWebsite {
    constructor() {
        this.currentSection = 'home';
        this.currentSurah = null;
        this.currentVerse = null;
        this.isLoading = false;
        this.settings = {};
        this.favorites = [];
        this.searchHistory = [];
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    // ===== INITIALIZATION =====

    async init() {
        try {
            this.showLoadingScreen();
            
            // Load settings and data
            await this.loadSettings();
            await this.loadFavorites();
            await this.loadSearchHistory();
            
            // Initialize modules
            this.initializeEventListeners();
            this.initializeNavigation();
            this.initializeTheme();
            this.initializeAnimations();
            
            // Load initial data
            await this.loadSurahs();
            
            // Setup sections
            this.setupSections();
            
            // Hide loading screen
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1500);

            console.log('قرآن کریم website initialized successfully');

        } catch (error) {
            console.error('Error initializing website:', error);
            this.showError('خطا در بارگذاری وب سایت');
            this.hideLoadingScreen();
        }
    }

    // ===== LOADING SCREEN =====

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // ===== EVENT LISTENERS =====

    initializeEventListeners() {
        // Navigation
        this.setupNavigationEvents();
        
        // Search
        this.setupSearchEvents();
        
        // Theme toggle
        this.setupThemeEvents();
        
        // Audio controls
        this.setupAudioEvents();
        
        // Scroll events
        this.setupScrollEvents();
        
        // Keyboard shortcuts
        this.setupKeyboardEvents();
        
        // Window events
        this.setupWindowEvents();
    }

    setupNavigationEvents() {
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.navigateToSection(target);
                
                // Close mobile menu
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Hero action buttons
        const heroButtons = document.querySelectorAll('.hero-actions .btn');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = button.textContent.trim();
                if (action.includes('شروع مطالعه')) {
                    this.navigateToSection('surahs');
                } else if (action.includes('آیه تصادفی')) {
                    this.openRandomVerse();
                }
            });
        });
    }

    setupSearchEvents() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput && searchBtn) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    if (e.target.value.length >= 2) {
                        this.performSearch(e.target.value);
                    }
                }, CONFIG.performance.searchDebounce);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(searchInput.value);
                }
            });

            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });
        }
    }

    setupThemeEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setupAudioEvents() {
        const audioToggle = document.getElementById('global-audio-toggle');
        if (audioToggle) {
            audioToggle.addEventListener('click', () => {
                this.toggleGlobalAudio();
            });
        }
    }

    setupScrollEvents() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, CONFIG.performance.scrollDebounce);
        });
    }

    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + F for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                this.focusSearch();
            }
            
            // Escape to close modals/overlays
            if (e.key === 'Escape') {
                this.closeAllOverlays();
            }
            
            // Arrow keys for navigation in verse reader
            if (this.currentSection === 'verse-reader') {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.nextVerse();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.previousVerse();
                } else if (e.key === ' ') {
                    e.preventDefault();
                    this.toggleAudioPlayback();
                }
            }
        });
    }

    setupWindowEvents() {
        // Resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, CONFIG.performance.resizeDebounce);
        });

        // Visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAudio();
            }
        });

        // Before unload - save state
        window.addEventListener('beforeunload', () => {
            this.saveCurrentState();
        });
    }

    // ===== NAVIGATION =====

    navigateToSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('main > section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            this.currentSection = sectionId;
            
            // Update navigation
            this.updateNavigationState(sectionId);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Load section-specific data
            this.loadSectionData(sectionId);
        }
    }

    updateNavigationState(activeSection) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    async loadSectionData(sectionId) {
        switch (sectionId) {
            case 'surahs':
                await this.loadSurahsSection();
                break;
            case 'search':
                this.setupSearchSection();
                break;
            case 'favorites':
                this.loadFavoritesSection();
                break;
            case 'settings':
                this.loadSettingsSection();
                break;
        }
    }

    // ===== SURAHS SECTION =====

    async loadSurahs() {
        try {
            this.showLoading('در حال بارگذاری سوره‌ها...');
            const surahs = await window.quranAPI.getSurahs();
            console.log('✅ Loaded surahs:', surahs.length);
            this.surahs = surahs;
            return surahs;
        } catch (error) {
            console.error('❌ Error loading surahs:', error);
            // Fallback to local data
            const localSurahs = CONFIG.surahNames.map(surah => ({
                number: surah.number,
                name: surah.arabic,
                englishName: surah.transliteration,
                englishNameTranslation: surah.meaning,
                revelationType: surah.type,
                numberOfAyahs: surah.verses
            }));
            this.surahs = localSurahs;
            this.showMessage('استفاده از اطلاعات محلی', 'warning');
            return localSurahs;
        } finally {
            this.hideLoading();
        }
    }

    async loadSurahsSection() {
        if (!this.surahs || this.surahs.length === 0) {
            await this.loadSurahs();
        }
        
        this.renderSurahs(this.surahs);
        this.setupSurahsEvents();
    }

    renderSurahs(surahs, filter = 'all') {
        const container = document.getElementById('surahs-container');
        if (!container) return;

        // Filter surahs
        let filteredSurahs = surahs;
        if (filter === 'meccan') {
            filteredSurahs = surahs.filter(surah => 
                CONFIG.quran.meccanSurahs.includes(surah.number)
            );
        } else if (filter === 'medinan') {
            filteredSurahs = surahs.filter(surah => 
                CONFIG.quran.medinanSurahs.includes(surah.number)
            );
        }

        // Clear container
        container.innerHTML = '';

        // Render surah cards
        filteredSurahs.forEach((surah, index) => {
            const surahCard = this.createSurahCard(surah, index);
            container.appendChild(surahCard);
        });

        // Add scroll reveal animations
        this.addScrollRevealAnimations();
    }

    createSurahCard(surah, index) {
        const card = document.createElement('div');
        card.className = 'surah-card scroll-reveal';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const surahInfo = CONFIG.surahNames[surah.number - 1];
        const revelationType = CONFIG.quran.meccanSurahs.includes(surah.number) ? 'مکی' : 'مدنی';
        
        card.innerHTML = `
            <div class="surah-header">
                <div class="surah-number">${surah.number}</div>
                <div class="surah-info">
                    <h3>${surahInfo?.persian || surah.englishName}</h3>
                    <div class="arabic-name">${surah.name}</div>
                </div>
            </div>
            <div class="surah-meta">
                <span><i class="fas fa-quote-right"></i> ${surah.numberOfAyahs} آیه</span>
                <span><i class="fas fa-map-marker-alt"></i> ${revelationType}</span>
            </div>
            <div class="surah-description">
                ${surahInfo?.meaning || surah.englishNameTranslation}
            </div>
            <div class="surah-actions">
                <button class="surah-action-btn" onclick="app.openSurah(${surah.number})">
                    <i class="fas fa-book-open"></i>
                    مطالعه
                </button>
                <button class="surah-action-btn" onclick="app.playSurah(${surah.number})">
                    <i class="fas fa-play"></i>
                    پخش
                </button>
                <button class="surah-action-btn" onclick="app.toggleSurahFavorite(${surah.number})">
                    <i class="fas fa-heart"></i>
                    علاقه‌مندی
                </button>
            </div>
        `;

        return card;
    }

    setupSurahsEvents() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter surahs
                const filter = btn.getAttribute('data-filter');
                this.renderSurahs(this.surahs, filter);
            });
        });

        // View toggle buttons
        const viewBtns = document.querySelectorAll('.view-btn');
        const surahsContainer = document.getElementById('surahs-container');
        
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const view = btn.getAttribute('data-view');
                if (view === 'list') {
                    surahsContainer.className = 'surahs-list';
                } else {
                    surahsContainer.className = 'surahs-grid';
                }
            });
        });
    }

    // ===== VERSE READER =====

    async openSurah(surahNumber) {
        try {
            this.showLoading(`در حال بارگذاری سوره ${surahNumber}...`);
            
            // Get surah with Persian translation
            const surahData = await window.quranAPI.getSurahWithTranslation(
                surahNumber,
                this.settings.persianTranslation || CONFIG.api.editions.persian
            );
            
            this.currentSurah = surahNumber;
            this.currentSurahData = surahData;
            
            this.showVerseReader(surahData);
            console.log('✅ Opened surah:', surahNumber);
            
        } catch (error) {
            console.error('❌ Error opening surah:', error);
            this.showError('خطا در بارگذاری سوره');
        } finally {
            this.hideLoading();
        }
    }

    showVerseReader(surahData) {
        // Navigate to verse-reader section
        this.navigateToSection('verse-reader');

        // Update surah info
        this.updateSurahInfo(surahData);
        
        // Render verses
        this.renderVerses(surahData.ayahs);
        
        // Setup audio
        this.setupVerseAudio();
    }

    updateSurahInfo(surahData) {
        const surahName = document.getElementById('current-surah-name');
        const surahInfoEl = document.getElementById('current-surah-info');
        
        if (surahName && surahInfoEl) {
            const localInfo = CONFIG.surahNames[surahData.number - 1];
            surahName.textContent = localInfo?.persian || surahData.englishName;
            surahInfoEl.textContent = `${surahData.number} • ${surahData.numberOfAyahs} آیه • ${surahData.revelationType === 'Meccan' ? 'مکی' : 'مدنی'}`;
        }
        
        // Update header with surah name
        const pageTitle = document.querySelector('title');
        if (pageTitle) {
            pageTitle.textContent = `${localInfo?.persian || surahData.englishName} - قرآن کریم`;
        }
    }

    renderVerses(verses) {
        const container = document.getElementById('verses-list');
        if (!container) return;

        container.innerHTML = '';

        verses.forEach((verse, index) => {
            const verseCard = this.createVerseCard(verse, index);
            container.appendChild(verseCard);
        });

        // Add scroll reveal animations
        this.addScrollRevealAnimations();
    }

    createVerseCard(verse, index) {
        const card = document.createElement('div');
        card.className = 'verse-card scroll-reveal';
        card.setAttribute('data-verse-number', verse.numberInSurah);
        card.setAttribute('data-global-number', verse.number);
        card.style.animationDelay = `${index * 0.1}s`;

        const isFavorited = this.isVerseFavorited(verse.number);
        
        card.innerHTML = `
            <div class="verse-header">
                <div class="verse-number">${verse.numberInSurah}</div>
                <div class="verse-actions">
                    <button class="verse-action-btn" onclick="app.playVerse(${verse.number})" title="پخش">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="verse-action-btn ${isFavorited ? 'favorited' : ''}" onclick="app.toggleVerseFavorite(${verse.number})" title="علاقه‌مندی">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="verse-action-btn" onclick="app.copyVerse(${verse.number})" title="کپی">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="verse-action-btn" onclick="app.shareVerse(${verse.number})" title="اشتراک">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
            <div class="verse-text">
                <div class="verse-arabic" style="font-size: ${this.settings.arabicFontSize || 24}px">
                    ${verse.text}
                </div>
                ${verse.translation ? `
                    <div class="verse-translation" style="font-size: ${this.settings.persianFontSize || 16}px">
                        ${verse.translation}
                    </div>
                ` : ''}
                ${verse.englishTranslation && this.settings.showEnglish ? `
                    <div class="verse-english" style="font-size: ${this.settings.englishFontSize || 14}px">
                        ${verse.englishTranslation}
                    </div>
                ` : ''}
            </div>
        `;

        return card;
    }

    // ===== AUDIO METHODS =====

    playVerse(globalVerseNumber) {
        try {
            const audioUrl = window.quranAPI.getAyahAudioURL(
                globalVerseNumber,
                this.settings.reciter || CONFIG.audio.defaultReciter
            );
            
            console.log('🎵 Playing verse audio:', audioUrl);
            
            // Stop any currently playing audio
            this.stopAudio();
            
            // Create new audio element
            this.currentAudio = new Audio(audioUrl);
            this.currentAudio.volume = this.settings.volume || CONFIG.audio.defaultVolume;
            this.currentAudio.playbackRate = this.settings.audioSpeed || CONFIG.audio.defaultSpeed;
            
            // Add event listeners
            this.currentAudio.addEventListener('loadstart', () => {
                this.showMessage('در حال بارگذاری صوت...', 'info');
            });
            
            this.currentAudio.addEventListener('canplay', () => {
                this.hideLoading();
            });
            
            this.currentAudio.addEventListener('play', () => {
                this.updateAudioUI(globalVerseNumber, 'playing');
            });
            
            this.currentAudio.addEventListener('pause', () => {
                this.updateAudioUI(globalVerseNumber, 'paused');
            });
            
            this.currentAudio.addEventListener('ended', () => {
                this.updateAudioUI(globalVerseNumber, 'ended');
                this.currentAudio = null;
            });
            
            this.currentAudio.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                this.showError('خطا در پخش صوت');
                this.currentAudio = null;
            });
            
            // Play the audio
            this.currentAudio.play().catch(error => {
                console.error('Audio play error:', error);
                this.showError('خطا در پخش صوت');
            });
            
        } catch (error) {
            console.error('Error playing verse:', error);
            this.showError('خطا در پخش آیه');
        }
    }

    playSurah(surahNumber) {
        try {
            const audioUrl = window.quranAPI.getSurahAudioURL(
                surahNumber,
                this.settings.reciter || CONFIG.audio.defaultReciter
            );
            
            console.log('🎵 Playing surah audio:', audioUrl);
            
            // Stop any currently playing audio
            this.stopAudio();
            
            // Create new audio element
            this.currentAudio = new Audio(audioUrl);
            this.currentAudio.volume = this.settings.volume || CONFIG.audio.defaultVolume;
            this.currentAudio.playbackRate = this.settings.audioSpeed || CONFIG.audio.defaultSpeed;
            
            // Add event listeners
            this.currentAudio.addEventListener('loadstart', () => {
                this.showMessage('در حال بارگذاری صوت سوره...', 'info');
            });
            
            this.currentAudio.addEventListener('canplay', () => {
                this.hideLoading();
            });
            
            this.currentAudio.addEventListener('error', (e) => {
                console.error('Surah audio error:', e);
                this.showError('خطا در پخش سوره');
                this.currentAudio = null;
            });
            
            // Play the audio
            this.currentAudio.play().catch(error => {
                console.error('Surah audio play error:', error);
                this.showError('خطا در پخش سوره');
            });
            
        } catch (error) {
            console.error('Error playing surah:', error);
            this.showError('خطا در پخش سوره');
        }
    }

    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        
        // Reset all audio UI states
        const playButtons = document.querySelectorAll('.verse-action-btn i.fa-pause');
        playButtons.forEach(btn => {
            btn.className = 'fas fa-play';
        });
    }

    updateAudioUI(verseNumber, state) {
        const playButton = document.querySelector(`[onclick*="playVerse(${verseNumber})"] i`);
        if (playButton) {
            switch (state) {
                case 'playing':
                    playButton.className = 'fas fa-pause';
                    break;
                case 'paused':
                case 'ended':
                    playButton.className = 'fas fa-play';
                    break;
            }
        }
    }

    setupVerseAudio() {
        // Add audio control event listeners if needed
        console.log('🎵 Audio system ready');
    }

    // ===== UTILITY METHODS =====

    async performSearch(query) {
        if (!query.trim() || query.trim().length < 2) {
            this.showMessage('لطفاً حداقل 2 حرف برای جستجو وارد کنید', 'warning');
            return;
        }

        try {
            this.showLoading(`در حال جستجو برای "${query}"...`);
            
            const results = await window.quranAPI.searchQuran(
                query.trim(),
                this.settings.persianTranslation || CONFIG.api.editions.persian,
                'all'
            );
            
            console.log('🔍 Search results:', results);
            
            this.displaySearchResults(results, query);
            this.addToSearchHistory(query);
            this.navigateToSection('search');
            
        } catch (error) {
            console.error('❌ Search error:', error);
            this.showError('خطا در جستجو');
        } finally {
            this.hideLoading();
        }
    }

    displaySearchResults(searchData, query) {
        const container = document.getElementById('search-results');
        if (!container) return;

        const results = searchData.results || [];
        const total = searchData.total || 0;

        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-content">
                    <i class="fas fa-search"></i>
                    <h3>نتیجه‌ای یافت نشد</h3>
                    <p>برای "${query}" هیچ نتیجه‌ای پیدا نشد</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="search-results-header">
                <h3>${total} نتیجه برای "${query}"</h3>
            </div>
            <div class="search-results-list">
                ${results.map(result => this.createSearchResultCard(result)).join('')}
            </div>
        `;
        
        // Add animation to results
        this.addScrollRevealAnimations();
    }

    createSearchResultCard(result) {
        const surahInfo = CONFIG.surahNames[result.surah.number - 1];
        
        return `
            <div class="search-result-card scroll-reveal" onclick="app.openVerse(${result.surah.number}, ${result.numberInSurah})">
                <div class="result-header">
                    <span class="result-reference">
                        ${surahInfo?.persian || result.surah.englishName} • آیه ${result.numberInSurah}
                    </span>
                    <span class="result-surah-number">${result.surah.number}</span>
                </div>
                <div class="result-text">
                    ${result.text}
                </div>
            </div>
        `;
    }

    async openRandomVerse() {
        try {
            this.showLoading('در حال انتخاب آیه تصادفی...');
            
            // Generate random surah and verse
            const randomSurahNumber = Math.floor(Math.random() * 114) + 1;
            const maxVerses = CONFIG.quran.versesCount[randomSurahNumber - 1];
            const randomVerseNumber = Math.floor(Math.random() * maxVerses) + 1;
            
            console.log(`🎲 Random verse: Surah ${randomSurahNumber}, Verse ${randomVerseNumber}`);
            
            // Navigate to the verse in its surah context
            await this.openSurah(randomSurahNumber);
            
            // Scroll to the specific verse
            this.scrollToVerse(randomVerseNumber);
            
        } catch (error) {
            console.error('❌ Error opening random verse:', error);
            this.showError('خطا در بارگذاری آیه تصادفی');
        } finally {
            this.hideLoading();
        }
    }

    scrollToVerse(verseNumber) {
        setTimeout(() => {
            const verseCard = document.querySelector(`[data-verse-number="${verseNumber}"]`);
            if (verseCard) {
                verseCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                verseCard.classList.add('verse-highlight');
                
                setTimeout(() => {
                    verseCard.classList.remove('verse-highlight');
                }, 3000);
            }
        }, 500);
    }

    // ===== THEME AND SETTINGS =====

    async loadSettings() {
        try {
            const saved = localStorage.getItem(CONFIG.storage.settings);
            this.settings = saved ? JSON.parse(saved) : { ...CONFIG.defaults };
        } catch (error) {
            console.error('Error loading settings:', error);
            this.settings = { ...CONFIG.defaults };
        }
    }

    saveSettings() {
        try {
            localStorage.setItem(CONFIG.storage.settings, JSON.stringify(this.settings));
            this.showMessage(CONFIG.messages.settingsSaved);
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showError(CONFIG.errors.localStorage);
        }
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        this.updateThemeIcon();
        this.saveSettings();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (this.settings.theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    // ===== FAVORITES =====

    async loadFavorites() {
        try {
            const saved = localStorage.getItem(CONFIG.storage.favorites);
            this.favorites = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            this.favorites = [];
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem(CONFIG.storage.favorites, JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }

    isVerseFavorited(verseNumber) {
        return this.favorites.includes(verseNumber);
    }

    toggleVerseFavorite(verseNumber) {
        const index = this.favorites.indexOf(verseNumber);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showMessage(CONFIG.messages.favoriteRemoved);
        } else {
            this.favorites.push(verseNumber);
            this.showMessage(CONFIG.messages.favoriteAdded);
        }
        
        this.saveFavorites();
        this.updateFavoriteUI(verseNumber);
    }

    updateFavoriteUI(verseNumber) {
        const buttons = document.querySelectorAll(`[onclick*="toggleVerseFavorite(${verseNumber})"]`);
        buttons.forEach(btn => {
            if (this.isVerseFavorited(verseNumber)) {
                btn.classList.add('favorited');
            } else {
                btn.classList.remove('favorited');
            }
        });
    }

    // ===== ANIMATIONS =====

    initializeAnimations() {
        if (!CONFIG.ui.animations.enabled) return;
        
        this.addScrollRevealAnimations();
        this.addStaggerAnimations();
    }

    addScrollRevealAnimations() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    addStaggerAnimations() {
        const staggerContainers = document.querySelectorAll('.stagger-animation');
        staggerContainers.forEach(container => {
            const children = container.children;
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    // ===== UI UTILITIES =====

    showLoading(message = 'در حال بارگذاری...') {
        this.isLoading = true;
        
        // Show loading spinner or overlay
        const loadingElements = document.querySelectorAll('.loading-dots');
        loadingElements.forEach(el => el.style.display = 'inline-block');
        
        // Update loading message if element exists
        const loadingText = document.getElementById('loading-text');
        if (loadingText) {
            loadingText.textContent = message;
        }
        
        // Show loading notification
        this.showMessage(message, 'info');
    }

    hideLoading() {
        this.isLoading = false;
        const loadingElements = document.querySelectorAll('.loading-dots');
        loadingElements.forEach(el => el.style.display = 'none');
    }

    showMessage(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        let icon;
        switch (type) {
            case 'success':
                icon = 'fa-check-circle';
                break;
            case 'error':
                icon = 'fa-exclamation-circle';
                break;
            case 'warning':
                icon = 'fa-exclamation-triangle';
                break;
            case 'info':
                icon = 'fa-info-circle';
                break;
            default:
                icon = 'fa-info-circle';
        }
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('notification-enter');
        }, 10);

        setTimeout(() => {
            notification.classList.add('notification-exit');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, type === 'info' ? 2000 : 3000);
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    setupSections() {
        // Initially show home section and hide others
        const sections = document.querySelectorAll('main > section');
        sections.forEach((section, index) => {
            if (section.id === 'home') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    handleScroll() {
        const header = document.getElementById('main-header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    handleResize() {
        // Handle responsive changes
        if (window.innerWidth > 992) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    }

    saveCurrentState() {
        const state = {
            currentSection: this.currentSection,
            currentSurah: this.currentSurah,
            currentVerse: this.currentVerse,
            timestamp: Date.now()
        };
        
        try {
            localStorage.setItem(CONFIG.storage.lastRead, JSON.stringify(state));
        } catch (error) {
            console.error('Error saving current state:', error);
        }
    }

    // ===== SEARCH HISTORY =====

    async loadSearchHistory() {
        try {
            const saved = localStorage.getItem(CONFIG.storage.searchHistory);
            this.searchHistory = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading search history:', error);
            this.searchHistory = [];
        }
    }

    addToSearchHistory(query) {
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            if (this.searchHistory.length > 10) {
                this.searchHistory = this.searchHistory.slice(0, 10);
            }
            
            try {
                localStorage.setItem(CONFIG.storage.searchHistory, JSON.stringify(this.searchHistory));
            } catch (error) {
                console.error('Error saving search history:', error);
            }
        }
    }

    // ===== ADDITIONAL UTILITY METHODS =====

    copyVerse(globalVerseNumber) {
        try {
            const verseCard = document.querySelector(`[data-global-number="${globalVerseNumber}"]`);
            if (verseCard) {
                const arabicText = verseCard.querySelector('.verse-arabic').textContent;
                const translationText = verseCard.querySelector('.verse-translation')?.textContent || '';
                
                const textToCopy = translationText ? 
                    `${arabicText}\n\n${translationText}` : 
                    arabicText;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    this.showMessage('آیه کپی شد');
                }).catch(error => {
                    console.error('Copy error:', error);
                    this.showError('خطا در کپی کردن');
                });
            }
        } catch (error) {
            console.error('Error copying verse:', error);
            this.showError('خطا در کپی کردن آیه');
        }
    }

    shareVerse(globalVerseNumber) {
        try {
            const surahAndVerse = window.quranAPI.getSurahAndVerse(globalVerseNumber);
            const surahInfo = CONFIG.surahNames[surahAndVerse.surahNumber - 1];
            
            const shareText = `سوره ${surahInfo?.persian} - آیه ${surahAndVerse.verseNumber}`;
            const shareUrl = `${window.location.origin}${window.location.pathname}#surah-${surahAndVerse.surahNumber}-verse-${surahAndVerse.verseNumber}`;
            
            if (navigator.share) {
                navigator.share({
                    title: shareText,
                    text: shareText,
                    url: shareUrl
                }).then(() => {
                    this.showMessage('با موفقیت به اشتراک گذاشته شد');
                }).catch(error => {
                    console.error('Share error:', error);
                    this.copyToClipboard(shareUrl);
                });
            } else {
                this.copyToClipboard(shareUrl);
            }
        } catch (error) {
            console.error('Error sharing verse:', error);
            this.showError('خطا در اشتراک‌گذاری آیه');
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showMessage('لینک کپی شد');
        }).catch(error => {
            console.error('Clipboard error:', error);
            this.showError('خطا در کپی کردن لینک');
        });
    }

    openVerse(surahNumber, verseNumber) {
        // Open the surah and scroll to the verse
        this.openSurah(surahNumber).then(() => {
            this.scrollToVerse(verseNumber);
        }).catch(error => {
            console.error('Error opening verse:', error);
            this.showError('خطا در بارگذاری آیه');
        });
    }

    toggleSurahFavorite(surahNumber) {
        // This would be for favoriting entire surahs
        // Can be implemented later if needed
        this.showMessage('این ویژگی به زودی اضافه خواهد شد', 'info');
    }

    focusSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }

    closeAllOverlays() {
        // Close any open modals, dropdowns, etc.
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    nextVerse() {
        // Navigate to next verse in current surah
        if (this.currentSurahData && this.currentVerse) {
            const nextVerse = this.currentVerse + 1;
            if (nextVerse <= this.currentSurahData.numberOfAyahs) {
                this.scrollToVerse(nextVerse);
            }
        }
    }

    previousVerse() {
        // Navigate to previous verse in current surah
        if (this.currentSurahData && this.currentVerse) {
            const prevVerse = this.currentVerse - 1;
            if (prevVerse >= 1) {
                this.scrollToVerse(prevVerse);
            }
        }
    }

    toggleAudioPlayback() {
        if (this.currentAudio) {
            if (this.currentAudio.paused) {
                this.currentAudio.play();
            } else {
                this.currentAudio.pause();
            }
        }
    }

    pauseAudio() {
        if (this.currentAudio && !this.currentAudio.paused) {
            this.currentAudio.pause();
        }
    }

    toggleGlobalAudio() {
        // Toggle global audio settings
        this.settings.audioEnabled = !this.settings.audioEnabled;
        this.saveSettings();
        
        if (!this.settings.audioEnabled) {
            this.stopAudio();
            this.showMessage('صوت غیرفعال شد');
        } else {
            this.showMessage('صوت فعال شد');
        }
    }

    setupSearchSection() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    loadFavoritesSection() {
        // Load and display favorites
        const container = document.getElementById('favorites-list');
        if (container) {
            if (this.favorites.length === 0) {
                container.innerHTML = `
                    <div class="no-content">
                        <i class="fas fa-heart"></i>
                        <h3>هیچ آیه‌ای در علاقه‌مندی‌ها نیست</h3>
                        <p>آیات مورد علاقه خود را اضافه کنید</p>
                    </div>
                `;
            } else {
                // Load favorite verses and display them
                this.loadFavoriteVerses();
            }
        }
    }

    async loadFavoriteVerses() {
        // This would load the actual verse data for favorites
        // Implementation can be added later
        this.showMessage('این بخش در حال توسعه است', 'info');
    }

    loadSettingsSection() {
        // Load settings interface
        this.showMessage('بخش تنظیمات در حال توسعه است', 'info');
    }
}

// ===== GLOBAL FUNCTIONS =====

// These functions are called from HTML onclick events
window.scrollToSection = function(sectionId) {
    app.navigateToSection(sectionId);
};

window.openRandomVerse = function() {
    app.openRandomVerse();
};

window.closeVerseReader = function() {
    app.navigateToSection('surahs');
};

window.clearAllFavorites = function() {
    if (confirm('آیا از پاک کردن همه علاقه‌مندی‌ها اطمینان دارید؟')) {
        app.favorites = [];
        app.saveFavorites();
        app.showMessage('همه علاقه‌مندی‌ها پاک شد');
        app.loadFavoritesSection();
    }
};

window.resetSettings = function() {
    if (confirm('آیا از بازنشانی تنظیمات اطمینان دارید؟')) {
        app.settings = { ...CONFIG.defaults };
        app.saveSettings();
        app.initializeTheme();
        app.loadSettingsSection();
        app.showMessage('تنظیمات بازنشانی شد');
    }
};

// Initialize the application
const app = new QuranWebsite();