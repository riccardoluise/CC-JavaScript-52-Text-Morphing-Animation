# Project Files Summary

This document contains the content of all project files, excluding those specified in .gitignore, node_modules, .git, README.md, concatenate.js, and custom exclusions.

## Directory Structure

```json
{
  "type": "directory",
  "children": [
    {
      "type": "file",
      "path": ".env"
    },
    {
      "type": "file",
      "path": ".gitignore"
    },
    {
      "type": "directory",
      "children": [
        {
          "type": "file",
          "path": "css/main.css"
        }
      ]
    },
    {
      "type": "directory",
      "children": []
    },
    {
      "type": "file",
      "path": "index.html"
    },
    {
      "type": "directory",
      "children": [
        {
          "type": "file",
          "path": "js/main.js"
        }
      ]
    },
    {
      "type": "file",
      "path": "package.json"
    },
    {
      "type": "file",
      "path": "project_files_summary.md"
    }
  ]
}
```

## File List

1. .env
2. .gitignore
3. css/main.css
4. index.html
5. js/main.js
6. package.json
7. project_files_summary.md

## File Contents

### 1. .env

```
# Place your StackBlitz environment variables here,
# and they will be securely synced to your account.
```

### 2. .gitignore

```
node_modules
```

### 3. css/main.css

```
@import url('https://fonts.googleapis.com/css?family=Raleway:900&display=swap');

body {
	margin: 0px;
    background: #000;
}

#container {
	position: absolute;
	margin: auto;
	width: 100vw;
	height: 80pt;
	top: 0;
	bottom: 0;
	filter: url(#threshold) blur(0.6px);
}

#text1, #text2 {
	position: absolute;
	width: 100%;
	display: inline-block;
    color: #fff;
	font-family: 'Raleway', sans-serif;
	font-size: 80px;
	text-align: center;
	user-select: none;
}
```

### 4. index.html

```
<!DOCTYPE html>
<html lang="en">
<head>		
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="HandheldFriendly" content="true">
    <meta name = "format-detection" content = "telephone=no">
        
    <title>Text Morphing Animation</title>

	<!-- Styles -->
    <link rel="stylesheet" type="text/css"  href="css/main.css" />

</head>
<body>
<!-- Explanation in JS tab -->

<!-- The two texts -->
<div id="container">
	<span id="text1"></span>
	<span id="text2"></span>
</div>

<!-- The SVG filter used to create the merging effect -->
<svg id="filters">
	<defs>
		<filter id="threshold">
			<!-- Basically just a threshold effect - pixels with a high enough opacity are set to full opacity, and all other pixels are set to completely transparent. -->
			<feColorMatrix in="SourceGraphic"
					type="matrix"
					values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140" />
		</filter>
	</defs>
</svg>


 <!-- Scripts -->
 <script src="js/main.js"></script>
</body>  
</html>
```

### 5. js/main.js

```
const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"A",
	"a",
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

// Start the animation.
animate();
```

### 6. package.json

```
{
    "scripts": {
      "start": "live-server --port=8080"
    },
    "dependencies": {
      "live-server": "^1.2.1"
    }
  }
```

### 7. project_files_summary.md

```
# Project Files Summary

This document contains the content of all project files, excluding those specified in .gitignore, node_modules, .git, README.md, concatenate.js, and custom exclusions.

## Directory Structure

```json
{
  "type": "directory",
  "children": [
    {
      "type": "file",
      "path": ".env"
    },
    {
      "type": "file",
      "path": ".gitignore"
    },
    {
      "type": "directory",
      "children": [
        {
          "type": "file",
          "path": "css/main.css"
        }
      ]
    },
    {
      "type": "directory",
      "children": []
    },
    {
      "type": "file",
      "path": "index.html"
    },
    {
      "type": "directory",
      "children": [
        {
          "type": "file",
          "path": "js/main.js"
        }
      ]
    },
    {
      "type": "file",
      "path": "package.json"
    }
  ]
}
```

## File List

1. .env
2. .gitignore
3. css/main.css
4. index.html
5. js/main.js
6. package.json

## File Contents

### 1. .env

```
# Place your StackBlitz environment variables here,
# and they will be securely synced to your account.
```

### 2. .gitignore

```
node_modules
```

### 3. css/main.css

```
@import url('https://fonts.googleapis.com/css?family=Raleway:900&display=swap');

body {
	margin: 0px;
    background: #000;
}

#container {
	position: absolute;
	margin: auto;
	width: 100vw;
	height: 80pt;
	top: 0;
	bottom: 0;
	filter: url(#threshold) blur(0.6px);
}

#text1, #text2 {
	position: absolute;
	width: 100%;
	display: inline-block;
    color: #fff;
	font-family: 'Raleway', sans-serif;
	font-size: 80px;
	text-align: center;
	user-select: none;
}
```

### 4. index.html

```
<!DOCTYPE html>
<html lang="en">
<head>		
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="HandheldFriendly" content="true">
    <meta name = "format-detection" content = "telephone=no">
        
    <title>Text Morphing Animation</title>

	<!-- Styles -->
    <link rel="stylesheet" type="text/css"  href="css/main.css" />

</head>
<body>
<!-- Explanation in JS tab -->

<!-- The two texts -->
<div id="container">
	<span id="text1"></span>
	<span id="text2"></span>
</div>

<!-- The SVG filter used to create the merging effect -->
<svg id="filters">
	<defs>
		<filter id="threshold">
			<!-- Basically just a threshold effect - pixels with a high enough opacity are set to full opacity, and all other pixels are set to completely transparent. -->
			<feColorMatrix in="SourceGraphic"
					type="matrix"
					values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140" />
		</filter>
	</defs>
</svg>


 <!-- Scripts -->
 <script src="js/main.js"></script>
</body>  
</html>
```

### 5. js/main.js

```
const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"Why",
	"do",
	"you",
	"watch",
	"Crazy",
	"Coding",
	"channel?"
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

// Start the animation.
animate();
```

### 6. package.json

```
{
    "scripts": {
      "start": "live-server --port=8080"
    },
    "dependencies": {
      "live-server": "^1.2.1"
    }
  }
```
```

