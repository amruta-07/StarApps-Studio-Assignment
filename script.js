document.addEventListener('DOMContentLoaded', function() {
    const btncolors={
        "Blue":"#0098e4",
        "Pink":"#e01a6e",
        "Yellow":"#ffc005"
    }

    const bgColors={
        "Blue":"#e4f5fd",
        "Pink":"#f0eeef",
        "Yellow":"#fffaec"
    }
    const umbrella = document.getElementById('umbrella');
    const loaderIcon = document.getElementById('loader-icon');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const logoUpload = document.getElementById('logo-upload');
    const fileNameSpan = document.getElementsByClassName('fileName');
    const logoImage = document.getElementById('logo');
    const crossIcon = document.getElementById('cross-icon');
    const body = document.getElementsByTagName('body');
    const uploadBtn = document.getElementsByClassName("upload-button")


    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            umbrella.style.display = 'none';
            loaderIcon.style.display = 'block';
            logoImage.style.display = 'none';
            changeSVGColor(loaderIcon, color);
            body[0].style.background = bgColors[color];
            uploadBtn[0].style.background = btncolors[color]

            setTimeout(() => {
                umbrella.style.display = 'block';
                loaderIcon.style.display = 'none';
                umbrella.src = `assets/${color} umbrella.png`;
                if(logoImage.src){ //if the logo is present then we show logo
                    logoImage.style.display = 'flex';

                }
            }, 3000); // Hide loader and show umbrella after 5 seconds
        });
    });

    logoUpload.addEventListener('change', function(event) {
        console.log(event);
        const file = event.target.files[0];

        if (file.size > 5242880) {
            alert("File Size should not be greter than 5MB");
            return;
          }
          
        fileNameSpan[0].innerHTML = file.name;
        const reader = new FileReader();
        reader.onloadend = function() {
            logoImage.src = reader.result;
            logoImage.classList.remove('hidden');
            crossIcon.style.display = 'flex';
            logoImage.style.display = 'flex';
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    function changeSVGColor(svgElement, color) {
        console.log(svgElement, color);
        const svgPaths = svgElement.querySelectorAll('path');
        svgPaths.forEach(path => {
            path.setAttribute('fill', color);
        });
    }

    crossIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        clearLogo();
    });

    function clearLogo() {
        const crossIcon = document.getElementById('cross-icon');
        const fileNameSpan = document.getElementsByClassName('fileName');
        const logoUpload = document.getElementById('logo-upload');

        logoImage.removeAttribute('src')
        crossIcon.style.display = 'none';
        logoImage.style.display = 'none';
        logoImage.classList.add('hidden');
        fileNameSpan[0].innerHTML = 'UPLOAD LOGO';
        
        logoUpload.value = null; //to choose same file  
    }
});
