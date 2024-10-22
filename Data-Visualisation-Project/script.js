// Convert the unpack arrow function into a standard function
function unpack(data, key) {
    return data.map(row => row[key]);
  }
  
  //CHOROPLETH CHART
  Plotly.d3.csv("data/user_penetration.csv", function(population_data) {
    // Extract data
    const penetration_rates = unpack(population_data, 'percentages');
    const country = unpack(population_data, 'Entity');
  
    //choropleth generated from tutorial example 
    const data = [{
        type: 'choropleth',
        locationmode: 'country names', 
        locations: country,
        z: penetration_rates,
        text: country,
        colorscale: [
          [0, 'rgb(249,187,230)'], [0.2, '	rgb(242,158,200)'],
          [0.4, 'rgb(238,115,196)'], [0.6, 'rgb(244,83,173)'],
          [0.8, 'rgb(242,11,151)'], [1, 'rgb(175,31,95)']//defining a custom colorscale 
      ],
      marker: {
        line: {
          color: 'black',
          width: 0.4
        }
      },
      colorbar: {
        ticksuffix: '%',
        title: 'User Penetration Rates'
      },
      hovertemplate: '%{text}<br>%{z:.1f}%<extra></extra>'//custom hovertemplate to add percentage 
    }];
  
    const layout = {
      margin: {
        l: 0,
        r: 0,
        t: 0,
        b: 0,
      },
     
      title: 'User Penetration Rates',
      geo: {
        bgcolor: '#F2F3F4',// this was needed to get rid of white square around choropleth
        projection: {
          type: 'orthographic', // to get 3d map 
          rotation: {
            lon: 0,
            lat: 0
          }
        },
        showland: true,
        landcolor: '#F2F3F4', 
        showocean: true,
        oceancolor: 'rgb(184,216,239)',
        showframe: false,
        dragmode: 'turntable', // To enable 3D rotation 
      },  
      
      paper_bgcolor: '#F2F3F4', 
      plot_bgcolor: '#F2F3F4' 
    };
  
    // Render the plot
    Plotly.newPlot("choropleth", data, layout);
});


  // HEATMAP CHARTS
Plotly.d3.csv("data/2015 (transposed).csv", (allData)=> {
  let daysOfWeek = Object.keys(allData[0]).filter(word => word !== "Bins");
  let bins = unpack(allData, "Bins");//chatgpt helped me to debug this as previously the values were not being transposed correctly 
  let zData = bins.map((bin, rowIndex) => {// this is the line the basically takes my frequency table and extracts the 'time-bins first and maps to days of the week to get the number
    return daysOfWeek.map(day => allData[rowIndex][day]);
});
  var data = [
      {
          z: zData, 
          x: daysOfWeek,
          y: unpack(allData, "Bins"),
          type:'heatmap', // from this resource: https://plotly.com/javascript/heatmaps/
          hoverongaps:false,
          colorscale: [
            [0, 'white'], // white 
            [0.25, 'rgb(255,200,242)'], // Light pink
            [0.5, 'rgb(255,153,204)'], // Medium pink
            [0.75, 'rgb(255,77,166)'], // Strong pink
            [1, 'rgb(255,0,127)']    // Deep pink
        ] 
      }
  ];
  var layout = {
    title: {
      text:'Heatmap 2015',
      font: {
        family: 'Josefin Sans, sans-serif', 
        size: 20, 
        color: 'black' 
    }
    },
    yaxis: {
      automargin: true
  },
    paper_bgcolor: '#F2F3F4', 
    plot_bgcolor: '#F2F3F4' 
  }
 // console.log(data);
  Plotly.newPlot('heat-map2', data, layout);
})
Plotly.d3.csv("data/2021 (transposed).csv", (allData)=> {
  let daysOfWeek = Object.keys(allData[0]).filter(word => word !== "Bins");
  //let zData = daysOfWeek.map( (day) => {return unpack(allData, day)});(this was not being read correctly)
  let bins = unpack(allData, "Bins");//chatgpt helped me to debug this as previously the values were not being transposed correctly 
  let zData = bins.map((bin, rowIndex) => {
    return daysOfWeek.map(day => allData[rowIndex][day]);
});
  console.log("zData:", zData);
  var data = [
      {
          z: zData, 
          x: daysOfWeek,
          y: unpack(allData, "Bins"),
          type:'heatmap', 
          hoverongaps:false, 
          colorscale: [
            [0, 'white'], // white 
            [0.25, 'rgb(255,200,242)'], // Light pink
            [0.5, 'rgb(255,153,204)'], // Medium pink
            [0.75, 'rgb(255,77,166)'], // Strong pink
            [1, 'rgb(255,0,127)']    // Deep pink
        ] 
      }
  ];
  var layout = {
    title: {
      text:'Heatmap 2021',
      font: {
        family: 'Josefin Sans, sans-serif', 
        size: 20, 
        color: 'black' 
    }
    },
    
    yaxis: {
      automargin: true //This fixed the issue of the y-axis being cut-off
  },
    paper_bgcolor: '#F2F3F4', 
    plot_bgcolor: '#F2F3F4' ,

  }
 // console.log(data);
  Plotly.newPlot('heat-map', data, layout);
})
Plotly.d3.csv("data/matches_likes_passes.csv", (allData)=> {
    let currentYear = 2015;
    const updateChart = () => {
        currentYear = document.getElementById('yearSlider').value;// Chatgpt helped me generate this code 
        document.getElementById('yearLabel').innerText = currentYear;// using the get element by id property we can match the graph to the year
        
        const filteredData = allData.filter(row => row['Year'] == currentYear);
    const x = unpack(filteredData, 'Date');
    const yLikes = unpack(filteredData, 'Likes');
    const yMatches = unpack(filteredData, 'Matches');
    const yPasses = unpack(filteredData, 'Passes');
    //console.log('Matches:', yMatches);
    var trace1 = {
        x: x,
        y: yLikes,
        type: 'scatter',
        mode: 'lines',
        name: 'Likes',
        line: {
          color: 'rgb(255,77,166)', 
          width:3
        }
      };
      
      var trace2 = {
        x: x,
        y: yMatches,
        type: 'scatter',
        mode: 'lines',
        name: 'Matches',
        line: {
          color: 'rgb(175,31,95)',
          width:3,
      }
      };
      
      var trace3 = {
        x: x,
        y: yPasses,
        type: 'scatter',
        mode: 'lines',
        name: 'Passes',
        line: {
          color: 'rgb(255,153,204)',
          width:3,
      }
      };
      
      var chartData = [trace1, trace2, trace3];
      
      var layout = {
        title: {
          text: `<b>Likes, Matches, and Passes in ${currentYear}</b>`,
         font: {
            family: 'Josefin Sans, sans-serif', 
            size: 20, 
            color: 'black' 
        }
        },
        yaxis: {
          title: 'Count',
          range: [0, 140] 
        },
        xaxis: {
          title: 'Date'
        },
        paper_bgcolor: '#F2F3F4', 
      plot_bgcolor: '#F2F3F4', 
      };
      
      Plotly.newPlot('line-graph', chartData, layout);
    };
    updateChart();
    window.updateChart = updateChart;
});

