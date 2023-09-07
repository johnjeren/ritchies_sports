document.addEventListener('alpine:init', () => {
    Alpine.data('loopGrid', () => ({
        init(){
           this.search = 'test';
        },
        search:'',
        filterBySearch(){
            
        }
    }))
});