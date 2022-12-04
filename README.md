# sticky-one

Easy Tiny & Sticky JavaScript DOM rendering library

## Dependencies
[uhtml](https://github.com/WebReflection/uhtml), [ustyler](https://github.com/WebReflection/ustyler)
## Usage

See demo folder for structured examples

```javascript
import { html, sticky, startApp } from "sticky-one"
const counter = sticky(
    {
        view: (m, s)=> html`
        <div class=${s.container}>
            <button data-ref="minus" onclick=${m}>-</button>
            <span >${m.count}</span>
            <button data-ref="plus" onclick=${m}>+</button>
        </div>
        `,
        model: {count: 0},
        handleEvent: function (e) {
            this.broadcast(e.target.dataset.ref)
        },
        style : {
            container:`
                margin : var(--margin, 10px);
            `
        }
    }
)
counter.bind(function(data) {
    const inc = data === 'plus' ? 1 : -1
    counter.model.count+=inc
    counter.style('margin', '20px')
    return true
})
startApp(counter)

```

## API

This module exposes
- `html`, `svg` from [uhtml library](https://github.com/WebReflection/uhtml)
- `sticky`, `startApp`, `R` from this library

## sticky views

### Sticky views creation

```javascript
sticky (
    {
        /**
         *  A required view function with 3 possible parameters
         *  (model, style, view) => html ` ... `
         *  model : view model
         *  style : view inner style
         *  view  : a reference to the coming sticky view
         **/
        view,
        /**
         * An optional model for view initialization
         * Initialization can also be done via commands
         **/
        model,
        /**
         * An optional handleEvent for event management
         * Calling this.brodcast(data) will notify all registred commands
         **/
        handleEvent,
        /**
         * An optional style object <key, css>
         * key: class reference name for the view
         * css: css class with optional css properties declaration
         **/
        style,
    }
)
```

### Sticky views API

```javascript
    {
        /**
         * The model as declared in sticky arguments with 2 additional functions
         * - handleEvent(event) as declared as sticky input | noop function
         * - broacast(anyData) for broadcasting view events
         **/
        model,
        /* render the view */
        render(),
        /**
         * updates delcared css properties through
         * - two areguments (name, value)
         * - one object arguments parsing all object pairs
         **/
        style (nameOrObj, value)
        /* bind a command function to this sticky view */
        bind (command),
    }
```

## startApp

Starts the rendering (can be used only once)

`startApp (stickyViewApplicationEntryPoint)`

## R

This function is a shortcut for sticky views rendering

`R(stickyView)` is equivalent to `stickView.render()`

<details>
 <summary>R Example</summary>
 Sticky view `view1` used in a view function
 
 ```javascript
const aViewFunction = (m,s,v) => html `
    ${R(view1)} // shortcut for ${view1.render()}
`
```
</details>
