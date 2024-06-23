import { createWorker } from "tesseract.js";

class Application {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.backgroundColor = "rgb(37, 37, 37)";
        this.ctx.fillStyle = "rgb(37, 37, 37)";


        this.worker = null;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        this.canvas.addEventListener("mousedown", this.startDrawing.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
        this.canvas.addEventListener("mouseout", this.stopDrawing.bind(this));
        this.getWorker();
    }

    async getWorker() {
        this.worker = await createWorker("eng");

    }

    startDrawing(e) {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    }

    draw(e) {
        if (!this.isDrawing) return;
        this.ctx.strokeStyle = '#FFFFFF';   
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    }

    stopDrawing() {
        if (this.isDrawing) {
            this.isDrawing = false;
            this.recognizeText();
        }
    }


    async recognizeText() {
        const dataURL = this.canvas.toDataURL("image/png");
        console.log(dataURL)

        const ret = await this.worker.recognize(dataURL);



        console.log(ret.data.text);

        // Tesseract.recognize(
        //     dataURL
        //     ,
        //     'eng',
        //     {
        //         logger: (m) => console.log(m)
        //     }
        // ).then(({ data: { text } }) => {
        //     console.log(text);
        // }).catch((err) => {
        //     console.error(err);
        // });
    }
}

window.onload = () => {
    window.app = new Application();
}
