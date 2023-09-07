document.addEventListener('alpine:init', () => {
    Alpine.data('singleProduct', () => ({
        init(){
            alert('hey single');
        }
    }))
});