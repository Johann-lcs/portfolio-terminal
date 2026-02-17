// Textes pour chaque commande
const commandOutputs = {
    about: "Je m'appelle Johann, étudiant en BTS SIO 1ère année, passionné par le développement et la cybersécurité.",
    skills: "- HTML / CSS / JS\n- Linux / Terminal\n- Git / GitHub\n- Réseaux et CTF",
    projects: "- Portfolio interactif terminal\n- Projet CTF\n- Stage Hello My Soft",
    experience: "- Stage chez Hello My Soft\n- Petits projets perso",
    education: "- BTS SIO 1ère année (Rennes)\n- Formation complémentaire en cybersécurité",
    contact: "📧 Email : johann@example.com\n🔗 GitHub : https://github.com/johann-lcs\n🔗 LinkedIn : https://linkedin.com/in/johann-lcs"
};

// Historique des commandes
const history = [];
let historyIndex = -1;

// Récupération des éléments HTML
const input = document.getElementById("command-input");
const output = document.getElementById("output");

// Focus initial
input.focus();

// Écoute des touches
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const command = input.value.trim();
        if (command === "") return;

        // Ajouter à l'historique
        history.push(command);
        historyIndex = history.length;

        // Afficher la commande dans le terminal
        const commandLine = document.createElement("p");
        commandLine.innerHTML = `<span class="prompt">johann@portfolio:~$</span> ${command}`;
        output.appendChild(commandLine);

        // Traiter la commande
        handleCommand(command.toLowerCase());

        // Réinitialiser l'input et scroll
        input.value = "";
        input.focus();
        output.scrollTop = output.scrollHeight;

    } else if (event.key === "ArrowUp") {
        // Flèche haut : commande précédente
        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
        }
        event.preventDefault();
    } else if (event.key === "ArrowDown") {
        // Flèche bas : commande suivante
        if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        } else {
            historyIndex = history.length;
            input.value = "";
        }
        event.preventDefault();
    }
});

// Fonction pour traiter les commandes
function handleCommand(cmd) {
    const line = document.createElement("p");

    if (cmd === "help") {
        line.innerHTML = `
        Commandes disponibles :<br>
        <span class="command">about</span><br>
        <span class="command">skills</span><br>
        <span class="command">projects</span><br>
        <span class="command">experience</span><br>
        <span class="command">education</span><br>
        <span class="command">contact</span><br>
        <span class="command">clear</span>
        `;
        output.appendChild(line);
    } else if (cmd === "clear") {
        output.innerHTML = "";
    } else if (commandOutputs[cmd]) {
        output.appendChild(line);
        typeWriter(line, commandOutputs[cmd].replace(/\n/g, "<br>"));
    } else {
        line.textContent = `Commande inconnue : ${cmd} (tape "help")`;
        output.appendChild(line);
    }

    input.focus();
}

// Effet machine à écrire
function typeWriter(element, text, speed = 7) {
    let i = 0;
    element.innerHTML = "";
    const interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        // scroll automatique
        output.scrollTop = output.scrollHeight;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}
