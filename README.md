# rivet-shell
A configurable set of layout components for applications build using Rivet

[Download Rivet shell](https://github.com/indiana-university/rivet-shell/archive/master.zip) | [View the demo](https://indiana-university.github.io/rivet-shell/)

## Getting started
The Rivet shell add-on requires the use of the core Rivet CSS. You can find out more about how to get started in [the Rivet documentation](https://rivet.iu.edu/components/). Once you are using Rivet, you can download the Rivet shell source files and include them in your project.

[Download](https://github.com/inidiana-university/rivet-shell/archive/master.zip)

### 1. Include the CCS in your page
```html
<link rel="stylesheet" href="dist/css/rivet-shell.min.css">
```

### Using Sass
If you are already using [Rivet's Sass](https://rivet.iu.edu/getting-started/sass/), you can also use the shell by importing it:

```scss
@import "< you-path-to-node_modules ></you-path-to-node_modules>/rivet-shell/sass/rivet-shell.scss";
```

### 2. Add the markup
Here is the markup for a basic shell configuration including the Rivet header and footer.

```html
<header class="rvt-header">
  <!-- Rivet header markup -->
</header>

<main class="rvt-shell">
  <div class="rvt-shell__stage">
    <div class="rivet-page-header">
      <!-- Page header content -->
    </div>
    
    <!-- Rest of your app's main content -->
  </div>
</main>

<footer class="rvt-footer">
  <!-- Rivet footer markup -->
</footer>
```

[See the demo for examples](https://indiana-university.github.io/rivet-shell/)

## Installing with NPM
```shell
npm install --save-dev rivet-shell
```