(function (window, document, d3, RadarChart) {
    "use strict";

    const SECTIONS = [
        { type: "header", id: "h1", text: "Charakterystyka dominująca" },

        { type: "question", id: "q1_A", text: "Organizacja jest bardzo osobistym miejscem. Ludzie traktują ją jak rodzinę, wiedzą dużo o sobie nawzajem." },
        { type: "question", id: "q1_B", text: "Organizacja jest bardzo dynamicznym miejscem. Ludzie są skłonni podejmować decyzje i ryzykować." },
        { type: "question", id: "q1_C", text: "Organizacja jest bardzo zorientowana na wynik i czas wykonania, z naciskiem na konkurencję i własne osiągnięcia." },
        { type: "question", id: "q1_D", text: "Organizacja jest bardzo kontrolowanym i zorganizowanym miejscem. Procedury jednoznacznie regulują to co ludzie robią." },

        { type: "header", id: "h2", text: "Przywództwo organizacyjne" },

        { type: "question", id: "q2_A", text: "Kierownictwo organizacji pełni rolę doradczą dla członków swojej organizacji." },
        { type: "question", id: "q2_B", text: "Kierownictwo w organizacji uważane jest za przykład przedsiębiorczości, innowacji lub osoby które podejmują ryzyko." },
        { type: "question", id: "q2_C", text: "Kierownictwo w organizacji jest uważane za osoby lubiące grać agresywnie i są mocno skoncentrowane na wynikach." },
        { type: "question", id: "q2_D", text: "Kierownictwo w organizacji uważa się za przykład koordynacji, dobrej organizacji lub sprawnego działania." },

        { type: "header", id: "h3", text: "Zarządzanie pracownikami" },

        { type: "question", id: "q3_A", text: "Styl zarządzania w organizacji charakteryzuje się pracą zespołową, konsensusem i współuczestnictwem." },
        { type: "question", id: "q3_B", text: "Styl zarządzania w organizacji charakteryzuje się proaktywnością, innowacyjnością, wolnością i niepowtarzalnością" },
        { type: "question", id: "q3_C", text: "Styl zarządzania w organizacji charakteryzuje się konkurencyjnością, wysokimi wymaganiami i osiągnięciami." },
        { type: "question", id: "q3_D", text: "Styl zarządzania w organizacji charakteryzuje się stabilnością zatrudnienia, zgodnością i przewidywalnością." },

        { type: "header", id: "h4", text: "Spoiwo organizacyjne" },

        { type: "question", id: "q4_A", text: "Klejem, który łączy organizację jest lojalność i zaufanie. Zaangażowanie w tej organizacji jest wysokie." },
        { type: "question", id: "q4_B", text: "Klejem, który łączy organizację, jest zaangażowanie w innowacje i rozwój. Kładziemy nacisk na to, aby być na krawędzi." },
        { type: "question", id: "q4_C", text: "Klejem, który łączy organizację, jest nacisk na osiągnięcia i osiągnięcie celu. Agresywność i zwycięstwo to wspólne tematy." },
        { type: "question", id: "q4_D", text: "Klejem, który łączy organizację, są formalne zasady i polityka. Ważne jest utrzymanie sprawnej organizacji." },

        { type: "header", id: "h5", text: "Strategia" },

        { type: "question", id: "q5_A", text: "Organizacja podkreśla rozwój ludzki. W organizacji obowiązuje wysokie zaufanie, otwartość i współuczestnictwo." },
        { type: "question", id: "q5_B", text: "Organizacja kładzie nacisk na zdobywanie pracowników i stwarzanie wyzwań. Pozytywnie oceniane jest ryzyko." },
        { type: "question", id: "q5_C", text: "Organizacja podkreśla konkurencyjne działania i osiągnięcia. Dominuje nacisk na wygrywanie na rynku." },
        { type: "question", id: "q5_D", text: "Organizacja podkreśla trwałość i stabilność. Efektywność, kontrola i sprawne działanie są ważne." },

        { type: "header", id: "h6", text: "Kryteria Sukcesu" },

        { type: "question", id: "q6_A", text: "Organizacja definiuje sukces na podstawie rozwoju ludzi, pracy zespołowej, zaangażowania pracowników i troski o ludzi." },
        { type: "question", id: "q6_B", text: "Organizacja definiuje sukces za pomocą posiadania najbardziej unikalnych lub najnowszych produktów (lider i innowator)." },
        { type: "question", id: "q6_C", text: "Organizacja definiuje sukces za pomocą wygranej na rynku poprzez wyprzedzanie konkurencji (przywództwo rynkowe)." },
        { type: "question", id: "q6_D", text: "Organizacja definiuje sukces na podstawie efektywności (niezawodna dostawa, gładki harmonogram i niskie koszty)." }
    ];

    function noop() {}

    function $a(selector) {
        var elements = document.querySelectorAll(selector);
        var array = [].slice.call(elements);

        return array;
    }

    function $s(selector, scope) {
        var elements = scope.querySelectorAll(selector);
        var array = [].slice.call(elements);

        return array[0];
    }

    function $(selector) {
        return $a(selector)[0];
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
        var parsed = name.split("_");

        $("#who_name").innerText = parsed[0];
        $("#who_surname").innerText = parsed[1];
        $("#who_company").innerText = parsed[2];

        $("#who").removeAttribute("hidden");
    }

    function extractAverage(dataset, field, type) {
        var sum = dataset[field].reduce(function (acc, element) {
            if (element.id.indexOf("_" + type + "_") !== -1) {
                return acc + parseInt(element.value, 10);
            }

            return acc;
        }, 0);

        return sum / 6;
    }

    function getSurveyResult() {
        var i = 1;
        var rawResults = { actual: [], preferred: [] };

        for(i = 1; i <= 6; ++i) {
            var elements = $a(".question.actual.q" + i);

            elements.forEach(function (element) {
                rawResults.actual.push({
                    id: element.getAttribute("id"),
                    value: $s("input", element).value,
                    text: $s("label", element).innerText
                });
            });
        }

        for(i = 1; i <= 6; ++i) {
            var elements = $a(".question.preferred.q" + i);

            elements.forEach(function (element) {
                rawResults.preferred.push({
                    id: element.getAttribute("id"),
                    value: $s("input", element).value,
                    text: $s("label", element).innerText
                });
            });
        }

        return {
            raw: rawResults,
            graph: [
                {
                    className: "Obecna",
                    axes: [
                        { axis: "PLEMIENNA", value: extractAverage(rawResults, "actual", "A") },
                        { axis: "ADHOKRACJA", value: extractAverage(rawResults, "actual", "B") },
                        { axis: "RYNKOWA", value: extractAverage(rawResults, "actual", "C") },
                        { axis: "HIERARCHICZNA", value: extractAverage(rawResults, "actual", "D") }
                    ]
                },
                {
                    className: "Preferowana",
                    axes: [
                        { axis: "KLAN", value: extractAverage(rawResults, "preferred", "A") },
                        { axis: "ADHOKRACJA", value: extractAverage(rawResults, "preferred", "B") },
                        { axis: "RYNKOWA", value: extractAverage(rawResults, "preferred", "C") },
                        { axis: "HIERARCHICZNA", value: extractAverage(rawResults, "preferred", "D") }
                    ]
                }
            ]
        };
    }

    function validate() {
        var i = 1;
        var valid = true;

        for(i = 1; i <= 6; ++i) {
            var elements = $a(".question.actual.q" + i);
            var sum = elements.reduce(function (acc, element) {
                var value = parseInt($s("input", element).value, 10);

                if (value < 0 || value > 100) {
                    $s("label", element).classList.add("error-label");

                    valid = false;
                } else {
                    $s("label", element).classList.remove("error-label");
                }

                return acc + value;
            }, 0);

            if (sum !== 100) {
                elements.forEach(function (element) {
                    $s("input", element).classList.add("error");
                });

                valid = false;
            } else {
                elements.forEach(function (element) {
                    $s("input", element).classList.remove("error");
                });
            }
        }

        for(i = 1; i <= 6; ++i) {
            var elements = $a(".question.preferred.q" + i);
            var sum = elements.reduce(function (acc, element) {
                var value = parseInt($s("input", element).value, 10);

                if (value < 0 || value > 100) {
                    $s("label", element).classList.add("error-label");

                    valid = false;
                } else {
                    $s("label", element).classList.remove("error-label");
                }

                return acc + value;
            }, 0);

            if (sum !== 100) {
                elements.forEach(function (element) {
                    $s("input", element).classList.add("error");
                });

                valid = false;
            } else {
                elements.forEach(function (element) {
                    $s("input", element).classList.remove("error");
                });
            }
        }

        return valid;
    }

    function startSurvey() {
        var user = window.localStorage.getItem("user");

        updateName(user);

        $("#survey_form").removeAttribute("hidden");

        var actualRoot = $("#survey_form_actual");
        var preferredRoot = $("#survey_form_preferred");

        SECTIONS.map(function (element) {
            if (element.type === "question") {
                var actualContainer = document.createElement("div");

                actualContainer.setAttribute("id", element.id + "_actual");
                actualContainer.classList.add("question");
                actualContainer.classList.add("actual");
                actualContainer.classList.add(element.id.slice(0, 2));

                var preferredContainer = document.createElement("div");

                preferredContainer.setAttribute("id", element.id + "_preferred");
                preferredContainer.classList.add("question");
                preferredContainer.classList.add("preferred");
                preferredContainer.classList.add(element.id.slice(0, 2));

                var actualLabel = document.createElement("label");
                actualLabel.innerText = element.text
                actualLabel.setAttribute("for", element.id + "_actual_input");

                var preferredLabel = document.createElement("label");
                preferredLabel.innerText = element.text
                preferredLabel.setAttribute("for", element.id + "_preferred_input");

                var actual = document.createElement("input");
                var preferred = document.createElement("input");

                actual.setAttribute("id", element.id + "_actual_input");
                actual.setAttribute("type", "number");
                actual.setAttribute("min", "0");
                actual.setAttribute("max", "100");
                actual.setAttribute("value", "25");

                preferred.setAttribute("id", element.id + "_preferred_input");
                preferred.setAttribute("type", "number");
                preferred.setAttribute("min", "0");
                preferred.setAttribute("min", "100");
                preferred.setAttribute("value", "25");

                actual.classList.add("actual");
                preferred.classList.add("preferred");

                actualContainer.appendChild(actual);
                actualContainer.appendChild(actualLabel);

                preferredContainer.appendChild(preferred);
                preferredContainer.appendChild(preferredLabel);

                actualRoot.appendChild(actualContainer);
                preferredRoot.appendChild(preferredContainer);
            } else {
                var actualHeader = document.createElement("h3");

                actualHeader.innerText = "Obecnie - " + element.text;
                actualHeader.classList.add("header");

                var preferredHeader = document.createElement("h3");

                preferredHeader.innerText = "Preferowana - " + element.text;
                preferredHeader.classList.add("header");

                actualRoot.appendChild(actualHeader);
                preferredRoot.appendChild(preferredHeader);
            }
        });
    }

    function showResults(results) {
        $("#results_form").removeAttribute("hidden");

        var user = window.localStorage.getItem("user");

        updateName(user);

        var chart = RadarChart.chart();
        var config = chart.config({
            w: 900,
            h: 900,

            factor: 0.95,
            factorLegend: 1,

            levels: 10,

            maxValue: 100,
            minValue: 0,

            radians: 2 * Math.PI,
            color: noop,

            axisLine: true,
            axisText: true,
            circles: true,

            radius: 5,
            open: false,

            axisJoin: function(d, i) {
                return d.className || i;
            },

            tooltipFormatValue: function(d) {
                return d;
            },

            tooltipFormatClass: function(d) {
                return d;
            },

            transitionDuration: 100
        });

        var svg = d3.select("#chart").append("svg").attr("width", 900).attr("height", 900);

        var object = svg.append("g").classed("single", 1).datum(results.graph).call(chart);

        object.selectAll("text.legend.right").attr("transform", "rotate(45, 900, 450)");
        object.selectAll("text.legend.left").attr("transform", "rotate(45, 0, 470)");
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

                    $("#start_form").setAttribute("hidden", true);
                    window.localStorage.setItem("user", name);

                    showResults(results);
                });
            }
        });

        $("#start").addEventListener("click", function (event) {
            event.preventDefault();

            var name = $("#start_name").value;
            var surname = $("#start_surname").value;
            var company = $("#start_company").value;

            if (!name || !surname || !company) {
                alert("Proszę wypełnić wszystkie pola.");
                return;
            }

            event.target.setAttribute("disabled", true);

            window.localStorage.setItem("user", name + "_" + surname + "_" + company);

            $("#start_form").setAttribute("hidden", true);

            startSurvey();
        });

        $("#submit").addEventListener("click", function (event) {
            event.preventDefault();

            if (!validate()) {
                alert("Proszę wypełnić wagi poprawnie.\nMaksymalna suma dla pojedynczej sekcji to 100, pojedyncze elementy muszą być z zakresu 0 do 100.");
                return;
            }

            event.target.setAttribute("disabled", true);

            var results = JSON.stringify(getSurveyResult());
            var name = window.localStorage.getItem("user");

            window.localStorage.setItem("results", results);
            save(name, results);

            $("#survey_form").setAttribute("hidden", true);

            showResults(JSON.parse(results));
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
})(window, document, window.d3, window.RadarChart);