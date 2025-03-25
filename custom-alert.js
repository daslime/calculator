// Custom Alert Implementation

// Create the alert elements
function createAlertElements() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    
    // Create alert container
    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    
    // Create title
    const title = document.createElement('div');
    title.className = 'alert-title';
    title.textContent = 'CASIO fx-991EX';
    
    // Add hover effect to title
    title.addEventListener('mouseover', () => {
        title.style.transform = 'perspective(300px) translateZ(10px)';
    });
    
    title.addEventListener('mouseout', () => {
        title.style.transform = 'perspective(300px) translateZ(0)';
    });
    
    // Create message
    const message = document.createElement('div');
    message.className = 'alert-message';
    
    // Create button
    const button = document.createElement('button');
    button.className = 'alert-button';
    button.textContent = 'OK';
    button.onclick = closeAlert;
    
    // Assemble the alert
    alertBox.appendChild(title);
    alertBox.appendChild(message);
    alertBox.appendChild(button);
    overlay.appendChild(alertBox);
    
    // Add to body
    document.body.appendChild(overlay);
    
    return {
        overlay,
        message,
        button
    };
}

// Store alert elements
let alertElements = null;

// Initialize alert elements
function initializeAlert() {
    if (!alertElements) {
        alertElements = createAlertElements();
    }
}

// Show the custom alert
function showCustomAlert(messageText) {
    // Initialize if not already done
    initializeAlert();
    
    // Set the message
    alertElements.message.textContent = messageText;
    
    // Show the alert
    alertElements.overlay.classList.add('active');
    
    // Add keyboard event listener for Escape key and Enter key
    document.addEventListener('keydown', handleKeyPress);
    
    // Focus the OK button for better accessibility
    setTimeout(() => {
        alertElements.button.focus();
    }, 100);
    
    // Add click event to close when clicking outside the alert box
    alertElements.overlay.addEventListener('click', handleOverlayClick);
}

// Close the alert
function closeAlert() {
    if (alertElements) {
        alertElements.overlay.classList.remove('active');
        
        // Remove event listeners
        document.removeEventListener('keydown', handleKeyPress);
        alertElements.overlay.removeEventListener('click', handleOverlayClick);
    }
}

// Handle key presses
function handleKeyPress(event) {
    if (event.key === 'Escape' || event.key === 'Enter') {
        closeAlert();
    }
}

// Handle clicks on the overlay (outside the alert box)
function handleOverlayClick(event) {
    // Only close if clicking directly on the overlay, not on the alert box
    if (event.target === alertElements.overlay) {
        closeAlert();
    }
}

// Replace the default alert with our custom alert
window.originalAlert = window.alert;
window.alert = function(message) {
    showCustomAlert(message);
};