poems = [
    {
        heading:"Elusive Love",
        poem:`<br><br>Maybe someday, I'll get to say it<br>Maybe someday, you'll notice it<br>Through my excited eyes, visibly lit<br>Words at the surface, ready to admit<br><br>जो लफ्ज़ न बयां पाए, आँखें ने सुना दी<br>कहें भी तो क्या कहें, बातें भीतर फंस गई<br>खयाल करें, क्या लेना देना तकदीर से,<br>जब दिल किसी की भी बात सुनता नहीं<br><br>Why, the reflexes differ from her<br>One touch and the universe halts<br>Step by step, our worlds get closer<br>Yet miles apart from the you she wants<br><br>You were never mine to keep<br>Only a vision for my eyes to see<br>Day in and day out, the urge to speak<br>Look at me once, and my knees go weak<br><br>Hold me close like you held no other,<br>But tear me to fine shreds inside<br>One look, and my self control wavers<br>A new world formed, the former tossed aside<br><br>Craved to be a dream of yours<br>But she took the one and only spot<br>Jealousy? It's way more than that<br>Stood no chance, in solitude I sat<br><br>The breeze carries her pined longing<br>Carrying secrets no one's ever known<br>Hoping his heart listens to her calling<br>Her impatience leaving her mind torn<br><br>Feels like he's so close, but yet so far<br>She's blinded by her short-term scar<br>One step away, but million steps within<br>That one insecurity etched along her skin<br><br>She's so obsessed, it kills her deep down<br>A day without him, she trips into the unknown<br>Bodily brine painting her soft, pretty face<br>Longing for his unattainable embrace<br><br>Wanting to erase her survival need<br>She's confused if he's taken her lead<br>If maybe, when dusk becomes dawn<br>A keen, pining need for her is born<br><br>The you she yearns for, the you she craves for<br>The you with whom she can never soar<br>Dancing along this thin, invisible line<br>Awaiting for her beloved deva to decline<br>Before she surrenders by her own will,<br>She needed him to willingly freeze her still<br><br>❤️`
    },
    {
        heading:"Ecstatic agony",
        poem:`<br><br>Lost in an endless, perpetual void<br>Eyes so surreal, all control destroyed<br>Gravitating the contours of my soul<br>Till it's involuntarily engulfed, as a whole<br><br>A second, a minute, a day, a month<br>But a lifetime when defined by love<br>The distance to unite, so visibly blunt<br>Measures to infinity and above<br><br>A need so strong, words fail to explain<br>Quenched by a walk down the memory lane<br>Or by a dream built by fusing together<br>Each other's longing to witness forever<br><br>How every drop of tear lining her face<br>Accompanied by the dearth of his grace<br>Tattooed a tale to be decoded by his soul<br>An art so intricate, only he could control<br><br>What our bodies can't, our hearts can<br>Teleporting thoughts in a startling span<br>The pillow, now you, embracing every curve<br>Making my buried poignant self, swerve<br><br>❤️`
    }
]

let current = 0;
const poemDiv = document.getElementById("poem");
const poemHeading = document.getElementById("poem-heading");
function showNextPoem(){
    poemDiv.classList.add("fade-out");
    setTimeout(() => {
        current = (current + 1)%poems.length;
        poemDiv.innerHTML = poems[current].poem;
        poemHeading.textContent = poems[current].heading;
        poemDiv.classList.remove("fade-out");
    },500)
}

 document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        showNextPoem();
      }
    });