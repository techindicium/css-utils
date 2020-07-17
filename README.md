# CSS Utils #

You can include the minified version of this library using this links:
```
CSS:
https://indicium-cdn.s3.amazonaws.com/css-utils/utils.min.css
JS:
https://indicium-cdn.s3.amazonaws.com/css-utils/utils.min.js
```

## Content ##

### Vertical Alignment ###

#### What is VA ####

The vertical alignment method or function (VA), is a JS Function, instanciated after the DOM initialization and the Window load stage. The VA function aligns verticaly, multiple items detached in a responsive chain, and is designed to work with elements that have *responsive behaviors*. In a nutshell, the VA method searches for every VA Container instance across the DOM, and do a simple calculation based on its items height, and after that, gives a new height to all items in the same container.   

#### Classes ####

The VA Classes are the tags that sinalize the elements where VA function will align. The minimum classes that you'll need to add to you're elements to align them are the `.va-container` and the `.va-item` classes. The `.va-img` and `.va-text` classes are complements that allows the internal alignment of `.va-item` elements. The structure of the VA function is:
```
- .va-container (row)
    - .va-item (col)
        - .va-text (text / col)
        - .va-img (img-fluid / col)
```
1. VA Container:

    A **VA Container** is an element that contains multiple **VA Items**. You can you use a `.va-container` always that you want to group items on a row. VA Container represents a **row**, therefore you should use it within the `.row` class, or everything that have a *row behavior*, like a `.carousel-inner` inside a carousel, for example. You should ever place the `.va-container` as close as possible to its items, to optimize the performance and avoid possible errors with multiple levels of rows and cols that could exist.  

2. VA Item:

    A **VA Item** is an element encapsulated by the **VA Container** and may contain or not instances of **VA Image** and **VA Text** elements. VA Items represents a **col** object, therefore you should use it within the `.col` class. VA Items have its height properties changed, so if you are using the `.va-item` class in a `.row` you may not see the differences of the alignment, but you can use it in some cases, be awared that the VA function only changes the height of a `.va-item` element, so it could not work as you expect in a row.

    If you specify **VA Image** and **VA Text** elements inside a **VA Item**, the VA Function will consider every row inside the **VA Item** that is specified with that classes. Notice that every element inside of the item that is specified will be counted in the new height formulation, so you can set more then one `.va-img` or `.va-text` inside a **VA Item**. Then every new row in the **VA Item** that is specified, will have its own height adjustment, based on other elements in other items in the **VA Container** that are in the same vertical position.
    
3. VA Image:

    A **VA Image** is expected to be a *Image*, where its properties follow responsive behaviors. To specify an image element as a **VA Image** you can use the `.va-img` class. The most proper aplication for a **VA Image** element is a `.img-fluid` element, where you have a parent element `.col` that defines its *width* and then, by its width have its *height* defined. So, in the most cases you **must** use the `.va-img` class with the `.img-fluid`, but this does not means that you can't use it in diferent elements, be awared that a **VA Image** have a transformation on alignment. The transformation inverts the variability relation between the *width* and the *height*. Before the alignment the relation of this two properties are: `width: fixed` and `height: variable`, then after, to have a vertical consistency the relation change to `width: variable` and `height: fixed`. So any element that you specify as an **VA Image** will have this transformation.

4. VA Text:

    A **VA Text** is expected to be a *Text*, where its properties follow responsive behaviors. To specify an text element as a **VA Text** you can use the `.va-text` class. **VA Text** elements have a simple change on height, however, *padding* properties inside a **VA Text** are not supported yet, as well as the *resize auto adjusts* for **VA Text** (*coming soon*).

#### Height Definition ####

Every **VA Item** have its height changed based on the greatest height of a group of items in a **VA Container**, and based on the **VA Image** and **VA Text** elements that it have. Basically, if you specify a **VA Item**, the alignment occurs only based on the general height of that item, that corresponds to the sum of the heights of all elements inside of it, plus all the spacing. The **VA Item** spacing considers all the space that is not specified by other **VA** class. So it can be more understandable if you can visualize the order of the events:

1. VA Search:

    Firstly, when VA method is called, the DOM is at *ready state* and the window is completely *loaded*, which means that all the images and resources in the DOM are loaded and have a *height/width* properties defined. So after that, the VA method searches for all `.va-container` elements in the DOM, transfering them to an array. Then, respecting the VA hierarchy, for each **VA Container**, it gets all its `.va-item` elements, and then for each **VA Item**, it gets all its `.va-img` and `.va-text` elements. After that we have a tridimensional matrix, as:
        
        VA [
            VA Container [
                VA Item [
                    VA Images []
                    VA Texts []
                ]
            ]
        ]
    
    *Obs.: VA Method doesn't store this matrix, instead, it goes through each element as the searching is done, and as every layer of the hierarchy is reached, the VA calculation is done and stored, to be used later.*

    As the VA method find a **VA Container**, before looking for all the **VA Item** elements that it have, a important nested function is called, the *preview* function. The *preview* function looks for all elements in a giving list, that can have its dimensions not set yet, and displays them, forcing them to be rendered. Therefore the *preview* is called before getting **VA Item** elements and after that, to close, or hide them again.

