import React from 'react';
import './App.css';
import * as d3 from 'd3'
import ScatterPlot from './ScatterPlot'


/* Mock data to start the app */


let csv = `sort_number,"site","Genus_species","Family","growthform","height","loght","Country","Site","lat","long","entered.by","alt","temp","diurn.temp","isotherm","temp.seas","temp.max.warm","temp.min.cold","temp.ann.range","temp.mean.wetqr","temp.mean.dryqr","temp.mean.warmqr","temp.mean.coldqr","rain","rain.wetm","rain.drym","rain.seas","rain.wetqr","rain.dryqr","rain.warmqr","rain.coldqr","LAI","NPP","hemisphere"
1402,193,"Acer_macryophyllum","Sapindaceae","Tree",28,1.447158031,"USA","Oregon - McDun",44.6,-123.334,"Angela",179,10.8,11.8,4.4,5.2,27,0.3,26.7,4.9,17.4,17.6,4.5,1208,217,13,69,601,68,75,560,2.51,572,1
25246,103,"Quararibea_cordata","Malvaceae","Tree",26.6,1.424881637,"Peru","Manu",12.183,-70.55,"Angela",386,24.5,10.8,7.4,0.9,31.2,16.7,14.5,25.1,23.2,25.3,23.1,3015,416,99,45,1177,340,928,359,4.26,1405,-1
11648,54,"Eragrostis_dielsii","Poaceae","Herb",0.3,-0.522878745,"Australia","Central Australia",23.8,133.833,"Michelle",553,20.9,16.3,4.8,6,37,3.6,33.4,28.1,14.8,28.1,12.8,278,37,9,42,109,35,109,42,1.32,756,-1
8168,144,"Cistus_salvifolius","Cistaceae","Shrub",1.6,0.204119983,"Israel","Hanadiv",32.555,34.938,"Angela",115,19.9,9.7,4.4,4.9,30.7,8.7,22,13.6,25.3,25.7,13.6,598,159,0,115,408,0,2,408,1.01,359,1
22422,178,"Phlox_bifida","Polemoniaceae","Herb",0.2,-0.698970004,"USA","Indiana Dunes",41.617,-86.95,"Michelle",200,9.7,10.7,2.8,9.7,28.6,-9.5,38.1,21.6,-3.3,21.6,-3.3,976,104,44,23,299,165,299,165,3.26,1131,1
15925,59,"Homalium_betulifolium","Salicaceae","Shrub",1.7,0.230448921,"New Caledonia",NA,21.5,165.5,"Laura",95,22.6,7.4,5.4,2.2,29,15.5,13.5,25.4,20.4,25.4,19.7,1387,216,59,46,600,186,600,212,6.99,1552,-1
25151,27,"Pultenaea_microphylla","Fabaceae - P","Shrub",0.5,-0.301029996,"Australia","Kuringai Chase, Sydney",33.65,151.2,"Michelle",157,16.8,10,4.8,3.9,26.1,5.5,20.6,21.2,12.3,21.4,11.5,1283,157,63,29,450,208,385,279,4.14,1563,-1
26007,118,"Rhizophora_mucronata","Rhizophoraceae","Tree",10,1,NA,"Marshall Islands",9,168,"Laura",2,27.7,4.8,8.8,0.2,30.6,25.2,5.4,27.9,27.5,27.9,27.5,2585,300,82,34,870,305,855,405,NA,NA,1
6597,154,"Carya_ovata","Juglandaceae","Tree",40,1.602059991,"USA","Colorado",35.8,-89.9,"Angela",71,15.5,11.4,3.2,8.6,32.9,-2.6,35.5,15.6,21.5,26.1,3.8,1262,129,66,18,382,249,268,325,3.14,1266,1
16908,106,"Ischaemum_nativitatis","Poaceae","Herb",0.5,-0.301029996,"Australia","Christmas Island",10.417,105.667,"Laura",2,26.4,5,7.4,0.6,29.9,23.2,6.7,26.8,25.7,27.1,25.5,1704,309,16,66,806,92,659,135,4.51,2296,-1
4610,201,"Betula_nana","Betulaceae","Shrub",0.55,-0.259637311,"Estonia",NA,58.5,25,"Angela",28,5.4,6.6,2.1,8.3,21.2,-9,30.2,6.5,-1.6,16.1,-5,664,77,31,28,220,106,191,137,3.07,536,1
1593,86,"Acmena_graveolens","Myrtaceae","Tree",32,1.505149978,"Australia","Cairns - Daintree canopy crane",16.103,145.446,"Angela",263,25.2,8.3,5.8,2.1,31.9,17.8,14.1,27.2,22.8,27.5,22.3,2087,459,26,93,1294,92,1031,108,4.04,908,-1
22359,69,"Phaleria_ixoroides","Thymelaeaceae","Tree",5,0.698970004,"Fiji","Viti Levu",17.8,178,"Laura",1108,19.3,6.3,5.8,1.5,25.3,14.6,10.7,21.1,17.4,21.1,17.3,3191,412,160,31,1136,521,1136,523,4.26,1795,-1
24493,123,"Premna_serratifolia","Lamiaceae","Shrub/Tree",7,0.84509804,"Micronesia","Yap",9.5,138.167,"Laura",15,27.2,6.8,9.1,0.2,31.1,23.7,7.4,27.2,27.2,27.5,26.9,3031,368,144,31,1055,436,689,489,NA,NA,1
25129,72,"Pullea_perryana","Cunoniaceae","Tree",12,1.079181246,"Fiji","ao",17.742,178.392,"Laura",47,24.8,6.3,6.3,1.3,30,20.1,9.9,26.1,23,26.3,23,2770,381,118,37,1006,391,1005,391,4.51,1864,-1
25921,161,"Retama_sphaerocarpa","Fabaceae - P","Shrub",1.68,0.225309282,"Spain",NA,37.133,-2.367,"Angela",648,15.3,10.1,3.8,5.7,30.1,3.6,26.5,12.3,22.8,23.1,8.6,355,43,5,44,121,27,33,114,2.79,991,1
30396,46,"Themeda_triandra","Poaceae","Herb",0.7,-0.15490196,"South Africa","Zululand - ledube",28.234,32.017,"Angela",289,20.5,10.2,5.8,2.4,28.5,11,17.5,23.4,17.2,23.4,17.2,926,129,32,43,347,104,344,104,3.35,525,-1
19298,63,"Maesa_tongensis","Maesaceae","Shrub/Tree",4,0.602059991,"Fiji","fulanga",19.133,-178.567,"Laura",0,24.9,6.2,6,1.4,30.3,20.1,10.2,26.5,23.2,26.5,23,1831,278,76,41,724,257,724,270,4.5,1800,-1
`

