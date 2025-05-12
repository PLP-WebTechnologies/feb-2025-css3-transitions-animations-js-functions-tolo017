document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const animateBtn = document.getElementById('animateBtn');
    const animatedElement = document.getElementById('animatedElement');
    const savePrefsBtn = document.getElementById('savePrefs');
    const loadPrefsBtn = document.getElementById('loadPrefs');
    const resetPrefsBtn = document.getElementById('resetPrefs');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    
    // Animation types
    const animationTypes = ['spin', 'bounce', 'grow'];
    let currentAnimationIndex = 0;
    
    // Load preferences when page loads
    loadPreferences();
    
    // Animate button click handler
    animateBtn.addEventListener('click', function() {
        // Remove any existing animation classes
        animatedElement.classList.remove(...animationTypes);
        
        // Get the current animation type
        const animationType = animationTypes[currentAnimationIndex];
        
        // Add the animation class
        animatedElement.classList.add(animationType);
        
        // Increment index for next animation
        currentAnimationIndex = (currentAnimationIndex + 1) % animationTypes.length;
        
        // Remove animation class after animation ends (for one-time animations)
        if (animationType === 'spin' || animationType === 'grow') {
            animatedElement.addEventListener('animationend', function() {
                animatedElement.classList.remove(animationType);
            }, { once: true });
        }
    });
    
    // Save preferences
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved!');
        
        // Apply theme immediately
        applyTheme(preferences.theme);
    });
    
    // Load preferences
    loadPrefsBtn.addEventListener('click', loadPreferences);
    
    // Reset preferences
    resetPrefsBtn.addEventListener('click', function() {
        localStorage.removeItem('userPreferences');
        usernameInput.value = '';
        themeSelect.value = 'light';
        applyTheme('light');
        alert('Preferences reset!');
    });
    
    // Theme selector change handler
    themeSelect.addEventListener('change', function() {
        applyTheme(themeSelect.value);
    });
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            usernameInput.value = preferences.username || '';
            themeSelect.value = preferences.theme || 'light';
            applyTheme(preferences.theme);
        }
    }
    
    // Function to apply theme
    function applyTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        if (theme) {
            document.body.classList.add(theme);
        }
    }
    
    // Add transition effect to theme change
    const style = document.createElement('style');
    style.textContent = `
        body {
            transition: background-color 0.5s ease, color 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});