/**
 * RelativeTime
 *
 * @file Component that displays the relative time, with optional real-time updating.
 *
 * @author Ryan Hefner <hi@ryanhefner.com>
 */

const tick = Symbol();
const autoUpdateEnabled = Symbol();

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;
const DECADE = YEAR * 10;


class RelativeTime extends HTMLElement {

// Private Methods ___________________________________________________________

    [tick]() {
        const dateTime = this.getAttribute('datetime');

        if (!dateTime) {
            return;
        }

        let value;
        const now = new Date();
        const date = new Date(dateTime);
        const diff = now.getTime() - date.getTime();

        if (diff >= DECADE) {
            const decades = Math.floor(diff / DECADE);
            value = decades === 1
                ? `${decades} decade ago`
                : `${decades} decades ago`;
        }
        else if (diff >= YEAR) {
            const years = Math.floor(diff / YEAR);
            value = years === 1
                ? `${years} year ago`
                : `${years} years ago`;
        }
        else if (diff >= DAY) {
            const days = Math.floor(diff / DAY);
            value = days === 1
                ? `${days} day ago`
                : `${days} days ago`;
        }
        else if (diff >= HOUR) {
            const hours = Math.floor(diff / HOUR);
            value = hours === 1
                ? `${hours} hour ago`
                : `${hours} hours ago`;
        }
        else if (diff >= MINUTE) {
            const minutes = Math.floor(diff / MINUTE);
            value = minutes === 1
                ? `${minutes} minute ago`
                : `${minutes} minutes ago`;
        }
        else {
            const seconds = Math.floor(diff / SECOND);
            value = seconds === 1
                ? `${seconds} second ago`
                : `${seconds} seconds ago`;
        }

        this.innerHTML = value;

        if (this[autoUpdateEnabled]) {
            requestAnimationFrame(this[tick].bind(this));
        }
    }

    [autoUpdateEnabled]() {
        return this.getAttribute('autoupdate') !== null;
    }

// Event Handlers ____________________________________________________________

    createdCallback() {

    }

    attachedCallback() {
        this[tick]();
    }

    detachedCallback() {
        if (this[autoUpdateEnabled]) {
            requestAnimationFrame(null);
        }
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        switch (attr) {
            case 'datetime':
                this[tick]();
                break;
        }
    }
}

// Exports ___________________________________________________________________

module.exports = document.registerElement('relative-time', RelativeTime);
