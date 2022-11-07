import React from "react";

class Gen extends React.Component{
    render(){
        return(
            <span>{this.props.genre}, </span>
        )
    }
}

class Anime extends React.Component{
    constructor(){
        super()
        this.state = {
            name: "Loading...",
            image: null,
            status: "Loading...",
            release_year: "Loading...",
            genres: ["Loading..."],
            synopsis: "Loading...",
            episodes: "Loading..."
        }
    }
    render(){
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6ad85a5445mshff52b5e3d51aae1p1cc43ajsn425de8dc17b0',
                'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
            }
        };
        const options1 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6ad85a5445mshff52b5e3d51aae1p1cc43ajsn425de8dc17b0',
                'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
            }
        };
        fetch("https://gogoanime2.p.rapidapi.com/popular", options)
            .then(response => response.json())
            .then(data => {
                fetch(`https://gogoanime2.p.rapidapi.com/anime-details/${data[5].animeId}`, options1)
                .then(response => response.json())
                .then(resp => {
                    this.setState({
                        name: resp.animeTitle,
                        image: resp.animeImg,
                        status: resp.status,
                        release_year: resp.releasedDate,
                        genres: resp.genres,
                        synopsis: resp.synopsis,
                        episodes: resp.totalEpisodes
                    })
                })
                .catch(err => console.error(err));
                
            })
        const gen = this.state.genres.map((g, i) => {
            return <Gen genre={g} key={i}/>
        })

        return(
            <div>
                <img src={this.state.image} alt=""/>
                <h3>{this.state.name}</h3>
                <p>Status: {this.state.status}</p>
                <p>Release year: {this.state.release_year}</p>
                <p>Genres: {gen}</p>
                <p>Synopsis: {this.state.synopsis}</p>
                <p>Episodes: {this.state.episodes}</p>
            </div>
        )
    }
}

export default Anime;