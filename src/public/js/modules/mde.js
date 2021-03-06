import { save } from './reddit';

/**
 * register all `textarea`s with SimpleMDE, creating markdown editors
 */
window.addEventListener('load', () => {
    // register textareas as Markdown editor
    document.querySelectorAll('textarea').forEach(obj => {
        new SimpleMDE({
            element: obj,
            initialValue: obj.getAttribute('data-initial') || '',
            toolbar: [
                { name: 'save',
                  action: save,
                  className: 'fa fa-upload',
                  title: 'Save to reddit'
                },
                '|', 'bold', 'italic', 'strikethrough', 'heading', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'table', 'horizontal-rule'],
            promptURLs: true,
            status: false,
            forceSync: true,
            spellChecker: false,
        });
    });

    // MDE animation handler
    document.querySelectorAll('.fa-upload').forEach(obj => obj.animationend = () => obj.classList.remove('highlight'));
});
