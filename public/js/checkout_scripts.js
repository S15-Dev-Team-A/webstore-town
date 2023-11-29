document.addEventListener("DOMContentLoaded", function () {
    addPaymentTabBtnsListeners();
});

const addPaymentTabBtnsListeners = function () {
    // hide all tabs
    const allTablinks = document.querySelectorAll(".tablink");
    for (const tablink of allTablinks) {
        tablink.addEventListener("click", function (event) {
            // set all tablinks to inactive
            const allTabLinks = document.querySelectorAll(".tablink");
            for (const tabLink of allTabLinks) {
                tabLink.classList.remove("tablink-active");
            }

            // hide all tabcontents
            const allTabContents = document.querySelectorAll(".tabcontent");
            for (const tabContent of allTabContents) {
                tabContent.classList.replace(
                    "tabcontent-active",
                    "tabcontent-inactive"
                );
            }

            // set active tab and show corresponding tabcontent
            event.target.classList.add("tablink-active");
            const activeTab = event.target.name;
            document
                .querySelector("#" + activeTab)
                .classList.replace("tabcontent-inactive", "tabcontent-active");
        });
    }
};
