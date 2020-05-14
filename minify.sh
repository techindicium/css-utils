npm i minify -g
rm 'min/utils.min.css'
rm 'min/utils.min.js'
touch min/utils.min.css
for file in "css/animations.css" "css/borders.css" "css/colors.css" "css/dimensions.css" "css/images.css" "css/texts.css" "css/variables.css"; do 
    echo "$(cat min/utils.min.css)$(minify $file)" > min/utils.min.css
done
touch min/utils.min.js
for file in "js/utils.js"; do 
    echo "$(cat min/utils.min.js)$(minify $file)" > min/utils.min.js
done