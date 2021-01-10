

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
        // set layout
        var setLayout = {
                title: "top 10 OTUs found "
        };
        // put the data in a list
        var data = [readData];
        //plot it
        Plotly.newPlot("bar", data, setLayout);
               //-------------------------------------------------------
            // Build a Bubble Chart using the sample data
            // set layout
            var Layout2 = {
                margin: { t: 0 },
                xaxis: { title: "Id's" },
                hovermode: "closest",
                };
                // set the values and poutit into a list [] at the same time
                var bubbleData = [
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
              //plot it
              Plotly.plot("bubble", bubbleData, Layout2);
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
    // Use `d3.json` to Fetch the Metadata for a Sample
        d3.json("samples.json").then((data) => {
                var metadata = data.metadata;
                var resultsarray= metadata.filter(sampleobject => sampleobject.id == userInput);
                var result= resultsarray[0]
                //use d3 to select panel  with the id
                var box = d3.select("#sample-metadata");
                 //  Clear any Existing data
                box.html("");
                // Use `Object.entries` to Add Each Key & Value Pair to the Panel
                Object.entries(result).forEach(([key, value]) => {
                box.append("h6").text(`${key}: ${value}`);
                  });


            //select one by default
            bargraph(data.names[0]);
            //place your bubule chart and demographics function here
        });  
    
};
//this is the default function you initialise that chooses a default option of the dropdown menu so graphs will always be shown
defaultfunction();


