// Accordéon par ligne : une seule ligne ouverte à la fois
document.addEventListener("DOMContentLoaded", () => {
    const sections = Array.from(document.querySelectorAll(".accordion-section"));

    // Fonction pour mettre à jour la hauteur d'un panneau
    function setPanelHeight(section, open) {
        const panel = section.querySelector(".accordion-panel");
        if (!panel) return;

        if (open) {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } else {
            panel.style.maxHeight = "0px";
        }
    }

    // Initialisation : calcul de la hauteur pour la section déjà "open"
    sections.forEach(section => {
        const isOpen = section.classList.contains("open");
        setPanelHeight(section, isOpen);
    });

    // Clic sur un toggle
    sections.forEach(section => {
        const toggle = section.querySelector(".accordion-toggle");
        if (!toggle) return;

        toggle.addEventListener("click", () => {
            const isOpen = section.classList.contains("open");

            // Fermer toutes les sections
            sections.forEach(s => {
                s.classList.remove("open");
                setPanelHeight(s, false);
            });

            // Réouvrir celle qu'on vient de cliquer si elle n'était pas déjà ouverte
            if (!isOpen) {
                section.classList.add("open");
                setPanelHeight(section, true);
            }
        });
    });

    // Recalcule la hauteur de la section ouverte au resize (pour le responsive)
    window.addEventListener("resize", () => {
        const openSection = document.querySelector(".accordion-section.open");
        if (openSection) {
            setPanelHeight(openSection, true);
        }
    });
});
