const frame_height = 500;
const frame_width = 500;
const margins = {left: 100, right: 100, top: 20, bottom:20};
const S_MARGINS = {left: 30, right: 30, top: 30, bottom:30};


//bar chart time
const frame3 =
d3.select("#vis3")
    .append("svg")
        .attr("height", frame_height)
        .attr("width", frame_width)
        .attr("class", "frame");

const data = {setosa: 50, versicolor: 50, virginica: 50};
colors = d3.scaleOrdinal(["#7144d3", "#eec84e", "#ae32a3"]);


const y_scale =
d3.scaleLinear()
    .domain([0, (150)])
    .range([(frame_height - margins.bottom), 0]);

const x_scale =
d3.scaleBand()
    .domain(Object.keys(data))
    .range([0, (frame_width - margins.right), 0]);

frame3.append("g")
    .attr("transform", "translate(" + margins.left + ")")
    .call(
        d3.axisLeft()
            .scale(y_scale)
            .ticks(10)
        )
        .attr("font-size", "20px");

frame3.append("g")
    .attr("transform", "translate(" + margins.left + "," + (frame_height - margins.bottom) + ")")
    .call(
        d3.axisBottom()
            .scale(x_scale)
            .ticks(10)
        );

//Object.values(data).forEach((element, index)) => {}

//frame3.selectAll(".bar")
//    .append("rect")
//        .attr("transform", "translate(" + margins.left +  ")")
//        .attr("x", Object.keys(data).forEach(key => {return (x_scale(key))}))
//        .attr("y", Object.values(data).forEach(val => {return (y_scale(val))}))
//        .attr("height", Object.values(data).forEach(val => { return ( frame_height - y_scale(val) - margins.bottom) }))
//        .attr("width", x_scale.bandwidth() - 5)
//        .attr("class", "bar");

Object.entries(data).forEach(entry => {
    const [key, value] = entry;
        frame3.append("rect")
            .attr("transform", "translate(" + margins.left +  ")")
            .attr("x", (x_scale(key)))
            .attr("y", (y_scale(value)))
            .attr("height", ( frame_height - y_scale(value) - margins.bottom))
            .attr("width", x_scale.bandwidth() - 5)

            .attr("class", "bar");

});

frame3.selectAll(".bar")
    .attr("fill", (d,i) => {return colors(i)});

frame3.append("text")
    .attr("x", ((frame_width/2) - (margins.right/2)))
    .attr("y", (margins.top))
    .text("Orchid Species")
    .attr("class", "title");



