import React from 'react';
import Amenity from './Amenity';
import styles from './style/Description.css';

class Description extends React.Component{

    constructor(props){
        super(props)
        this.state={
            showmoredesc: false,   
            showscrolltonext: false,
            move: 0,   
            showstatus: false,
            clickNext:0
        }
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    readmoredesc(){
        this.setState({
            showmoredesc: true
        })
    }
    readlessdesc(){
        this.setState({
            showmoredesc: false
        })
    }   
    getnext(){
        this.setState({
            move: this.state.move-(100/6),
            clickNext: this.state.clickNext+1
        })
    }
    getpre(){
        this.setState({
            move: this.state.move+(100/6),
            clickNext: this.state.clickNext-1
        })
    }
    showamenitylist(){
       this.setState({
           showstatus: true
       })
    }
    hideamenitylist(){
        this.setState({
            showstatus: false
        })
    }
    handleClick(e){
        e.preventDefault();
        if(this.node){
            if(this.node.contains(e.target)){
               return;
            } else {
              this.hideamenitylist()
            }
        }
    }
    handleKeyDown(e){
        if (e.key === 'Escape') {
            this.setState({
                showstatus: false
            })
        }
    }

    render(){
        const { title, location, host, highlights, desc, detail, amenity } = this.props;
        if(detail){
            var bedroomnum = detail.bedrmnum;
            var beds = detail.beds
        }
        console.log("beds: ", beds);
        // sleeping arrangement 
        var arrgs= [];
        var bedicons = {
            doublebed : 'm23.96 14.81-2.96-7.41v-5.02a1.39 1.39 0 0 0 -1.39-1.38h-15.22c-.77 0-1.39.62-1.39 1.38v5.02l-2.96 7.41-.04.19v5.61c0 .64.43 1.17 1.01 1.33 0 .02-.01.04-.01.06v1.5a.5.5 0 0 0 1 0v-1.5h20v1.5a.5.5 0 0 0 1 0v-1.5c0-.02-.01-.04-.01-.06a1.39 1.39 0 0 0 1.01-1.33v-5.61zm-19.96-12.43c0-.21.17-.38.39-.38h15.22a.39.39 0 0 1 .39.39v4.61h-1v-1.61c0-.77-.62-1.39-1.39-1.39h-3.21c-.78 0-1.4.62-1.4 1.39v1.61h-2v-1.61c0-.77-.62-1.39-1.39-1.39h-3.22c-.77 0-1.39.62-1.39 1.39v1.61h-1zm14 3.01v3.21a.39.39 0 0 1 -.39.39h-3.21a.39.39 0 0 1 -.4-.38v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-8 0v3.21a.39.39 0 0 1 -.39.4h-3.22a.39.39 0 0 1 -.39-.39v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-6.16 2.61h1.16v.61c0 .77.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h2v .61c0 .78.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h1.16l2.8 7h-21.92zm19.16 12.61c0 .21-.18.39-.39.39h-21.22a.39.39 0 0 1 -.39-.39v-4.61h22z',
            singlebed:  'm20.99 15.39-1.99-8.45v-5.44c0-.83-.68-1.5-1.5-1.5h-10a1.5 1.5 0 0 0 -1.5 1.5v5.44l-1.99 8.44-.01.12v5.01c0 .66.43 1.2 1.02 1.4-.01.03-.02.06-.02.09v1.5a.5.5 0 0 0 1 0v-1.5h13v1.5a.5.5 0 0 0 1 0v-1.5c0-.03-.01-.06-.02-.09a1.49 1.49 0 0 0 1.02-1.4v-5.01l-.01-.12zm-13.99-13.89a.5.5 0 0 1 .5-.5h9.99c.27 0 .5.23.5.5v4.5h-2v-2.51c.01-.82-.66-1.49-1.48-1.49h-4.02c-.82 0-1.49.67-1.49 1.49v2.51h-2zm8 1.99v4.02a.5.5 0 0 1 -.49.49h-4.02a.5.5 0 0 1 -.49-.49v-4.02c0-.27.22-.49.49-.49h4.02c.27 0 .49.22.49.49zm-8.01 3.63.01-.12h2v .51c0 .82.67 1.49 1.49 1.49h4.02c.82 0 1.49-.67 1.49-1.49v-.51h2l .01.12 1.86 7.88h-14.74l1.86-7.89zm13.01 13.39a.5.5 0 0 1 -.5.49h-14c-.28 0-.5-.22-.5-.49v-4.51h15z'
        };
        for(var i=1; i<=bedroomnum; i++){
            var bedoption = beds[i-1];
            arrgs.push(
                <div className={styles.brarrg} key={`bedroom ${i}`}>
                    {(bedoption === '1 queen bed' || bedoption==='1 king bed') ?
                        (<div key={bedoption+i}>
                            <svg viewBox={'0 0 24 24'} role={'presentation'} focusable={'false'}  >
                                <path d={bedicons.doublebed} ></path>
                            </svg>
                        </div>)
                        :null
                    }
                    {(bedoption==='1 single bed') ?
                        (<div key={bedoption+i}>
                            <svg viewBox={'0 0 24 24'} role={'presentation'} focusable={'false'}  >
                                <path d={bedicons.singlebed} ></path>
                            </svg>                        
                         </div>)
                        :null
                    }
                    { (bedoption==='2 single beds') ?
                        (<div key={bedoption+i}>
                            <svg viewBox={'0 0 24 24'} role={'presentation'} focusable={'false'}  >
                                <path d={bedicons.singlebed} ></path>
                            </svg>
                            <svg viewBox={'0 0 24 24'} role={'presentation'} focusable={'false'}  >
                                <path d={bedicons.singlebed} ></path>
                            </svg>
                         </div>)
                        :null
                    }
                    <div>
                        <p className={styles.brtext}>bedroom {i}</p>
                        <p className={styles.bedinroom}>{bedoption}</p>
                    </div>
                </div>
            )
        }

        // poping amenity list
        var poplistitems = [];
        if(amenity){
            var amencategory = Object.keys(amenity)
        }
        if(amencategory){
            for(var i=0; i<amencategory.length;i++){
                if(amenity){
                    var subcategory = Object.keys(amenity[amencategory[i]])
                    var subcomment = Object.values(amenity[amencategory[i]])
                    poplistitems.push(
                        <div className='poplistitem' >
                            <div className='categorytitle' key={amencategory[i]}>{amencategory[i]}</div> 
                                {subcategory.map((cc,index) =>
                                    <div className='categorycontent' key={cc}>
                                        {cc}  
                                        {subcomment[index] &&
                                            <div className='categorycomment' >
                                                {subcomment[index]}
                                            </div>
                                        }                              
                                        <div className={styles.linemg}>
                                            <div className={styles.line}></div>
                                        </div>
                                    </div> 
                                )}                       
                        </div>
                    )
                }
            }
        }
        
        var displaydesc = {display: this.state.showmoredesc ? 'block': 'none'}
        var displayshowmore = {display: this.state.showmoredesc ? 'none': 'flex'}
        const arrow = 'm16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z'
        var movestyle = {transform: `translateX(${this.state.move}%)`}
        var showpoplist = {display: this.state.showstatus? 'block': 'none'}
        var showPreBtn = {display: this.state.clickNext<1 ? 'none': 'block'}
        var showNextBtn = {display: (bedroomnum>3 && bedroomnum-3-this.state.clickNext>0) ? 'block' : 'none'}
        
        return(
            <div >
                <div className={styles.summary}>
                    <div className={styles.tilo}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.location}>{location}</div>
                    </div>
                    { host &&
                        <div className={styles.host}>
                            <img src={host.pic}></img>
                            <div className={styles.hostname}>{host.name}</div>   
                        </div>
                    } 
                </div>
                <div className={styles.hls}>
                    { highlights &&
                        <div>
                            {Object.keys(highlights).map(hl=>
                                <div className={styles.hl} key={hl}>
                                    <div className={styles.hlicon}>
                                        {(hl.includes('house')||hl.includes('room')||hl.includes('apartment')) && 
                                            <img src={"./house.png"}></img>
                                        }    
                                        {hl.includes('Self') && 
                                            <img src={"./easy-chkin.png"}></img>
                                        }   
                                        {hl.includes('experience') && 
                                            <img src={"./gt-chkin.png"}></img>
                                        }       
                                        {hl.includes('Superhost') && 
                                            <img src={"./superhost.png"}></img>
                                        } 
                                        {hl.includes('clean') && 
                                            <img src={"./clean.png"}></img>
                                        } 
                                        {hl.includes('location') && 
                                            <img src={"./location.png"}></img>
                                        }                    
                                    </div>
                                    <div className={styles.hltitle}>
                                        {hl}
                                        <div className={styles.hlcontent}>{highlights[hl]}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    }                   
                </div>
                <div className={styles.linemg}>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.descs}>                    
                { desc &&
                    <div>
                        <div className={styles.generaldesc}>
                             <p className={styles.desccontent}>{desc['General']}</p>
                        </div>
                        <div className={styles.readmore} onClick={e=>this.readmoredesc()} style={displayshowmore}>
                            <div >Read more about this space</div>
                            <svg viewBox={'0 0 18 18'} role={'presentation'} focusable={'false'}  >
                                <path d={arrow} ></path>
                            </svg>
                        </div>
                        <div className={styles.readmorearea}  style={displaydesc}>
                            <div>
                                {Object.keys(desc).slice(1).map(de=>
                                <div className={styles.desctitle} key={de}>
                                    {de}
                                        <p className={styles.desccontent}>{desc[de]}</p>
                                    </div>
                                    )}
                            </div>
                            <div className={styles.fakedesclink} >
                                <div >Learn about this number</div>
                            </div>
                            <div className={styles.readless} onClick={e=>this.readlessdesc()} >
                                <div >Hide</div>
                                <svg viewBox={'0 0 18 18'} role={'presentation'} focusable={'false'} >
                                    <path d={arrow} ></path>
                                </svg>
                            </div>                           
                        </div>   
                        <div className={styles.fakedesclink} >
                            <div >Contact host</div>
                        </div>
                    </div>
                }
                </div>
                <div className={styles.linemg}>
                    <div className={styles.line}></div>
                </div>
                <Amenity amenity={amenity} showamenitylist={this.showamenitylist.bind(this)} />
                <div className={styles.linemg}>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.roomarrg}>
                    <h2>Sleeping arrangements</h2>
                    <div className={styles.arrgline}>
                        <div className={styles.btnPre} style={showPreBtn} onClick={e=>this.getpre()}>
                            <span>
                                <button type={"button"}>
                                    <svg viewBox={'0 0 18 18'} role={'presentation'} focusable={'false'}  >
                                        <path d={arrow} ></path>
                                    </svg>
                                </button>
                            </span>
                        </div>
                        <div className={styles.arrg}>
                            <div className={styles.arrgarea}style={movestyle}>
                                {arrgs}
                            </div>
                        </div>
                        <div className={styles.btnNext} style={showNextBtn} onClick={e=>this.getnext()}>
                            <span>
                                <button type={"button"}>
                                    <svg viewBox={'0 0 18 18'} role={'presentation'} focusable={'false'}  >
                                        <path d={arrow} ></path>
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.linemg}>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.poplistback} style={showpoplist} onClick={e=>{this.handleClick(e)}} onKeyDown={e=>{this.handleKeyDown(e)}}>
                    <div className={styles.poplist} ref={node => this.node = node} >
                        <div className={styles.poplisthead}>
                            <button  className={styles.btnClose} onClick={e=>this.hideamenitylist()}>
                                <svg viewBox={'0 0 24 24'} role={'img'} focusable={'false'} >
                                    <path d={'m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22'} ></path>
                                </svg>
                            </button>
                        </div>
                        <div className={styles.poplisttitle}>Amenities</div>
                        <div className={styles.poplistcontent} >                           
                                {poplistitems}    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Description;