/**
 * add an event at the top of the table
 * @return {HTMLElement} the node that was added
 */
export function addEvent() {
    const events = document.getElementById('events');

    const template = document.getElementById('event-template');
    // firstElementChild is to prevent weird bugs, and we only have one child
    const row = document.importNode(template.content, true).firstElementChild;

    // non-strict null check
    if(window.time != null && window.time > new Date())
        row.children[2].innerHTML = 'T-';

    // add new row at beginning
    events.insertBefore(row, events.firstChild);

    // trigger animation to show row
    setTimeout(() => row.classList.remove('hidden'), 0);
    setTimeout(() => row.classList.add('reverse'), 600);  // for possible removal

    // used for pre-written messages
    return row;
}

/**
 * remove event at top of list.
 * will not remove last row
 */
export function removeEvent() {
    const events = document.getElementById('events');
    if(events.children.length > 1) {  // don't allow removing last event
        events.firstElementChild.classList.add('hidden');
        setTimeout(() => events.removeChild(events.firstElementChild), 600);
    }
}

/**
 * call {@link addEvent} if the top row has a non-empty message
 */
export function addEventIfNeeded() {
    if(document.getElementById('events').firstElementChild.children[6].innerHTML.length > 0)
        addEvent();
}
