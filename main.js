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
            .attr("class", (d) => {return "pointone " + d.Species})
            .attr("id", (d) => {return "one" + d.id});


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
    let circle = FRAME2.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", (d) => { return (X_SCALE(d.Petal_Width) + margins.left); })
            .attr("cy", (d) => { return (Y_SCALE(d.Sepal_Width) + margins.top); })
            .attr("r", 5)
            .attr("fill", (d) => { return species_color[d.Species] })
            .attr("class", (d) => {return "pointtwo " + d.Species})
            .attr("id", (d) => {return "two" + d.id});


    //Updates the chart when a selection is started
    function updateChart() {
        extent = d3.brushSelection(this)
        
        circle.classed("selected", function(d){ return isBrushed(extent, X_SCALE(d.Petal_Width) + margins.left, Y_SCALE(d.Sepal_Width) + margins.top) } )

        let collection = [].slice.call(document.getElementsByClassName("selected"));

        //Builds a list of the selected species
        let selected = []
        for (let i=0; i<collection.length; i++) {
            next = collection[i].className.baseVal.split(" ")[1]
            if (!selected.includes(next)) {
                selected.push(next)
            }
        }

        //Highlights the bar chart based on the list
        FRAME3.selectAll(".bar").classed("selected", function(){
            return selected.includes(this.id)})

        //Highlights the corresponding points in frame1
        FRAME1.selectAll(".pointone").classed("selected", function(d){
            return collection.includes(document.getElementById("two" + d.id))})
    }


    //Determines if the given point is brushed
    function isBrushed(brush_coords, cx, cy) {
       var x0 = brush_coords[0][0],
           x1 = brush_coords[1][0],
           y0 = brush_coords[0][1],
           y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }

    FRAME2.call( d3.brush()
        .extent( [ [margins.left,margins.top], [frame_width - margins.left,frame_height - margins.top] ] )
        .on("start brush", updateChart))      


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
            .attr("class", "bar")
            .attr("id", key);
});

FRAME3.selectAll(".bar")
    .attr("fill", (d,i) => {return colors(i)});

FRAME3.append("text")
    .attr("x", ((frame_width/2) - (margins.right/2)))
    .attr("y", (margins.top))
    .text("Orchid Species")
    .attr("class", "title");