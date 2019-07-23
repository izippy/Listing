import React from 'react';
const faker = require('faker');
import $ from 'jquery';
import Description from './Description';
import styles from './style/App.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            location: '',
            host: {},
            highlights: {},
            desc: {},
            detail: {},
            amenity: {},
        }
    }

    componentDidMount(){
        this.getDescInfo();
        this.getAmenInfo();
    }

    getDescInfo(){
        const parts = window.location.href.split('/');
        const id = parts[parts.length - 2];
        $.ajax({
            method:'GET',
            url: `/listing/desc/${id}`,
            contentType: 'application/json',
            success: (desc)=>{
                console.log(desc)
                this.setState({
                    title: desc.title,
                    location: desc.location,
                    host: desc.host,
                    highlights: desc.highlights,
                    desc: desc.desc,
                    detail: desc.detail    
                })
            }
        })
    }

    getAmenInfo(){
        const parts = window.location.href.split('/');
        const id = parts[parts.length - 2];
        $.ajax({
            method:'GET',
            url: `/listing/amenity/${id}`,
            contentType: 'application/json',
            success: (amenity)=>{
                console.log(amenity)
                this.setState({
                    amenity: amenity.amenities
                })
            }
        })
    }
    
    render() {
        return (
            <div className={styles.main}>
                <Description  
                title={this.state.title} location={this.state.location} host={this.state.host} highlights={this.state.highlights} desc={this.state.desc} detail={this.state.detail} amenity={this.state.amenity}
                />
            </div>
        )
    }
}
    
export default App;