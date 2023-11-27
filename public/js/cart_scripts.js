document.addEventListener("DOMContentLoaded", function () {
    addRemoveItemBtnListeners();
});

const addRemoveItemBtnListeners = function () {
    const removeItemBtns = document.querySelectorAll(".remove-btn");
    for (const removeItemBtn of removeItemBtns) {
        removeItemBtn.addEventListener("click", async function () {
            const index = removeItemBtn.parentElement.parentElement
                .querySelector(".item-id")
                .innerText.split("-")[0];

            const response = await fetch("/removeCartItem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    index: index,
                }),
            });

            if (response.status == 200) {
                window.location.reload();
            }
        });
    }
};
