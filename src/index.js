/**
 * RelativeTime
 *
 * @file Component that displays the relative time, with optional real-time updating.
 *
 * @author Ryan Hefner <hi@ryanhefner.com>
 */

const requestId = Symbol();
const tick = Symbol();
const pastRelativeTime = Symbol();
const futureRelativeTime = Symbol();
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

        const now = new Date();
        const date = new Date(dateTime);
        const diff = now.getTime() - date.getTime();

        this.innerHTML = diff > 0
            ? this[pastRelativeTime](diff)
            : this[futureRelativeTime](diff * -1);

        if (this[autoUpdateEnabled]()) {
            this[requestId] = requestAnimationFrame(this[tick].bind(this));
        }
    }

    [pastRelativeTime](diff) {
        if (diff >= DECADE) {
            const decades = Math.floor(diff / DECADE);
            return decades === 1
                ? `${decades} decade ago`
                : `${decades} decades ago`;
        }

        if (diff >= YEAR) {
            const years = Math.floor(diff / YEAR);
            return years === 1
                ? `${years} year ago`
                : `${years} years ago`;
        }

        if (diff >= DAY) {
            const days = Math.floor(diff / DAY);
            return days === 1
                ? `${days} day ago`
                : `${days} days ago`;
        }

        if (diff >= HOUR) {
            const hours = Math.floor(diff / HOUR);
            return hours === 1
                ? `${hours} hour ago`
                : `${hours} hours ago`;
        }

        if (diff >= MINUTE) {
            const minutes = Math.floor(diff / MINUTE);
            return minutes === 1
                ? `${minutes} minute ago`
                : `${minutes} minutes ago`;
        }

        const seconds = Math.floor(diff / SECOND);
        return seconds === 1
            ? `${seconds} second ago`
            : `${seconds} seconds ago`;
    }

    [futureRelativeTime](diff) {
        if (diff >= DECADE) {
            const decades = Math.floor(diff / DECADE);
            return decades === 1
                ? `in a decade`
                : `in ${decades} decades`;
        }

        if (diff >= YEAR) {
            const years = Math.floor(diff / YEAR);
            return years === 1
                ? `in a year`
                : `in ${years} years`;
        }

        if (diff >= DAY) {
            const days = Math.floor(diff / DAY);
            return days === 1
                ? `in a day`
                : `in ${days} days`;
        }

        if (diff >= HOUR) {
            const hours = Math.floor(diff / HOUR);
            return hours === 1
                ? `in an hour`
                : `in ${hours} hours`;
        }

        if (diff >= MINUTE) {
            const minutes = Math.floor(diff / MINUTE);
            return minutes === 1
                ? `in a minute`
                : `in ${minutes} minutes`;
        }

        const seconds = Math.floor(diff / SECOND);
        return seconds === 1
            ? `in a second`
            : `in ${seconds} seconds`;
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
        if (this[requestId]) {
            cancelAnimationFrame(this[requestId]);
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
