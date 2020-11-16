// bubble chart

//horizontal bar graph
function bargraph(id_iput) {
        //read the data
        d3.json("samples.json").then((data_json) => {
                //get the data of ids, sample values hover text ->labels
                var samplesdata = data_json.samples;
                // filter the data to only get the information associated with the input id
                var id_data = samplesdata.filter(x => x.id == id_iput);
        //since it is an array get the first array of otu_ids
        var otu_ids = id_data[0].otu_ids;
        var otu_labels = id_data[0].otu_labels;
        var otu_values = id_data[0].sample_values;
        //format your id to add OTU in the beginning
        var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()
        //this where you select your x axis value, y axis value and type of graph
        var readData = {
                x: otu_values.slice(0, 10).reverse(),     //top 10 values
                y: yValues,     // formatted ids
                text: otu_labels.slice(0, 10).reverse(),     //labels
                type: "bar", //bar graphs
                orientation: "h" //horizontal graphs
        };
        var setLayout = {
                title: "Bacteria found"
        };
        var data = [readData];
        Plotly.newPlot("bar", data, setLayout);

         //-------------------------------------------------------
         // Build a Bubble Chart using the sample data
        var LayoutBubble = {
            margin: { t: 0 },
            xaxis: { title: "Id's" },
            hovermode: "closest",
            };
          
        var DataBubble = [
            {
            x: otu_ids,
            y: otu_values,
            text: otu_labels,
            mode: "markers",
            marker: {
            color: otu_ids,
            size: otu_values,
                }
            }
        ];
          
        Plotly.plot("bubble", DataBubble, LayoutBubble); 
    });
};


// demographic info

//drop down menu
function defaultfunction() {
    //this populates the dropdown for users to choose
    d3.json("samples.json").then((data) => {
            var names = data.names;
            names.forEach((name) => {
                    d3.select("#selDataset").append("option").text(name).property("value", name);
            });
        //select one by default
        bargraph(data.names[0]);
        //place your bubule chart and demographics function here
    });
};

//when user changes it then it will change the graphs
// get optionChanged(this.value) from the index file and create a function for it
// this function should change the visualisations based on the selected id
function optionChanged(userInput) {    
    bargraph(userInput);    
    //place your bubule chart and demographics function here
};
//this is the default function you initialise that chooses a default option of the dropdown menu so graphs will always be shown
defaultfunction();


//---------------------


function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
  
    // Use `d3.json` to fetch the metadata for a sample
    // Relates to app.py
    var urlMeta = `/metadata/${sample}`;
    d3.json(urlMeta).then(function(sample){
      // Use d3 to select the panel with id of `#sample-metadata`
      // Relates to index
        var sampleMetadata = d3.select("#sample-metadata");
      
      // Use `.html("") to clear any existing metadata
      sampleMetadata.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(sample).forEach(([key, value]) => {
        sampleMetadata.append('h6').text(`${key}, ${value}`);
      })
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
  
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
      });
    };