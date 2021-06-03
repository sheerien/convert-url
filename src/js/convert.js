var urlInput = document.querySelector("#url-id");
var urlResult = document.querySelector("#result")
var btnConvert = document.querySelector(".app .btn")

function changeStatePlaceholder(el, txt) {
    el.onfocus = function() {
        // this.setAttribute("placeholder", "")
        this.placeholder = ""
        this.autocomplete = "off"
    }
    el.onblur = function() {
        // this.setAttribute("placeholder", txt)
        this.placeholder = txt
        this.autocomplete = "off"
    }
}
changeStatePlaceholder(urlInput, "Enter Your Url")
changeStatePlaceholder(urlResult, "Url Result")

btnConvert.addEventListener("click", convertUrl)

function convertUrl(e) {
    e.preventDefault();
    // checkUrl(urlInput.value);
    var url = urlInput.value
    if (!url) {
        alert("PLease Enter Your < URL >");
    } else {
        var valid = urlValidate(url);

        if (valid) {
            checkUrl(url);
            urlResult.addEventListener("click", function() {
                this.select();
                document.execCommand('copy');
                urlResult.value = "";
                alert("url copied");
                setTimeout(function() {
                    location.reload()
                }, 1000)
            })
        } else {
            alert("Please Enter A Valid < URL >")
        }
    }

}

function checkUrl(url) {
    var whatUrl = new URL(url);
    // console.log(whatUrl.host);
    // console.log(whatUrl.href);
    if (whatUrl.host == "www.dropbox.com") {
        console.log("dropbox");
        dropboxUrlConvert(whatUrl.href)
    } else if (whatUrl.host == "drive.google.com") {
        driveUrlConvert(whatUrl.href)
    } else {
        alert("please enter google drive OR dropbox url");
    }

}

function driveUrlConvert(url) {
    var direct = "uc?export=download&id=";
    var url_split = url.split("/");
    var id = url_split[5];
    url_split.splice(3, 3, direct + id);
    url_split.pop();
    var url_end = url_split.join("/")
    urlResult.value = url_end
    urlInput.value = ""
}

function dropboxUrlConvert(url) {
    var d_split = url.split("=");
    d_split.splice(1, 1, 1);
    // console.log(d_split.join("="));
    var finishEnd = d_split.join("=");
    urlResult.value = finishEnd;
    urlInput.value = ""
}

function urlValidate(url) {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (url.match(regex)) {
        // console.log("true");
        urlInput.value = ""
        return true;
    } else {
        urlInput.value = ""
        return false;
    }

}
//  var url = "https://drive.google.com/file/d/1kltDqVgmmihmKdVIIhHxA8V53ORx_elh/view?usp=sharing"

//  https://www.dropbox.com/s/tabcsd1avyuuyx0/ryan.png?dl=0

//  https://www.google.com/s/tabcsd1avyuuyx0/ryan.png?dl=0