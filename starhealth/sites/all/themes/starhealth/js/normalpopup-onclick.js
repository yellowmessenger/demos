function makecall(e, a) {
    /*Waybeo.CTC.MakeCall({
        hash: "559f567c393a9",
        route_hash: "559f54941f459",
        callerid_hash: "559f567c3a298",
        contact_number: e,
        optional_params: {
            "first-name": a
        }
    }, eventCallBack)*/
}

function showExitPopup() {
        //Trigger for abandoned visitor popup
        $('.wbf-screen').addClass('active');
        $('.wbf-container').addClass('active');
    }
   

function clearStatus() {
    $(".wbf-container").removeClass("connecting").removeClass("connected").removeClass("verifying").removeClass("verification-success").removeClass("failed").removeClass("in-progress").removeClass("completed").removeClass("ended").removeClass("agent-busy").removeClass("oops").removeClass("timer")
}

function eventCallBack(e, a) {
    switch (clearStatus(), e) {
        case "CAPTCHA":
            captcha = a.code, $(".wbf-container").addClass("connecting");
            break;
        case "ORIGINATE_ERROR":
            $(".wbf-container").addClass("wbf-livemsg-oops");
            break;
        case "DIALING":
            $(".wbf-container").addClass("connected");
			setTimeout(function(){ 
                $('.wbf-screen').removeClass('active');
                $('.wbf-container').removeClass('active');
                $(".wbf-container").removeClass("connected");
                window.location.href = "https://www.starhealth.in/thank-you-showing-your-interest";
            }, 1000);
            break;
        case "VERIFICATION_IN_PROGRESS":
            $(".wbf-container").addClass("verifying"), $(".wbf-verificationcode").text(captcha);
            break;
        case "VERIFIED":
            $(".wbf-container").addClass("verification-success"), setTimeout(function() {
                $(".wbf-container").removeClass("verification-success"), $(".wbf-container").addClass("in-progress")
            }, 1e3), setStatusTimer();
            break;
        case "AGENT_BUSY":
            $(".wbf-container").addClass("agent-busy");
            break;
        case "INPROGRESS":
            $(".wbf-container").addClass("in-progress"), setStatusTimer();
            break;
        case "COMPLETED":
            $(".wbf-container").addClass("completed"), clearInterval(timer);
            break;
        case "ERROR":
            $(".wbf-container").addClass("oops"), clearInterval(timer)
    }
}

function setStatusTimer() {
    if (!timer) {
        var e = 0;
        timer = setInterval(function() {
            e++;
            var a = e % 60,
                s = Math.floor(e / 60),
                t = Math.floor(s / 60);
            s %= 60, Math.floor(a / 10) || (a = "0" + a), Math.floor(s / 10) || (s = "0" + s), Math.floor(t / 10) || (t = "0" + t), $(".timer").text(t + ":" + s + ":" + a)
        }, 1e3)
    }
}
$(document).ready(function() {
    $(".themeselector").change(function() {
        $(".themeselector option").each(function() {
            $(".wbf-container").removeClass($(this).val())
        }), $(".wbf-container").addClass($(this).val())
    }).trigger("change"), 

    $("#normalCallMe").click(function() {
        var e = $.trim($("#normalMobile").val()).replace("+", "").replace(" ", ""),
            a = $("#normalName").val();

        //makecall(e, a),

            Waybeo.CTC.MakeCall({
            hash: "559f567c393a9",
            route_hash: "559f54941f459",
            callerid_hash: "559f567c3a298",
            contact_number: e,
            optional_params: {
                "first-name": a
            }
        }, eventCallBack),

         $(".wbf-container").addClass("connecting")
    }), $(".wbf-close").click(function() {
        $(".wbf-screen").removeClass("active"), $(".wbf-container").removeClass("active").delay("400").queue(function() {
            $.dequeue(this), clearStatus(), timer && (timer = null)
        });
        /*setTimeout(function() {
            var e = sessionStorage.getItem("clickpopup");
            
            "1" != e && $(".clickme").trigger("click"), sessionStorage.setItem("clickpopup", "1")
        }, 18e4);*/
    });
});

$(".clickme").click(function() {
            $(".wbf-screen").addClass("active"), $(".wbf-container").addClass("active")
        });
var captcha = "",
    timer = "";
