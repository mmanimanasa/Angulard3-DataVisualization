import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "app-bargraph",
  templateUrl: "./bargraph.component.html",
  styleUrls: ["./bargraph.component.css"],
})
export class BargraphComponent implements OnInit {
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
  private margin = 40;
  private width = 650 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private createSvg(): void {
    this.svg = d3
      .select("figure#bar")
      .append("svg")
      .attr("width", this.width + this.margin * 2)
      .attr("height", this.height + this.margin * 2)
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.Language))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(15,10)rotate(0)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 70]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g").call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Language))
      .attr("y", (d: any) => y(d.UsedPercentage))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.UsedPercentage))
      .attr("fill", "#a5b8");
    this.svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d: any) => x(d.Language)+ 5)
      .attr("y", (d: any) => y(d.UsedPercentage) - 5)
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.UsedPercentage))
      .style("font-size", "13px")
      .style("fill", "black")
      .text((d: any) => d.UsedPercentage + "%");
    

  }
  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }
}
