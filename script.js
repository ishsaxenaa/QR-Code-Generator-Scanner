const wrapper=document.querySelector(".wrapper"),
qrInput=wrapper.querySelector(".form input"),
generateBtn=wrapper.querySelector(".form button"),
qrImg=wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click",()=>{
    let qrValue=qrInput.value;
    if(!qrValue)return;
    generateBtn.innerText="Generating QR Code"
    qrImg.src=`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    qrImg.addEventListener("load",() => {
        wrapper.classList.add("active");
        generateBtn.innerText="Generate QR Code";
    });
});
qrInput.addEventListener("keyup",() => {
    if(!qrInput.value){
        wrapper.classList.remove("active");
    }
});

// QR code Scanner

const wrapper2 = document.querySelector(".wrapper2"),
form = document.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close"),
copyBtn = document.querySelector(".copy");
function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper2.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't scan QR Code";
    });
}
fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});
copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});
form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper2.classList.remove("active"));
