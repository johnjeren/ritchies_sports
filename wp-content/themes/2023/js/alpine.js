
document.addEventListener('alpine:init', () => {
    Alpine.data('navigation', () => ({
        open: false,
        toggle() {
            this.open = !this.open
        },
    }))
});