// Plotly.d3.csv("user_ages.csv", (allData)=> {
//   let userAges = unpack(allData, 'User Ages');
//   let ageFilterMax = unpack(allData, 'user.ageFilterMax');
//   let ageFilterMin = unpack(allData, 'user.ageFilterMin');

//   let traceMax = {
//     x: ageFilterMax,
//     y: userAges,
//     type: 'violin',
//     orientation: 'h',
//     name: 'Maximum Age Filter',
//     line: { color: 'red' },
//     box: { visible: true },
//     meanline: { visible: true }
// };
// let traceMin = {
//         x: ageFilterMin,
//         y: userAges,
//         type: 'violin',
//         orientation: 'h',
//         name: 'Minimum Age Filter',
//         line: { color: 'blue' },
//         box: { visible: true },
//         meanline: { visible: true }
//     };

// // Define the layout
// let layoutMax = {
//   title: 'User Age Preferences Violin Plot',
//   xaxis: {
//       title: 'Maximum Age Filter', 
//       range:[18,110]
//   },
//   yaxis: {
//       title: 'User Ages',
//       range:[18,65]
//   },};
//   // Define the layout for Minimum Age Filter plot
//   let layoutMin = {
//     title: 'Violin Plot of Minimum Age Filter',
//     xaxis: {
//         title: 'Minimum Age Filter',
//         range:[18,65]
//     },
//     yaxis: {
//         title: 'User Ages',
//         range:[18,65]
//     }
// };
// Plotly.newPlot('violin-plot-max', [traceMax], layoutMax);
// Plotly.newPlot('violin-plot-min', [traceMin], layoutMin);
// })
// Plotly.d3.csv("user_ages.csv", (allData)=> {
//   let userAges = unpack(allData, 'User Ages');
//   var trace = {
//     x: userAges,  
//     type: 'histogram',  
//     marker: {
//       color: 'rgb(255,153,204)'
//   }
// };
// var layout = {
//   title: 'User Ages Distribution',  
//   paper_bgcolor: 'rgb(238,235,216)', 
//   plot_bgcolor: 'rgb(238,235,216)' ,
//   xaxis: { title: 'Age' },  
//   yaxis: { 
//     title: 'Frequency',
//     range:[0,130], 
//   }, // Label for the y-axis
// };
// Plotly.newPlot('user-ages-chart', [trace], layout);
// })
// Plotly.d3.csv("user_ages.csv", (allData)=> {
//   let userAgeFilterMax = unpack(allData, 'user.ageFilterMax');
//   let userAgeFilterMin = unpack(allData, 'user.ageFilterMin');
//   let ageRanges = allData.map(data => `${data['user.ageFilterMin']}-${data['user.ageFilterMax']}`);
  
