

$(document).ready(function(){
    va()
})

/* ----------------------------------------------------------------------------------------------------------- */

function va(){
    const containers = $('.va-container')

    function classes(metric){
        var classes
        if(metric.startsWith('va')){
            classes = []
            options = ['','-half','-sample']
            options.forEach(function(option){
                classes.push(metric+option)
            })
        }else{
            classes = ''
            let units
            if (metric == 'col'){
                options = ['', '-xs','-sm','-md','-lg','-xl']
                units = [1,12,1]
            }else{
                units = [0,100,5]
            }
            for (let i = units[0]; i <= units[1]; i += units[2]) {
                options.forEach(function(option){
                    classes += ' '+metric+option+'-'+i
                })
            }
        }
        return classes
    }

    containers.each(function(){
        console.log($(this))
        const items = $(this).find('.va-item')
        items.each(function(){
            const events = ['load','resize']
            const images = $(this).find('.va-img');
            const texts = $(this).find('.va-text');
            $(this).resize(function () {
                console.log($(this).height())
            })
        });
    });
}