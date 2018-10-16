/* =====================================================================
 * JS Helpers
 * Version: 0.0.1
 * Author: Victor Diego <victordieggo@gmail.com>
 * License: MIT
 * ================================================================== */

const helpers = {

  /* ---------------------------------------------------------------------
   * Trigger any event from any element
   * -------------------------------------------------------------------*/

  triggerEvent: (element, eventType) => {
    'use strict';
    if (element.fireEvent) {
      (element.fireEvent('on' + eventType));
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(eventType, true, false);
      element.dispatchEvent(evObj);
    }
  },

  /* ---------------------------------------------------------------------
   * Get only numbers from string
   * -------------------------------------------------------------------*/

  numbersOnly: (value) => {
    'use strict';
    return value.replace(/\D/g, '');
  },

  /* ---------------------------------------------------------------------
   * Toggle Aria Expanded Attribute
   * -------------------------------------------------------------------*/

  toggleExpanded: (element) => {
    'use strict';
    const ariaExpanded = element.getAttribute('aria-expanded');
    element.setAttribute('aria-expanded', ariaExpanded == 'false' ? 'true' : 'false');
  },

  /* ---------------------------------------------------------------------
   * Format Currency
   * -------------------------------------------------------------------*/

  formatCurrency: (number) => {
    'use strict';
    number = number.toFixed(2).split('.');
    number[0] = 'R$ ' + number[0].split(/(?=(?:...)*$)/).join('.');
    return number.join(',');
  },

  /* ---------------------------------------------------------------------
   * Validate Text
   * -------------------------------------------------------------------*/

  validateText: (name) => {
    'use strict';
    name = name.replace(/ /g, '');
    var regex = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
    if (regex.test(name)) {
      return true;
    }
    return;
  },

  /* ---------------------------------------------------------------------
   * Validate E-mail
   * -------------------------------------------------------------------*/

  validateEmail: (email) => {
    'use strict';
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(email)) {
      return true;
    }
    return;
  },

  /* ---------------------------------------------------------------------
   * Validate Phone
   * -------------------------------------------------------------------*/

  validatePhone: (phone) => {
    'use strict';

    phone = this.numbersOnly(phone);

    if (phone.length < 10) {
      return;
    }

    for (var i = 0; i < 10; i++) {
      if (phone == Array(11).join(i) || phone == Array(12).join(i)) {
        return;
      }
    }

    var ddd = [
      11, 12, 13, 14, 15, 16, 17, 18, 19,
      21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 51, 53, 54, 55, 61, 62,
      64, 63, 65, 66, 67, 68, 69, 71, 73,
      74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95,
      96, 97, 98, 99
    ];
    if (ddd.indexOf(parseInt(phone.substring(0, 2))) === -1) {
      return;
    }

    return true;
  },

  /* ---------------------------------------------------------------------
   * Validate CNPJ
   * -------------------------------------------------------------------*/

  validateCnpj: (cnpj) => {
    'use strict';

    cnpj = numbersOnly(cnpj);

    if (cnpj.length != 14) {
      return;
    }

    for (var i = 0; i < 15; i++) {
      if (cnpj == Array(15).join(i)) {
        return;
      }
    }

    var size = cnpj.length - 2;
    var numbers = cnpj.substring(0, size);
    var digits = cnpj.substring(size);
    var sum = 0;
    var pos = size - 7;

    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    var result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0)) {
      return;
    }

    size = size + 1;
    numbers = cnpj.substring(0,size);
    sum = 0;
    pos = size - 7;
    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1)) {
      return;
    }

    return true;
  }
};
