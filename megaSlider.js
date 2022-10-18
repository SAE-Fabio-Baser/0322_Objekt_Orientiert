/**
 * MegaSlider
 * Best Slider in Europe
 */
class MegaSlider {

    currentImageIndex = 0

    /**
     * Creates a new slider
     * @param initElement {HTMLDivElement}
     * @param images {string[]}
     */
    constructor(initElement, images, autoTime) {
        this.initElement = initElement
        this.images = images
        this.autoTime = autoTime

        this.setupDOM()
    }

    /**
     * Creates needed HTML-Elements for later use
     */
    setupDOM() {

        const createElem = (type, parent, className) => {
            const elem = document.createElement(type)
            elem.classList.add(className)
            parent.appendChild(elem)
            return elem
        }

        // Create Stage-Div
        const stageDiv = createElem("div", this.initElement, "stageContainer")

        // Create Prev-Button
        const prevButton = createElem("div", stageDiv, "prevButton")
        prevButton.innerHTML = '&#10094'
        prevButton.addEventListener("click", () => {
            this.changeImage(-1)
            this.pause()
            this.play()
        })

        // Create Stage-Image
        this.stageImage = createElem("img", stageDiv, "stageImage")

        // Create Next-Button
        const nextButton = createElem("div", stageDiv, "nextButton")
        nextButton.innerHTML = '&#10095'
        nextButton.addEventListener("click", () => {
            this.changeImage(+1)
            this.pause()
            this.play()
        })

        const miniaturesContainer = createElem("div", this.initElement, "miniaturesContainer")

        this.miniatures = this.images.map((image, imageIndex) => {
            const mini = createElem("img", miniaturesContainer, "miniature")
            mini.setAttribute("src", image)
            mini.addEventListener("click", () => {
                this.pause()
                this.play()
                this.setImageByIndex(imageIndex)
            })
            return mini

        })

        this.play()
        this.update()
    }

    setImageByIndex(newIndex) {
        this.currentImageIndex = newIndex
        this.update()
    }

    /**
     * Updates all UI-Elements
     */
    update() {
        const newImage = this.images[this.currentImageIndex]
        this.stageImage.setAttribute("src", newImage)

        this.miniatures.forEach((mini, miniIndex) => {
            if (miniIndex === this.currentImageIndex) {
                mini.classList.add("active")
            } else {
                mini.classList.remove("active")
            }
        })
    }

    /**
     * Changes MainImage pending on direction
     * @param direction {1 | -1}
     */
    changeImage(direction) {

        const newIndex = this.currentImageIndex + direction
        const maxIndex = this.images.length - 1

        if (newIndex < 0) {
            this.currentImageIndex = maxIndex
        } else if (newIndex > maxIndex) {
            this.currentImageIndex = 0
        } else {
            this.currentImageIndex = newIndex
        }

        this.update()

    }

    pause() {
        clearInterval(this.interval)
    }

    play() {
        this.interval = setInterval(() => {
            this.changeImage(+1)
        }, this.autoTime)
    }

}

new MegaSlider(
    document.querySelector("#megaSlider"),
    [
        "https://picsum.photos/500",
        "https://picsum.photos/501",
        "https://picsum.photos/503",
        "https://picsum.photos/505",
        "https://picsum.photos/504",
    ],
    3000
)