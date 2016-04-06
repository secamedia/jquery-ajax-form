(function ($) {
    'use strict';

    /**
     * Creates the submit event on all forms and calls a callback function when submitted.
     *
     * Also sets the clicked button name if the button event is omitted, see `$.smGetFormData`.
     * The callback function has the action type, the form data and the called jquery form element as it's parameter.
     *
     * @author Thomas Rudolph <rudolph@secamedia.de>
     * @since 2016.03.15
     * @param {jQuery[]} $forms
     * @param {function} callback
     */
    $.smAjaxForm = function ($forms, callback) {
        $forms.on('submit', function (event, buttonEvent) {
            event.preventDefault();
            var $this = $(this);
            var type = $this.attr('method');
            var data = $.smGetFormData($this, buttonEvent);
            type = type && type.length ? type.toLowerCase() : 'get';
            callback(type, data, $this);
        });
        /**
         * Since jQuery.serialize() doesn't recognize buttons, we have to get them manually.
         *
         * @author Thomas Rudolph <rudolph@secamedia.de>
         * @since 2014.09.23
         */
        $('input[type=submit], button[type=submit]', $forms).on('click', function (e) {
            $(this).parents('form').trigger('submit', e);
            e.preventDefault();
        });
    };

    /**
     * Returns all form data from the given jQuery form element.
     *
     * If a button event is omitted it adds the button name to the data without a value.
     *
     * @author Thomas Rudolph <rudolph@secamedia.de>
     * @since 2016.03.15
     * @param {jQuery} $form
     * @param {Event} buttonEvent
     * @returns {string}
     */
    $.smGetFormData = function ($form, buttonEvent) {
        var $disabled = $(':input:disabled', $form).removeAttr('disabled');
        var data = $form.serialize();
        if (buttonEvent && buttonEvent.currentTarget.name) {
            data += '&' + encodeURIComponent(buttonEvent.currentTarget.name) + '='
        }
        $disabled.attr('disabled', 'disabled');

        return data;
    };
}(jQuery));
