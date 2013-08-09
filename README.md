"Bootstrap BBQ"
===============

I'm currently in the midst of learning Twitter Bootstrap. While I'm at it I'm attempting to integrate some of Bootstrap's components with the jQuery BBQ ("back button and query") library, as well as trying to add some other accessibility enhancements.

Collapse
--------

*   Focus order is managed such that accordion headings can be tabbed through quickly. Elements within accordion bodies receive focus only when accordion bodies are shown.

Modal
-----

*   Focus returns to the element that triggered the modal when the modal is closed.
*   Focus cannot escape an open modal (thanks to jQuery Trap plugin).
*   Application state is remembered and browser back button operation is preserved (thanks to jQuery BBQ plugin).

Tab
---

*   Application state is remembered and browser back button operation is preserved (thanks to jQuery BBQ plugin).

Dropdown
--------
