// بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
// Quran API Handler - AlQuran.cloud Integration

class QuranAPI {
    constructor() {
        this.baseURL = CONFIG.api.baseURL;
        this.audioCDN = CONFIG.api.audioCDN;
        this.imageCDN = CONFIG.api.imageCDN;
        this.cache = new Map();
        this.cacheExpiry = CONFIG.performance.cacheExpiry;
    }

    // ===== CORE REQUEST HANDLER =====
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const cacheKey = `${url}_${JSON.stringify(options)}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheExpiry) {
                console.log('📦 Cache hit:', endpoint);
                return cached.data;
            }
            this.cache.delete(cacheKey);
        }

        try {
            console.log('🌐 API Request:', url);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.api.timeout);
            
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                ...options
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Validate AlQuran.cloud response structure
            if (data.code !== 200 || !data.data) {
                throw new Error(data.message || 'Invalid API response');
            }

            // Cache successful response
            this.cache.set(cacheKey, {
                data: data.data,
                timestamp: Date.now()
            });

            console.log('✅ API Success:', endpoint);
            return data.data;

        } catch (error) {
            console.error('❌ API Error:', error);
            
            if (error.name === 'AbortError') {
                throw new Error('درخواست منقضی شد');
            }
            
            throw new Error(`خطا در دریافت اطلاعات: ${error.message}`);
        }
    }

    // ===== SURAH OPERATIONS =====
    
    // Get all surahs list
    async getSurahs() {
        try {
            const data = await this.makeRequest('/surah');
            return data.map(surah => ({
                number: surah.number,
                name: surah.name,
                englishName: surah.englishName,
                englishNameTranslation: surah.englishNameTranslation,
                numberOfAyahs: surah.numberOfAyahs,
                revelationType: surah.revelationType
            }));
        } catch (error) {
            console.error('Error fetching surahs:', error);
            throw error;
        }
    }

    // Get specific surah with verses
    async getSurah(surahNumber, edition = CONFIG.api.editions.arabic) {
        try {
            const data = await this.makeRequest(`/surah/${surahNumber}/${edition}`);
            return {
                number: data.number,
                name: data.name,
                englishName: data.englishName,
                englishNameTranslation: data.englishNameTranslation,
                numberOfAyahs: data.numberOfAyahs,
                revelationType: data.revelationType,
                ayahs: data.ayahs.map(ayah => ({
                    number: ayah.number,
                    numberInSurah: ayah.numberInSurah,
                    text: ayah.text,
                    surah: ayah.surah,
                    page: ayah.page,
                    juz: ayah.juz,
                    manzil: ayah.manzil,
                    ruku: ayah.ruku,
                    hizbQuarter: ayah.hizbQuarter,
                    sajda: ayah.sajda || false
                }))
            };
        } catch (error) {
            console.error(`Error fetching surah ${surahNumber}:`, error);
            throw error;
        }
    }

    // Get surah with multiple editions (Arabic + Translation)
    async getSurahWithTranslation(surahNumber, persianEdition = CONFIG.api.editions.persian) {
        try {
            const editions = `${CONFIG.api.editions.arabic},${persianEdition}`;
            const data = await this.makeRequest(`/surah/${surahNumber}/editions/${editions}`);
            
            const arabicData = data[0];
            const translationData = data[1];
            
            return {
                number: arabicData.number,
                name: arabicData.name,
                englishName: arabicData.englishName,
                englishNameTranslation: arabicData.englishNameTranslation,
                numberOfAyahs: arabicData.numberOfAyahs,
                revelationType: arabicData.revelationType,
                ayahs: arabicData.ayahs.map((ayah, index) => ({
                    number: ayah.number,
                    numberInSurah: ayah.numberInSurah,
                    text: ayah.text,
                    translation: translationData.ayahs[index]?.text || '',
                    surah: ayah.surah,
                    page: ayah.page,
                    juz: ayah.juz,
                    manzil: ayah.manzil,
                    ruku: ayah.ruku,
                    hizbQuarter: ayah.hizbQuarter,
                    sajda: ayah.sajda || false
                }))
            };
        } catch (error) {
            console.error(`Error fetching surah ${surahNumber} with translation:`, error);
            throw error;
        }
    }

    // ===== AYAH OPERATIONS =====
    
    // Get specific ayah
    async getAyah(ayahNumber, edition = CONFIG.api.editions.arabic) {
        try {
            const data = await this.makeRequest(`/ayah/${ayahNumber}/${edition}`);
            return {
                number: data.number,
                numberInSurah: data.numberInSurah,
                text: data.text,
                surah: {
                    number: data.surah.number,
                    name: data.surah.name,
                    englishName: data.surah.englishName,
                    englishNameTranslation: data.surah.englishNameTranslation,
                    numberOfAyahs: data.surah.numberOfAyahs,
                    revelationType: data.surah.revelationType
                },
                page: data.page,
                juz: data.juz,
                manzil: data.manzil,
                ruku: data.ruku,
                hizbQuarter: data.hizbQuarter,
                sajda: data.sajda || false
            };
        } catch (error) {
            console.error(`Error fetching ayah ${ayahNumber}:`, error);
            throw error;
        }
    }

    // Get ayah with translation
    async getAyahWithTranslation(ayahNumber, persianEdition = CONFIG.api.editions.persian) {
        try {
            const editions = `${CONFIG.api.editions.arabic},${persianEdition}`;
            const data = await this.makeRequest(`/ayah/${ayahNumber}/editions/${editions}`);
            
            const arabicData = data[0];
            const translationData = data[1];
            
            return {
                number: arabicData.number,
                numberInSurah: arabicData.numberInSurah,
                text: arabicData.text,
                translation: translationData.text,
                surah: arabicData.surah,
                page: arabicData.page,
                juz: arabicData.juz,
                manzil: arabicData.manzil,
                ruku: arabicData.ruku,
                hizbQuarter: arabicData.hizbQuarter,
                sajda: arabicData.sajda || false
            };
        } catch (error) {
            console.error(`Error fetching ayah ${ayahNumber} with translation:`, error);
            throw error;
        }
    }

    // ===== SEARCH OPERATIONS =====
    
    // Search in Quran
    async searchQuran(keyword, edition = CONFIG.api.editions.persian, surah = 'all') {
        try {
            if (!keyword || keyword.trim().length < 2) {
                throw new Error('کلمه جستجو باید حداقل 2 حرف باشد');
            }

            const cleanKeyword = encodeURIComponent(keyword.trim());
            const data = await this.makeRequest(`/search/${cleanKeyword}/${surah}/${edition}`);
            
            return {
                query: keyword,
                total: data.count,
                results: data.matches.map(match => ({
                    number: match.number,
                    numberInSurah: match.numberInSurah,
                    text: match.text,
                    surah: {
                        number: match.surah.number,
                        name: match.surah.name,
                        englishName: match.surah.englishName,
                        englishNameTranslation: match.surah.englishNameTranslation
                    }
                }))
            };
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }

    // ===== AUDIO OPERATIONS =====
    
    // Get audio URL for ayah
    getAyahAudioURL(ayahNumber, reciter = CONFIG.audio.defaultReciter) {
        const reciterConfig = CONFIG.audio.reciters[reciter];
        if (!reciterConfig) {
            console.warn(`Reciter ${reciter} not found, using default`);
            reciter = CONFIG.audio.defaultReciter;
        }
        
        const bitrate = reciterConfig.bitrate || CONFIG.audio.defaultBitrate;
        const edition = reciterConfig.edition;
        
        return `${this.audioCDN}/${bitrate}/${edition}/${ayahNumber}.mp3`;
    }

    // Get audio URL for full surah
    getSurahAudioURL(surahNumber, reciter = CONFIG.audio.defaultReciter) {
        const reciterConfig = CONFIG.audio.reciters[reciter];
        if (!reciterConfig) {
            console.warn(`Reciter ${reciter} not found, using default`);
            reciter = CONFIG.audio.defaultReciter;
        }
        
        const bitrate = reciterConfig.bitrate || CONFIG.audio.defaultBitrate;
        const edition = reciterConfig.edition;
        
        return `${this.audioCDN}-surah/${bitrate}/${edition}/${surahNumber}.mp3`;
    }

    // ===== EDITION OPERATIONS =====
    
    // Get available editions
    async getEditions(format = 'text', language = 'fa') {
        try {
            const data = await this.makeRequest(`/edition?format=${format}&language=${language}`);
            return data.map(edition => ({
                identifier: edition.identifier,
                name: edition.name,
                englishName: edition.englishName,
                format: edition.format,
                language: edition.language,
                type: edition.type,
                direction: edition.direction
            }));
        } catch (error) {
            console.error('Error fetching editions:', error);
            throw error;
        }
    }

    // ===== UTILITY METHODS =====
    
    // Get Quran metadata
    async getMetadata() {
        try {
            return await this.makeRequest('/meta');
        } catch (error) {
            console.error('Error fetching metadata:', error);
            throw error;
        }
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
        console.log('🗑️ API Cache cleared');
    }

    // Get cache stats
    getCacheStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.keys())
        };
    }

    // Preload data for better performance
    async preloadSurah(surahNumber) {
        try {
            const promises = [
                this.getSurah(surahNumber),
                this.getSurahWithTranslation(surahNumber)
            ];
            
            await Promise.all(promises);
            console.log(`📥 Preloaded surah ${surahNumber}`);
        } catch (error) {
            console.warn(`Preload failed for surah ${surahNumber}:`, error);
        }
    }

    // Validate surah number
    validateSurahNumber(surahNumber) {
        const num = parseInt(surahNumber);
        return num >= 1 && num <= CONFIG.quran.totalSurahs;
    }

    // Validate ayah number
    validateAyahNumber(ayahNumber) {
        const num = parseInt(ayahNumber);
        return num >= 1 && num <= CONFIG.quran.totalVerses;
    }

    // Get ayah number from surah and verse
    getGlobalAyahNumber(surahNumber, verseNumber) {
        const surahNum = parseInt(surahNumber);
        const verseNum = parseInt(verseNumber);
        
        if (!this.validateSurahNumber(surahNum)) {
            throw new Error('شماره سوره نامعتبر است');
        }
        
        if (verseNum < 1 || verseNum > CONFIG.quran.versesCount[surahNum - 1]) {
            throw new Error('شماره آیه نامعتبر است');
        }
        
        let globalNumber = 0;
        for (let i = 0; i < surahNum - 1; i++) {
            globalNumber += CONFIG.quran.versesCount[i];
        }
        
        return globalNumber + verseNum;
    }

    // Get surah and verse from global ayah number
    getSurahAndVerse(globalAyahNumber) {
        const ayahNum = parseInt(globalAyahNumber);
        
        if (!this.validateAyahNumber(ayahNum)) {
            throw new Error('شماره آیه نامعتبر است');
        }
        
        let currentSum = 0;
        for (let i = 0; i < CONFIG.quran.versesCount.length; i++) {
            currentSum += CONFIG.quran.versesCount[i];
            if (ayahNum <= currentSum) {
                const surahNumber = i + 1;
                const verseNumber = ayahNum - (currentSum - CONFIG.quran.versesCount[i]);
                return { surahNumber, verseNumber };
            }
        }
        
        throw new Error('آیه یافت نشد');
    }
}

// Create global API instance
window.quranAPI = new QuranAPI();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuranAPI;
}