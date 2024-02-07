/* 
HTML reference:

<div class="project-entry" id="entryID"> 
    <img src="Capture.PNG" alt="project icon" class="project-icon">
    <div class="description">
        <h3 class="description-title">Project 1</h3>
        <p class="description-body">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, maxime? Illo totam rerum ipsam aut excepturi quasi sequi dicta officia quod, assumenda provident suscipit quas quibusdam voluptas quo at soluta!</p>
        <div class="project-links">
            <a href="#" class="project-link">GitHub</a> 
            <a href="#" class="project-link">Demo</a>
        </div>
        <div class="project-tags">
            <p class="project-tag">Tag1</p>
            <p class="project-tag">Tag2</p>
        </div>
    </div>
</div>

*/

class ProjectEntry {
    constructor(id) {
        this.id = id;
        
        this.icon = document.createElement("img");
        this.icon.className = "project-icon";
        this.icon.alt = "project icon image";

        this.title = document.createElement("h3");
        this.title.className = "description-title";

        this.description = document.createElement("p");
        this.description.className = "description-body";

        this.links = document.createElement("div");
        this.links.className = "project-links";

        this.tagsDOM = document.createElement("div");
        this.tagsDOM.className = "project-tags";

        this.date = document.createElement("p")
        this.date.className = "project-date"
        
        this.component = document.createElement("div");
        this.component.className = "project-entry";

        this.component.appendChild(this.icon);
        const descContainer = document.createElement("div");
        descContainer.className = "description";
        descContainer.appendChild(this.title);
        descContainer.appendChild(this.description);
        descContainer.appendChild(this.links);
        descContainer.appendChild(this.tagsDOM);
        descContainer.appendChild(this.date);
        this.component.appendChild(descContainer);

        this.tags = new Set();
    }

    setIcon(imgSrc) {
        this.icon.src = imgSrc;
    }

    setDescription(title, description) {
        this.title.innerText = title;
        this.description.innerText = description;
    }

    setDate(date) {
        this.date.innerText = date;
    }

    addLink(name, href) {
        const link = document.createElement("a");
        link.className = "project-link";
        link.innerText = name;
        link.href = href;
        link.target = "_blank";
        this.links.appendChild(link);
    }

    addTag(name) {
        const link = document.createElement("p");
        link.className = "project-tag";
        link.innerText = name;
        this.tagsDOM.appendChild(link);
        this.tags.add(name);
    }

    attachTo(parentContainer, referenceNode=null) {
        parentContainer.insertBefore(this.component, referenceNode);
    }

    detachFrom(parentContainer) {
        if (parentContainer.contains(this.component)) {
            parentContainer.removeChild(this.component);
        }
    }
}