//   var trace1 = {
//     x: userAgeFilterMax,
//     type: 'histogram',
//     name: 'Max Age Filters',
//     marker: {
//         color: 'rgb(255,77,166)', 
//     }
// };

// //  var trace2 = {
// //     x: userAgeFilterMin,
// //      type: 'histogram',
// //      name: 'Min Age Filters'
// // };

// var layout = {
//     title: 'Max Age Filter Distribution',
//     paper_bgcolor: 'rgb(238,235,216)', // Transparent background
//     plot_bgcolor: 'rgb(238,235,216)' ,
//     yaxis: { 
//       title: 'Frequency',
//       range:[0,130],
//      },
//     xaxis: { title: 'Age Filter' },
//     barmode: 'group',
   
// };

// Plotly.newPlot('user-agesfilter-chart', [trace1], layout);
// });
//HISTOGRAM CHART
Plotly.d3.csv("data/user_ages.csv", (allData) => {
  let userAges = unpack(allData, 'User Ages');
  let userAgeFilterMax = unpack(allData, 'user.ageFilterMax');

  var trace = {
      x: userAges,
      type: 'histogram',
      name: 'User Ages',
      marker: {
        color: 'blue'
      },
      opacity: 0.5 // Adjust the opacity for better visibility when overlaid
  };

  var trace1 = {
      x: userAgeFilterMax,
      type: 'histogram',
      name: 'Max Age Filters',
      marker: {
        color: 'F31E9D'
      },
      opacity: 0.8 // Adjusting opacity to be visible in an overlay
  };

  var layout = {
      title: {
      text:'User Ages and Max Age Filter Distribution',
      font: {
        family: 'Josefin Sans, sans-serif', 
        size: 20, 
        color: 'black' 
    }
      },
      
      paper_bgcolor: '#F2F3F4', 
      plot_bgcolor: '#F2F3F4',
      yaxis: {
          title: 'Number of People',
          range: [0, 130],
      },
      xaxis: { title: 'Age' },
      barmode: 'overlay', // using overlay to lay both histograms on top of one another
  };

  Plotly.newPlot('user-ages-chart', [trace1, trace], layout);
});
//SCATTER CHART derived from tutorial
Plotly.d3.csv("data/conversations_behaviour.csv", (allData)=> {
  let nrOfConversations = unpack(allData, 'nrOfConversations');
  let nrOfGhostings = unpack(allData, 'numberOfGhostings');
  //let oneMessageConversations = unpack(allData, 'nrOfOneMessageConversations');
  let traceGhostings = {
    x: nrOfConversations,
    y: nrOfGhostings,
    mode: 'markers',
    type: 'scatter',
    name: 'Ghostings',
    marker: {
      color: 'rgb(244,83,173)'  
  }
};

let layout = {
  paper_bgcolor: '#F2F3F4', // Transparent background
    plot_bgcolor: '#F2F3F4',
  title: {
    text: 'Number of Conversations vs Behaviour',
    font: {
      family: 'Josefin Sans, sans-serif', 
      size: 20, 
      color: 'black' 
  }
},
  xaxis: {
      title: 'Number of Conversations',
      range:[0,2500],
      dtick: 500, //set the intervals to look neater
      
  },
  yaxis: {
      title: 'Number of Ghostings',
      range:[0,1500]
  }
};

  Plotly.newPlot('ghosting-plot', [traceGhostings], layout);
})

  
var trace = [{
  values:[985,144],// values manually inputted after counting on excel 
  labels: ['Male', 'Female'],
  type: 'pie', 
  marker: {
    colors: ['rgb(175,31,95)', 'rgb(244,83,173)', 'rgb(249,187,230)'] 
}
}]
var layout = {
  title: {
    text: 'User demographic',
    font: {
      family: 'Josefin Sans, sans-serif', 
      size: 20, 
      color: 'black' 
  },
  },
  height: 400,
  width: 500,
  paper_bgcolor: '#F2F3F4', // Transparent background
  plot_bgcolor: '#F2F3F4'
};

  Plotly.newPlot('gender-distribution-chart',trace , layout);
  var trace = [{
    values:[130,944, 55],// values manually inputted after counting on excel 
    labels: ['Male', 'Female', 'Male and Female'],
    type: 'pie', 
    marker: {
      colors: ['rgb(175,31,95)', 'rgb(244,83,173)', 'rgb(249,187,230)'] // Custom colors for the slices
  }
  }]
  var layout = {
    title: {
      text: 'User Filters',
      font: {
        family: 'Josefin Sans, sans-serif', 
        size: 20, 
        color: 'black' 
    },
    },
    height: 400,
    width: 500,
    paper_bgcolor: '#F2F3F4', 
    plot_bgcolor: '#F2F3F4' 
  };
  
    Plotly.newPlot('gender-preference-chart',trace , layout);

  