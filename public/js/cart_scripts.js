document.addEventListener("DOMContentLoaded", function () {
    addRemoveItemBtnListeners();
    addAddItemQtyListeners();
    addMinusItemQtyListeners();
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

const addAddItemQtyListeners = function () {
    const addItemQtyBtns = document.querySelectorAll(".add-btn");
    for (const addItemQtyBtn of addItemQtyBtns) {
        addItemQtyBtn.addEventListener("click", async function () {
            const index = addItemQtyBtn.parentElement.parentElement
                .querySelector(".item-id")
                .innerText.split("-")[0];

            const response = await fetch("/addCartItemQty", {
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

const addMinusItemQtyListeners = function () {
    const minusItemQtyBtns = document.querySelectorAll(".minus-btn");
    for (const minusItemQtyBtn of minusItemQtyBtns) {
        minusItemQtyBtn.addEventListener("click", async function () {
            const index = minusItemQtyBtn.parentElement.parentElement
                .querySelector(".item-id")
                .innerText.split("-")[0];

            const response = await fetch("/minusCartItemQty", {
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
