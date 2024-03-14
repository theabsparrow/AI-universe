const loadApiData = async (isSeeMore) => {
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    const response = await fetch(url);
    const data = await response.json();
    const jasonData = data.data.tools;
    showApiData(jasonData, isSeeMore);
}
const showApiData = (loopData, isSeeMore) => {
    const cardContainer = document.getElementById("card-conatiner");
    cardContainer.innerHTML = ""
    const seeMoreButton = document.getElementById("see-more-button");
    if(loopData.length > 6 && !isSeeMore){
        seeMoreButton.classList.remove("hidden");
    }
    else{
        seeMoreButton.classList.add("hidden");
    }
    if (!isSeeMore){
        loopData = loopData.slice(0, 6);
    }

    loopData.forEach(singleData => {

        const div = document.createElement("div");
        div.classList = "border-[#11111119] border-[1px] p-6 rounded-lg"
        div.innerHTML = `
        <div class="mb-6">
        <img src="${singleData?.image}" alt="image not found">
    </div>
    <div class="border-b-[1px] border-[#11111133] pb-6">
        <h1 class="mb-4 text-black font-semibold text-[25px] leading-[29px]">Features</h1>
        <div class="text-[#585858] space-y-3 leading-[26px]">
            <p>1.Natural language processing</p>
            <p>2.Contextual understanding</p>
            <p>3.Text generation</p>
        </div>
    </div>
    <div class="mt-6 flex justify-between items-center">
        <div>
            <h1 class="mb-4 text-black font-semibold text-[25px] leading-[29px]">${singleData.name}</h1>
            <div class="flex gap-2">
                <img src="./image/calender.png" alt="red arrow">
                <p class="text-[#585858] font-medium leading-[26px]">${singleData.published_in}</p>
            </div>
        </div>
        <div>
            <button onclick = "showTheDetail('${singleData.id}'); modal_page.showModal()" class="btn btn-circle btn-sm bg-red-200"> <img src="./image/arrow.png" alt="red arrow"> </button>
        </div>
    </div>`
    cardContainer.appendChild(div)
    });
}

const showTheDetail = async (id) => {


    
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const response = await fetch(url);
    const data = await response.json();
    const theDetail = data.data;
    showWithModal(theDetail);
}

const showWithModal = detail => {
    console.log(detail);
    const modalDetailBox = document.getElementById("modal-detail-box");
    modalDetailBox.innerHTML = `
    <form class="absolute -top-3 -right-4" method="dialog">
    <button class="btn btn-sm btn-circle bg-red-500 border-none text-white">✕</button>
</form>
<div class="flex flex-col lg:flex-row gap-4">
    <!-- left side -->
    <div class="border-[1px] border-[#EB5757] bg-[#EB57570D] p-2 lg:p-[30px] rounded-lg">
        <h1
            class="text-black text-base lg:text-[25px] font-semibold leading-4 lg:leading-[35px] w-[70vw] lg:w-[25vw]">
            ${detail.description}</h1>

        <div class="flex gap-3 lg:gap-5 mt-4 mb-6">
            <div class=" p-1 lg:p-3 bg-white rounded-lg">
                <h1 class="text-[#03A30A] font-bold leading-[19px]"> ${detail.pricing[0].price} <span>${detail.pricing[0].plan}</plan> </h1>
            </div>
            <div class="p-1 lg:p-3 bg-white rounded-lg">
                <h1 class="text-[#F28927] font-bold leading-[19px]">${detail.pricing[1].price} <span>${detail.pricing[1].plan}</plan></h1>
            </div>
            <div class="p-1 lg:p-3 bg-white rounded-lg">
                <h1 class="text-[#EB5757] font-bold leading-[19px]">${detail.pricing[2].price} <span>${detail.pricing[2].plan}</plan></h1>
            </div>
        </div>

        <div class="flex justify-between">
            <div>
                <h1 class="text-black text-sm lg:text-[25px] font-semibold leading-[35px]">Features
                </h1>
                <ol type="dotted" class="text-[#585858] leading-[26px]">
                    <li>${detail.features["1"].feature_name}</li>
                    <li>${detail.features["2"].feature_name}</li>
                    <li>${detail.features["3"].feature_name}</li>
                </ol>
            </div>
            <div>
                <h1 class="text-black text-sm lg:text-[25px] font-semibold leading-[35px]">Integrations
                </h1>
                <ol class="text-[#585858] leading-[26px]">
                    <li>${detail.integrations[0]}</li>
                    <li>${detail.integrations[1]}</li>
                    <li>${detail.integrations[2]}</li>
                </ol>
            </div>
        </div>
    </div>

    <!-- right side -->

    <div class="border-[1px] border-[#E7E7E7] bg-white p-2 lg:p-[30px] rounded-lg  lg:w-[50vw]">
        <div class="flex justify-center">
            <img class="h-[25vh] lg:h-auto" src="${detail.image_link[0]}" alt="modal-image">
        </div>
        <div class="mt-3 lg:mt-6">
            <h1 class="text-black text-xl lg:text-[25px] font-semibold leading-4 lg:leading-[35px] mb-2 lg:mb-4"> ${detail.input_output_examples
[0].input}</h1>
            <p class="text-[#585858] leading-4 lg:leading-[26px]">${detail.input_output_examples
                [0].output}</p>
        </div>
    </div>

</div>
    `
}

const handleSeeMore = () => {
    loadApiData(true)
}
loadApiData()
