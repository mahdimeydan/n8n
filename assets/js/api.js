// ===== API MODULE =====

class QuranAPI {
    constructor() {
        this.cache = new Map();
        this.currentEndpoint = CONFIG.api.alQuranCloud;
        this.retryCount = 0;
        this.maxRetries = CONFIG.api.retryAttempts;
        this.timeout = CONFIG.api.timeout;
    }

    // ===== UTILITY METHODS =====

    /**
     * Create cache key for requests
     */
    createCacheKey(endpoint, params = {}) {
        const paramString = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');
        return `${endpoint}${paramString ? '?' + paramString : ''}`;
    }

    /**
     * Check if data is cached and not expired
     */
    isCached(key) {
        if (!CONFIG.performance.cacheEnabled) return false;
        
        const cached = this.cache.get(key);
        if (!cached) return false;
        
        const now = Date.now();
        const isExpired = now - cached.timestamp > CONFIG.performance.cacheExpiry;
        
        if (isExpired) {
            this.cache.delete(key);
            return false;
        }
        
        return true;
    }

    /**
     * Get cached data
     */
    getCached(key) {
        const cached = this.cache.get(key);
        return cached ? cached.data : null;
    }

    /**
     * Set cache data
     */
    setCache(key, data) {
        if (!CONFIG.performance.cacheEnabled) return;
        
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    /**
     * Make HTTP request with timeout and retry logic
     */
    async makeRequest(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error(CONFIG.errors.timeout);
            }
            
            // Retry logic
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                await this.delay(CONFIG.api.retryDelay * this.retryCount);
                return this.makeRequest(url, options);
            }
            
