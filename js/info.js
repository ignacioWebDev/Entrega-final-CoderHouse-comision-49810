const myName = "Hecho por Ignacio Bortolin";
let index = 0;

function showNameLetterByLetter() {
    letterByLetter(0);
}

function letterByLetter(delay) {
    if (index < myName.length) {
        setTimeout(function() {
            document.getElementById("myName").textContent = myName.substring(0, index + 1);
            index++;
            letterByLetter(Math.random() * 500); // Establece un nuevo retraso aleatorio para la siguiente letra
        }, delay);
    }
}

showNameLetterByLetter();
