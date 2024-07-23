import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: "app-piechart",
  templateUrl: "./piechart.component.html",
  styleUrls: ["./piechart.component.css"],
})
export class PiechartComponent implements OnInit {
  private data = [
    { Language: "JavaScript", UsedPercentage: "63.1", Released: "2014" },
    { Language: "HTML/CSS", UsedPercentage: "52.9", Released: "2013" },
    { Language: "Python", UsedPercentage: "49.28", Released: "2016" },
    { Language: "SQL", UsedPercentage: "48.66", Released: "2010" },
    { Language: "TypeScript", UsedPercentage: "38.87", Released: "2011" },
    { Language: "Bash/Shell", UsedPercentage: "32.37", Released: "2014" },
    { Language: "Java", UsedPercentage: "30.55", Released: "2013" },
    { Language: "C#", UsedPercentage: "27.62", Released: "2016" },
    { Language: "C++", UsedPercentage: "22.42", Released: "2010" },
    { Language: "PHP", UsedPercentage: "19.34", Released: "2011" },
  ];
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  private createSvg(): void {
    this.svg = d3
      .select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }
  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data.map((d) => d.UsedPercentage.toString()))
      .range(["#c7d3", "#a5b8", "#879c", "#6777", "#5a67"]);
  }
  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.UsedPercentage));

    this.svg
      .selectAll("pieces")
      .data(pie(this.data))
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr("fill", (d: any, i: any) => this.colors(i))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");
    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll("pieces")
      .data(pie(this.data))
      .enter()
      .append("text")
      .text((d: any) => d.data.Language)
      .attr("transform", function (d) {
        var _d = labelLocation.centroid(d);
        _d[0] *= 1.9; //multiply by a constant factor
        _d[1] *= 1.59; //multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
      .style("font-size", 12)
      .style("text-anchor", "middle");
      this.svg
        .selectAll("pieces")
        .data(pie(this.data))
        .enter()
        .append("text")
        .text((d: any) => d.data.UsedPercentage)
        .attr(
              "transform",
              (d: any) => "translate(" + labelLocation.centroid(d) + ")"
            )
        .style("text-anchor", "middle")
        .style("font-size", 15);
      
  }
  
  ngOnInit(): void {
      this.createSvg();
      this.createColors();
      this.drawChart();
  }
}
