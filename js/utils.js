$(document).ready(function(){
    $('.va').on('click', function(){
        va()
        $(window).resize(function () { 
            va()
        });
    })
})

/* ----------------------------------------------------------------------------------------------------------- */

function va(){
    console.log('VA')
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
    function clean(metrics,object){
        metrics = String(metrics).split(' ')
        const classes = ($(object).attr('class')).split(' ')
        metrics.forEach(function(metric){
            classes.forEach(function (elementClass) {
                if(String(elementClass).startsWith(metric)){
                    $(object).removeClass(elementClass)
                }
            })
        })
    }
    function property(process, elements, model){
        let adjust = 0
        elements.each(function (index) {
            if(process == 'get'){
                if($(this).data('factor')){
                    model[index] = $(window).width() / $(this).data('factor');
                    adjust += Math.round(model[index] - $(this).height())
                }else{
                    let height = $(this).height();
                    if (model[index]) {
                        model[index] = greatest(height, model[index])
                    } else {
                        model.push(height)
                    }
                }
            }else{
                $(this).css('height', model[index])
                if($(this).hasClass('va-img')){
                    let width = $(this).width()
                    $(this).attr('data-factor', Math.round(($(window).width()/width)));
                }
            }
        })
        return model, adjust
    }

    const containers = $('.va-container')
    containers.each(function(){
        const items = $(this).find('.va-item')
        const model = {"spacing": 0,"img": [],"text": [], "imgAdjust": 0, "textAdjust":0}
        items.each(function(){
            preview($(this),'open')
            const images = $(this).find('.va-img')
            model.img, model.imgAdjust = property('get', images, model.img)
            const texts = $(this).find('.va-text')
            model.text, model.textAdjust = property('get', texts, model.text)
            const spacing = $(this).height() - sum(model.img) - sum(model.text) + model.imgAdjust + model.textAdjust 
            model.spacing = greatest(spacing, model.spacing)
            preview($(this), 'close')
        });
        items.each(function(){
            const images = $(this).find('.va-img')
            images.each(function(){clean('p col vw w',$(this).parent('.mx-auto'));})
            property('set', images, model.img)
            const texts = $(this).find('.va-text')
            texts.each(function(){clean('p vh h',$(this))})
            property('set', texts, model.text)
            $(this).css('height', (model.spacing + sum(model.img) + sum(model.text)))
        });
    });
}