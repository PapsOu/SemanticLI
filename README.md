# SemanticLI

Library used to generate Semantic UI themes based on Semantic UI's default one and [superhero](http://semantic-ui-forest.com/themes/bootswatch/superhero/) made by [semantic-ui-forest/forest-themes](https://github.com/semantic-ui-forest/forest-themes).

## Install

Installation is simple, execute the following script or clone SemanticUI into subfolder `semantic-ui` and install `npm packages` and `gulp`.

```bash
git clone https://github.com/blast-project/SemanticLI.git
cd SemanticLI/
./init.sh
```

## Build themes

### Build dark theme

```bash
gulp build-dark
```

Output files are :
- dist/semantic-superhero.css
- dist/semantic-superhero.min.css
- dist/semantic.js
- dist/semantic.min.js

### Build default theme

```bash
gulp build-default
```

Output files are :
- dist/semantic-librinfo.css
- dist/semantic-librinfo.min.css
- dist/semantic.js
- dist/semantic.min.js

## Usage

Use in your project the generated files (minifyed or not) :

```html
<!-- For the dark theme -->
<link rel="stylesheet" href="/css/semantic-superhero.min.css">

<!-- For the light theme -->
<link rel="stylesheet" href="/css/semantic-librinfo.min.css">

<!-- For any theme -->
<script src="/js/semantic.min.js"></script>
```