class App extends React.Component {
  constructor(props) {
      super(props);
      // Set initial states for dataset and variables
      this.state = {
          data: [],
          xVar: "loght",
          yVar: "height",
          val1: "Family",
          val2: "Country"
        };
    }
    
    componentDidMount() {
        // Load data when the component mounts
        this.parseCSV(csv)
        };
    
    fileUpload(e) {
      try {
        // Upload dataset, read it and send results to parse
        let file = e.target.files[0];
        let read = new FileReader();
        read.readAsBinaryString(file);
        read.onloadend = function(){
            this.parseCSV(read.result)
        }.bind(this)
      }
      catch {
        alert("There was an error when loading the file, please try again and ensure the file has a .csv extension")
      }
    }
    
    fileValidation(e){
      try {
          if (!e.target.files[0]) {
            return
          } else {
              var fileInput = e.target.files[0];
              var filePath = fileInput.name;
              var allowedExtensions = /(\.csv)$/i;
              if(!allowedExtensions.exec(filePath)){
                  alert('Please upload file having extension .csv only.');
                  return false;
              }else{
                  //Image preview
                  this.fileUpload(e)
                }
          }
      }
      catch(err) {
        alert('An error as ocurred. Please try again');
        console.log(err)
      }
    }
  

    parseCSV(dataset) {
        // Parse CSV
        var data = d3.csvParse(dataset);
        this.setState({ data: data });
    }    
      
    onSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        // Get list of options from dataset keys
        let options = this.state.data.length === 0 ? [] : Object.keys(this.state.data[0]);

        // Prepare data to be plotted 
        let allData = this.state.data.map((d) => {
            return {
                x: d[this.state.xVar],
                y: d[this.state.yVar],
                label: d[this.state.val1] + ", " + d[this.state.val2]
            };
        });

        return (
            <div className="container">
              <h1>Scatterplot of CSV dataset</h1>
              <div className="wrapper">
                    {/* Upload file button*/}
                    <div className="control-container">
                        <div className='control-wrapper'>
                          <label htmlFor="upload-css" className="custom-file-upload">
                          Upload .CSV file
                          </label>
                          <input id="upload-css" type='file' accept='text/csv' onChange={this.fileValidation.bind(this)}/>
                        </div>

                        {/* X Variable Select Menu */}
                        <div className="control-wrapper">
                            <label htmlFor="xVar">X Variable:</label>
                            <select id="xVar" value={this.state.xVar} className="select-css" onChange={(d) => this.setState({ xVar: d.target.value })}>
                                <option>-</option>
                                {options.map((d) => {
                                    return <option key={d}>{d}</option>
                                })}
                            </select>
                        </div>

                        {/* Y Variable Select Menu */}
                        <div className="control-wrapper">
                            <label htmlFor="yVar">Y Variable:</label>
                            <select id="yVar" value={this.state.yVar} className="select-css" onChange={(d) => this.setState({ yVar: d.target.value })}>
                                <option>-</option>
                                {options.map((d) => {
                                    return <option key={d}>{d}</option>
                                })}
                            </select>
                        </div>

                        {/* Value 1 variable Select Menu */}
                        <div className="control-wrapper">
                            <label htmlFor="val1">Value 1:</label>
                            <select id="val1" value={this.state.val1} className="select-css" onChange={(d) => this.setState({ val1: d.target.value })}>
                                <option>-</option>
                                {options.map((d) => {
                                    return <option key={d}>{d}</option>
                                })}
                            </select>
                        </div>

                        {/* Value 2 variable Select Menu */}
                        <div className="control-wrapper">
                            <label htmlFor="val2">Value 2:</label>
                            <select id="val2" value={this.state.val2} className="select-css" onChange={(d) => this.setState({ val2: d.target.value })}>
                                <option>-</option>
                                {options.map((d) => {
                                    return <option key={d}>{d}</option>
                                })}
                            </select>
                        </div>                                
                    </div>

                    {/* Render scatterplot */}
                    <ScatterPlot
                        xTitle={this.state.xVar}
                        yTitle={this.state.yVar}
                        data={allData}
                        />
                        {console.log(allData)}
              </div>
            </div>
        )
    }
}

export default App