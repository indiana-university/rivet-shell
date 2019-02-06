---
layout: layouts/base.njk
title: Rivet shell
---
## Basic shell configuration
The default Rivet layout shell comes ready to use with any of the Rivet header variations and the Rivet footer. The _stage_ area will fill up the remaining vertical space and push the footer to the bottom of the browser window.

Inside the stage are we include a _page header_ component that is used for page/view-specific content. The page header includes:

- A title block
- Breadcrumb navigation
- A dedicated toolbar-like space for actions and links

```html
<header class="rvt-header">
  <!-- Rivet header markup -->
</header>

<main class="rvt-shell">
  <div class="rvt-shell__stage">
    <div class="rivet-page-header">
      <!-- Page header content -->
    </div>
    
    <!-- Rest of your apps main content -->
  </div>
</main>

<footer class="rvt-footer">
  <!-- Rivet footer markup -->
</footer>
```

**NOTE**: The root `rvt-shell` class should be applied to the `<main>` element of your document to work correctly. 

## Shell sidebar
To offer even more flexibility, the Rivet shell also comes with a sidebar component that can be used to help layout out navigation and content.

```html
<main class="rvt-shell">
  <div class="rvt-shell__sidebar">
    <nav role="navigation">
      <ul class="rvt-list-nav">
        <li>Nav item one</li>
        <!-- Rest of navigation -->
      </ul>
    </nav>
  </div>
  <div class="rvt-shell__stage rvt-p-all-md">
    <!-- Main content "Stage" -->
  </div>
</main>
```

## Shell modifiers
There are a couple of different modifiers you can use to modify the shell layout and appearance.

### Reverse modifier
If you are using the shell sidebar, the `rvt-shell--reverse` modifier will move the sidebar to the right side of the shell layout. 

```html
<main class="rvt-shell rvt-shell--reverse">
  <!-- Shell content -->
</main>
```

### Sidebar and stage modifiers
You can use the `rvt-shell__sidebar--light` modifier to changes the background color of the sidebar to white. This works really will with the `rvt-shell__stage--subtle` modifier which will apply a subtle gray background to the stage, effectively swapping the default colors.

```html
<main class="rvt-shell">
  <div class="rvt-shell__sidebar rvt-shell__sidebar--light">
    <nav role="navigation">
      <ul class="rvt-list-nav">
        <li>Nav item one</li>
        <!-- Rest of navigation -->
      </ul>
    </nav>
  </div>
  <div class="rvt-shell__stage rvt-shell__stage--subtle">
    <!-- Main content "Stage" -->
  </div>
</main>
```

{% include rivet-shell-switcher.njk %}
