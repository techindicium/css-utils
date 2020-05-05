# CSS Utils #

## Content ##

1. Animations

- Expansion:  `e-0 |+1| e-5`

- Transitions:
    * Background-color:  `bgt-0 |+1| bgt-5`
    * Border:  `bt-0 |+1| bt-5`
    * Color:  `ct-0 |+1| ct-5`
    * Scale:  `st-0 |+1| st-5`

2. Borders

- Radius:
    * Default:  `br-0 |+1| br-5, br-10, br-15, br-25`
    * Top:  `brt-0 |+1| brt-5, brt-10, brt-15, br-25`
    * Bottom:  `brb-0 |+1| brb-5, brb-10, brb-15, brb-25`

- Box Shadow:  `bs-0 |+1| bs-5`

3. Colors

- Background Color:  `bg-t1 |+1| bg-t5`

- Color:  `c-t1 |+1| c-t5`

- Outline Color: `bo-t1 |+1| bo-t5`

- Hover Color:
    * Background Color:  `hbg-t1 |+1| hbg-t5`
    * Color:  `hc-t1 |+1| hc-t5`

4. Dimensions

- Z-Index:  `z-0 |+1| z-20`

- Height:
    * Percentage: `h-5 |+5| h-100`
    * Viewport: `vh-5 |+5| vh-100`

- Width:
    * Percentage: `w-5 |+5| w-100`
    * Viewport: `vw-5 |+5| vw-100`

- Margin:
    * Top:  `mt-7, mt-10 |+5| mt-100`
    * Bottom:  `mb-7, mb-10 |+5| mb-100`
    * Top & Bottom:  `my-7, my-10 |+5| my-100` 

- Trend Height: `vu-5 |+5| vu-100`

5. Images
6. Texts

- Font Size:  `fs-0 |+1| fs-15`

- Font Family:  `ff-t1 |+1| ff-t5`

- Text Spacing: 
    * Line Height: `lh-0 |+1| lh-5`
    * Letter Spacing: `ls-0 |+1| ls-5`

## Customize ##

On your `style.css` file: 

1. You can add variables to set colors:

```
:root{
    --color-tier-1: white;
    --color-tier-2: red;
    --color-tier-3: blue;
    --color-tier-4: green;
    --color-tier-5: black;
}
```

2. You can add variables to set fonts:
```
:root{
    --font-tier-1: 'Roboto';
    --font-tier-2: 'Raleway';
    --font-tier-3: 'Pacifico';
    --font-tier-4: 'Montserrat';
    --font-tier-5: 'Oswald';
}
```

3. You can add variables to set media sizing adjusts:

```
:root{
    --xs-factor: 1;
    --sm-factor: 1;
    --md-factor: 1;
    --lg-factor: 1;
    --xl-factor: 1;
}
```