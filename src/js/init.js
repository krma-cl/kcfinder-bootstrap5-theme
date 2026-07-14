(function($) {
    "use strict";

    var mobileBreakpoint = 768;

    function isMobile() {
        return window.innerWidth < mobileBreakpoint;
    }

    function closeFolders() {
        document.body.classList.remove("bs5-folders-open");
    }

    function installFolderToggle() {
        var toolbar = document.querySelector("#toolbar > div");
        if (!toolbar || document.getElementById("bs5FolderToggle")) return;

        var button = document.createElement("button");
        button.id = "bs5FolderToggle";
        button.type = "button";
        button.setAttribute("aria-label", "Mostrar carpetas");
        button.setAttribute("aria-controls", "left");
        button.setAttribute("aria-expanded", "false");
        button.innerHTML = "<span aria-hidden=\"true\"></span><b>Carpetas</b>";
        var upload = toolbar.querySelector('a[href="kcact:upload"]');
        if (upload) upload.insertAdjacentElement("afterend", button);
        else toolbar.insertBefore(button, toolbar.firstChild);
    }

    function applyResponsiveLayout() {
        if (!isMobile()) {
            closeFolders();
            return;
        }

        var right = document.getElementById("right");
        var files = document.getElementById("files");
        if (right) {
            right.style.left = "0";
            right.style.width = "100%";
        }
        if (files) files.style.width = "auto";
    }

    var originalResize = _.resize;
    _.resize = function() {
        originalResize.apply(_, arguments);
        applyResponsiveLayout();
    };

    $(function() {
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.body.classList.add("kcf-bootstrap5");
        installFolderToggle();
        applyResponsiveLayout();

        document.addEventListener("click", function(event) {
            var toggle = event.target.closest("#bs5FolderToggle");
            if (toggle) {
                event.preventDefault();
                event.stopPropagation();
                var open = document.body.classList.toggle("bs5-folders-open");
                toggle.setAttribute("aria-expanded", open ? "true" : "false");
                return;
            }

            if (!isMobile() || !document.body.classList.contains("bs5-folders-open")) return;
            if (event.target.closest("#left")) return;
            closeFolders();
        }, true);
    });
})(jQuery);
