const frame_height = 500;
const frame_width = 350;
const margins = {left: 34, right: 30, top: 30, bottom: 30};
//const S_MARGINS = {left: 30, right: 30, top: 30, bottom:30};

const species_color = {setosa: "#7144d3", versicolor: "#eec84e", virginica: "#ae32a3"};

//scatterplot part 1
const FRAME1 =
d3.select("#vis1")
    .append("svg")
        .attr("height", frame_height)
        .attr("width", frame_width)
        .attr("class", "frame");


d3.csv("data/iris.csv").then((data) => {

    const MAX_X = d3.max(data, (d) => {return parseInt(d.Petal_Length);});

    const X_SCALE = d3.scaleLinear()
        .domain([0, MAX_X + 1])
        .range([0, frame_width - margins.left - margins.right]);

    const MAX_Y = d3.max(data, (d) => {return parseInt(d.Sepal_Length);});

    const Y_SCALE = d3.scaleLinear()
        .domain([0, MAX_Y + 1])
        .range([frame_height - margins.top - margins.bottom, 0]);

    //Generates all points in the csv
    FRAME1.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", (d) => { return (X_SCALE(d.Petal_Length) + margins.left); })
            .attr("cy", (d) => { return (Y_SCALE(d.Sepal_Length) + margins.top); })
            .attr("r", 5)
            .attr("fill", (d) => { return species_color[d.Species] })
            .attr("class", (d) => {return "pointone " + d.Species});


    //Generates the x axis
    FRAME1.append("g")
        .attr("transform", "translate(" + margins.left +
            "," + (frame_height - margins.bottom) + ")")
        .call(d3.axisBottom(X_SCALE).ticks(5))
            .attr("font-size", '18px');

        //Generates the y axis
    FRAME1.append("g")
    .attr("transform", "translate(" + margins.left +
        "," + margins.top + ")")
    .call(d3.axisLeft().scale(Y_SCALE).ticks(10))
        .attr("font-size", "18px");

    FRAME1.append("text")
        .attr("x", ((frame_width/3)))
        .attr("y", (margins.top))
        .text("Petal and Sepal Length")
        .attr("class", "title");
});

//scatterplot part 2
const FRAME2 =
d3.select("#vis2")
    .append("svg")
        .attr("height", frame_height)
        .attr("width", frame_width)
        .attr("class", "frame");

d3.csv("data/iris.csv").then((data) => {

    const MAX_X = d3.max(data, (d) => {return parseInt(d.Petal_Width);});

    const X_SCALE = d3.scaleLinear()
        .domain([0, MAX_X + 1])
        .range([0, frame_width - margins.left - margins.right]);

    const MAX_Y = d3.max(data, (d) => {return parseInt(d.Sepal_Width);});

    const Y_SCALE = d3.scaleLinear()
        .domain([0, MAX_Y + 1])
        .range([frame_height - margins.top - margins.bottom, 0]);


    //Generates the x axis
    FRAME2.append("g")
        .attr("transform", "translate(" + margins.left +
            "," + (frame_height - margins.bottom) + ")")
        .call(d3.axisBottom(X_SCALE).ticks(5))
            .attr("font-size", '18px');

        //Generates the y axis
    FRAME2.append("g")
    .attr("transform", "translate(" + margins.left +
        "," + margins.top + ")")
    .call(d3.axisLeft().scale(Y_SCALE).ticks(10))
        .attr("font-size", "18px");

    FRAME2.append("text")
        .attr("x", ((frame_width/3)))
        .attr("y", (margins.top))
        .text("Petal and Sepal Width")
        .attr("class", "title");


    //Generates all points in the csv
    FRAME2.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", (d) => { return (X_SCALE(d.Petal_Width) + margins.left); })
            .attr("cy", (d) => { return (Y_SCALE(d.Sepal_Width) + margins.top); })
            .attr("r", 5)
            .attr("fill", (d) => { return species_color[d.Species] })
            .attr("class", (d) => {return "pointtwo " + d.Species});


    function handleOver(d) {
        let species = d.className.baseVal.split(" ")[1];
        let collection = document.getElementsByClassName(species);
        for (let i = 0; i < collection.length; i++) {
            let next = collection[i];
            let nextClass = next.className.baseVal.split(" ")[0];
            
            if (nextClass == "pointone") {
                next.style.stroke = "orange"
                next.style.opacity = 1
            }
            else if (nextClass == "bar") {
                next.style.stroke = "orange"
            }
        }
    }

    function handleLeave(d) {
        let species = d.className.baseVal.split(" ")[1];
        let collection = document.getElementsByClassName(species);
        for (let i = 0; i < collection.length; i++) {
            let next = collection[i];
            let nextClass = next.className.baseVal.split(" ")[0];
            
            if (nextClass == "pointone") {
                next.style.stroke = "None"
                next.style.opacity = 0.5
            }
            else if (nextClass == "bar") {
                next.style.stroke = "None"
            }
        }
    }

    function addListeners() {
        FRAME2.selectAll(".pointtwo")
            .on("mouseover", function () {
                handleOver(this)})
            .on("mouseleave", function () {
                handleLeave(this)})
    }
    addListeners()

});




//bar chart time
const FRAME3 =
d3.select("#vis3")
    .append("svg")
        .attr("height", frame_height)
        .attr("width", frame_width)
        .attr("class", "frame");

//for later to iterate colors through hard coded bar qty
colors = d3.scaleOrdinal(Object.values(species_color));

const y_scale =
d3.scaleLinear()
    .domain([0, (95)])
    .range([(frame_height - margins.bottom), 0]);

const x_scale =
d3.scaleBand()
    .domain(Object.keys(species_color))
    .range([0, (frame_width - margins.right), 0]);

FRAME3.append("g")
    .attr("transform", "translate(" + margins.left + ")")
    .call(
        d3.axisLeft()
            .scale(y_scale)
            .ticks(10)
        )
        .attr("font-size", "20px");

FRAME3.append("g")
    .attr("transform", "translate(" + margins.left + "," + (frame_height - margins.bottom) + ")")
    .call(
        d3.axisBottom()
            .scale(x_scale)
            .ticks(10)
        );

Object.entries(species_color).forEach(entry => {
    const [key, value] = entry;
        FRAME3.append("rect")
            .attr("transform", "translate(" + margins.left +  ")")
            .attr("x", (x_scale(key)))
            .attr("y", (y_scale(50)))
            .attr("height", ( frame_height - y_scale(50) - margins.bottom))
            .attr("width", x_scale.bandwidth() - 5)
            .attr("class", "bar " + key);
});

FRAME3.selectAll(".bar")
    .attr("fill", (d,i) => {return colors(i)});

FRAME3.append("text")
    .attr("x", ((frame_width/2) - (margins.right/2)))
    .attr("y", (margins.top))
    .text("Orchid Species")
    .attr("class", "title");