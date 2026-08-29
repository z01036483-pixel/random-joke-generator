// Joke Generator App
class JokeGenerator {
    constructor() {
        this.currentJoke = null;
        this.favorites = this.loadFavorites();
        this.apiUrl = 'https://official-joke-api.appspot.com';
        this.initElements();
        this.attachEventListeners();
        this.updateFavoritesDisplay();
    }

    initElements() {
        this.generateBtn = document.getElementById('generateBtn');
        this.jokeContainer = document.getElementById('jokeContainer');
        this.jokeTypeSelect = document.getElementById('jokeType');
        this.shareBtn = document.getElementById('shareBtn');
        this.favoriteBtn = document.getElementById('favoriteBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.favoritesList = document.getElementById('favoritesList');
        this.clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
    }

    attachEventListeners() {
        this.generateBtn.addEventListener('click', () => this.fetchJoke());
        this.shareBtn.addEventListener('click', () => this.shareJoke());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.clearFavoritesBtn.addEventListener('click', () => this.clearAllFavorites());
    }

    async fetchJoke() {
        this.generateBtn.disabled = true;
        this.jokeContainer.innerHTML = '<p class="loading">⏳ Loading joke...</p>';

        try {
            const jokeType = this.jokeTypeSelect.value;
            let url = `${this.apiUrl}/jokes/random`;

            if (jokeType !== 'any') {
                url = `${this.apiUrl}/jokes/${jokeType}/random`;
            }

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }

            const data = await response.json();
            this.currentJoke = this.formatJoke(data);
            this.displayJoke(this.currentJoke);
            this.enableActionButtons();
        } catch (error) {
            console.error('Error fetching joke:', error);
            this.jokeContainer.innerHTML = '<p class="placeholder">❌ Failed to load joke. Please try again!</p>';
            this.disableActionButtons();
        } finally {
            this.generateBtn.disabled = false;
        }
    }

    formatJoke(data) {
        if (data.type === 'knock-knock') {
            return `${data.setup} ... ${data.delivery}`;
        } else if (data.setup && data.delivery) {
            return `${data.setup}\n\n${data.delivery}`;
        } else {
            return data.joke || 'No joke available';
        }
    }

    displayJoke(joke) {
        this.jokeContainer.innerHTML = `<p class="joke-text">${this.escapeHtml(joke)}</p>`;
    }

    enableActionButtons() {
        this.shareBtn.disabled = false;
        this.favoriteBtn.disabled = false;
        this.copyBtn.disabled = false;
        this.updateFavoriteButton();
    }

    disableActionButtons() {
        this.shareBtn.disabled = true;
        this.favoriteBtn.disabled = true;
        this.copyBtn.disabled = true;
    }

    shareJoke() {
        if (!this.currentJoke) return;

        const text = `Check out this joke: ${this.currentJoke}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Funny Joke',
                text: text
            }).catch(err => console.log('Share cancelled'));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text);
            this.showNotification('Joke copied to clipboard!');
        }
    }

    toggleFavorite() {
        if (!this.currentJoke) return;

        const isFavorite = this.favorites.includes(this.currentJoke);
        
        if (isFavorite) {
            this.favorites = this.favorites.filter(joke => joke !== this.currentJoke);
            this.showNotification('Removed from favorites');
        } else {
            this.favorites.push(this.currentJoke);
            this.showNotification('Added to favorites! ❤️');
        }

        this.saveFavorites();
        this.updateFavoriteButton();
        this.updateFavoritesDisplay();
    }

    updateFavoriteButton() {
        if (!this.currentJoke) return;
        
        const isFavorite = this.favorites.includes(this.currentJoke);
        if (isFavorite) {
            this.favoriteBtn.classList.add('active');
            this.favoriteBtn.textContent = '❤️ Favorited';
        } else {
            this.favoriteBtn.classList.remove('active');
            this.favoriteBtn.textContent = '🤍 Favorite';
        }
    }

    copyToClipboard() {
        if (!this.currentJoke) return;

        navigator.clipboard.writeText(this.currentJoke).then(() => {
            this.showNotification('Joke copied to clipboard!');
        }).catch(() => {
            this.showNotification('Failed to copy');
        });
    }

    updateFavoritesDisplay() {
        if (this.favorites.length === 0) {
            this.favoritesList.innerHTML = '<p class="empty-message">No favorites yet!</p>';
            this.clearFavoritesBtn.style.display = 'none';
        } else {
            this.favoritesList.innerHTML = this.favorites.map((joke, index) => `
                <div class="favorite-item">
                    <p>${this.escapeHtml(joke)}</p>
                    <button onclick="app.removeFavorite(${index})">Remove</button>
                </div>
            `).join('');
            this.clearFavoritesBtn.style.display = 'block';
        }
    }

    removeFavorite(index) {
        this.favorites.splice(index, 1);
        this.saveFavorites();
        this.updateFavoritesDisplay();
        this.updateFavoriteButton();
        this.showNotification('Favorite removed');
    }

    clearAllFavorites() {
        if (confirm('Are you sure you want to clear all favorites?')) {
            this.favorites = [];
            this.saveFavorites();
            this.updateFavoritesDisplay();
            this.updateFavoriteButton();
            this.showNotification('All favorites cleared');
        }
    }

    saveFavorites() {
        localStorage.setItem('jokeGeneratorFavorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const stored = localStorage.getItem('jokeGeneratorFavorites');
        return stored ? JSON.parse(stored) : [];
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize the app
const app = new JokeGenerator();