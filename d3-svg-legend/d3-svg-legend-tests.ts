import * as d3 from 'd3';
import { legendColor, legendSize, legendSymbol, legendHelpers } from 'd3-svg-legend';

namespace Color {
    function example1() {
        var quantize = d3.scaleQuantize()
            .domain([ 0, 0.15 ])
            .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }) as any);

            var svg = d3.select("svg");

            svg.append("g")
                .attr("class", "legendQuant")
                .attr("transform", "translate(20,20)");

            var legend = legendColor()
                .labelFormat(d3.format(".2f"))
                .useClass(true)
                .scale(quantize);

            svg.select(".legendQuant")
                .call(legend);
    }

    function example2() {
        var thresholdScale = d3.scaleThreshold()
            .domain([ 0, 1000, 2500, 5000, 10000 ])
            .range(
                d3.range(6).map(function(i) { return "q" + i + "-9"}) as any
            );

            var svg = d3.select("svg");

            svg.append("g")
            .attr("class", "legendQuant")
            .attr("transform", "translate(20,20)");

            var legend = legendColor()
                .labelFormat(d3.format(".2f"))
                .labels(legendHelpers.thresholdLabels)
                .useClass(true)
                .scale(thresholdScale)

            svg.select(".legendThreshold")
            .call(legend);
    }

    function example3() {
        var log = d3.scaleLog()
        .domain([ 0.1, 100, 1000 ])
        .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"] as any);

        var svg = d3.select("svg");

        svg.append("g")
            .attr("class", "legendLog")
            .attr("transform", "translate(20,20)");

        var logLegend = legendColor()
            .cells([0.1, 5, 10, 50, 100, 500, 1000])
            .scale(log);

        svg.select(".legendLog")
        .call(logLegend);
    }

    function example4() {
        var linear = d3.scaleLinear()
            .domain([0,10])
            .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"] as any);

        var svg = d3.select("svg");

        svg.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate(20,20)");

        var legendLinear = legendColor()
            .shapeWidth(30)
            .orient('horizontal')
            .scale(linear);

        svg.select(".legendLinear")
            .call(legendLinear);
    }

    function example5() {
        var linear = d3.scaleLinear()
            .domain([0, 10])
            .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"] as any);

        var svg = d3.select("svg");

        svg.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate(20,20)");

        var legendLinear = legendColor()
            .shapeWidth(30)
            .cells(10)
            .orient('horizontal')
            .scale(linear);

        svg.select(".legendLinear")
            .call(legendLinear);
    }

    function example6() {
        var linear = d3.scaleLinear()
            .domain([0, 10])
            .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"] as any);

        var svg = d3.select("svg");

        svg.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate(20,20)");

        var legendLinear = legendColor()
            .shapeHeight(30)
            .cells([1, 2, 3, 6, 8])
            .orient('horizontal')
            .scale(linear);

        svg.select(".legendLinear")
            .call(legendLinear);
    }

    function example7() {
        var ordinal = d3.scaleOrdinal()
            .domain(["a", "b", "c", "d", "e"])
            .range([ "rgb(153, 107, 195)", "rgb(56, 106, 197)", "rgb(93, 199, 76)", "rgb(223, 199, 31)", "rgb(234, 118, 47)"]);

        var svg = d3.select("svg");

        svg.append("g")
            .attr("class", "legendOrdinal")
            .attr("transform", "translate(20,20)");

        var legendOrdinal = legendColor()
            //d3 symbol creates a path-string, for example
            //"M0,-8.059274488676564L9.306048591020996,
            //8.059274488676564 -9.306048591020996,8.059274488676564Z"
            .shape("path", d3.symbol().type(d3.symbolTriangle).size(150)())
            .shapePadding(10)
            .scale(ordinal);

        svg.select(".legendOrdinal")
            .call(legendOrdinal);
    }
}

namespace Size {
    function example1() {
        var linearSize = d3.scaleLinear().domain([0,10]).range([10, 30]);

        var svg = d3.select("svg");

        svg.append("g")
            .attr("class", "legendSize")
            .attr("transform", "translate(20, 40)");

        var legend = legendSize()
            .scale(linearSize)
            .shape('circle')
            .shapePadding(15)
            .labelOffset(20)
            .orient('horizontal');

        svg.select(".legendSize")
            .call(legend);
    }

    function example2() {
        var lineSize = d3.scaleLinear().domain([0, 10]).range([2, 10]);

        var svg = d3.select("svg");

        svg.append("g")
            .attr("class", "legendSizeLine")
            .attr("transform", "translate(0, 20)");

        var legendSizeLine = legendSize()
            .scale(lineSize)
            .shape("line")
            .orient("horizontal")
            //otherwise labels would have displayed:
            // 0, 2.5, 5, 10
            .labels(["tiny", "small", "medium", "large", "grand"])
            .shapeWidth(40)
            .labelAlign("start")
            .shapePadding(10);

        svg.select(".legendSizeLine")
            .call(legendSizeLine);
    }
}

namespace Symbol {
    function example1() {
        var triangleU = d3.symbol().type(d3.symbolTriangle)(),
            circle = d3.symbol().type(d3.symbolCircle)(),
            cross = d3.symbol().type(d3.symbolCross)(),
            diamond = d3.symbol().type(d3.symbolDiamond)(),
            start = d3.symbol().type(d3.symbolStar)();

        //example output of d3.svg.symbol().type('circle')();
        //"M0,4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,
        //-4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,4.51351666838205Z"

        var symbolScale =  d3.scaleOrdinal()
            .domain(['a','b','c', 'd', 'e'])
            .range([ triangleU, circle, cross, diamond, start] as any);

        var svg = d3.select("svg");

        svg.append("g")
            .attr("class", "legendSymbol")
            .attr("transform", "translate(20, 20)");

        var legendPath = legendSymbol()
            .scale(symbolScale)
            .orient("horizontal")
            .title("Symbol Legend Title")
            .on("cellclick", function(d){alert("clicked " + d);});

        svg.select(".legendSymbol")
            .call(legendPath);
    }
}