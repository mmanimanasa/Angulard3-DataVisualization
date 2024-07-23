import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: "app-scatterplot",
  templateUrl: "./scatterplot.component.html",
  styleUrls: ["./scatterplot.component.css"],
})
export class ScatterplotComponent implements OnInit {
  private data = [
    { year: 2023, Framework: "React", Popularity: "40.58" },
    { year: 2023, Framework: "Angular", Popularity: "17.46" },
    { year: 2022, Framework: "React", Popularity: "42.62" },
    { year: 2022, Framework: "Angular", Popularity: "20.39" },
    { year: 2021, Framework: "React", Popularity: "40.14" },
    { year: 2021, Framework: "Angular", Popularity: "22.96" },
    { year: 2020, Framework: "React", Popularity: "35.9" },
    { year: 2020, Framework: "Angular", Popularity: "25.1" },
    { year: 2019, Framework: "React", Popularity: "31.3" },
    { year: 2019, Framework: "Angular", Popularity: "30.7" },
    { year: 2018, Framework: "React", Popularity: "36.9" },
    { year: 2018, Framework: "Angular", Popularity: "27.8" },
  ];
  private svg: any;
  private width = 550;
  private height = 380;
  private createSvg(): void {
    this.svg = d3
      .select("figure#scatter")
      .append("svg")
      .attr("width", this.width )
      .attr("height", this.height)
  }
  
  private drawline(data: any[]) : void {
    const parseTime = d3.timeParse("%Y");
     const x = d3
       .scaleTime()
       .domain(d3.extent(data, (d) => parseTime(d.year)))
       .range([30, this.width-30]);
       this.svg
         .append("g")
         .attr("transform", `translate(0, ${this.height - 30})`)
         .call(d3.axisBottom(x).ticks(5));
      const y = d3
         .scaleLinear()
         .domain(d3.extent(data, (d) => d.Popularity))
         .range([this.height-30, 0]);
         this.svg.append("g")
          .attr("transform", `translate(30, 0)`)
            .call(d3.axisLeft(y));;
      const dataNest = Array.from(
          d3.group(data, d=>d.Framework), ([key, value]) => ({ key, value }
        ));
      const line = d3
           .line()
           .x((d) => x(parseTime(d.year)))
           .y((d) => y(d.Popularity));
        this.svg
          .selectAll("path.line")
          .data(dataNest)
          .join("path")
          .attr("class", "line")
          .attr("fill", "none")
          .style("stroke", (d) =>
            d.key === "React" ? "darkviolet" : "darkslategray"
          )
          .attr("stroke-width", 2)
          .attr("d", (d) => line(d.value));
          var lineLegend = this.svg
            .selectAll(".lineLegend")
            .data(dataNest)
            .enter()
            .append("g")
            .attr("class", "lineLegend")
            .attr("transform", function (d, i) {
              return "translate(" + (510 - 30 )+ "," + (i+ 10) * 20 + ")";
            });

          lineLegend
            .append("text")
            .text(function (d) {
              return d.key;
            })
            .style("font-size", "15px")
            .style("fill", "black");
          lineLegend
            .append("rect")
            .attr("fill", function (d, i) {
              return d.key == "React" ? "darkviolet" : "darkslategray";
            })
            .attr("width", 10)
            .attr("height", 10);
          
        };
  ngOnInit() {
    this.createSvg();
    this.drawline(this.data)
  }
}
