const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

// The strings to morph between. Only using the letter "A" with different styles.
const texts = [
    "A",
    "<b>A</b>",
    "<i>A</i>",
    "<b><i>A</i></b>"
];

// Controls the speed of morphing.

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = 0.25;

// Parameters
let blurIntensity = 8;
let opacityPower = 0.4;
let fontSize = 80;
let morphTime = 1;
let cooldownTime = 0.25;

elts.text1.innerHTML = texts[textIndex % texts.length];
elts.text2.innerHTML = texts[(textIndex + 1) % texts.length];

function setupSlider(id, valueId, updateFunction) {
    const slider = document.getElementById(id);
    const valueSpan = document.getElementById(valueId);

    function updateSlider() {
        valueSpan.textContent = parseFloat(slider.value).toFixed(2);
        updateFunction(parseFloat(slider.value));
    }

    slider.addEventListener('input', updateSlider);
    updateSlider();
}

document.addEventListener('DOMContentLoaded', () => {
    setupSlider('blurIntensity', 'blurIntensityValue', (value) => blurIntensity = value);
    setupSlider('opacityPower', 'opacityPowerValue', (value) => opacityPower = value);
    setupSlider('fontSize', 'fontSizeValue', (value) => {
        fontSize = value;
        elts.text1.style.fontSize = `${fontSize}px`;
        elts.text2.style.fontSize = `${fontSize}px`;
    });
    setupSlider('morphTime', 'morphTimeValue', (value) => morphTime = value);
    setupSlider('cooldownTime', 'cooldownTimeValue', (value) => cooldownTime = value);
});

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
    elts.text2.style.filter = `blur(${Math.min(blurIntensity / fraction - blurIntensity, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, opacityPower) * 100}%`;
    
    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(blurIntensity / fraction - blurIntensity, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, opacityPower) * 100}%`;
    
    elts.text1.innerHTML = texts[textIndex % texts.length];
    elts.text2.innerHTML = texts[(textIndex + 1) % texts.length];
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