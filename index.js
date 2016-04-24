/**
 * RelativeTime
 *
 * @file Component that displays the relative time, with optional real-time updating.
 *
 * @author Ryan Hefner <hi@ryanhefner.com>
 */

const tick = Symbol();

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;
const DECADE = YEAR * 10;


class RelativeTime extends HTMLElement {

// Private Methods ___________________________________________________________

    [tick]() {
        if (!this.dataset.date) {
            return;
        }

        let value;
        const now = new Date();
        const date = new Date(this.dataset.date);
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

        requestAnimationFrame(this[tick].bind(this));
    }

// Event Handlers ____________________________________________________________

    createdCallback() {

    }

    attachedCallback() {
        requestAnimationFrame(this[tick].bind(this));
    }

    detachedCallback() {
        requestAnimationFrame(null);
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        switch (attr) {
            case 'data-date':
                requestAnimationFrame(this[tick].bind(this));
                break;
        }
    }
}

// Exports ___________________________________________________________________

export default document.registerElement('relative-time', RelativeTime);
