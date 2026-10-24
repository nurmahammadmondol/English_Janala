function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const lessonButton = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadButton(data.data));
};


const loadButton = (data) => {
  const lessonButton = document.getElementById("lessonButton");

  data.forEach((btn) => {
    const button = document.createElement("button");

    button.innerHTML = `
      <i class="fa-solid fa-book-open"></i>
      Lesson - ${btn.level_no}
    `;

    button.classList.add("btn", "btn-outline", "btn-primary");

    button.addEventListener("click", () => {
      // আগের button থেকে active class সরাবে
      document.querySelectorAll("#lessonButton button")
        .forEach((btn) => btn.classList.remove("active"));

      // Click করা button-এ active class যোগ করবে
      button.classList.add("active");

      handleLevel(btn.level_no);
    });

    lessonButton.appendChild(button);
  });
};


const handleLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data));
};

const showData = (data) => {
  const showAllWord = document.getElementById("showAllWord");
  showAllWord.innerHTML = "";

  data.forEach((data) => {
    const div = document.createElement("div");
    // console.log(data);

    div.innerHTML = `
       <div class="text-center p-7 bg-white rounded-lg space-y-3">
          <h6 class="text-2xl font-bold">${data?.word}</h6>
          <p class="text-sm">Meaning - ${data?.meaning}</p>
          <p class=" font-semibold text-gray-500">"pronunciation - ${data?.pronunciation}"</p>

           <div class="flex justify-between mt-10">
                <button onclick="handleDetails(${data?.id})" class="btn bg-[#1A91FF10]">
                    <i class="fa-solid fa-circle-info "></i>
                </button>
                <button onclick="pronounceWord('${data?.word}')" class="btn bg-[#1A91FF10]">
                    <i class="fa-solid fa-volume "></i>
                </button>
             </div>
        </div>
       
       `;

    showAllWord.appendChild(div);
  });
};

const handleDetails = async (id) => {
  
  const url=(`https://openapi.programming-hero.com/api/word/${id}`)
  const res= await fetch(url);
  const data=await res.json();
  
  showDetails(data.data)
  document.getElementById("details_Modal").showModal();

};

const showDetails = (data) => {
  // console.log(data)
  const contain = document.getElementById("detailsContainer");
  contain.innerHTML = "";

  const DIV = document.createElement("div");
  DIV.innerHTML = `<div class="space-y-5 border border-blue-100 rounded-lg p-3">
    <h3 class="font-bold text-xl">${data?.word} (<i class="fa-solid fa-microphone-lines"></i> :  ${data?.pronunciation})</h3>
    <p><span class="font-semibold">Meaning :</span> <small>${data?.meaning}</small></p>
    <div>
      <p class="font-semibold">Example</p>
      <small>${data.sentence}</small>
    </div>
    <div>
      <h6 class="font_Bangla font-semibold">সমার্থক শব্দ গুলো</h6>
      ${data.synonyms.map(syn => `<small class="px-5 py-1 mr-2 bg-[#BADEFF40] rounded-md" href="">${syn}</small>`).join(" ")}
    </div>
  </div>`;
  contain.appendChild(DIV);
};

lessonButton();
