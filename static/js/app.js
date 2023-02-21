

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata.filter(sampleObj => sampleObj.id == sample);
    var result = metadata[0];

    var demo = d3.select("#sample-metadata");
    console.log(demo);
    demo.html("");


    Object.entries(result).forEach(([key, value]) => {
      d3.select("#sample-metadata")
          .append("h5").text(`${key}: ${value}`);
        });
  });
}



function buildBarGraph(sample) {

    d3.json("samples.json").then((data)=>{
    
    var sample_data = data.samples.filter(sampleObj => sampleObj.id == sample);
    var result = sample_data[0];
    console.log(result)
    
    var otu_ids = result.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    console.log(otu_ids)
    var otu_labels = result.otu_labels.slice(0,10).reverse();
    var sample_values = result.sample_values.slice(0,10).reverse();

    var trace1 = {
      x: sample_values,
      y: otu_ids,
      hovertext: otu_labels,
      type: "bar",
      orientation: "h",
    };

    var data1 = [trace1];
 
    var layout1 = {
      title: "<b>Top 10 OTU's found</b>",
      margin: { t: 40, l: 200 },
      height: 500,
      width: 500
    };
  Plotly.newPlot("bar", data1, layout1);
  })  
}


function buildBubbleChart(sample) {
  d3.json("samples.json").then((data)=>{
  
    var sample_data = data.samples.filter(sampleObj => sampleObj.id == sample);
    var result = sample_data[0];
    console.log(result)
    
  

  var otu_ids = result.otu_ids.reverse();
  console.log(result)
  var otu_labels = result.otu_labels.reverse();
  var sample_values = result.sample_values.reverse();

    trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      name: "OTU ID",
      mode: 'markers',
      marker: {
        
        size: sample_values,
        colorscale: 'Earth',
        color: otu_ids
      }
    };
    
    var data2 = [trace2];
    
    var layout2 = {
      title: "<b>Bacteria in Belly Button</B>",
    height: 500,
    width: 1200,
    xaxis: {title: 'OTU ID'},       
    };
    
    Plotly.newPlot("bubble", data2, layout2);    

  });
}



// use sample 940 as the first sample
init();
buildMetadata('940');
buildBarGraph('940');
buildBubbleChart('940');



function init() {
  var selector = d3.select("#selDataset");
    
  d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
      selector
          .append("option")
          .text(sample)
          .property("value", sample);
        });

      const firstSample = sampleNames[0];
      buildBarGraph(firstSample);
      buildBubbleChart(firstSample);
      buildMetadata(firstSample);
    });
  }

//pull data from the dropdown
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildBarGraph(newSample);
  buildBubbleChart(newSample);
}

initialize();

