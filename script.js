// Espera hasta que todo el documento se cargue
$(document).ready(function () {

    // Usuario hace click
    $("#searchButton").click(function () {

        // Obtiene el usurname con .val() y elimina los espacios con .trim()
        const username = $("#username").val().trim();

        // Borra los repositorios mostrados anteriormente
        $("#repositories").empty();

        // Con la clase d-none oculta cualquier mensaje de error anterior
        $("#errorMessage").addClass("d-none");


        // Comprueba si el usuario no ha escrito ningún nombre
        if (username === "") {

            // Salta error (lo hace visible con d-none)
            $("#errorMessage")
                .text("Please enter a GitHub username.")
                .removeClass("d-none");
            return;
        }


        // Hace una petición GET a la API de GitHub
        $.get("https://api.github.com/users/" + username + "/repos")

            .done(function (repositories) {

                repositories.forEach(function (repository) {

                    // Si no hay descripción del repositorio, ponemos "" 
                    const description = repository.description === null
                        ? ""
                        : repository.description;


                    // Creamos una fila HTML para la tabla
                    const row = `
                        <tr>
                            <!-- Nombre del repositorio -->
                            <td>${repository.name}</td>

                            <!-- Descripción del repositorio -->
                            <td>${description}</td>

                            <!-- Número de watchers -->
                            <td>${repository.watchers_count}</td>
                        </tr>
                    `;


                    // Añade la fila creada a la tabla
                    $("#repositories").append(row);
                });

            })


            // Si la petición falla
            .fail(function () {

                // Muestra error
                $("#errorMessage")
                    .text("GitHub user not found.")
                    .removeClass("d-none");
            });

    });

});
