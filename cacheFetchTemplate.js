const fs = require('fs');
const fetch = require('node-fetch');
const cacheFilePath = './saves/classNameGoesHere.json';

class Data {
    constructor(cacheEnabled = true, cacheExpiry = 60 * 30 * 1000) {
        this.cacheEnabled = cacheEnabled;
        this.cacheExpiry = cacheExpiry;
        this.cacheData = null;
        this.loadCache();
    }

    autoUpdate(token, minutes = 1) {
        if (!token) {
            throw new Error('Token is required.');
        }
        setInterval(() => {
            if (this._isCacheExpired()) {
                this.update(token);
            }
        }, minutes * 60 * 1000);
    }

    async update(token) {
        if (!token) {
            throw new Error('Token is required.');
        }
        this.cacheData = await this.getData(token);
        this._writeCacheData();
    }

    async getData(token) {
        if (!token) {
            throw new Error('Token is required.');
        }
        if (this.cacheData && !this._isCacheExpired() && this.cacheEnabled) {
            return this.cacheData;
        }

        // Replace this with the code for the specific request
        const response = await fetch('https://apiz.ebay.com/commerce/identity/v1/user/', {
            method: 'GET',
            api: 'identity',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            call: 'user__GET',
            variation: 'json'
        });
        const itemArray = await response.json();
        this.cacheData = itemArray;
        this._writeCacheData();
        return itemArray;
    }

    _isCacheExpired() {
        const now = Date.now();
        const fileStat = fs.statSync(cacheFilePath);
        const fileModifiedTime = fileStat.mtimeMs;
        return (now - fileModifiedTime) > this.cacheExpiry;
    }

    loadCache() {
        try {
            const cacheData = fs.readFileSync(cacheFilePath);
            this.cacheData = JSON.parse(cacheData);
        } catch (error) {
            console.error(`Error loading cache data: ${error.message}`);
        }
    }

    _writeCacheData() {
        try {
            fs.writeFileSync(cacheFilePath, JSON.stringify(this.cacheData));
        } catch (error) {
            console.error(`Error writing cache data: ${error.message}`);
        }
    }
}

module.exports = Data;