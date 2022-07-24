const base_url = "http://localhost:5000/api"

console.log('hi this is working')

// generates the HTML for showing the cupcakes
function showCupcakeHTML(cupcake) {
    return `<div data-cupcake-id=${cupcake.id}>
    <li>
      ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
      <button class="delete-button">X</button>
    </li>
    <img class="Cupcake-img" src="${cupcake.image}" alt="(no image)">
  </div>
`;
}

// showing cupcakes from the database
async function showDatabaseCupcakes() {
    const resp = await axios.get(`${base_url}/cupcakes`);

    for (let data of resp.data.cupcakes) {
        let newCupcake = $(showCupcakeHTML(data));
        $("#cupcake-list").append(newCupcake);
    }
}

// handles the add new cupcake form
$("new-cupcake-form").on("submit", async function (e) {
    e.preventDefault();

    let flavor = $("#form-flavor").val();
    let rating = $("#form-rating").val()
    let size = $("#form-size").val();
    let image = $("#form-image").val()

    const newCupcakeResp = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(showCupcakeHTML(newCupcakeResp.data.cupcake));
    $("#cupcake-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});

// handles deleting the cupcake
$("cupcake-list").on("click", ".delete-button", async function (e) {
    e.preventDefault();
    let $cupcake = $(e.target).closest("div");
    let cupcakeID = $cupcake.attr("data-cupcake-id");

    await axios.delete(`${base_url}/cupcakes/${cupcakeID}`);
    $cupcake.remove();
});

$(showDatabaseCupcakes);



