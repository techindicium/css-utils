$(document).ready(function(){
    $('.va').on('click', function(){
        va()
    })
})

/* ----------------------------------------------------------------------------------------------------------- */

function va(){

    function preview(object, process) {
        $(object).parents('.carousel-item').each(function () {
            let state; if (process == 'open') {state = 'block'} else {state = ''}
            $(this).css('display', state)
        })
    }
    function sum(array){
        let sum = 0; array.forEach(function(value){
            if(value){
                sum += value
            }
        }); return sum
    }
    function greatest(x, y){
        if(x > y){return x}else{return y}
    }
    function classes(metric){
        var classes
        if(metric.startsWith('va')){
            classes = []; options = ['','-half','-sample'];
            options.forEach(function(option){classes.push(metric+option)})
        }else{
            classes = ''; let units; if (metric == 'col'){ options = ['', '-xs','-sm','-md','-lg','-xl']; units = [1,12,1] }else{ units = [0,100,5] };
            for (let i = units[0]; i <= units[1]; i += units[2]) {options.forEach(function(option){classes += ' '+metric+option+'-'+i})}
        }
        return classes
    }
    function property(process, elements, model){
        elements.each(function (index) {
            if(process == 'get'){
                let height = $(this).height();
                if (model[index]) {
                    model[index] = greatest(height, model[index])
                } else {
                    model.push(height)
                }
            }else{
                $(this).css('height', model[index])
            }
        })
        return model
    }

    const containers = $('.va-container')
    containers.each(function(){
        const items = $(this).find('.va-item')
        const model = {"spacing": 0,"img": [],"text": []}
        items.each(function(){
            preview($(this),'open')
            const images = $(this).find('.va-img')
            const texts = $(this).find('.va-text')
            model.img  = property('get', images, model.img)
            model.text = property('get', texts, model.text)
            const spacing = $(this).height() - sum(model.img) - sum(model.text)
            model.spacing = greatest(spacing, model.spacing)
            console.log(spacing)
            preview($(this), 'close')
        });
        items.each(function(){
            const images = $(this).find('.va-img')
            const texts = $(this).find('.va-text')
            property('set', images, model.img)
            property('set', texts, model.text)
            $(this).css('height', (model.spacing + sum(model.img) + sum(model.text)))
        });
    });
}