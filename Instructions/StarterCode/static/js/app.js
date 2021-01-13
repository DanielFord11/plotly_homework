        
function dropdown_options() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

    });
}

dropdown_options();

function bar_chart() {

   
    // read the data 
    d3.json("samples.json").then((data)=> {

        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dropdown_selection = dropdownMenu.property("value");

        console.log(`the sample is ${dropdown_selection}`)

        const sample_index = (element) => element === dropdown_selection;
        names_arr = data.names
        selected_index = names_arr.findIndex(sample_index)

        console.log(`the index is ${selected_index}`)

        var xValue = data.samples[selected_index].otu_ids;
        var yValue = data.samples[selected_index].sample_values;

        var trace1 = {
            x: xValue,
            y: yValue,
            type: 'bar',
            text: yValue.map(String),
            textposition: 'auto',
            hoverinfo: 'none',      
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
                }],
            marker: {
              color: 'rgb(158,202,225)',
              opacity: 0.6,
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
              }
            }
          };
          
          var data1 = [trace1];
          
          var layout = {
            title: `Belly Button Biodiversity for ${dropdown_selection}`,
            barmode: 'relative'
          };
          
          Plotly.newPlot('bar', data1, layout);

          var trace2 = {
            x: xValue,
            y: yValue,
            mode: 'markers',
            marker: {
              color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
              opacity: [1, 0.8, 0.6, 0.4],
              size: [40, 60, 80, 100]
            }
          };
          
          var data2 = [trace2];
          
          var layout = {
            title: 'Marker Size and Color',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data2, layout);

          var demoInput = data.metadata[24];
          console.log(`metadata = ${demoInput}`)
          //var tbody = d3.select('sample-metadata');
          //Will create and return table data
          var tbl = js.CreateTable(demoInput);

          //Out put table
          $('.sample-metadata').html(tbl);

    });

    


  //   var generateDemographics = (dataInput) => {

  //     dataInput.forEach(demo_entry => {
  //       var row = tbody.append("tr");
  //       columns.forEach(column => row.append("td").text(demo_entry[column])
  //       )
  //     });
  //   }
  // generateDemographics(demoInput);
}

bar_chart()

d3.selectAll("#selDataset").on("change", bar_chart);

