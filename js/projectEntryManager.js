class projectEntryManager {
    constructor() {
        this.entries = [];
        this.activeEntries = [];
        this.allTags = [];
    }

    addEntry(obj) {
        const entry = new ProjectEntry(Number(obj.id));
        entry.setIcon(obj.icon);
        entry.setDate(obj.date);
        entry.setDescription(obj.title, obj.description);
        obj.links.forEach(link => {
            entry.addLink(link.name, link.href);
        });
        obj.tags.forEach(tag => {
            this.pushTag(tag);
            entry.addTag(tag);
        })
        this.entries.push(entry);
    }

    sortEntriesById(descending) {
        this.entries.sort((entry1, entry2) => {
            return entry1.id - entry2.id;
        });
        if (descending) {
            this.entries.reverse();
        }
    }

    pushTag(tagValue) {
        let push = true;
        this.allTags.forEach(tag => {
            if (tag.value == tagValue) {
                push = false;
            }
        });
        if (push) {
            this.allTags.push(new Tag(tagValue));
        }
    }

    async loadEntriesFromJSON(filename) {
        const requestURL = window.location.origin.concat("/", `${filename}`)
        const request = new Request(requestURL);
        const response = await fetch(request);
        const parsedEntries = await response.json();
        parsedEntries.forEach(entryObj => {
            this.addEntry(entryObj);
        })
        this.sortEntriesById(true);
    }

    populateContainer(container) {
        this.entries.forEach(entry => {
            if (this.activeEntries.indexOf(entry) >=0) {
                entry.attachTo(container);
            } else {
                if (container.contains(entry.component)) {
                    entry.detachFrom(container);
                }
            }
        });
    }

    updateTags(idleContainer, activeContainer) {
        const activeTagValues = new Set((new URLSearchParams(window.location.search)).getAll("tag"));
        // Update the DOM
        this.allTags.forEach(tag => {
            if (activeTagValues.has(tag.value)) {
                activeContainer.appendChild(tag.activeState);
                if (idleContainer.contains(tag.inactiveState)) {
                    idleContainer.removeChild(tag.inactiveState);
                }
            } else {
                idleContainer.appendChild(tag.inactiveState);
                if (activeContainer.contains(tag.activeState)) {
                    activeContainer.removeChild(tag.activeState);
                }
            }
        });
        // Update internal state
        if (activeTagValues.size == 0) {
            this.activeEntries = this.entries;
        } else {
            this.activeEntries = this.entries.filter((entry) => {
                let passed = true;
                activeTagValues.forEach(tag => {
                    if (!entry.tags.has(tag)) {
                        passed = false;
                    }
                });
                return passed;
            });
        }
    }
}