            throw error;
        }
    }

    /**
     * Delay utility for retries
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Switch to fallback endpoint
     */
    switchToFallback() {
        const fallbacks = CONFIG.api.fallback;
        const currentIndex = fallbacks.indexOf(this.currentEndpoint);
        const nextIndex = (currentIndex + 1) % fallbacks.length;
        this.currentEndpoint = fallbacks[nextIndex];
        this.retryCount = 0;
    }

    // ===== SURAHS API =====

    /**
     * Get all surahs list
     */
    async getSurahs() {
        const cacheKey = this.createCacheKey('surahs');
        
        if (this.isCached(cacheKey)) {
            return this.getCached(cacheKey);
        }

        try {
            const url = `${this.currentEndpoint}/surah`;
            const response = await this.makeRequest(url);
            
            let surahs;
            if (response.data) {
                // AlQuran.cloud format
                surahs = response.data.map(surah => ({
                    number: surah.number,
                    name: surah.name,
                    englishName: surah.englishName,
                    englishNameTranslation: surah.englishNameTranslation,
                    revelationType: surah.revelationType,
                    numberOfAyahs: surah.numberOfAyahs
                }));
            } else {
                // Fallback to local data
                surahs = CONFIG.surahNames.map(surah => ({
                    number: surah.number,
                    name: surah.arabic,
                    englishName: surah.transliteration,
                    englishNameTranslation: surah.meaning,
                    revelationType: surah.type,
                    numberOfAyahs: surah.verses
                }));
            }

            this.setCache(cacheKey, surahs);
            return surahs;

        } catch (error) {
            console.error('Error fetching surahs:', error);
            // Return local data as fallback
            return CONFIG.surahNames.map(surah => ({
                number: surah.number,
                name: surah.arabic,
                englishName: surah.transliteration,
                englishNameTranslation: surah.meaning,
                revelationType: surah.type,
                numberOfAyahs: surah.verses
            }));
        }
    }

    /**
     * Get specific surah
     */
    async getSurah(surahNumber, editions = ['quran-uthmani']) {
        const cacheKey = this.createCacheKey(`surah/${surahNumber}`, { editions: editions.join(',') });
        
        if (this.isCached(cacheKey)) {
            return this.getCached(cacheKey);
        }

        try {
            let url;
            if (editions.length === 1) {
                url = `${this.currentEndpoint}/surah/${surahNumber}/${editions[0]}`;
            } else {
                url = `${this.currentEndpoint}/surah/${surahNumber}/editions/${editions.join(',')}`;
            }

            const response = await this.makeRequest(url);
            this.setCache(cacheKey, response.data);
            return response.data;

        } catch (error) {
            console.error(`Error fetching surah ${surahNumber}:`, error);
            this.switchToFallback();
            throw new Error(CONFIG.errors.apiError);
        }
    }

    /**
     * Get specific verse
     */
    async getVerse(surahNumber, verseNumber, editions = ['quran-uthmani']) {
        const cacheKey = this.createCacheKey(`verse/${surahNumber}:${verseNumber}`, { editions: editions.join(',') });
        
        if (this.isCached(cacheKey)) {
            return this.getCached(cacheKey);
        }

        try {
            let url;
            if (editions.length === 1) {
                url = `${this.currentEndpoint}/ayah/${surahNumber}:${verseNumber}/${editions[0]}`;
            } else {
                url = `${this.currentEndpoint}/ayah/${surahNumber}:${verseNumber}/editions/${editions.join(',')}`;
            }

            const response = await this.makeRequest(url);
            this.setCache(cacheKey, response.data);
            return response.data;

        } catch (error) {
            console.error(`Error fetching verse ${surahNumber}:${verseNumber}:`, error);
            this.switchToFallback();
            throw new Error(CONFIG.errors.apiError);
        }
    }

    /**
     * Get multiple verses for a surah with translations
     */
    async getSurahWithTranslations(surahNumber, persianTranslation = 'fa.fooladvand', englishTranslation = 'en.asad') {
        const editions = ['quran-uthmani', persianTranslation];
        if (englishTranslation) {
            editions.push(englishTranslation);
        }

        const cacheKey = this.createCacheKey(`surah_translations/${surahNumber}`, { editions: editions.join(',') });
        
        if (this.isCached(cacheKey)) {
            return this.getCached(cacheKey);
        }

        try {
            const response = await this.getSurah(surahNumber, editions);
            
            // Process response to organize by verse
            let verses = [];
            
            if (Array.isArray(response)) {
                // Multiple editions response
                const arabicEdition = response.find(edition => edition.identifier === 'quran-uthmani');
                const persianEdition = response.find(edition => edition.identifier === persianTranslation);
                const englishEdition = englishTranslation ? response.find(edition => edition.identifier === englishTranslation) : null;

                if (arabicEdition && arabicEdition.ayahs) {
                    verses = arabicEdition.ayahs.map((ayah, index) => ({
                        number: ayah.number,
                        numberInSurah: ayah.numberInSurah,
                        text: ayah.text,
                        persianTranslation: persianEdition?.ayahs?.[index]?.text || '',
                        englishTranslation: englishEdition?.ayahs?.[index]?.text || '',
                        surah: {
                            number: arabicEdition.number,
                            name: arabicEdition.name,
                            englishName: arabicEdition.englishName
                        }
                    }));
                }
            } else if (response.ayahs) {
                // Single edition response
                verses = response.ayahs.map(ayah => ({
                    number: ayah.number,
                    numberInSurah: ayah.numberInSurah,
                    text: ayah.text,
                    persianTranslation: '',
                    englishTranslation: '',
                    surah: {
                        number: response.number,
                        name: response.name,
                        englishName: response.englishName
                    }
                }));
            }

            this.setCache(cacheKey, verses);
            return verses;

        } catch (error) {
            console.error(`Error fetching surah ${surahNumber} with translations:`, error);
            throw new Error(CONFIG.errors.apiError);
        }
    }

    // ===== SEARCH API =====

    /**
     * Search in Quran
     */
    async search(query, surah = 'all', edition = 'fa.fooladvand') {
        const cacheKey = this.createCacheKey('search', { query, surah, edition });
        
        if (this.isCached(cacheKey)) {
            return this.getCached(cacheKey);
        }

        try {
            const url = `${this.currentEndpoint}/search/${encodeURIComponent(query)}/${surah}/${edition}`;
            const response = await this.makeRequest(url);
            
            const results = response.data?.matches || [];
            this.setCache(cacheKey, results);
            return results;

        } catch (error) {
            console.error('Error searching:', error);
            throw new Error(CONFIG.errors.apiError);
        }
    }

    // ===== AUDIO API =====

    /**
     * Get audio URL for verse
     */
    getAudioUrl(surahNumber, verseNumber, reciter = 'ar.alafasy') {
        const reciterConfig = CONFIG.audio.reciters[reciter];
        if (!reciterConfig) {
            console.error(`Reciter ${reciter} not found`);
            return null;
        }

        // Format numbers with leading zeros
        const formattedSurah = surahNumber.toString().padStart(3, '0');
        const formattedVerse = verseNumber.toString().padStart(3, '0');
        
        return `${reciterConfig.baseUrl}/${formattedSurah}${formattedVerse}.mp3`;
    }

    /**
     * Get audio URL for entire surah
     */
    getSurahAudioUrl(surahNumber, reciter = 'ar.alafasy') {
        const reciterConfig = CONFIG.audio.reciters[reciter];
        if (!reciterConfig) {
            console.error(`Reciter ${reciter} not found`);
            return null;
        }

        const formattedSurah = surahNumber.toString().padStart(3, '0');
        return `${reciterConfig.baseUrl}/${formattedSurah}.mp3`;
    }

    // ===== ADDITIONAL APIS =====

    /**
     * Get available editions/translations
     */
    async getEditions() {
        const cacheKey = this.createCacheKey('editions');
        
        if (this.isCached(cacheKey)) {
            return this.getCached(cacheKey);
        }

        try {
            const url = `${this.currentEndpoint}/edition`;
            const response = await this.makeRequest(url);
            
            this.setCache(cacheKey, response.data);
            return response.data;

        } catch (error) {
            console.error('Error fetching editions:', error);
            // Return default translations
            return {
                persian: CONFIG.translations.persian,
                english: CONFIG.translations.english
            };
        }
    }

    /**
     * Get Juz (Para) data
     */
    async getJuz(juzNumber, edition = 'quran-uthmani') {
        const cacheKey = this.createCacheKey(`juz/${juzNumber}`, { edition });
        
        if (this.isCached(cacheKey)) {
            return this.getCached(cacheKey);
        }

        try {
            const url = `${this.currentEndpoint}/juz/${juzNumber}/${edition}`;
            const response = await this.makeRequest(url);
            
            this.setCache(cacheKey, response.data);
            return response.data;

        } catch (error) {
            console.error(`Error fetching juz ${juzNumber}:`, error);
            throw new Error(CONFIG.errors.apiError);
        }
    }

    /**
     * Get random verse
     */
    async getRandomVerse(edition = 'quran-uthmani') {
        try {
            // Generate random surah and verse
            const randomSurahNumber = Math.floor(Math.random() * 114) + 1;
            const maxVerses = CONFIG.quran.versesCount[randomSurahNumber - 1];
            const randomVerseNumber = Math.floor(Math.random() * maxVerses) + 1;

            return await this.getVerse(randomSurahNumber, randomVerseNumber, [edition]);

        } catch (error) {
            console.error('Error fetching random verse:', error);
            throw new Error(CONFIG.errors.apiError);
        }
    }

    // ===== VALIDATION METHODS =====

    /**
     * Validate surah number
     */
    isValidSurah(surahNumber) {
        return surahNumber >= 1 && surahNumber <= CONFIG.quran.totalSurahs;
    }

    /**
     * Validate verse number for given surah
     */
    isValidVerse(surahNumber, verseNumber) {
        if (!this.isValidSurah(surahNumber)) return false;
        const maxVerses = CONFIG.quran.versesCount[surahNumber - 1];
        return verseNumber >= 1 && verseNumber <= maxVerses;
    }

    /**
     * Get surah info by number
     */
    getSurahInfo(surahNumber) {
        if (!this.isValidSurah(surahNumber)) return null;
        return CONFIG.surahNames[surahNumber - 1];
    }

    /**
     * Get verse count for surah
     */
    getVerseCount(surahNumber) {
        if (!this.isValidSurah(surahNumber)) return 0;
        return CONFIG.quran.versesCount[surahNumber - 1];
    }

    // ===== ERROR HANDLING =====

    /**
     * Handle API errors gracefully
     */
    handleError(error, context = '') {
        console.error(`API Error ${context}:`, error);

        if (error.message.includes('network') || error.message.includes('fetch')) {
            return CONFIG.errors.network;
        } else if (error.message.includes('timeout')) {
            return CONFIG.errors.timeout;
        } else if (error.message.includes('404')) {
            return CONFIG.errors.notFound;
        } else {
            return CONFIG.errors.apiError;
        }
    }

    // ===== BATCH OPERATIONS =====

    /**
     * Get multiple verses in batch
     */
    async getVerseBatch(verses, editions = ['quran-uthmani']) {
        const promises = verses.map(({ surah, verse }) => 
            this.getVerse(surah, verse, editions)
        );

        try {
            const results = await Promise.allSettled(promises);
            return results.map((result, index) => ({
                ...verses[index],
                data: result.status === 'fulfilled' ? result.value : null,
                error: result.status === 'rejected' ? result.reason : null
            }));
        } catch (error) {
            console.error('Error in batch verse fetch:', error);
            throw new Error(CONFIG.errors.apiError);
        }
    }

    // ===== CACHE MANAGEMENT =====

    /**
     * Clear all cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Get cache stats
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Create global API instance
const quranAPI = new QuranAPI();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuranAPI, quranAPI };
}