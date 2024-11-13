document.addEventListener("DOMContentLoaded", function () {
    const scrollDownButton = document.getElementById("scrollDownButton");
    const scrollUpButton = document.getElementById("scrollUpButton");

    if (scrollDownButton && scrollUpButton) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;

            scrollDownButton.addEventListener("click", () => {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: scrollPageDown
                });
            });

            scrollUpButton.addEventListener("click", () => {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: scrollPageUp
                });
            });
        });
    }
});

async function scrollPageDown() {
    const startTime = Date.now();
    const duration = 60000;
    let previousHeight = document.documentElement.scrollHeight;

    while (Date.now() - startTime < duration) {
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const currentHeight = document.documentElement.scrollHeight;
        if (currentHeight === previousHeight) {
            break;
        }
        previousHeight = currentHeight;
    }
}

async function scrollPageUp() {
    window.scrollTo(0, 0);
}
