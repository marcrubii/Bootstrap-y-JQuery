$(document).ready(function () {

    $("#searchButton").click(function () {
        const username = $("#username").val().trim();

        $("#repositories").empty();
        $("#errorMessage").addClass("d-none");

        if (username === "") {
            $("#errorMessage").text("Please enter a GitHub username.").removeClass("d-none");
            return;
        }

        $.get("https://api.github.com/users/" + username + "/repos")
            .done(function (repositories) {

                repositories.forEach(function (repository) {
                    const description = repository.description === null
                        ? ""
                        : repository.description;

                    const row = `
                        <tr>
                            <td>${repository.name}</td>
                            <td>${description}</td>
                            <td>${repository.watchers_count}</td>
                        </tr>
                    `;

                    $("#repositories").append(row);
                });

            })
            .fail(function () {
                $("#errorMessage")
                    .text("GitHub user not found.")
                    .removeClass("d-none");
            });
    });

});