2. VA Calculation:

    So, as all elements are now displayed and mapped, we can get their dimensions to do the alignment. This alignment is done by giving all **VA item** elements the same height, and giving their internal elements equal heights to. To do so, we pick all heights in the same category and get the greatest, and then distribute this greatest height for all elements that are in a same row. For example:

        VA Container

            VA Item #1
                VA Image #1.1
                VA Text #1.1
                VA Image #2.1
                VA Text #2.1
                VA Image #n.1
                VA Text #n.1

            VA Item #2
                VA Image #1.2
                VA Text #1.2
                VA Image #2.2
                VA Text #2.2
                VA Image #n.2
                VA Text #n.2

    In this example we have **2 objects** with **4 rows**, then we group the heights by row, and get the greatest height of each row, and group them by its category (**Image**, **Text** or **Spacing**). Then, after getting all the greatest heights, we have the following *model* per **VA Item**, that contains all the *new height* calculated values:

        xh = item x height
        xih1 = item x image row 1 height
        xih2 = item x image row 2 height
        xth1 = item x text row 1 height
        xth2 = item x text row 2 height
        xihn = item x image row n height
        xthn = item x text row n height
        sh = xh - sum(xih1, xih2, ... ,xihn) - sum(xth1, xth2, ... ,xthn)

        item[x]: {
            img: [xih1, xih2, ... ,xihn],
            text: [xth1, xth2, ... ,xthn],
            spacing: sh,
            general: xh
        }

        gih1 = greatest(gih1, xih1)
        gih2 = greatest(gih2, xih2)
        gth1 = greatest(gth1, xth1)
        gth2 = greatest(gth2, xth2)
        gihn = greatest(gihn, xihn)
        gthn = greatest(gthn, xthn)
        gsh = greatest(gsh, sh)
        gh = gsh + sum(gih1, gih2, ... ,gihn) + sum(gth1, gth2, ... ,xthn) 
        
        model: {
            img: [gih1, gih2, ... ,gihn],
            text: [gth1, gth2, ... ,gthn],
            spacing: gsh,
            general: gh
        }

3. VA Assignment:

    With a model object for each **VA Container**, the dimensional assignment is done. Now all the dimensional classes are removed (classes that have *width/height* impact), and the assignment of the height property is done:

        VA Container

            VA Item #1 -> gh
                VA Image #1.1 -> gih1
                VA Text #1.1 -> gth1
                VA Image #2.1 -> gih2
                VA Text #2.1 -> gth2
                VA Image #n.1 -> gihn
                VA Text #n.1 -> gthn

            VA Item #2 -> gh
                VA Image #1.2 -> gih1
                VA Text #1.2 -> gth1
                VA Image #2.2 -> gih2
                VA Text #2.2 -> gth2
                VA Image #n.2 -> gihn
                VA Text #n.2 -> gthn

4. VA Sleep:

    After that, VA method is on a *sleep* mode, which means that now, any modifications, events, on the **DOM** or **window** like *resize*, *load*, *navigation* and etc., that could transform the *height/width* properties of any **VA Item**, trigger the VA method in a different mode. After the VA assignment is done, an adjusting factor is assigned to the VA elements, by *data* property. This factor is calculated relative to the width of *window*:

        ww = window width
        xif = item x factor
        xiw = item x width

        xif = ww/xiw

    Then for any event that transforms the *width/height* properties of **VA Item** elements, the VA method is called with a different approach, respecting the factors and doing all calculus based on the adjusting factors, mantaining this properties as they are in the moment of the first call of VA method. The calculation based on the factor is different by the VA class. To the **VA Image** elements, the changes on height are defined by:

        xifh = item x height based on factor
        xia = item x height adjust

        xifh = ww / xif
        xia = xifh - xih

    This adjust is added to the *model* object and used in the spacing calculus:

        sh = xifh - sum(xth1, xth2, ... ,xthn) + xia
 
### CSS Glossary ###

Initial Configuration (Optional):
```
:root{
    --xs-factor: 1;
    --sm-factor: 1;
    --md-factor: 1;
    --lg-factor: 1;
    --xl-factor: 1;
    --color-tier-1: white;
    --color-tier-2: red;
    --color-tier-3: blue;
    --color-tier-4: green;
    --color-tier-5: black;
    --font-tier-1: 'Roboto';
    --font-tier-2: 'Raleway';
    --font-tier-3: 'Pacifico';
    --font-tier-4: 'Montserrat';
    --font-tier-5: 'Oswald';
}
```

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
    (You can also call negative margin with the 'n' suffix `mtn-x mbn-x`)

5. Images
6. Texts

- Font Size:  `fs-0 |+1| fs-15`

- Font Family:  `ff-t1 |+1| ff-t5`

- Text Spacing: 
    * Line Height: `lh-0 |+1| lh-5`
    * Letter Spacing: `ls-0 |+1| ls-5`