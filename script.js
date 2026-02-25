// Textes pour chaque commande
const commandOutputs = {

    about: [
        " Johann LUCAS — Étudiant en 2ème année de BTS SIO (option SLAM)",
        " Rennes, France",
        "",
        "Passionné par le développement web et la cybersécurité.",
        "Je conçois des projets orientés pratique : applications web, environnement Linux, CTF et sécurisation.",
        "",
        " Objectif : devenir avant tout un développeur fullstack puis un développeur orienté sécurité / DevSecOps."
    ],

    skills: [
        " Développement :",
        "- HTML5 / CSS3",
        "- JavaScript (DOM, logique front-end)",
        "- PHP",
        "- C#",
        "- Java",
        "",
        " Bases de données :",
        "- SQL (requêtes SELECT, INSERT, UPDATE, JOIN)",
        "- MariaDB",
        "- MySQL",
        "- Modélisation MCD / MLD",
        "- Notions NoSQL (MongoDB)",
        "",
        " Systèmes & Réseaux :",
        "- Linux (Debian, ligne de commande)",
        "- Configuration FTP / Apache",
        "- Bases en réseaux (TCP/IP, DNS, HTTP)",
        "",
        " Cybersécurité :",
        "- Participation à des CTF",
        "- Analyse de vulnérabilités simples",
        "- Sensibilisation aux bonnes pratiques (OWASP)",
        "",
        " Outils :",
        "- Git / GitHub",
        "- VS Code",
        "- VirtualBox",
        "- FileZilla"
    ],

    projects: [
        " Portfolio Terminal Interactif",
        "→ Site développé en HTML/CSS/JS simulant un terminal Linux",
        "→ Gestion d’historique de commandes",
        "→ Effet machine à écrire en JavaScript",
        "",
        " Portfolio classique",
        "→ Site développé en HTML/CSS/JS",
        "→ Meilleur rendu si aucune connaissance en Linux",
        "",
        " Projets académiques BTS",
        "→ Mini applications web dynamiques",
        "→ Manipulation BDD (bases SQL)"
    ],

    experience: [
        " Stage - Skyld (Ille-et-Vilaine)",
        "→ Participation à des tâches techniques",
        "→ Tâches principal: Référecnement SEO, LLMs, refonte du site web",
        "",
        " Stage - Hello My Soft (Ille-et-Vilaine)",
        "→ Découverte environnement professionnel",
        "→ Participation à des tâches techniques",
        "→ Compréhension cycle de développement",
        "",
        " Projets personnels",
        "→ Entraînement régulier en développement",
        "→ Résolution de challenges cybersécurité"
    ],

    education: [
        " BTS SIO (Services Informatiques aux Organisations)",
        "Option SLAM — Solutions Logicielles et Applications Métiers",
        "Rennes",
        "",
        " BAC STI2D (Sciences et Technologies de l'Industrie et du Développement Durable)",
        "Option SIN - Systèmes d'Information et Numérique",
        "Cesson-sévigné",
        "",
        " Formation complémentaire personnelle :",
        "- Cybersécurité (CTF, Linux)",
        "- Auto-formation langage de programmation (OpenClassRoom...)"
    ],

    contact: [
        " Email : johann@example.com",
        " GitHub : https://github.com/johann-lcs",
        " LinkedIn : https://linkedin.com/in/johann-lcs",
        "",
        "!!! Disponible pour une alternance. !!!"
    ]
};

// Historique des commandes
const history = [];
let historyIndex = -1;

// Récupération des éléments HTML
const input = document.getElementById("command-input");
const terminalContent = document.getElementById("terminal-content");
const output = document.getElementById("output");

// Focus initial
input.focus();

// Écoute des touches
input.addEventListener("keydown", function (event) {
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
        terminalContent.appendChild(commandLine);

        // Traiter la commande
        handleCommand(command.toLowerCase(), terminalContent);

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
function handleCommand(cmd, container) {
    const line = document.createElement("p");

    if (cmd === "help") {
        const helpText = [
            "Commandes disponibles :",
            '<span class="command-help">  about       </span> → Infos personnelles',
            '<span class="command-help">  skills      </span> → Compétences',
            '<span class="command-help">  projects    </span> → Projets réalisés',
            '<span class="command-help">  experience  </span> → Expériences',
            '<span class="command-help">  education   </span> → Formation',
            '<span class="command-help">  contact     </span> → Contact',
            '<span class="command-help">  clear       </span> → Effacer le terminal'
        ];
        // Ajouter chaque ligne immédiatement avec innerHTML
        helpText.forEach(line => {
            const p = document.createElement("p");
            p.innerHTML = line;  // innerHTML pour interpréter le HTML
            container.appendChild(p);
        });
    }
    else if (cmd === "clear") {
        container.innerHTML = "";
    }
    else if (commandOutputs[cmd]) {
        typeWriterLines(container, commandOutputs[cmd], 5, 20);
    }
    else {
        typeWriterLines(container, [`Commande inconnue : ${cmd} (tape "help")`], 5, 20);
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

function typeWriterLines(container, lines, lineSpeed = 1, delayBetweenLines = 10) {
    let i = 0;

    function writeLine() {
        if (i >= lines.length) return;

        const p = document.createElement("p");
        container.appendChild(p);

        const text = lines[i];
        let j = 0;

        const interval = setInterval(() => {
            p.innerHTML += text.charAt(j);
            j++;
            container.scrollTop = container.scrollHeight; // scroll auto
            if (j >= text.length) {
                clearInterval(interval);
                i++;
                setTimeout(writeLine, delayBetweenLines); // délai avant la ligne suivante
            }
        }, lineSpeed);
    }

    writeLine();
}
