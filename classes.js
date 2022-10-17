class Slider {

    currentImageIndex = 0
    nextImageTime = 1000

    constructor(images, mainImageElement, prevBtn, nextBtn) {
        this.images = images
        this.mainImageElement = mainImageElement
        this.prevBtn = prevBtn
        this.nextBtn = nextBtn

        this.nextBtn.addEventListener("click", this.nextImage)

        this.prevBtn.addEventListener("click", this.prevImage)

        setInterval(this.nextImage, this.nextImageTime)

        this.changeImage()
    }

    prevImage() {
        this.currentImageIndex--
        this.changeImage()
    }

    nextImage() {
        this.currentImageIndex++
        this.changeImage()
    }

    changeImage() {
        this.mainImageElement.src = this.images[this.currentImageIndex]
    }

}

const mySlder = new Slider(
    ["http://bild1.de", "http://bild2.de"],
    document.querySelector("#mainImage"),
    document.querySelector(".prev"),
    document.querySelector(".next")
)