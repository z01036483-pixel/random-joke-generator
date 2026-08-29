# Random Joke Generator 😂

A fun and interactive web application that generates random jokes from an external API. Browse through different joke categories, save your favorites, and share jokes with friends!

## Features

✨ **Core Features**
- 🎲 Fetch random jokes from the Official Joke API
- 🏷️ Filter jokes by category (General, Programming, Knock-Knock)
- ❤️ Save favorite jokes to local storage
- 📋 View and manage saved favorites
- 📋 Copy jokes to clipboard
- 📤 Share jokes (native share or copy-to-clipboard)
- 🎨 Beautiful, responsive UI

## API

This project uses the **Official Joke API** (https://official-joke-api.appspot.com)

### Endpoints Used:
- `/jokes/random` - Get a random joke of any type
- `/jokes/{type}/random` - Get a random joke of a specific type

### Supported Joke Types:
- `general` - General humor
- `programming` - Programming jokes
- `knock-knock` - Knock-knock jokes

## Technologies

- **HTML5** - Structure
- **CSS3** - Styling with custom properties and animations
- **Vanilla JavaScript** - Functionality and API integration
- **Local Storage API** - Persistent data storage

## How to Use

1. **Open the Application**
   - Open `index.html` in your web browser

2. **Generate a Joke**
   - Select a joke type from the dropdown (optional)
   - Click "Get Joke" to fetch a random joke

3. **Interact with Jokes**
   - **Copy** - Copy the joke text to clipboard
   - **Share** - Share via native share or copy to clipboard
   - **Favorite** - Save jokes to your favorites list

4. **Manage Favorites**
   - View all saved jokes in the "Saved Favorites" section
   - Remove individual jokes or clear all favorites

## Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Features in Detail

### Responsive Design
- Mobile-friendly interface
- Adapts to different screen sizes
- Touch-friendly buttons and controls

### Local Storage
- Favorites persist across browser sessions
- Data stored in browser's local storage
- Easy to clear all data

### Error Handling
- Graceful error messages if API fails
- Retry capability with "Get Joke" button
- Loading states for better UX

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Credits

- Jokes provided by [Official Joke API](https://official-joke-api.appspot.com)
- Built with HTML, CSS, and Vanilla JavaScript

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Joke search/filter
- [ ] User ratings for jokes
- [ ] Backend integration for cloud storage
- [ ] Social media sharing integrations
- [ ] Joke categories customization
- [ ] Translation support

---

Enjoy the laughs! 😄