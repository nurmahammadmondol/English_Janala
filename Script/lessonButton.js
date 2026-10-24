const lessonButton=()=>{
    const url ='https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then(res=>res.json())
    .then(data=>loadButton(data.data))
}

const loadButton=(data)=>{
    const lessonButton=document.getElementById('lessonButton');
    data.forEach(btn=>{
        const button=document.createElement('button');
        // console.log(btn)

        button.innerHTML=`
              <button onclick="handleLevel(${btn.level_no})" id="lesson${btn.level_no}" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${btn.level_no}</button>
        `

        lessonButton.appendChild(button)

    })
}

const handleLevel=(id)=>{

    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>showData(data.data))
}

const showData=(data)=>{
    const showAllWord=document.getElementById('showAllWord');
    showAllWord.innerHTML='';

    

   
    data.forEach(data=>{
       const div=document.createElement('div');
       console.log(data)

       div.innerHTML=`
       <div class="text-center p-7 bg-white rounded-lg space-y-3">
          <h6 class="text-xl font-bold">${data?.word}</h6>
          <p class="text-sm">Meaning - ${data?.meaning}</p>
          <p class=" font-semibold text-gray-500">"pronunciation - ${data?.pronunciation}"</p>
        </div>
       
       `

       showAllWord.appendChild(div)
    })
}



lessonButton()