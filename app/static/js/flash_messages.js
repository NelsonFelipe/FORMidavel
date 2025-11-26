document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('[role="alert"]');
    alerts.forEach(function(alert) {
        // Remove the alert from the DOM after 4 seconds (animation time)
        setTimeout(function() {
            alert.classList.add('opacity-0');
            setTimeout(function() {
                alert.remove();
            }, 500); // Wait for opacity transition
        }, 4000);
    });
});