(function (window, document) {
    "use strict";

    function $(selector) {
        var elements = document.querySelectorAll(selector);
        var array = [].slice.call(elements);

        return array[0];
    }

    function save(name, data) {
        var request = new XMLHttpRequest();

        request.open("POST", "/save/" + name, true);

        request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        request.send(data);
    }

    function get(name, callback) {
        var request = new XMLHttpRequest();

        request.open("GET", "/load/" + name, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);

                callback(null, data);
            } else {
                callback(request.status);
            }
        };

        request.onerror = function (error) {
            callback(error)
        };

        request.send();
    }

    function load(name, data) {
        var request = new XMLHttpRequest();

        request.open("POST", "/save/" + name, true);

        request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        request.send(data);
    }

    function updateName(name) {

    }

    function getSurveyResult() {
        return {};
    }

    function startSurvey() {
        var user = window.localStorage.getItem("user");

        $("#survey_form").removeAttribute("hidden");
    }

    function showResults(results) {
        $("#results_form").removeAttribute("hidden");
    }

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.keyCode === 76) {
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("results");
        }
    });

    document.addEventListener("DOMContentLoaded", function (event) {
        window.addEventListener("hashchange", function () {
            var name = window.location.hash.slice(1);

            if (!!name) {
                get(name, function (error, results) {
                    if (error) {
                        window.location.hash = "";
                        window.location.reload();

                        return;
                    }

                    updateName(name);
                    showResults(results);
                });
            }
        });

        $("#start").addEventListener("click", function (event) {
            event.target.setAttribute("disabled", true);

            var name = $("#start_name").value;
            var surname = $("#start_surname").value;
            var company = $("#start_company").value;

            window.localStorage.setItem("user", name + "_" + surname + "_" + company);

            $("#start_form").setAttribute("hidden", true);

            startSurvey();

            event.preventDefault();
        });

        $("#submit").addEventListener("click", function (event) {
            event.target.setAttribute("disabled", true);

            var results = JSON.stringify(getSurveyResult());
            var name = window.localStorage.getItem("user");

            window.localStorage.setItem("results", results);
            save(name, results);

            $("#survey_form").setAttribute("hidden", true);

            event.preventDefault();
        });

        if (!window.localStorage.getItem("user")) {
            $("#start_form").removeAttribute("hidden");
        } else if (!window.localStorage.getItem("results")) {
            startSurvey();
        } else {
            var results = JSON.parse(window.localStorage.getItem("results"));

            showResults(results);
        }
    });
})(window, document);