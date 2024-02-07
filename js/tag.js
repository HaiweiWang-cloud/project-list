class Tag {
    constructor(value) {
        this.value = value;
        
        this.active = false;

        /* Template for inactive tag */
        this.inactiveState = document.createElement("div");
        this.inactiveState.className = "idle-tag";
        const addButton = document.createElement("button");
        addButton.onclick = () => {this.addToURL()};
        addButton.innerText = "+ ".concat(value);
        this.inactiveState.appendChild(addButton);

        /* Template for active tag */
        this.activeState = document.createElement("div");
        this.activeState.className = "active-tag";
        const removeButton = document.createElement("button");
        removeButton.onclick = () => {this.removeFromURL()};
        removeButton.innerText = "- ".concat(value);
        this.activeState.appendChild(removeButton);
    }

    addToURL() {
        const url = new URL(window.location.href);
        url.searchParams.append("tag", this.value);
        history.pushState({numOfParams: url.searchParams.size}, "", url)
        history.back();
        history.forward();
    }

    removeFromURL() {
        const url = new URL(window.location.href);
        url.searchParams.delete("tag", this.value);
        history.pushState({numOfParams: url.searchParams.size}, "", url)
        history.back();
        history.forward();
    }
}