# Any Share Web Dashboard
React Frontend Client


####Project by Animal Labs
For questions, contact:
Brian Fogg
brian.fogg@animallabs.co

===

## Getting Started

### Pre-Requisites

#### Yarn
https://yarnpkg.com/lang/en/docs/install/#mac-stable

### Set up development environment

`yarn`
This will install all dependencies to `node_modules` folder

`yarn start`
This will execute the `start` command in `package.json` which currently looks like this:

`"start": "webpack-dev-server -d --history-api-fallback --hot --inline --progress --env.frontendsource dev --env.configSelect dev --colors --port 3000 --open"`

This should fire up `webpack-dev-server` and open a tab in chrome (or your browser of default)

===

## Tech Stack

#### [React](https://reactjs.org/)
#### [Typescript](https://www.typescriptlang.org/)
#### [Babel](https://babeljs.io/)
#### [Webpack](https://webpack.js.org/)
#### [Mobx](https://mobx.js.org/)
#### [Wrld3D](https://www.wrld3d.com/)
#### [Packery](https://packery.metafizzy.co/)
#### [React Router](https://reacttraining.com/react-router/)
#### [SCSS](https://sass-lang.com/);
#### [Material UI](https://material-ui.com/);
#### [@include-media](https://include-media.com/)


## Technical Considerations

### Project layout and important locations

`src/assets` holds static files and general images for the site. Here you can find the `index.ejs` template file. Webpack uses this to generate the `index.html` file which is the sites natural entry point. Favicons can also be edited in here.

`src/app` holds the functional guts of the app. All stores, components and styles live here

`src/app/index.ts` js entrypoint, but no real complex utility is handled here. Just import management. Good place to import globally required dependencies.

`src/app/index.tsx` is the real beginning of javascript functionality. Routing with `React Router` and screen size calculations are handled here.


### Screen Size

`src/app/index.tsx` and `src/app/stores/View/SizeStore.js` are using a custom screen size calulator. This app is a single-page-app with complex height and width dependent views. Turns out that 100% height calculations are very difficult in html/css unless the top level parent element is declared in precise pixel values. These two files facilitate the storage, updating and writing of explicit sizes to the app parent div. All other sizes throughout the app should now be able to use flex-box and percentage based heights without any problem.

### Styling

####`React Inline Styles` vs `SCSS stylesheets`

In this app, we're using both. Each component should have it's own SCSS style sheet sitting next to it in the container file. These stylesheets are all imported at the bottom of `src/app/style/app.scss`. Styles in these sheets should be used to declaring unchanging and fundamental styles and layout properties of the app.

Due to the complex and dynamic nature of this app, it's not always feasible to declare everything with class based styles. Oftentimes, it's more straightforward to generate inline styles using `React` at render time.

The complexity comes when there are both classname stylesheet references and inline styles applying to the same dom element. The rule is that classname styles apply first, then inline styles are allowed anything they declare. I try to only use inline styles for dynamic things that are unwieldy to handle with css classes alone. I also try not to decalre any css rule in a class which will be overwritten or re-declared in an inline style.

#### Typescript errors
Typescript sometimes does not like inline style objects being passed to dom elements in React. I'm overcoming these warnings by passing styles with an `any` tag. Haven't run into a problem with this method yet.

#### Quick example

`let borderRadiusSize = .5`
`let inlineStyle = {
  border: '1px solid red',
  flex: 1,
  borderRadius: borderRadiusSize + 'rem'
}`
`<div className={'helloWorldContainer'} style={helloInlineStyle as any}>Hello world</div>`

#### @include-media
It's a great library which will allow you to avoid writing media queries ever again.
Breakpoints are set in `src/app/style/app.scss`

```
$breakpoints: (
  'phone': 320px,
  'tablet': 768px,
  'desktop': 1024px
) !default;
```

And they're used in the stylesheets like this:
```
.header-right-mobile {
  @extend .header-right;
  border: 1px solid green;
  @include media('>=tablet') {
    display: none;
  }
}
```

Also note the use of `@extend`. This allows class based reuse of css style classes. Great for keeping stylesheets [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and maintainable.


### Storage / Mobx

We're using `Mobx` for storage and state management in this application.
https://mobx.js.org/

Mobx is a great alternative to `Redux`. Much faster to develop with and allows simple, class based data store design.

Examples of stores can be seen in `src/app/stores`.
`Domain` is generally for data management on a higher level.
`View` is for stores which directly manipulate or only deal with certain views or view based data.

All stores are imported to `src/app/stores/index.ts`. Here they are initialized once and passed on for further consumption by the rest of the app. Always import stores from this file. Do not import them directly unless you are prepared to instantiate them yourself.

Instantiating stores on the fly is great if you want lists of components to each posses their own mobx store. For our purposes so far, this is not done. Each store instantiated once and used throughout the app.

### Packery / Wrld3D in React context

Packery and Wrld3D are somewhat at odds with React's fundamental render methodology. React likes to re-render elements of the dom according to the props passed in to it's various components. If a property is passed down which is changed, the requisite downstream React components will re-render themselves into the dom. This can cause problems for third party libraries which were built to work with jQuery style apps where dom elements are not being created and destroyed regularly in this way.

Packery and Wrld3D both require a dom element to persist on the dom. These libraries consistently target the same element and handle rendering in their own ways. If React re-paints Packery or Wrld3D's parent container dom element, these libraries will lose touch with the dom and we won't see any content.

This is solved by creating dom nodes manually and storing them in special classes which are referenced by the React components. When a React component loads, it will check it's corresponding storage class and re-use the library control object and containing element. This should cut down on memory usage as the containers are not destroyed even as the app navigates away from their display pages.

Wrld3D is especially heavy. It is loaded once on first navigation to the 3D map view page. The container and control objects are cached and do not require another render after this first load.

See `src/app/containers/TileView/packeryStorage.ts` and `src/app/containers/MapView/mapStorage.ts` to see how this is handled. There's still possibly some room for improvement here.

Possible improvement: Rendering and creating these elements on first page load, regardless of the page so they're already present by the time user navigates to MapView or TileView. This could cut down on the lag we currently experience.

### Drawers used in this project
[https://material-ui.com/demos/drawers/](https://material-ui.com/demos/drawers/);
Controlled by `src/app/stores/View/DrawerStore`
These drawers also allow gestures swipes in from the side of the screen. They're simple and nice to use. Just make sure that they don't go too wide on mobile. They expand based on the content inside.

Possible improvement: Set max width to a value derived from `src/app/stores/View/SizeStore.ts`. This will prevent anything from going too wide
